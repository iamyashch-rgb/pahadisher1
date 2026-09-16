'use client';

import React, { useState } from 'react';
import { 
  Star, CheckCircle2, EyeOff, Trash2, Filter, ShieldCheck, 
  ThumbsUp, MessageSquare, AlertCircle, Clock, Sparkles, Send, Check, User 
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export default function AdminReviewsPage() {
  const { reviews, updateReviewStatus, deleteReview, replyToReview } = useAdmin();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  
  // Admin Reply State
  const [replyingReviewId, setReplyingReviewId] = useState<string | null>(null);
  const [replyInput, setReplyInput] = useState<string>('');

  const filteredReviews = reviews.filter((r) => {
    if (filterStatus === 'All') return true;
    if (filterStatus === 'Approved') return r.status === 'Approved';
    if (filterStatus === 'Pending') return r.status === 'Pending';
    if (filterStatus === 'Hidden') return r.status === 'Hidden';
    return true;
  });

  // Summary Statistics
  const totalReviews = reviews.length;
  const pendingCount = reviews.filter(r => r.status === 'Pending').length;
  const verifiedCount = reviews.filter(r => r.verifiedBuyer).length;
  const verifiedPercentage = totalReviews > 0 ? Math.round((verifiedCount / totalReviews) * 100) : 0;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : '5.0';

  const handleOpenReply = (id: string, currentReply?: string) => {
    setReplyingReviewId(id);
    setReplyInput(currentReply || '');
  };

  const handleSaveReply = (id: string) => {
    if (!replyInput.trim()) return;
    replyToReview(id, replyInput.trim());
    setReplyingReviewId(null);
    setReplyInput('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pahadi-sand pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-pahadi-gold block">Merchant Control Panel</span>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-pahadi-green">Product Reviews & Moderation</h1>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs font-sans">
          {['All', 'Pending', 'Approved', 'Hidden'].map((st) => {
            const count = st === 'All' ? totalReviews : reviews.filter(r => r.status === st).length;
            return (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3.5 py-2 rounded-xl font-bold uppercase text-[10px] tracking-wider transition-all flex items-center space-x-1 ${
                  filterStatus === st
                    ? 'bg-pahadi-green text-pahadi-gold shadow-md ring-1 ring-pahadi-gold'
                    : 'bg-pahadi-paper text-pahadi-green border border-pahadi-sand hover:bg-white'
                }`}
              >
                <span>{st}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[9px] ${st === 'Pending' && count > 0 ? 'bg-amber-500 text-white font-extrabold' : 'bg-black/10'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-pahadi-paper p-4 rounded-2xl border border-pahadi-border shadow-xs">
          <span className="text-[10px] font-bold uppercase text-pahadi-brown block">Total Reviews</span>
          <span className="font-playfair text-2xl font-bold text-pahadi-green">{totalReviews}</span>
        </div>

        <div className={`p-4 rounded-2xl border shadow-xs ${pendingCount > 0 ? 'bg-amber-50 border-amber-300' : 'bg-pahadi-paper border-pahadi-border'}`}>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase text-amber-900">Pending Review</span>
            {pendingCount > 0 && <Clock className="w-4 h-4 text-amber-600 animate-pulse" />}
          </div>
          <span className="font-playfair text-2xl font-bold text-amber-900">{pendingCount}</span>
        </div>

        <div className="bg-pahadi-paper p-4 rounded-2xl border border-pahadi-border shadow-xs">
          <span className="text-[10px] font-bold uppercase text-pahadi-brown block">Average Rating</span>
          <div className="flex items-center space-x-1">
            <span className="font-playfair text-2xl font-bold text-pahadi-green">{avgRating}</span>
            <Star className="w-4 h-4 fill-pahadi-gold text-pahadi-gold" />
          </div>
        </div>

        <div className="bg-pahadi-paper p-4 rounded-2xl border border-pahadi-border shadow-xs">
          <span className="text-[10px] font-bold uppercase text-pahadi-brown block">Verified Buyers</span>
          <span className="font-playfair text-2xl font-bold text-emerald-800">{verifiedPercentage}%</span>
        </div>
      </div>

      {/* Reviews Cards List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="bg-pahadi-paper p-12 text-center rounded-3xl border border-pahadi-border space-y-2">
            <Sparkles className="w-8 h-8 text-pahadi-gold mx-auto" />
            <p className="font-playfair text-lg font-bold text-pahadi-green">No Reviews Under "{filterStatus}" Filter</p>
            <p className="text-xs text-pahadi-charcoal-muted">Select another status tab to inspect customer reviews.</p>
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-pahadi-paper p-6 rounded-3xl border border-pahadi-border space-y-4 shadow-xs hover:border-pahadi-gold/40 transition-all"
            >
              {/* Header: Product Name, Author, Status Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-pahadi-sand pb-3">
                <div>
                  <span className="font-playfair font-bold text-pahadi-green text-base block">{rev.productName}</span>
                  <div className="flex items-center space-x-2 text-[11px] text-pahadi-brown mt-0.5">
                    <span className="font-bold flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-pahadi-gold inline" />
                      <span>{rev.author}</span>
                    </span>
                    <span>•</span>
                    <span>{rev.location}</span>
                    <span>•</span>
                    <span className="font-mono text-pahadi-charcoal-muted">{rev.date}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      rev.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : rev.status === 'Pending'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-stone-200 text-stone-700 border border-stone-300'
                    }`}
                  >
                    {rev.status}
                  </span>

                  <div className="flex items-center text-pahadi-gold space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < rev.rating ? 'fill-pahadi-gold text-pahadi-gold' : 'text-pahadi-sand'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Headline & Body */}
              <div>
                <h4 className="font-playfair font-bold text-pahadi-green text-base">"{rev.title}"</h4>
                <p className="text-xs text-pahadi-charcoal leading-relaxed mt-1 font-sans">"{rev.comment}"</p>
              </div>

              {/* Attached Customer Photos */}
              {rev.images && rev.images.length > 0 && (
                <div className="pt-1">
                  <span className="text-[10px] font-bold uppercase text-pahadi-brown block mb-1">Attached Photos ({rev.images.length})</span>
                  <div className="flex items-center space-x-2">
                    {rev.images.map((url, i) => (
                      <img key={i} src={url} alt={`Review photo ${i}`} className="w-14 h-14 rounded-xl object-cover border border-pahadi-sand" />
                    ))}
                  </div>
                </div>
              )}

              {/* Existing Merchant Admin Reply */}
              {rev.adminReply && replyingReviewId !== rev.id && (
                <div className="bg-white p-3.5 rounded-2xl border-l-4 border-pahadi-gold text-xs space-y-1">
                  <div className="flex justify-between items-center text-pahadi-green font-bold text-[11px]">
                    <span className="flex items-center space-x-1">
                      <MessageSquare className="w-3.5 h-3.5 text-pahadi-gold" />
                      <span>Official Merchant Reply</span>
                    </span>
                    <span className="text-[10px] text-pahadi-charcoal-muted font-normal">{rev.adminReply.repliedAt}</span>
                  </div>
                  <p className="text-pahadi-charcoal italic">{rev.adminReply.replyText}</p>
                </div>
              )}

              {/* Reply Form Box */}
              {replyingReviewId === rev.id && (
                <div className="bg-white p-4 rounded-2xl border border-pahadi-gold/40 space-y-2">
                  <span className="font-bold text-pahadi-green text-xs flex items-center space-x-1">
                    <MessageSquare className="w-3.5 h-3.5 text-pahadi-gold" />
                    <span>Write Official Pahadi Sher Merchant Response</span>
                  </span>
                  <textarea
                    rows={3}
                    placeholder="Type official response to customer review..."
                    value={replyInput}
                    onChange={(e) => setReplyInput(e.target.value)}
                    className="w-full bg-pahadi-paper border border-pahadi-sand rounded-xl p-3 text-xs focus:ring-1 focus:ring-pahadi-green"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setReplyingReviewId(null)}
                      className="px-3 py-1.5 text-xs text-pahadi-charcoal font-bold hover:bg-pahadi-sand rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveReply(rev.id)}
                      className="px-4 py-1.5 bg-pahadi-green text-pahadi-gold font-bold text-xs uppercase rounded-lg flex items-center space-x-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post Response</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Action Toolbar */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-pahadi-sand/50">
                <div className="flex items-center space-x-3 text-[11px]">
                  {rev.verifiedBuyer ? (
                    <span className="text-emerald-700 font-bold flex items-center space-x-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Verified Himalayan Order</span>
                    </span>
                  ) : (
                    <span className="text-pahadi-charcoal-muted font-medium">Guest Community Post</span>
                  )}
                  <span className="text-pahadi-charcoal-muted">•</span>
                  <span className="text-pahadi-brown flex items-center space-x-1">
                    <ThumbsUp className="w-3.5 h-3.5 text-pahadi-gold" />
                    <span>{rev.helpfulVotes || 0} Helpful Votes</span>
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleOpenReply(rev.id, rev.adminReply?.replyText)}
                    className="px-3 py-1.5 bg-pahadi-green/10 hover:bg-pahadi-green/20 text-pahadi-green rounded-xl text-xs font-bold flex items-center space-x-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-pahadi-gold" />
                    <span>{rev.adminReply ? 'Edit Reply' : 'Reply'}</span>
                  </button>

                  {rev.status !== 'Approved' && (
                    <button
                      onClick={() => updateReviewStatus(rev.id, 'Approved')}
                      className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  )}

                  {rev.status !== 'Hidden' && (
                    <button
                      onClick={() => updateReviewStatus(rev.id, 'Hidden')}
                      className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold flex items-center space-x-1"
                    >
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hide</span>
                    </button>
                  )}

                  <button
                    onClick={() => deleteReview(rev.id)}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold flex items-center space-x-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}
