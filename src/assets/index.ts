/**
 * Sher Assets Catalog
 * Centralized reference for static photos and video assets.
 */

export const ASSETS = {
  photos: {
    logo: '/assets/photos/2.jpeg',
    shilajitResin: '/assets/photos/shilajit-resin.jpg',
    himalayanMountains: '/assets/photos/himalayan-mountains.jpg',
    kashmirSaffron: '/assets/photos/kashmir-saffron.jpg',
    photo13: '/assets/photos/13.jpg',
    uttarakhandOrigin: '/assets/photos/13.jpg',
  },
  videos: {
    heroBackground: '/assets/videos/hero-background.mp4',
    himalayanSourcing: '/assets/videos/himalayan-sourcing.mp4',
    productShowcase: '/assets/videos/product-showcase.mp4',
  },
} as const;

export type PhotoAssetKey = keyof typeof ASSETS.photos;
export type VideoAssetKey = keyof typeof ASSETS.videos;
