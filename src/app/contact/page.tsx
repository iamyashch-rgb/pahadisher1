'use client';

import React, { useState } from 'react';
import { Mountain, Mail, Phone, MapPin, Send, CheckCircle, MessageSquare, Clock, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] pt-28 pb-20 text-[#1C241E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#1B3626]/10 text-[#1B3626] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5 text-[#B85D3B]" />
            <span>We are here to help</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1B3626] tracking-tight">
            Contact The Pahadi Sher
          </h1>
          <p className="text-base text-[#455248] font-sans leading-relaxed">
            Have questions about our pure Shilajit resin, lab test certificates, order tracking, or wholesale inquiries? Our Himalayan Ayurvedic team is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details & Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1B3626] text-[#FAF6F0] p-8 rounded-3xl space-y-6 shadow-xl border border-[#DDE8D5]/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#D49B35] text-[#1B3626] flex items-center justify-center font-bold">
                  <Mountain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">Headquarters & Harvest Center</h3>
                  <span className="text-xs text-[#D49B35] uppercase font-bold tracking-wider">Upper Kumaon Region</span>
                </div>
              </div>

              <div className="space-y-4 text-sm pt-2">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#D49B35] shrink-0 mt-0.5" />
                  <span>
                    The Pahadi Sher<br />
                    Near Aptech, Pithoragarh<br />
                    Uttarakhand – PIN Code 262501<br />
                    India
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#D49B35] shrink-0" />
                  <span>+91 9997408567</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-[#D49B35] shrink-0" />
                  <span>chhavibohra@gmail.com</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-[#D49B35] shrink-0" />
                  <span>Mon – Sat: 9:00 AM – 7:00 PM IST</span>
                </div>
              </div>
            </div>

            {/* Quick Assistance Box */}
            <div className="bg-white p-6 rounded-3xl border border-[#E5DFC9] space-y-4 shadow-sm">
              <div className="flex items-center space-x-3 text-[#1B3626]">
                <MessageSquare className="w-5 h-5 text-[#B85D3B]" />
                <h4 className="font-serif text-base font-bold">Instant WhatsApp Support</h4>
              </div>
              <p className="text-xs text-[#455248] leading-relaxed">
                Need immediate help with dosage advice or order updates? Connect with our Ayurvedic botanist on WhatsApp (+91 9997408567).
              </p>
              <a
                href="https://wa.me/919997408567?text=Hello%20The%20Pahadi%20Sher,%20I%20have%20an%20inquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-[#25D366] text-white px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                <span>Chat on WhatsApp →</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E5DFC9] shadow-sm">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle className="w-16 h-16 text-[#1B3626] mx-auto" />
                  <h3 className="font-serif text-2xl font-bold text-[#1B3626]">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-[#455248] max-w-md mx-auto">
                    Thank you for reaching out to The Pahadi Sher. Our team will review your inquiry and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-[#1B3626] text-[#FAF6F0] px-6 py-2.5 rounded-full text-xs uppercase font-bold tracking-wider hover:bg-[#274A36] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-bold text-[#1B3626]">Send Us a Message</h3>
                    <p className="text-xs text-[#455248]">Fill out the form below and we will respond promptly.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-[11px] font-sans font-bold uppercase text-[#1C241E]">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Vikram Singh"
                        className="w-full bg-[#FAF6F0] border border-[#E5DFC9] rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#1B3626] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-sans font-bold uppercase text-[#1C241E]">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full bg-[#FAF6F0] border border-[#E5DFC9] rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#1B3626] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-sans font-bold uppercase text-[#1C241E]">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#FAF6F0] border border-[#E5DFC9] rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#1B3626] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-sans font-bold uppercase text-[#1C241E]">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-[#FAF6F0] border border-[#E5DFC9] rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#1B3626] focus:outline-none"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Order Support">Order & Shipping Support</option>
                        <option value="Product Purity">Shilajit Purity & Lab Certificate</option>
                        <option value="Wholesale">Wholesale & Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-sans font-bold uppercase text-[#1C241E]">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your message or inquiry here..."
                      className="w-full bg-[#FAF6F0] border border-[#E5DFC9] rounded-xl p-4 text-xs focus:ring-1 focus:ring-[#1B3626] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1B3626] text-[#FAF6F0] py-3.5 rounded-full font-sans text-xs uppercase font-bold tracking-widest hover:bg-[#274A36] transition-all flex items-center justify-center space-x-2 shadow-md"
                  >
                    <span>Submit Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
