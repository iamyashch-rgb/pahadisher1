'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { 
  ShoppingCart, Search, Filter, CheckCircle2, Truck, Clock, 
  AlertCircle, Phone, Mail, MapPin, Printer, Send, RotateCcw, 
  XCircle, Eye, ChevronRight, Package, Tag, ShieldCheck, DollarSign, 
  FileText, ExternalLink, Calendar, User, CornerUpLeft, Check, Sparkles
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { Order, OrderStatus, PaymentStatus, ShippingStatus, OrderTimelineEvent } from '@/types';

export default function AdminOrdersPage() {
  const { 
    orders, 
    updateOrderStatus, 
    updateOrderTracking, 
    cancelOrder, 
    processRefund, 
    sendCustomerNotification 
  } = useAdmin();

  // Filter States
  const [activeTab, setActiveTab] = useState<string>('All');
  const [paymentFilter, setPaymentFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals & Drawers
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [trackingModalOrder, setTrackingModalOrder] = useState<Order | null>(null);
  const [notifModalOrder, setNotifModalOrder] = useState<Order | null>(null);
  const [cancelModalOrder, setCancelModalOrder] = useState<Order | null>(null);
  const [refundModalOrder, setRefundModalOrder] = useState<Order | null>(null);
  const [invoiceModalOrder, setInvoiceModalOrder] = useState<Order | null>(null);

  // Form Inputs for Modals
  const [courierPartnerInput, setCourierPartnerInput] = useState('Express Air (Bluedart)');
  const [trackingNumberInput, setTrackingNumberInput] = useState('');
  const [trackingUrlInput, setTrackingUrlInput] = useState('');

  const [notifChannel, setNotifChannel] = useState<'Email' | 'SMS' | 'WhatsApp'>('Email');
  const [notifSubject, setNotifSubject] = useState('');
  const [notifMessage, setNotifMessage] = useState('');

  const [cancelReasonInput, setCancelReasonInput] = useState('Customer requested cancellation before dispatch');
  const [refundAmountInput, setRefundAmountInput] = useState<number>(0);
  const [refundReasonInput, setRefundReasonInput] = useState('Product refund initiated by customer support');

  // KPI Computations
  const totalOrdersCount = orders.length;
  const pendingCount = orders.filter(o => o.status === 'Pending').length;
  const paidCount = orders.filter(o => o.status === 'Paid').length;
  const processingCount = orders.filter(o => o.status === 'Processing').length;
  const packedCount = orders.filter(o => o.status === 'Packed').length;
  const shippedCount = orders.filter(o => o.status === 'Shipped').length;
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;
  const cancelledCount = orders.filter(o => o.status === 'Cancelled').length;
  const refundedCount = orders.filter(o => o.status === 'Refunded').length;
  const totalRevenue = orders.filter(o => o.paymentStatus === 'Paid').reduce((acc, o) => acc + o.totalAmount, 0);

  // Available status options
  const allStatuses: OrderStatus[] = [
    'Pending', 'Paid', 'Processing', 'Packed', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'
  ];

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      // Status Tab Filter
      if (activeTab !== 'All' && o.status !== activeTab) {
        return false;
      }
      // Payment Filter
      if (paymentFilter !== 'All') {
        if (paymentFilter === 'Paid' && o.paymentStatus !== 'Paid') return false;
        if (paymentFilter === 'COD' && !o.paymentMethod.toLowerCase().includes('cash')) return false;
        if (paymentFilter === 'Prepaid' && !o.paymentMethod.toLowerCase().includes('razorpay')) return false;
      }
      // Search Filter
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesNumber = o.orderNumber.toLowerCase().includes(q);
        const matchesName = o.customerName.toLowerCase().includes(q);
        const matchesEmail = o.email && o.email.toLowerCase().includes(q);
        const matchesPhone = o.phone && o.phone.toLowerCase().includes(q);
        const matchesItem = o.items.some(i => i.name.toLowerCase().includes(q) || (i.sku && i.sku.toLowerCase().includes(q)));
        if (!matchesNumber && !matchesName && !matchesEmail && !matchesPhone && !matchesItem) return false;
      }
      return true;
    });
  }, [orders, activeTab, paymentFilter, searchTerm]);

  // Open Tracking Modal
  const handleOpenTrackingModal = (order: Order) => {
    setTrackingModalOrder(order);
    setCourierPartnerInput(order.courierPartner || 'Express Air (Bluedart)');
    setTrackingNumberInput(order.trackingNumber || `AWB-${Math.floor(100000 + Math.random() * 900000)}`);
    setTrackingUrlInput(order.trackingUrl || '');
  };

  // Save Tracking
  const handleSaveTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingModalOrder || !trackingNumberInput.trim()) return;

    updateOrderTracking(
      trackingModalOrder.id,
      trackingNumberInput.trim(),
      courierPartnerInput,
      trackingUrlInput.trim()
    );

    setTrackingModalOrder(null);
  };

  // Open Notification Modal
  const handleOpenNotifModal = (order: Order) => {
    setNotifModalOrder(order);
    setNotifChannel('Email');
    setNotifSubject(`Update on your Pahadi Sher Order #${order.orderNumber}`);
    setNotifMessage(`Hello ${order.customerName}, your order #${order.orderNumber} is currently ${order.status}. We are ensuring peak bio-active freshness!`);
  };

  // Send Notification
  const handleSendNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifModalOrder || !notifMessage.trim()) return;

    sendCustomerNotification(
      notifModalOrder.id,
      notifChannel,
      notifSubject.trim(),
      notifMessage.trim()
    );

    setNotifModalOrder(null);
    alert(`Customer notification sent successfully via ${notifChannel}!`);
  };

  // Open Cancel Modal
  const handleOpenCancelModal = (order: Order) => {
    setCancelModalOrder(order);
    setCancelReasonInput('Customer requested cancellation before dispatch');
  };

  // Submit Cancel
  const handleConfirmCancel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cancelModalOrder) return;
    cancelOrder(cancelModalOrder.id, cancelReasonInput);
    setCancelModalOrder(null);
  };

  // Open Refund Modal
  const handleOpenRefundModal = (order: Order) => {
    setRefundModalOrder(order);
    setRefundAmountInput(order.totalAmount);
    setRefundReasonInput('Customer requested refund - Verified quality return');
  };

  // Submit Refund
  const handleConfirmRefund = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refundModalOrder) return;
    processRefund(refundModalOrder.id, refundAmountInput, refundReasonInput);
    setRefundModalOrder(null);
  };

  // Print Invoice Window
  const handleTriggerPrintInvoice = (order: Order) => {
    setInvoiceModalOrder(order);
    setTimeout(() => {
      window.print();
    }, 400);
  };

  return (
    <div className="space-y-8 pb-16 font-sans">
      {/* ========================================================================= */}
      {/* 1. HEADER & REVENUE STATS                                                 */}
      {/* ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-pahadi-sand pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-pahadi-brown block">
            Fulfillment Operations & Logistics
          </span>
          <h1 className="font-playfair text-3xl font-bold text-pahadi-green">
            Order Management Portal
          </h1>
        </div>

        <div className="bg-pahadi-green text-pahadi-gold px-6 py-3 rounded-2xl border border-pahadi-gold/30 shadow-md flex items-center space-x-4">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-pahadi-sand block">Total Store Revenue</span>
            <span className="font-playfair text-2xl font-bold text-white">₹{totalRevenue.toLocaleString()}</span>
          </div>
          <DollarSign className="w-8 h-8 text-pahadi-gold p-1.5 bg-white/10 rounded-xl" />
        </div>
      </div>

      {/* KPI Counters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3">
        {[
          { label: 'All Orders', count: totalOrdersCount, status: 'All' },
          { label: 'Pending', count: pendingCount, status: 'Pending' },
          { label: 'Paid', count: paidCount, status: 'Paid' },
          { label: 'Processing', count: processingCount, status: 'Processing' },
          { label: 'Packed', count: packedCount, status: 'Packed' },
          { label: 'Shipped', count: shippedCount, status: 'Shipped' },
          { label: 'Delivered', count: deliveredCount, status: 'Delivered' },
          { label: 'Cancelled / Refunded', count: cancelledCount + refundedCount, status: 'Cancelled' },
        ].map((kpi) => (
          <button
            key={kpi.label}
            onClick={() => setActiveTab(kpi.status)}
            className={`p-3 rounded-2xl border text-left transition-all min-w-0 ${
              activeTab === kpi.status
                ? 'bg-pahadi-green text-pahadi-gold border-pahadi-gold shadow-sm scale-105'
                : 'bg-pahadi-paper text-pahadi-charcoal border-pahadi-border hover:bg-pahadi-sand/60'
            }`}
          >
            <span className="text-[9px] font-bold uppercase tracking-wider block opacity-80 truncate" title={kpi.label}>{kpi.label}</span>
            <span className="font-playfair text-xl font-bold mt-1 block">{kpi.count}</span>
          </button>
        ))}
      </div>

      {/* Filter Tabs & Search Control */}
      <div className="bg-pahadi-paper p-4 rounded-3xl border border-pahadi-border space-y-4 shadow-sm">
        {/* Status Tabs */}
        <div className="flex border-b border-pahadi-sand overflow-x-auto pb-2 space-x-2 scrollbar-none">
          {['All', ...allStatuses].map((st) => (
            <button
              key={st}
              onClick={() => setActiveTab(st)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === st
                  ? 'bg-pahadi-green text-pahadi-gold shadow-xs'
                  : 'text-pahadi-brown hover:bg-pahadi-sand/50'
              }`}
            >
              {st} ({
                st === 'All' ? orders.length : orders.filter(o => o.status === st).length
              })
            </button>
          ))}
        </div>

        {/* Search & Payment Type Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 bg-pahadi-sand/40 border border-pahadi-border rounded-xl px-3 py-2 flex-1 w-full">
            <Search className="w-4 h-4 text-pahadi-brown" />
            <input
              type="text"
              placeholder="Search by Order #, Customer Name, Phone, Email, or Product SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none text-xs font-semibold text-pahadi-green placeholder-pahadi-brown/60 w-full"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="text-xs text-pahadi-brown font-bold hover:text-pahadi-red">✕</button>
            )}
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <Filter className="w-4 h-4 text-pahadi-brown" />
            <span className="text-xs font-bold text-pahadi-brown">Payment:</span>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="bg-white border border-pahadi-border rounded-xl px-3 py-2 text-xs font-bold text-pahadi-green outline-none"
            >
              <option value="All">All Payment Types</option>
              <option value="Paid">Prepaid (Paid)</option>
              <option value="COD">Cash on Delivery</option>
              <option value="Prepaid">Razorpay Online</option>
            </select>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MASTER ORDERS TABLE                                                   */}
      {/* ========================================================================= */}
      <div className="bg-pahadi-paper rounded-3xl border border-pahadi-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead className="bg-pahadi-sand/70 text-pahadi-brown uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Order ID & Date</th>
                <th className="p-4">Customer Details</th>
                <th className="p-4">Purchased Items</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Order Status</th>
                <th className="p-4">Logistics Tracking</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pahadi-sand">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-pahadi-charcoal-muted">
                    No customer orders found matching your search and status filters.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/60 transition-colors group">
                    {/* Order ID & Date */}
                    <td className="p-4">
                      <span className="font-mono font-bold text-pahadi-green text-sm block">{order.orderNumber}</span>
                      <span className="text-[10px] text-pahadi-charcoal-muted font-medium flex items-center space-x-1 mt-0.5">
                        <Calendar className="w-3 h-3 text-pahadi-brown" />
                        <span>{order.date}</span>
                      </span>
                    </td>

                    {/* Customer Info */}
                    <td className="p-4 space-y-0.5">
                      <span className="font-bold text-pahadi-green block">{order.customerName}</span>
                      <span className="text-[10px] text-pahadi-charcoal-muted block">{order.email}</span>
                      <span className="text-[10px] font-mono text-pahadi-brown block">{order.phone}</span>
                    </td>

                    {/* Purchased Items Preview */}
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex -space-x-2 overflow-hidden">
                          {order.items.slice(0, 3).map((item, i) => (
                            <div key={i} className="inline-block h-8 w-8 rounded-lg ring-2 ring-white overflow-hidden relative border border-pahadi-sand bg-white shrink-0">
                              <Image src={item.image} alt={item.name} fill className="object-cover" />
                            </div>
                          ))}
                        </div>
                        <div className="text-[11px]">
                          <span className="font-bold text-pahadi-green block">{order.items.length} Product{order.items.length > 1 ? 's' : ''}</span>
                          <span className="text-[9px] text-pahadi-charcoal-muted block truncate max-w-[140px]">
                            {order.items[0]?.name}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="p-4">
                      <span className="font-playfair text-base font-bold text-pahadi-green block">₹{order.totalAmount}</span>
                      {order.discountAmount > 0 && (
                        <span className="text-[9px] text-pahadi-red font-bold block">Save ₹{order.discountAmount}</span>
                      )}
                    </td>

                    {/* Payment Status Badge */}
                    <td className="p-4 space-y-1">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          order.paymentStatus === 'Paid'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : order.paymentStatus === 'Refunded'
                            ? 'bg-purple-100 text-purple-800 border border-purple-300'
                            : order.paymentStatus === 'Pending'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-red-100 text-red-800 border border-red-300'
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                      <span className="text-[9px] text-pahadi-charcoal-muted block font-medium">
                        {order.paymentMethod.includes('Razorpay') ? 'Prepaid Razorpay' : 'Cash on Delivery'}
                      </span>
                    </td>

                    {/* Order Status Dropdown */}
                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border outline-none cursor-pointer ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : order.status === 'Shipped'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : order.status === 'Packed'
                            ? 'bg-teal-50 text-teal-800 border-teal-300'
                            : order.status === 'Processing'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : order.status === 'Cancelled'
                            ? 'bg-red-50 text-red-800 border-red-300'
                            : order.status === 'Refunded'
                            ? 'bg-purple-50 text-purple-800 border-purple-300'
                            : 'bg-gray-100 text-gray-800 border-gray-300'
                        }`}
                      >
                        {allStatuses.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Logistics Tracking */}
                    <td className="p-4 space-y-1">
                      {order.trackingNumber ? (
                        <div>
                          <span className="font-mono text-[11px] font-bold text-pahadi-green block">{order.trackingNumber}</span>
                          <span className="text-[9px] text-pahadi-brown block font-medium">{order.courierPartner || 'Express Air'}</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleOpenTrackingModal(order)}
                          className="text-[10px] text-pahadi-green font-bold hover:underline flex items-center space-x-1"
                        >
                          <Truck className="w-3 h-3 text-pahadi-gold" />
                          <span>+ Assign AWB</span>
                        </button>
                      )}
                    </td>

                    {/* Action Icon Buttons */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        {/* View Order Drawer Button */}
                        <button
                          onClick={() => setViewingOrder(order)}
                          title="View Order Details & Timeline"
                          className="p-2 rounded-xl bg-pahadi-sand/60 text-pahadi-green hover:bg-pahadi-green hover:text-pahadi-gold transition-all"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Assign Tracking */}
                        <button
                          onClick={() => handleOpenTrackingModal(order)}
                          title="Add/Edit Tracking AWB"
                          className="p-2 rounded-xl bg-pahadi-sand/60 text-blue-700 hover:bg-blue-600 hover:text-white transition-all"
                        >
                          <Truck className="w-4 h-4" />
                        </button>

                        {/* Print Invoice */}
                        <button
                          onClick={() => handleTriggerPrintInvoice(order)}
                          title="Print / Save Invoice PDF"
                          className="p-2 rounded-xl bg-pahadi-sand/60 text-pahadi-brown hover:bg-pahadi-green hover:text-white transition-all"
                        >
                          <Printer className="w-4 h-4" />
                        </button>

                        {/* Send Customer Notification */}
                        <button
                          onClick={() => handleOpenNotifModal(order)}
                          title="Send Email / SMS Notification"
                          className="p-2 rounded-xl bg-pahadi-sand/60 text-amber-700 hover:bg-amber-600 hover:text-white transition-all"
                        >
                          <Send className="w-4 h-4" />
                        </button>

                        {/* Process Refund */}
                        {order.status !== 'Refunded' && order.paymentStatus === 'Paid' && (
                          <button
                            onClick={() => handleOpenRefundModal(order)}
                            title="Process Refund"
                            className="p-2 rounded-xl bg-pahadi-sand/60 text-purple-700 hover:bg-purple-600 hover:text-white transition-all"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        )}

                        {/* Cancel Order */}
                        {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                          <button
                            onClick={() => handleOpenCancelModal(order)}
                            title="Cancel Order & Release Inventory"
                            className="p-2 rounded-xl bg-pahadi-sand/60 text-red-700 hover:bg-red-600 hover:text-white transition-all"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. ORDER DETAIL & TIMELINE DRAWER / MODAL                                 */}
      {/* ========================================================================= */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex justify-end p-0">
          <div className="bg-pahadi-paper w-full max-w-2xl h-full border-l-2 border-pahadi-gold shadow-2xl overflow-y-auto flex flex-col justify-between p-6 sm:p-8 space-y-6">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex justify-between items-center border-b border-pahadi-sand pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-pahadi-brown block">Order Detail View</span>
                  <h3 className="font-playfair text-2xl font-bold text-pahadi-green">{viewingOrder.orderNumber}</h3>
                  <span className="text-xs text-pahadi-charcoal-muted">Placed on {viewingOrder.date}</span>
                </div>
                <button
                  onClick={() => setViewingOrder(null)}
                  className="w-9 h-9 rounded-full bg-pahadi-sand hover:bg-pahadi-border text-pahadi-brown flex items-center justify-center font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Customer & Address Card */}
              <div className="bg-white p-5 rounded-2xl border border-pahadi-sand space-y-3">
                <h4 className="font-bold text-pahadi-brown uppercase text-xs tracking-wider flex items-center space-x-1.5">
                  <User className="w-4 h-4 text-pahadi-gold" />
                  <span>Customer & Delivery Details</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-pahadi-charcoal-muted block">Full Name</span>
                    <strong className="text-pahadi-green text-sm">{viewingOrder.customerName}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-pahadi-charcoal-muted block">Contact Info</span>
                    <strong className="text-pahadi-green block">{viewingOrder.phone}</strong>
                    <span className="text-pahadi-charcoal-muted block">{viewingOrder.email}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-pahadi-sand text-xs text-pahadi-charcoal space-y-1">
                  <span className="text-[10px] text-pahadi-charcoal-muted block">Shipping Address</span>
                  <p className="font-medium">
                    {viewingOrder.address.street}, {viewingOrder.address.city}, {viewingOrder.address.state} - <strong className="font-mono text-pahadi-green">{viewingOrder.address.pincode}</strong>
                  </p>
                </div>
              </div>

              {/* Itemized Products */}
              <div className="bg-white p-5 rounded-2xl border border-pahadi-sand space-y-3">
                <h4 className="font-bold text-pahadi-brown uppercase text-xs tracking-wider flex items-center space-x-1.5">
                  <Package className="w-4 h-4 text-pahadi-green" />
                  <span>Itemized Order Summary ({viewingOrder.items.length})</span>
                </h4>

                <div className="divide-y divide-pahadi-sand">
                  {viewingOrder.items.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden relative border border-pahadi-sand shrink-0 bg-white">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <span className="font-bold text-pahadi-green block">{item.name}</span>
                          <span className="text-[10px] text-pahadi-charcoal-muted">{item.variantName || 'Standard'} • SKU: {item.sku || 'TPS-SKU'}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-mono font-bold text-pahadi-green block">₹{item.price * item.quantity}</span>
                        <span className="text-[10px] text-pahadi-charcoal-muted">Qty: {item.quantity} x ₹{item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-pahadi-sand space-y-1.5 text-xs">
                  <div className="flex justify-between text-pahadi-charcoal-muted">
                    <span>Subtotal</span>
                    <span>₹{viewingOrder.totalAmount + viewingOrder.discountAmount - viewingOrder.shippingFee}</span>
                  </div>
                  {viewingOrder.discountAmount > 0 && (
                    <div className="flex justify-between text-pahadi-red font-semibold">
                      <span>Discount Coupon Applied</span>
                      <span>-₹{viewingOrder.discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-pahadi-charcoal-muted">
                    <span>Himalayan Express Shipping</span>
                    <span>{viewingOrder.shippingFee === 0 ? 'FREE' : `₹${viewingOrder.shippingFee}`}</span>
                  </div>
                  <div className="flex justify-between text-pahadi-green font-bold text-base pt-1 border-t border-pahadi-sand">
                    <span>Grand Total Paid</span>
                    <span>₹{viewingOrder.totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* STEP-BY-STEP ORDER TIMELINE */}
              <div className="bg-white p-5 rounded-2xl border border-pahadi-sand space-y-4">
                <h4 className="font-bold text-pahadi-brown uppercase text-xs tracking-wider flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-pahadi-gold" />
                  <span>Order Audit Timeline</span>
                </h4>

                <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-pahadi-sand">
                  {(viewingOrder.timeline && viewingOrder.timeline.length > 0 ? viewingOrder.timeline : [
                    {
                      id: 'tl-def',
                      timestamp: viewingOrder.date,
                      status: viewingOrder.status,
                      title: `Order Status: ${viewingOrder.status}`,
                      description: 'Order details recorded in system',
                      actor: 'Store Operations'
                    }
                  ]).map((event, idx) => (
                    <div key={event.id} className="relative flex items-start space-x-3 pl-2">
                      <div className="w-4 h-4 rounded-full bg-pahadi-green text-pahadi-gold flex items-center justify-center text-[9px] font-bold z-10 shrink-0 mt-0.5">
                        ✓
                      </div>
                      <div className="bg-pahadi-paper p-3 rounded-xl border border-pahadi-sand flex-1 space-y-1 text-xs">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="font-bold text-pahadi-green">{event.title}</span>
                          <span className="text-pahadi-charcoal-muted font-mono">{event.timestamp}</span>
                        </div>
                        <p className="text-pahadi-charcoal text-xs">{event.description}</p>
                        <span className="text-[9px] text-pahadi-brown font-semibold block">By: {event.actor}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CUSTOMER NOTIFICATION LOG */}
              {viewingOrder.notificationsSent && viewingOrder.notificationsSent.length > 0 && (
                <div className="bg-white p-5 rounded-2xl border border-pahadi-sand space-y-3">
                  <h4 className="font-bold text-pahadi-brown uppercase text-xs tracking-wider flex items-center space-x-1.5">
                    <Send className="w-4 h-4 text-pahadi-green" />
                    <span>Customer Notifications History ({viewingOrder.notificationsSent.length})</span>
                  </h4>

                  <div className="space-y-2">
                    {viewingOrder.notificationsSent.map((n) => (
                      <div key={n.id} className="bg-pahadi-paper p-3 rounded-xl border border-pahadi-sand text-xs space-y-1">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="bg-pahadi-green/10 text-pahadi-green px-2 py-0.5 rounded font-bold uppercase">{n.type}</span>
                          <span className="text-pahadi-charcoal-muted font-mono">{n.timestamp}</span>
                        </div>
                        <span className="font-bold text-pahadi-green block">{n.subject}</span>
                        <p className="text-pahadi-charcoal text-xs leading-snug">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions inside Drawer */}
            <div className="pt-4 border-t border-pahadi-sand flex space-x-2">
              <button
                onClick={() => handleTriggerPrintInvoice(viewingOrder)}
                className="flex-1 bg-pahadi-green text-pahadi-gold py-3 rounded-xl font-bold uppercase text-xs flex items-center justify-center space-x-2 shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Invoice PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MODAL: ASSIGN TRACKING AWB & COURIER PARTNER                           */}
      {/* ========================================================================= */}
      {trackingModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-pahadi-paper rounded-3xl max-w-md w-full p-6 space-y-4 border border-pahadi-gold shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-pahadi-sand pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-pahadi-brown block">Logistics Management</span>
                <h3 className="font-playfair text-xl font-bold text-pahadi-green">Assign Shipment Tracking AWB</h3>
              </div>
              <button onClick={() => setTrackingModalOrder(null)} className="text-pahadi-brown font-bold text-lg">✕</button>
            </div>

            <form onSubmit={handleSaveTracking} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-pahadi-brown mb-1">Courier Partner *</label>
                <select
                  value={courierPartnerInput}
                  onChange={(e) => setCourierPartnerInput(e.target.value)}
                  className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green font-bold outline-none"
                >
                  <option value="Express Air Courier (Bluedart)">Express Air Courier (Bluedart)</option>
                  <option value="Delhivery Express">Delhivery Express</option>
                  <option value="Shadowfax Express">Shadowfax Express</option>
                  <option value="DTDC Express Air">DTDC Express Air</option>
                  <option value="India Post Speed Post">India Post Speed Post</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-pahadi-brown mb-1">Airway Bill (AWB / Tracking Code) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BLRDEX998241"
                  value={trackingNumberInput}
                  onChange={(e) => setTrackingNumberInput(e.target.value)}
                  className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs font-mono font-bold text-pahadi-green uppercase outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-pahadi-brown mb-1">Direct Courier Tracking URL (Optional)</label>
                <input
                  type="url"
                  placeholder="e.g. https://track.bluedart.com/BLRDEX998241"
                  value={trackingUrlInput}
                  onChange={(e) => setTrackingUrlInput(e.target.value)}
                  className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green outline-none"
                />
              </div>

              <div className="pt-2 flex space-x-2">
                <button
                  type="button"
                  onClick={() => setTrackingModalOrder(null)}
                  className="flex-1 bg-pahadi-sand text-pahadi-brown py-2.5 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-pahadi-green text-pahadi-gold py-2.5 rounded-xl font-bold uppercase tracking-wider shadow-md"
                >
                  Save & Notify Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MODAL: SEND CUSTOMER NOTIFICATION                                     */}
      {/* ========================================================================= */}
      {notifModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-pahadi-paper rounded-3xl max-w-md w-full p-6 space-y-4 border border-pahadi-gold shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-pahadi-sand pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-pahadi-brown block">Customer Messaging</span>
                <h3 className="font-playfair text-xl font-bold text-pahadi-green">Send Order Status Notification</h3>
              </div>
              <button onClick={() => setNotifModalOrder(null)} className="text-pahadi-brown font-bold text-lg">✕</button>
            </div>

            <form onSubmit={handleSendNotificationSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-pahadi-brown mb-1">Channel *</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Email', 'SMS', 'WhatsApp'] as const).map((ch) => (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => setNotifChannel(ch)}
                      className={`py-2 rounded-xl font-bold text-xs border ${
                        notifChannel === ch
                          ? 'bg-pahadi-green text-pahadi-gold border-pahadi-green'
                          : 'bg-white text-pahadi-brown border-pahadi-sand'
                      }`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-pahadi-brown mb-1">Subject Header</label>
                <input
                  type="text"
                  required
                  value={notifSubject}
                  onChange={(e) => setNotifSubject(e.target.value)}
                  className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-pahadi-brown mb-1">Message Body</label>
                <textarea
                  rows={4}
                  required
                  value={notifMessage}
                  onChange={(e) => setNotifMessage(e.target.value)}
                  className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs text-pahadi-green leading-relaxed"
                />
              </div>

              <div className="pt-2 flex space-x-2">
                <button
                  type="button"
                  onClick={() => setNotifModalOrder(null)}
                  className="flex-1 bg-pahadi-sand text-pahadi-brown py-2.5 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-pahadi-green text-pahadi-gold py-2.5 rounded-xl font-bold uppercase tracking-wider shadow-md"
                >
                  Send Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. MODAL: CANCEL ORDER & RESTORE STOCK                                    */}
      {/* ========================================================================= */}
      {cancelModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-pahadi-paper rounded-3xl max-w-md w-full p-6 space-y-4 border border-red-400 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-pahadi-sand pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-red-700 block">Cancel Order</span>
                <h3 className="font-playfair text-xl font-bold text-pahadi-green">Cancel {cancelModalOrder.orderNumber}?</h3>
              </div>
              <button onClick={() => setCancelModalOrder(null)} className="text-pahadi-brown font-bold text-lg">✕</button>
            </div>

            <p className="text-xs text-pahadi-charcoal-muted">
              Cancelling this order will release inventory back to store stock and notify customer {cancelModalOrder.customerName}.
            </p>

            <form onSubmit={handleConfirmCancel} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-pahadi-brown mb-1">Reason for Cancellation *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Customer requested cancellation / Invalid address"
                  value={cancelReasonInput}
                  onChange={(e) => setCancelReasonInput(e.target.value)}
                  className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs text-pahadi-green outline-none"
                />
              </div>

              <div className="pt-2 flex space-x-2">
                <button
                  type="button"
                  onClick={() => setCancelModalOrder(null)}
                  className="flex-1 bg-pahadi-sand text-pahadi-brown py-2.5 rounded-xl font-bold"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl font-bold uppercase tracking-wider shadow-md"
                >
                  Cancel Order & Release Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. MODAL: PROCESS REFUND                                                  */}
      {/* ========================================================================= */}
      {refundModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-pahadi-paper rounded-3xl max-w-md w-full p-6 space-y-4 border border-purple-400 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-pahadi-sand pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-purple-800 block">Payment Refund</span>
                <h3 className="font-playfair text-xl font-bold text-pahadi-green">Process Refund ({refundModalOrder.orderNumber})</h3>
              </div>
              <button onClick={() => setRefundModalOrder(null)} className="text-pahadi-brown font-bold text-lg">✕</button>
            </div>

            <form onSubmit={handleConfirmRefund} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-pahadi-brown mb-1">Refund Amount (₹) *</label>
                <input
                  type="number"
                  required
                  max={refundModalOrder.totalAmount}
                  value={refundAmountInput}
                  onChange={(e) => setRefundAmountInput(Number(e.target.value))}
                  className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-sm font-bold text-pahadi-green outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-pahadi-brown mb-1">Refund Audit Reason *</label>
                <textarea
                  rows={3}
                  required
                  value={refundReasonInput}
                  onChange={(e) => setRefundReasonInput(e.target.value)}
                  className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs text-pahadi-green outline-none"
                />
              </div>

              <div className="pt-2 flex space-x-2">
                <button
                  type="button"
                  onClick={() => setRefundModalOrder(null)}
                  className="flex-1 bg-pahadi-sand text-pahadi-brown py-2.5 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-purple-700 hover:bg-purple-800 text-white py-2.5 rounded-xl font-bold uppercase tracking-wider shadow-md"
                >
                  Confirm & Process Refund
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. PRINTABLE OFFICIAL TAX INVOICE PDF OVERLAY                             */}
      {/* ========================================================================= */}
      {invoiceModalOrder && (
        <div className="fixed inset-0 z-50 bg-white p-8 overflow-y-auto print:p-0">
          <div className="max-w-3xl mx-auto space-y-6 text-gray-900 font-sans print:max-w-none">
            {/* Screen Controls Bar (Hidden in Print) */}
            <div className="flex justify-between items-center print:hidden border-b pb-4">
              <span className="font-bold text-xs uppercase text-gray-500">Tax Invoice PDF Document Preview</span>
              <div className="flex space-x-2">
                <button onClick={() => window.print()} className="px-5 py-2 bg-pahadi-green text-pahadi-gold rounded-xl font-bold text-xs">
                  🖨️ Print / Save as PDF
                </button>
                <button onClick={() => setInvoiceModalOrder(null)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-xl font-bold text-xs">
                  Close Preview
                </button>
              </div>
            </div>

            {/* Invoice Header */}
            <div className="flex justify-between items-start border-b-2 border-gray-900 pb-6">
              <div>
                <h1 className="text-2xl font-serif font-bold text-gray-900 tracking-tight">THE PAHADI SHER</h1>
                <p className="text-xs text-gray-600 font-medium">100% Pure High-Altitude Himalayan Wellness Cooperatives</p>
                <p className="text-[11px] text-gray-500">Munsiyari Valley & Kumaon Upper Range, Uttarakhand, India</p>
                <p className="text-[11px] text-gray-500">GSTIN: 05AAACT1234F1Z9 • Care: chhavibohra@gmail.com</p>
              </div>
              <div className="text-right">
                <span className="bg-gray-900 text-white font-bold text-xs px-3 py-1 uppercase rounded inline-block mb-2">TAX INVOICE</span>
                <p className="text-xs font-mono font-bold text-gray-900">Invoice #: INV-{invoiceModalOrder.orderNumber.replace('TPS-', '')}</p>
                <p className="text-xs text-gray-600">Date: {invoiceModalOrder.date}</p>
                <p className="text-xs text-gray-600">Order Ref: {invoiceModalOrder.orderNumber}</p>
              </div>
            </div>

            {/* Bill To & Ship To */}
            <div className="grid grid-cols-2 gap-6 text-xs bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div>
                <span className="font-bold uppercase text-[10px] text-gray-500 block">BILLED & SHIPPED TO:</span>
                <strong className="text-sm block font-bold text-gray-900">{invoiceModalOrder.customerName}</strong>
                <p className="text-gray-700">{invoiceModalOrder.address.street}</p>
                <p className="text-gray-700">{invoiceModalOrder.address.city}, {invoiceModalOrder.address.state} - {invoiceModalOrder.address.pincode}</p>
                <p className="text-gray-600 font-mono mt-1">Phone: {invoiceModalOrder.phone}</p>
              </div>
              <div className="text-right">
                <span className="font-bold uppercase text-[10px] text-gray-500 block">PAYMENT INFORMATION:</span>
                <p className="font-bold text-gray-900">{invoiceModalOrder.paymentMethod}</p>
                <p className="text-gray-700 font-mono">Status: {invoiceModalOrder.paymentStatus}</p>
                {invoiceModalOrder.trackingNumber && (
                  <p className="text-gray-700 font-mono mt-1">Tracking AWB: {invoiceModalOrder.trackingNumber}</p>
                )}
              </div>
            </div>

            {/* Itemized Table */}
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-900 text-white uppercase text-[10px] font-mono">
                  <th className="p-3">#</th>
                  <th className="p-3">Item Description</th>
                  <th className="p-3">SKU Code</th>
                  <th className="p-3 text-right">Unit Price</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Total (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {invoiceModalOrder.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-mono">{idx + 1}</td>
                    <td className="p-3 font-bold text-gray-900">
                      {item.name}
                      {item.variantName && <span className="text-[10px] text-gray-500 font-normal block">{item.variantName}</span>}
                    </td>
                    <td className="p-3 font-mono text-gray-600">{item.sku || 'TPS-SKU'}</td>
                    <td className="p-3 text-right font-mono">₹{item.price}</td>
                    <td className="p-3 text-center font-mono font-bold">{item.quantity}</td>
                    <td className="p-3 text-right font-mono font-bold">₹{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Invoice Total Calculation */}
            <div className="flex justify-end pt-2 text-xs">
              <div className="w-64 space-y-1.5 font-mono">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>₹{invoiceModalOrder.totalAmount + invoiceModalOrder.discountAmount - (invoiceModalOrder.taxAmount || 0)}</span>
                </div>
                {invoiceModalOrder.discountAmount > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Discount:</span>
                    <span>-₹{invoiceModalOrder.discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>GST Tax (5%):</span>
                  <span>₹{invoiceModalOrder.taxAmount || Math.round(invoiceModalOrder.totalAmount * 0.05)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Express Delivery:</span>
                  <span>{invoiceModalOrder.shippingFee === 0 ? 'FREE' : `₹${invoiceModalOrder.shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold border-t-2 border-gray-900 pt-2 text-gray-900">
                  <span>Grand Total:</span>
                  <span>₹{invoiceModalOrder.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Invoice Footer Seal */}
            <div className="pt-8 border-t border-gray-300 text-[10px] text-gray-500 flex justify-between items-end">
              <div>
                <p className="font-bold text-gray-800">Thank you for choosing The Pahadi Sher!</p>
                <p>100% Pure Himalayan Sourcing • Lab Test Certified • Direct Villager Empowerment</p>
              </div>
              <div className="text-right">
                <div className="w-28 h-12 border border-gray-300 rounded flex items-center justify-center font-mono text-[9px] text-gray-400 uppercase">
                  [ Authorized Seal ]
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
