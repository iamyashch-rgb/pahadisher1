import { Product, Order } from '@/types';

const RECENTLY_VIEWED_KEY = 'pahadi_recently_viewed';

/**
 * Record a product view into localStorage history
 */
export function recordProductView(productId: string) {
  if (typeof window === 'undefined') return;
  try {
    const saved = localStorage.getItem(RECENTLY_VIEWED_KEY);
    let list: string[] = saved ? JSON.parse(saved) : [];
    list = [productId, ...list.filter(id => id !== productId)].slice(0, 10);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to record product view', e);
  }
}

/**
 * Get recently viewed products from localStorage
 */
export function getRecentlyViewedProducts(allProducts: Product[], limit: number = 6): Product[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(RECENTLY_VIEWED_KEY);
    if (!saved) return [];
    const list: string[] = JSON.parse(saved);
    return list
      .map(id => allProducts.find(p => p.id === id))
      .filter((p): p is Product => Boolean(p && p.inStock !== false))
      .slice(0, limit);
  } catch (e) {
    console.error('Failed to fetch recently viewed products', e);
    return [];
  }
}

/**
 * "You May Also Like" Recommendation Engine:
 * Scores products based on category match, tag/ingredient overlap, and price range proximity.
 */
export function getYouMayAlsoLike(currentProduct: Product, allProducts: Product[], limit: number = 4): Product[] {
  const candidates = allProducts.filter(p => p.id !== currentProduct.id && p.inStock !== false);

  const currentTags = [
    ...(currentProduct.ingredients || []),
    ...(currentProduct.benefits || []),
    currentProduct.altitude || '',
    currentProduct.origin || ''
  ].map(t => t.toLowerCase());

  const scored = candidates.map(product => {
    let score = 0;

    // 1. Category Match (Heavy boost for same category; penalty for teas in non-tea products)
    if (product.category === currentProduct.category) {
      score += 100;
    } else if (currentProduct.category !== 'teas' && product.category === 'teas') {
      score -= 100;
    }

    // 2. Price Proximity (+25 points if within 30% price ratio)
    const priceRatio = Math.abs(product.price - currentProduct.price) / currentProduct.price;
    if (priceRatio <= 0.3) {
      score += 25;
    } else if (priceRatio <= 0.6) {
      score += 10;
    }

    // 3. Tag & Ingredient Overlap (+15 points per match)
    const candidateTags = [
      ...(product.ingredients || []),
      ...(product.benefits || []),
      product.altitude || '',
      product.origin || ''
    ].map(t => t.toLowerCase());

    const matchingTags = candidateTags.filter(t => currentTags.some(ct => ct.includes(t) || t.includes(ct)));
    score += Math.min(matchingTags.length * 15, 30);

    // 4. Rating Boost (+5 points for high ratings)
    if (product.rating >= 4.8) {
      score += 5;
    }

    return { product, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .map(s => s.product)
    .slice(0, limit);
}

export interface FrequentlyBoughtBundle {
  mainProduct: Product;
  companionProduct: Product;
  bundleSubtotal: number;
  bundlePrice: number;
  savings: number;
}

/**
 * "Frequently Bought Together" Recommendation Engine:
 * Scans orders co-purchased history or pairs with complementary Ayurvedic companion items.
 */
export function getFrequentlyBoughtTogether(
  currentProduct: Product,
  allProducts: Product[],
  orders: Order[] = []
): FrequentlyBoughtBundle | null {
  const candidates = allProducts.filter(p => p.id !== currentProduct.id && p.inStock !== false);
  if (candidates.length === 0) return null;

  // 1. Check order history for co-purchased product
  const coPurchaseCounts: Record<string, number> = {};

  orders.forEach(order => {
    const hasCurrent = order.items.some(item => item.productId === currentProduct.id);
    if (hasCurrent) {
      order.items.forEach(item => {
        if (item.productId !== currentProduct.id) {
          coPurchaseCounts[item.productId] = (coPurchaseCounts[item.productId] || 0) + item.quantity;
        }
      });
    }
  });

  let bestCompanionId = Object.keys(coPurchaseCounts).sort(
    (a, b) => coPurchaseCounts[b] - coPurchaseCounts[a]
  )[0];

  let companionProduct = bestCompanionId ? candidates.find(p => p.id === bestCompanionId) : null;

  // 2. Fallback to Ayurvedic Complementary Rule Matrix if no order co-purchase history:
  // - Shilajit -> Pure Cow Ghee or Wild Honey
  // - Ghee -> Shilajit or Honey
  // - Honey -> Shilajit or Ghee
  // - Teas -> Honey or Teas
  if (!companionProduct) {
    if (currentProduct.category === 'shilajit') {
      companionProduct = candidates.find(p => p.category === 'ghee') || candidates.find(p => p.category === 'honey');
    } else if (currentProduct.category === 'ghee') {
      companionProduct = candidates.find(p => p.category === 'shilajit') || candidates.find(p => p.category === 'honey');
    } else if (currentProduct.category === 'honey') {
      companionProduct = candidates.find(p => p.category === 'shilajit') || candidates.find(p => p.category === 'ghee');
    } else if (currentProduct.category === 'teas') {
      companionProduct = candidates.find(p => p.category === 'honey') || candidates.find(p => p.category === 'teas');
    } else {
      companionProduct = candidates.find(p => p.category === currentProduct.category);
    }

    if (!companionProduct) {
      companionProduct = candidates.find(p => currentProduct.category !== 'teas' ? p.category !== 'teas' : p.category === 'teas') || candidates[0];
    }
  }

  if (!companionProduct) return null;

  const bundleSubtotal = currentProduct.price + companionProduct.price;
  // Apply 10% Bundle Discount
  const bundlePrice = Math.round(bundleSubtotal * 0.9);
  const savings = bundleSubtotal - bundlePrice;

  return {
    mainProduct: currentProduct,
    companionProduct,
    bundleSubtotal,
    bundlePrice,
    savings
  };
}

/**
 * "Customers Also Viewed" Recommendation Engine
 */
export function getCustomersAlsoViewed(currentProduct: Product, allProducts: Product[], limit: number = 4): Product[] {
  const candidates = allProducts.filter(p => p.id !== currentProduct.id && p.inStock !== false);

  // Strictly prioritize products from the SAME category first
  const sameCategory = candidates
    .filter(p => p.category === currentProduct.category)
    .sort((a, b) => b.rating * b.reviewsCount - a.rating * a.reviewsCount);

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  // If same category has fewer items than limit, fill remaining with other categories (excluding teas if currentProduct is not a tea)
  const remainingCandidates = candidates
    .filter(p => p.category !== currentProduct.category && (currentProduct.category === 'teas' || p.category !== 'teas'))
    .sort((a, b) => b.rating * b.reviewsCount - a.rating * a.reviewsCount);

  return [...sameCategory, ...remainingCandidates].slice(0, limit);
}

/**
 * "Best Sellers" Recommendation Engine
 */
export function getBestSellers(allProducts: Product[], limit: number = 4): Product[] {
  return [...allProducts]
    .filter(p => p.inStock !== false)
    .sort((a, b) => {
      const aSold = a.soldQuantity || a.reviewsCount * 5;
      const bSold = b.soldQuantity || b.reviewsCount * 5;
      return bSold - aSold;
    })
    .slice(0, limit);
}
