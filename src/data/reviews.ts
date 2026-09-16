import { Review } from '@/types';

export const reviews: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-shilajit-resin-50g',
    productName: 'Pure Himalayan Shilajit Resin',
    author: 'Col. Vikramaditya Singh (Retd.)',
    userEmail: 'vikram.singh@example.com',
    location: 'Dehradun, Uttarakhand',
    rating: 5,
    date: 'August 14, 2026',
    title: 'Genuine Himalayan Shilajit — Unmatched energy and purity',
    comment: 'Having lived in the hills for decades, I can spot real Shilajit instantly. The Pahadi Sher resin dissolves completely in warm milk leaving zero residue. My morning stamina and joint flexibility have improved noticeably.',
    verifiedBuyer: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'Approved',
    helpfulVotes: 34,
    unhelpfulVotes: 1,
    adminReply: {
      replyText: 'Thank you for your service and kind words, Col. Singh! We are honored to serve you authentic 18,000 ft altitude Shilajit.',
      repliedAt: 'August 15, 2026'
    }
  },
  {
    id: 'rev-2',
    productId: 'prod-badri-ghee-500ml',
    productName: 'Pure Cow Desi Ghee',
    author: 'Dr. Sunita Pant',
    userEmail: 'dr.sunita@example.com',
    location: 'New Delhi',
    rating: 5,
    date: 'July 28, 2026',
    title: 'The authentic granular texture and herbal aroma of real Bilona Ghee!',
    comment: 'The distinct golden color and herbal fragrance take me straight back to my grandmother’s kitchen in Nainital. You can actually taste the wild herbs the cows graze on. Worth every single rupee!',
    verifiedBuyer: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    images: [
      'https://images.unsplash.com/photo-1589927986076-2558569d3214?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'Approved',
    helpfulVotes: 22,
    unhelpfulVotes: 0,
    adminReply: {
      replyText: 'Dear Dr. Sunita, thank you! Our cows graze freely on high-altitude medicinal herbs in the Chamoli region.',
      repliedAt: 'July 29, 2026'
    }
  },
  {
    id: 'rev-3',
    productId: 'prod-rhododendron-honey-500g',
    productName: 'Raw Himalayan Buransh Honey',
    author: 'Ananya Sharma',
    userEmail: 'ananya.s@example.com',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    date: 'August 02, 2026',
    title: 'Exquisite floral note, nothing like commercial supermarket honey',
    comment: 'The crimson hue and subtle floral aftertaste are sublime. It’s unheated and raw, so you get the true medicinal benefits. Packaging was top-notch with zero leakages.',
    verifiedBuyer: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    status: 'Approved',
    helpfulVotes: 18,
    unhelpfulVotes: 2
  },
  {
    id: 'rev-4',
    productId: 'prod-royal-combo',
    productName: 'The Pahadi Sher Royal Vitality Trio',
    author: 'Harshwardhan Joshi',
    userEmail: 'harsh.j@example.com',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    date: 'August 29, 2026',
    title: 'The ultimate wellness investment. Beautiful pine wood presentation!',
    comment: 'Bought this royal combo for my father. The wooden box presentation feels truly royal, and the lab test certificates inside give complete confidence. The combination of Shilajit with Pure Cow Ghee is legendary.',
    verifiedBuyer: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    images: [
      'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'Approved',
    helpfulVotes: 45,
    unhelpfulVotes: 1,
    adminReply: {
      replyText: 'We are delighted your father loved the Royal Trio box! Thank you for trusting Pahadi Sher.',
      repliedAt: 'August 30, 2026'
    }
  },
  {
    id: 'rev-5',
    productId: 'prod-hemp-pickle-300g',
    productName: 'Pahadi Hemp Seed & Garlic Chutney Pickle',
    author: 'Meenakshi Rawat',
    userEmail: 'meenakshi@example.com',
    location: 'Chandigarh',
    rating: 5,
    date: 'August 10, 2026',
    title: 'Authentic Kumaoni Bhangira flavor — tastes just like home',
    comment: 'Handcrafted perfection. The nutty roasted hemp seed crunch with hill garlic and galgal lemon juice makes every lunch meal extraordinary.',
    verifiedBuyer: true,
    status: 'Approved',
    helpfulVotes: 12,
    unhelpfulVotes: 0
  },
  {
    id: 'rev-6',
    productId: 'prod-shilajit-resin-50g',
    productName: 'Pure Himalayan Shilajit Resin',
    author: 'Aarav Mehta',
    userEmail: 'aarav.m@example.com',
    location: 'Dehradun, UK',
    rating: 5,
    date: 'August 24, 2026',
    title: 'Phenomenal quality and pure energy',
    comment: 'Verified 85.4% Fulvic Acid. Phenomenal energy boost during mountain treks. Highly recommended!',
    verifiedBuyer: true,
    status: 'Approved',
    helpfulVotes: 9,
    unhelpfulVotes: 0
  }
];
