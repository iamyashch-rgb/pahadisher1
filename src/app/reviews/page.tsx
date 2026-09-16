'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, ShieldCheck, Quote, Sparkles, ThumbsUp, ThumbsDown, 
  MessageSquare, Filter, X, User
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export default function ReviewsPage() {
  const { reviews, voteReviewHelpful } = useAdmin();
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [votedReviews, setVotedReviews] = useState<Record<string, 'helpful' | 'unhelpful'>>({});
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);

  // Show approved reviews
  const approvedReviews = reviews.filter((r) => r.status === 'Approved');

  const filteredReviews = selectedRating === 0
    ? approvedReviews
    : approvedReviews.filter((r) => r.rating === selectedRating);

  const handleVote = (reviewId: string, isHelpful: boolean) => {
    if (votedReviews[reviewId]) return;
    setVotedReviews((prev) => ({ ...prev, [reviewId]: isHelpful ? 'helpful' : 'unhelpful' }));
    voteReviewHelpful(reviewId, isHelpful);
  };

  const avgScore = approvedReviews.length > 0
    ? (approvedReviews.reduce((acc, r) => acc + r.rating, 0) / approvedReviews.length).toFixed(1)
    : '4.9';

  return (
    <div className="py-12 bg-pahadi-offwhite min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Banner */}
        <div className="bg-pahadi-green text-pahadi-offwhite p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-pahadi-lg border border-pahadi-gold/30">
          <div className="relative z-10 space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-pahadi-gold/20 text-pahadi-gold px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>{avgScore} / 5.0 Average Customer Rating</span>
            </div>
            <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-white">
              Verified Pahadi Sher Reviews
            </h1>
            <p className="text-xs sm:text-sm text-pahadi-sand/90 font-sans leading-relaxed">
              Read authentic feedback from over 10,000+ happy customers across India who use our high-altitude Himalayan Shilajit, Pure Cow Ghee, Wild Honey, and Organic Spices.
            </p>
          </div>
        </div>

        {/* Rating Filter Buttons */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedRating(0)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              selectedRating === 0 ? 'bg-pahadi-green text-pahadi-gold shadow-sm' : 'bg-pahadi-paper text-pahadi-charcoal hover:bg-white'
            }`}
          >
            All Reviews ({approvedReviews.length})
          </button>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = approvedReviews.filter(r => r.rating === star).length;
            return (
              <button
                key={star}
                onClick={() => setSelectedRating(star)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center space-x-1 transition-all ${
                  selectedRating === star ? 'bg-pahadi-green text-pahadi-gold shadow-sm' : 'bg-pahadi-paper text-pahadi-charcoal hover:bg-white'
                }`}
              >
                <span>{star} Stars ({count})</span>
                <Star className="w-3.5 h-3.5 fill-current text-pahadi-gold" />
              </button>
            );
          })}
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((rev) => {
              const myVote = votedReviews[rev.id];
              const helpfulCount = (rev.helpfulVotes || 0) + (myVote === 'helpful' ? 1 : 0);
              const unhelpfulCount = (rev.unhelpfulVotes || 0) + (myVote === 'unhelpful' ? 1 : 0);

              return (
                <motion.div
                  key={rev.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-pahadi-paper p-8 rounded-3xl border border-pahadi-border space-y-4 shadow-pahadi-sm relative flex flex-col justify-between"
                >
                  <Quote className="w-8 h-8 text-pahadi-gold/20 absolute top-6 right-6 pointer-events-none" />

                  <div className="space-y-3">
                    <div className="flex items-center space-x-1 text-pahadi-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rev.rating ? 'fill-pahadi-gold text-pahadi-gold' : 'text-pahadi-sand fill-transparent'
                          }`}
                        />
                      ))}
                    </div>

                    <span className="text-[10px] font-sans font-bold uppercase text-pahadi-brown block tracking-wider">
                      {rev.productName}
                    </span>

                    <h3 className="font-playfair text-xl font-bold text-pahadi-green">
                      "{rev.title}"
                    </h3>

                    <p className="text-xs sm:text-sm text-pahadi-charcoal leading-relaxed font-sans italic">
                      "{rev.comment}"
                    </p>

                    {/* Customer Photo Gallery Thumbnails */}
                    {rev.images && rev.images.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-pahadi-brown block mb-1">
                          Photos ({rev.images.length})
                        </span>
                        <div className="flex items-center space-x-2 overflow-x-auto">
                          {rev.images.map((imgUrl, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setActiveLightboxImage(imgUrl)}
                              className="relative w-14 h-14 rounded-xl overflow-hidden border border-pahadi-sand shrink-0 group focus:outline-none"
                            >
                              <img src={imgUrl} alt={`Customer photo ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Merchant Reply */}
                    {rev.adminReply && (
                      <div className="bg-white/80 border-l-4 border-pahadi-gold p-3.5 rounded-r-xl space-y-1 text-xs mt-3">
                        <div className="flex items-center justify-between text-pahadi-green font-bold text-[11px]">
                          <span className="flex items-center space-x-1">
                            <MessageSquare className="w-3.5 h-3.5 text-pahadi-gold" />
                            <span>Response from The Pahadi Sher Team</span>
                          </span>
                          <span className="text-[10px] text-pahadi-charcoal-muted font-normal">{rev.adminReply.repliedAt}</span>
                        </div>
                        <p className="text-pahadi-charcoal italic text-xs leading-relaxed">{rev.adminReply.replyText}</p>
                      </div>
                    )}
                  </div>

                  {/* Author & Helpful Voting Footer */}
                  <div className="pt-4 border-t border-pahadi-sand flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-pahadi-green text-pahadi-gold flex items-center justify-center font-bold text-sm shrink-0 border border-pahadi-gold/40 shadow-xs">
                        <User className="w-5 h-5 text-pahadi-gold" />
                      </div>
                      <div>
                        <h4 className="font-playfair text-sm font-bold text-pahadi-green flex items-center space-x-1">
                          <span>{rev.author}</span>
                          {rev.verifiedBuyer && <ShieldCheck className="w-4 h-4 text-emerald-600 inline" />}
                        </h4>
                        <p className="text-[11px] text-pahadi-brown">
                          {rev.location} • <span className="text-pahadi-green font-bold">{rev.verifiedBuyer ? 'Verified Buyer' : 'Community'}</span>
                        </p>
                      </div>
                    </div>

                    {/* Voting */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleVote(rev.id, true)}
                        disabled={!!myVote}
                        className={`px-3 py-1 rounded-lg border flex items-center space-x-1 text-[11px] font-bold transition-all ${
                          myVote === 'helpful'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-white text-pahadi-charcoal border-pahadi-sand hover:border-pahadi-green'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5 text-pahadi-green" />
                        <span>({helpfulCount})</span>
                      </button>

                      <button
                        onClick={() => handleVote(rev.id, false)}
                        disabled={!!myVote}
                        className={`px-3 py-1 rounded-lg border flex items-center space-x-1 text-[11px] font-bold transition-all ${
                          myVote === 'unhelpful'
                            ? 'bg-rose-50 text-rose-800 border-rose-300'
                            : 'bg-white text-pahadi-charcoal border-pahadi-sand hover:border-rose-400'
                        }`}
                      >
                        <ThumbsDown className="w-3.5 h-3.5 text-pahadi-brown" />
                        <span>({unhelpfulCount})</span>
                      </button>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="relative max-w-3xl max-h-[90vh] bg-black rounded-2xl overflow-hidden border border-pahadi-gold/40">
            <button
              onClick={() => setActiveLightboxImage(null)}
              className="absolute top-3 right-3 p-2 bg-black/60 text-white rounded-full hover:bg-black"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={activeLightboxImage} alt="Customer product photo full size" className="w-full max-h-[85vh] object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
