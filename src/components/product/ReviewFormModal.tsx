'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Star, ShieldCheck, Upload, Image as ImageIcon, 
  CheckCircle2, AlertTriangle, Sparkles, Plus, Trash2, User, Lock 
} from 'lucide-react';
import { Product, Review } from '@/types';
import { useAdmin } from '@/context/AdminContext';

interface ReviewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export const ReviewFormModal: React.FC<ReviewFormModalProps> = ({
  isOpen,
  onClose,
  product
}) => {
  const { orders, addReview } = useAdmin();

  // Form State
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [author, setAuthor] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [location, setLocation] = useState<string>('Dehradun, Uttarakhand');
  const [title, setTitle] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  
  // Image Upload State
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const starLabels: Record<number, string> = {
    1: '1/5 - Poor Quality',
    2: '2/5 - Below Expectation',
    3: '3/5 - Average Experience',
    4: '4/5 - Great Quality',
    5: '5/5 - Exceptional Himalayan Purity'
  };

  const handleAddSampleImage = (url: string) => {
    if (url.trim() && imageUrls.length < 4) {
      setImageUrls(prev => [...prev, url.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !title.trim() || !comment.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newReview: Review = {
        id: `rev-${Date.now()}`,
        productId: product.id,
        productName: product.name,
        author: author.trim(),
        userEmail: email.trim(),
        location: location.trim() || 'India',
        rating,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        title: title.trim(),
        comment: comment.trim(),
        verifiedBuyer: true,
        status: 'Approved',
        images: imageUrls.length > 0 ? imageUrls : undefined,
        helpfulVotes: 0,
        unhelpfulVotes: 0
      };

      addReview(newReview);
      setIsSubmitting(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        // Reset form
        setTitle('');
        setComment('');
        setImageUrls([]);
      }, 1800);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl bg-pahadi-paper border border-pahadi-gold/30 rounded-3xl shadow-pahadi-lg overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="bg-pahadi-green text-pahadi-paper p-5 flex items-center justify-between border-b border-pahadi-gold/20">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-pahadi-gold" />
              <div>
                <h3 className="font-playfair text-lg font-bold text-pahadi-gold">Write a Product Review</h3>
                <p className="text-[11px] text-pahadi-sand/80 line-clamp-1">{product.name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-pahadi-sand transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success Message Overlay */}
          {showSuccess ? (
            <div className="p-12 text-center flex flex-col items-center justify-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12 }}
                className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"
              >
                <CheckCircle2 className="w-10 h-10" />
              </motion.div>
              <h4 className="font-playfair text-2xl font-bold text-pahadi-green">Thank You for Your Feedback!</h4>
              <p className="text-xs text-pahadi-charcoal max-w-sm">
                Your review has been published directly to the product page.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs font-sans">
              
              {/* Verified Purchase Status Banner */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex items-center space-x-3 text-emerald-800">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold block text-[11px]">Verified Himalayan Community Member</span>
                  <span className="text-[10px] text-emerald-700">
                    Your review gets an official Verified Badge on our store!
                  </span>
                </div>
              </div>

              {/* Rating Selector */}
              <div>
                <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1.5">
                  Overall Rating *
                </label>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isActive = (hoverRating || rating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                          className="p-1 focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              isActive
                                ? 'text-pahadi-gold fill-pahadi-gold'
                                : 'text-pahadi-sand fill-transparent'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <span className="font-bold text-pahadi-green text-[11px]">
                    {starLabels[hoverRating || rating]}
                  </span>
                </div>
              </div>

              {/* Author & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anurag Rawat"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs focus:ring-1 focus:ring-pahadi-green"
                  />
                </div>

                <div>
                  <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">
                    Location (City, State)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dehradun, Uttarakhand"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs focus:ring-1 focus:ring-pahadi-green"
                  />
                </div>
              </div>

              {/* Review Title */}
              <div>
                <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">
                  Review Headline / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Summarize your experience in one sentence"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs font-bold text-pahadi-green focus:ring-1 focus:ring-pahadi-green"
                />
              </div>

              {/* Review Comment */}
              <div>
                <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">
                  Detailed Review *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details about flavor, texture, efficacy, packaging, or how you use this product..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs focus:ring-1 focus:ring-pahadi-green"
                />
              </div>

              {/* Photo Upload Section */}
              <div className="space-y-2">
                <label className="font-bold text-pahadi-brown uppercase text-[10px] flex items-center justify-between">
                  <span>Add Product Photos (Max 4)</span>
                  <span className="text-[10px] text-pahadi-charcoal-muted font-normal">Optional</span>
                </label>

                <div className="flex gap-2 mb-2">
                  <input
                    type="url"
                    placeholder="Paste image URL (e.g. https://images.unsplash.com/...)"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="flex-1 bg-white border border-pahadi-border rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-pahadi-green"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSampleImage(newImageUrl)}
                    className="bg-pahadi-green text-pahadi-gold font-bold px-3 py-2 rounded-xl text-xs flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>

                {/* Preset Sample Photo Badges for quick testing */}
                <div className="flex items-center space-x-2 text-[10px] text-pahadi-charcoal-muted">
                  <span>Sample review photos:</span>
                  <button
                    type="button"
                    onClick={() => handleAddSampleImage('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80')}
                    className="underline hover:text-pahadi-green"
                  >
                    Resin Jar
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => handleAddSampleImage('https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=600&q=80')}
                    className="underline hover:text-pahadi-green"
                  >
                    Packaging Box
                  </button>
                </div>

                {/* Image Previews Grid */}
                {imageUrls.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 pt-2">
                    {imageUrls.map((url, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-pahadi-sand group">
                        <img src={url} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1 right-1 p-1 bg-black/70 text-white rounded-full opacity-90 hover:opacity-100"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-pahadi-sand flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 text-pahadi-charcoal hover:bg-pahadi-sand rounded-xl text-xs font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-pahadi-green text-pahadi-gold hover:bg-pahadi-green-light font-bold text-xs uppercase tracking-wider rounded-xl shadow-pahadi-md flex items-center space-x-2 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-pahadi-gold" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Review'}</span>
                </button>
              </div>

            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
