'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CustomerUser, SavedAddress, PointsTransaction } from '@/types';

interface CustomerAuthContextType {
  user: CustomerUser | null;
  isAuthenticated: boolean;
  authModalOpen: boolean;
  authModalTab: 'login' | 'signup';
  openAuthModal: (tab?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  login: (identifier: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  loginWithOtp: (identifier: string, otp: string) => Promise<{ success: boolean; message?: string }>;
  signup: (data: { name: string; email: string; phone?: string; password?: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (updatedData: Partial<CustomerUser>) => void;
  addAddress: (address: Omit<SavedAddress, 'id'>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addRewardPoints: (points: number, description: string, orderId?: string) => void;
  redeemRewardPoints: (points: number, description: string, orderId?: string) => boolean;
}

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USERS = 'pahadi_sher_customers_db';
const LOCAL_STORAGE_CURRENT_USER = 'pahadi_sher_current_customer';

export const CustomerAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem(LOCAL_STORAGE_CURRENT_USER);
      if (savedSession) {
        const activeUser = JSON.parse(savedSession);
        setUser(activeUser);
      }
    } catch (err) {
      console.error('Error loading customer auth state from localStorage:', err);
    }
  }, []);

  // Save active user session
  const saveSession = (currentUser: CustomerUser | null) => {
    setUser(currentUser);
    if (currentUser) {
      localStorage.setItem(LOCAL_STORAGE_CURRENT_USER, JSON.stringify(currentUser));
      // Also sync back to DB
      const existingDb = localStorage.getItem(LOCAL_STORAGE_USERS);
      let usersDb: CustomerUser[] = existingDb ? JSON.parse(existingDb) : [];
      const index = usersDb.findIndex((u) => u.id === currentUser.id);
      if (index !== -1) {
        usersDb[index] = currentUser;
      } else {
        usersDb.push(currentUser);
      }
      localStorage.setItem(LOCAL_STORAGE_USERS, JSON.stringify(usersDb));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_CURRENT_USER);
    }
  };

  const openAuthModal = (tab: 'login' | 'signup' = 'login') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const login = async (identifier: string, password?: string) => {
    const cleanId = identifier.trim().toLowerCase();
    if (!cleanId) {
      return { success: false, message: 'Please enter a valid email or mobile number.' };
    }

    const existingDb = localStorage.getItem(LOCAL_STORAGE_USERS);
    let usersDb: CustomerUser[] = existingDb ? JSON.parse(existingDb) : [];
    
    let foundUser = usersDb.find(
      (u) => u.email.toLowerCase() === cleanId || u.phone.replace(/\s+/g, '') === cleanId.replace(/\s+/g, '')
    );

    if (!foundUser) {
      const newUser: CustomerUser = {
        id: `cust-${Date.now()}`,
        name: cleanId.includes('@') ? cleanId.split('@')[0] : 'Valued Customer',
        email: cleanId.includes('@') ? cleanId : `${cleanId}@customer.pahadisher.com`,
        phone: cleanId.includes('@') ? '' : identifier,
        joinedDate: 'Sept 2026',
        membershipBadge: 'Himalayan Explorer',
        addresses: [],
      };
      foundUser = newUser;
    }

    saveSession(foundUser);
    closeAuthModal();
    return { success: true, message: `Welcome back, ${foundUser.name}!` };
  };

  const loginWithOtp = async (identifier: string, otp: string) => {
    if (!otp || otp.length < 4) {
      return { success: false, message: 'Please enter a valid OTP code.' };
    }
    return login(identifier);
  };

  const signup = async (data: { name: string; email: string; phone?: string; password?: string }) => {
    if (!data.name.trim() || !data.email.trim()) {
      return { success: false, message: 'Please fill in all required fields (Name & Email).' };
    }

    const cleanEmail = data.email.trim().toLowerCase();
    const existingDb = localStorage.getItem(LOCAL_STORAGE_USERS);
    let usersDb: CustomerUser[] = existingDb ? JSON.parse(existingDb) : [];

    if (usersDb.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: 'An account with this email already exists. Please log in.' };
    }

    const newUser: CustomerUser = {
      id: `cust-${Date.now()}`,
      name: data.name.trim(),
      email: cleanEmail,
      phone: (data.phone || '').trim(),
      joinedDate: 'Sept 2026',
      membershipBadge: 'Himalayan Explorer',
      addresses: [],
    };

    saveSession(newUser);
    closeAuthModal();
    return { success: true, message: 'Account created successfully! Welcome to The Pahadi Sher family.' };
  };

  const logout = () => {
    saveSession(null);
  };

  const updateProfile = (updatedData: Partial<CustomerUser>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updatedData };
    saveSession(updatedUser);
  };

  const addAddress = (addressData: Omit<SavedAddress, 'id'>) => {
    if (!user) return;
    const newAddress: SavedAddress = {
      ...addressData,
      id: `addr-${Date.now()}`,
    };

    let updatedAddresses = [...user.addresses];
    if (newAddress.isDefault) {
      updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefault: false }));
    } else if (updatedAddresses.length === 0) {
      newAddress.isDefault = true;
    }

    updatedAddresses.push(newAddress);
    saveSession({ ...user, addresses: updatedAddresses });
  };

  const deleteAddress = (id: string) => {
    if (!user) return;
    const updatedAddresses = user.addresses.filter((a) => a.id !== id);
    if (updatedAddresses.length > 0 && !updatedAddresses.some((a) => a.isDefault)) {
      updatedAddresses[0].isDefault = true;
    }
    saveSession({ ...user, addresses: updatedAddresses });
  };

  const setDefaultAddress = (id: string) => {
    if (!user) return;
    const updatedAddresses = user.addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    saveSession({ ...user, addresses: updatedAddresses });
  };

  const addRewardPoints = (points: number, description: string, orderId?: string) => {
    if (!user || points <= 0) return;
    const currentPoints = user.rewardPoints || 0;
    const newPoints = currentPoints + points;

    const todayStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const newTx: PointsTransaction = {
      id: `pts-${Date.now()}`,
      date: todayStr,
      type: 'earned',
      points,
      description,
      orderId,
      balanceAfter: newPoints,
    };

    const updatedHistory = [newTx, ...(user.pointsHistory || [])];
    saveSession({
      ...user,
      rewardPoints: newPoints,
      pointsHistory: updatedHistory,
    });
  };

  const redeemRewardPoints = (points: number, description: string, orderId?: string): boolean => {
    if (!user || points <= 0) return false;
    const currentPoints = user.rewardPoints || 0;

    if (currentPoints <= 999 || points > currentPoints) {
      return false;
    }

    const newPoints = currentPoints - points;
    const todayStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const newTx: PointsTransaction = {
      id: `pts-${Date.now()}`,
      date: todayStr,
      type: 'redeemed',
      points,
      description,
      orderId,
      balanceAfter: newPoints,
    };

    const updatedHistory = [newTx, ...(user.pointsHistory || [])];
    saveSession({
      ...user,
      rewardPoints: newPoints,
      pointsHistory: updatedHistory,
    });
    return true;
  };

  return (
    <CustomerAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        authModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        login,
        loginWithOtp,
        signup,
        logout,
        updateProfile,
        addAddress,
        deleteAddress,
        setDefaultAddress,
        addRewardPoints,
        redeemRewardPoints,
      }}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
};

export const useCustomerAuth = () => {
  const context = useContext(CustomerAuthContext);
  if (!context) {
    throw new Error('useCustomerAuth must be used within a CustomerAuthProvider');
  }
  return context;
};
