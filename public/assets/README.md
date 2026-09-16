# Assets Directory

This directory contains static media assets for the web application.

## Directory Structure

```
public/assets/
├── photos/
│   ├── himalayan-mountains.jpg   # High resolution Himalayan landscape photograph
│   ├── kashmir-saffron.jpg       # Macro photograph of Kashmiri Mongra Saffron
│   └── shilajit-resin.jpg        # Premium Shilajit resin jar product photography
└── videos/
    ├── hero-background.mp4       # Background video loop for homepage hero section
    ├── himalayan-sourcing.mp4    # Sourcing & harvesting story video clip
    └── product-showcase.mp4      # Highlighting product usage & demonstration
```

## Import Usage in Next.js Components

```tsx
import { ASSETS } from '@/assets';

// Usage with standard <img> or Next.js <Image>
<img src={ASSETS.photos.shilajitResin} alt="Shilajit Resin" />

// Usage with HTML5 <video>
<video src={ASSETS.videos.heroBackground} autoPlay loop muted playsInline />
```
