export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  publishDate: string;
  readTime: string;
  category: string;
  image: string;
  seoTitle?: string;
  seoDescription?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Test 100% Pure Himalayan Shilajit Resin at Home',
    slug: 'how-to-test-pure-shilajit-at-home',
    excerpt: 'Learn 5 traditional Ayurvedic and modern laboratory tests to verify Shilajit purity, solubility, and absence of filler waxes.',
    content: `
      <p>Himalayan Shilajit resin has gained international acclaim for its extraordinary concentration of ionic trace minerals and fulvic acid. However, with rising popularity comes an influx of imitation products diluted with gums, synthetic fulvic powder, or heavy metals.</p>
      
      <h2>1. The Water Solubility Test</h2>
      <p>Pure Shilajit resin dissolves completely in warm water or milk within 2-3 minutes without leaving any gritty residue, sediment, or floating particles. Stir a pea-sized portion into warm water — genuine resin produces a rich golden-amber to deep reddish-brown liquid with an earthy herbal aroma.</p>

      <h2>2. Temperature Flexibility Test</h2>
      <p>Authentic raw Shilajit resin is highly temperature sensitive:</p>
      <ul>
        <li><strong>In Cold Temperature (Refrigerator):</strong> It becomes firm, brittle, and glass-like. You can snap off a portion cleanly.</li>
        <li><strong>In Warm Temperature (Room/Hands):</strong> It softens quickly into a pliable, sticky resin that stretches smoothly.</li>
      </ul>
      <p>If your Shilajit remains hard at room temperature or greasy in the fridge, it likely contains wax or paraffin fillers.</p>

      <h2>3. The Purity Alcohol Test</h2>
      <p>Dissolve a small pea-sized amount of Shilajit resin in pure rubbing alcohol or high-proof spirit. Authentic Shilajit will <em>not</em> dissolve in alcohol and will clump into sticky masses, whereas artificial dyes and synthetic extracts dissolve instantly.</p>

      <h2>4. Flame & Smoke Test</h2>
      <p>Place a small dab of Shilajit resin on a metal fork and hold it over a clean flame. Pure Shilajit will puff up, bubble, and form a ash without burning with a smoky flame or smelling like burnt plastic.</p>

      <h2>5. NABL Certificate & Batch Phytochemical Verification</h2>
      <p>Always ensure your brand provides downloadable batch-specific test certificates from NABL accredited laboratories verifying >80% Fulvic Acid and safe heavy metal thresholds according to FSSAI & AYUSH limits.</p>
    `,
    author: 'Dr. Devendra Rawat',
    authorRole: 'Chief Ayurvedic Botanist',
    publishDate: '2026-08-15',
    readTime: '5 min read',
    category: 'Ayurvedic Wisdom',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=85',
    seoTitle: 'How to Test Pure Himalayan Shilajit Resin at Home | Purity Guide',
    seoDescription: 'Discover 5 easy Ayurvedic purity tests to check if your Shilajit resin is 100% pure, natural, and free from synthetic additives.'
  },
  {
    id: '2',
    title: 'The Sacred Science of Pure Cow Ghee & Vedic Bilona Method',
    slug: 'benefits-of-pure-cow-ghee-bilona-method',
    excerpt: 'Discover why ghee made from Uttarakhand cows using bi-directional wooden Bilona churns offers superior digestibility & essential nutrients.',
    content: `
      <p>In the high-altitude pastures of the Kumaon Himalayas, the indigenous cow grazes freely on wild medicinal herbs, alpine flora, and pristine glacial streams. The resulting milk is rich, aromatic, and naturally abundant in wholesome proteins.</p>

      <h2>What is the Traditional Bilona Method?</h2>
      <p>Commercial ghee is produced industrially by heating leftover cream at high temperatures, stripping away delicate enzymes and healthy fatty acids. In contrast, the ancient Vedic Bilona process follows five sacred steps:</p>

      <ol>
        <li><strong>Whole Milk Fermentation:</strong> Raw cow milk is cultured into curd overnight in earthen pots.</li>
        <li><strong>Bi-directional Churning:</strong> The curd is hand-churned back and forth using a traditional wooden churner (Bilona).</li>
        <li><strong>Makkhan Extraction:</strong> Butter solids (makkhan) separate naturally from buttermilk.</li>
        <li><strong>Slow Firewood Clarification:</strong> The butter is melted slowly over low cow-dung or firewood flame.</li>
        <li><strong>Glass Jar Pouring:</strong> Golden granular ghee is strained and sealed in UV-protective glass jars.</li>
      </ol>

      <h2>Nutritional Superiority of Pure Cow Ghee</h2>
      <p>Pure Cow Ghee contains high concentrations of Butyric Acid, Omega-3 fatty acids, Fat-soluble Vitamins (A, D, E, K), and natural antioxidants that support gut immunity, joint lubrication, and mental clarity.</p>
    `,
    author: 'Sunita Joshi',
    authorRole: 'Himalayan Dairy Artisan',
    publishDate: '2026-08-28',
    readTime: '6 min read',
    category: 'Pahadi Heritage',
    image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=1200&q=85',
    seoTitle: 'Pure Cow Ghee Benefits & Vedic Bilona Method Explained',
    seoDescription: 'Learn how traditional Vedic Bilona Pure Cow Ghee is prepared in Himalayan villages and its health benefits for digestion and immunity.'
  },
  {
    id: '3',
    title: 'Surya Tapi Purification: Why Sun-Drying Shilajit Matters',
    slug: 'surya-tapi-purification-sun-dried-shilajit',
    excerpt: 'Why high-heat boiling destroys bioactive compounds in Shilajit and why 45-day slow Surya Tapi purification preserves peak potency.',
    content: `
      <p>Raw Shilajit rocks collected from Himalayan cliffs contain natural mineral exudates along with clay and organic plant matter. To make Shilajit safe for human consumption, it must undergo thorough Ayurvedic purification (Shodhana).</p>

      <h2>High Heat Boiling vs. Surya Tapi Sun Drying</h2>
      <p>Many commercial manufacturers expedite production by boiling raw Shilajit in water at high temperatures (over 100°C). While quick, extreme heat denatures fragile fulvic acid complexes, enzymes, and bioactive dibenzo-alpha-pyrones.</p>

      <h2>The 45-Day Surya Tapi Method</h2>
      <p>At The Pahadi Sher, we follow the authentic <em>Surya Tapi</em> method described in ancient Ayurvedic texts. Raw rock extract is dissolved in pure mountain spring water, filtered through triple-layer cotton cloth, and left to dry naturally in large glass vats under direct Himalayan sunlight for 45 days.</p>

      <p>The gentle solar heat slowly evaporates water without exceeding 40°C, leaving behind a smooth, lustrous, gold-grade resin packed with 84+ ionic trace minerals.</p>
    `,
    author: 'Dr. Devendra Rawat',
    authorRole: 'Chief Ayurvedic Botanist',
    publishDate: '2026-09-02',
    readTime: '4 min read',
    category: 'Ayurvedic Wisdom',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
    seoTitle: 'Surya Tapi Shilajit Purification | Traditional Sun-Dried Resin',
    seoDescription: 'Discover why traditional 45-day Surya Tapi sun-drying produces superior Shilajit resin compared to high-heat boiling.'
  }
];
