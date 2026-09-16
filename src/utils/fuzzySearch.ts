import { Product } from '@/types';

/**
 * Calculates Levenshtein distance between two strings for typo tolerance.
 */
export function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Checks if query token roughly matches target word with typo tolerance (up to 2 character edits).
 */
export function isTypoMatch(queryToken: string, targetWord: string): boolean {
  if (!queryToken || !targetWord) return false;
  if (targetWord.includes(queryToken)) return true;

  // For short tokens (<= 3 chars), require exact substring match
  if (queryToken.length <= 3) return targetWord.includes(queryToken);

  // For longer tokens, allow 1-2 edit distance based on token length
  const maxDistance = queryToken.length > 6 ? 2 : 1;
  const dist = levenshteinDistance(queryToken, targetWord);
  return dist <= maxDistance;
}

export interface SearchResultItem {
  product: Product;
  score: number;
  matchReason: string;
}

/**
 * Perform high-performance multi-field typo-tolerant search across products.
 */
export function performGlobalProductSearch(products: Product[], rawQuery: string): SearchResultItem[] {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return [];

  const queryTokens = query.split(/\s+/).filter(Boolean);
  const results: SearchResultItem[] = [];

  for (const product of products) {
    let score = 0;
    let matchReason = '';

    const nameLower = product.name.toLowerCase();
    const categoryLower = (product.categoryName || product.category || '').toLowerCase();
    const skuLower = (product.sku || product.id || '').toLowerCase();
    const descLower = (product.description || '').toLowerCase();
    const shortDescLower = (product.shortDescription || '').toLowerCase();
    const benefitsText = (product.benefits || []).join(' ').toLowerCase();
    const ingredientsText = (product.ingredients || []).join(' ').toLowerCase();
    const variantsText = (product.variants || []).map(v => `${v.name} ${v.sku} ${v.value}`).join(' ').toLowerCase();

    // 1. Exact Name Match (Highest Weight: 100)
    if (nameLower === query) {
      score += 100;
      matchReason = 'Exact product title match';
    } else if (nameLower.startsWith(query)) {
      score += 80;
      matchReason = 'Title starts with query';
    } else if (nameLower.includes(query)) {
      score += 60;
      matchReason = 'Matches product title';
    }

    // 2. SKU / Variant SKU Match (Weight: 75)
    if (skuLower.includes(query) || variantsText.includes(query)) {
      score += 75;
      matchReason = matchReason || 'Matches product SKU';
    }

    // 3. Category Match (Weight: 50)
    if (categoryLower.includes(query)) {
      score += 50;
      matchReason = matchReason || `Matches category "${product.categoryName || product.category}"`;
    }

    // 4. Description / Benefits / Ingredients Match (Weight: 30)
    if (shortDescLower.includes(query) || descLower.includes(query)) {
      score += 30;
      matchReason = matchReason || 'Matches product description';
    } else if (benefitsText.includes(query) || ingredientsText.includes(query)) {
      score += 25;
      matchReason = matchReason || 'Matches benefits & ingredients';
    }

    // 5. Multi-token Typo Tolerant Fallback Matching
    if (score === 0) {
      const allWords = `${nameLower} ${categoryLower} ${skuLower} ${shortDescLower} ${benefitsText} ${ingredientsText}`.split(/\W+/).filter(Boolean);
      let matchedTokensCount = 0;

      for (const token of queryTokens) {
        const hasMatch = allWords.some(word => isTypoMatch(token, word));
        if (hasMatch) {
          matchedTokensCount++;
        }
      }

      if (matchedTokensCount > 0) {
        score += Math.round((matchedTokensCount / queryTokens.length) * 40);
        matchReason = 'Similar keyword match';
      }
    }

    if (score > 0) {
      results.push({ product, score, matchReason });
    }
  }

  // Sort results by highest relevance score first
  return results.sort((a, b) => b.score - a.score);
}
