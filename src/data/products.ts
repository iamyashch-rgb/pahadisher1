import { Product, InventoryStatus } from '@/types';

export function computeInventoryStatus(available: number, threshold: number = 5, isDiscontinued = false): InventoryStatus {
  if (isDiscontinued) return 'Discontinued';
  if (available <= 0) return 'Out of Stock';
  if (available <= threshold) return 'Low Stock';
  return 'In Stock';
}

const rawProducts: Product[] = [
  {
    "id": "prod-buransh-herbal-tea",
    "name": "Buransh Herbal Tea",
    "slug": "buransh-herbal-tea",
    "subtitle": "Organic Kumaon Buransh Herbal Tea (with Mulethi & Ginger Green Tea)",
    "category": "teas",
    "categoryName": "Herbal Tea",
    "price": 250,
    "originalPrice": 500,
    "discountPercent": 50,
    "rating": 4.7,
    "reviewsCount": 85,
    "altitude": "6,500 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "Standard Pack",
    "sku": "TPS-TEAS-1",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/HerbalGreenTea_2.png?v=1774514207",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Herbal_Green_Tea_3.png?v=1774514252",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Herbal_Green_Tea_1.png?v=1774514280",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Herbal_Green_Tea_4.png?v=1774514305"
    ],
    "badge": "SALE",
    "inStock": true,
    "stockQuantity": 30,
    "description": "Organic Kumaon Buransh Herbal Tea (with Mulethi & Ginger Green Tea)\n\nThe Heart of the Himalayas in a Cup.\n\nIndulge in the vibrant essence of Uttarakhand with Organic Kumaon Buransh Herbal Tea. This exquisite blend features the soul of the mountains—the Buransh (Rhododendron) flower—celebrated for its stunning color and legendary health benefits. Combined with the warmth of Ginger, the sweetness of Mulethi, and the antioxidants of Green Tea, this infusion is a holistic retreat for your senses.\n\nSourced from the high-altitude forests of Kumaon, every sip offers a refreshing floral note balanced by a spicy, earthy finish.\n\nKey Highlights:\n\nThe Buransh Advantage: Naturally rich in phytochemicals, Buransh is traditionally known to support heart health and reduce inflammation.\n\nImmunity Booster: The inclusion of Ginger and Mulethi provides a natural shield against seasonal coughs, colds, and digestive issues.\n\nDetox & Glow: High in antioxidants, this herbal tea helps in flushing out toxins and promoting healthy, radiant skin.\n\nAromatic & Caffeine-Balanced: A soothing blend that relaxes the mind without the heavy jitters of regular caffeine.\n\nEco-Friendly Packaging: Contains 25 individually sealed tea bag envelopes to ensure the mountain freshness and floral aroma stay intact.\n\nProduct Specifications:\n\nBrand: Organic Kumaon\n\nKey Ingredients: Buransh (Rhododendron) Petals, Mulethi (Licorice), Ginger, and Green Tea.\n\nQuantity: 25 Tea Bag Envelopes.\n\nFlavor Profile: Floral, slightly sweet, with a warm ginger kick.\n\nOrigin: Proudly packed in Pithoragarh, Uttarakhand.\n\nBrewing Instructions:\n\n🔹Place one tea bag in your favorite cup.\n\n🔹Add 100ml–150ml of freshly boiled water.\n\n🔹Let it steep for 3–4 minutes to allow the Buransh to release its natural pinkish hue and flavor.\n\n🔹Enjoy it plain, or add a drop of honey for extra sweetness.\n\nStorage Tip: Store in a cool, dry place. Keep the box closed to maintain the delicate floral aroma of the Rhododendron petals.",
    "benefits": [
      "Key Highlights:",
      "The Buransh Advantage: Naturally rich in phytochemicals, Buransh is traditionally known to support heart health and reduce inflammation.",
      "Immunity Booster: The inclusion of Ginger and Mulethi provides a natural shield against seasonal coughs, colds, and digestive issues.",
      "Detox & Glow: High in antioxidants, this herbal tea helps in flushing out toxins and promoting healthy, radiant skin."
    ],
    "ingredients": [
      "Buransh Herbal Tea",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Steep 1 bag or 1 tsp in 100ml hot water for 2-3 minutes. Enjoy hot or iced.",
    "featured": true
  },
  {
    "id": "prod-chamomile-flower-tea-loose-50-gm",
    "name": "Chamomile Flower Tea (Loose 50 gm)",
    "slug": "chamomile-flower-tea-loose-50-gm",
    "subtitle": "Organic Kumaon Chamomile Flower Tea (Whole Dried Buds)",
    "category": "teas",
    "categoryName": "Herbal Tea",
    "price": 250,
    "originalPrice": 500,
    "discountPercent": 50,
    "rating": 4.8,
    "reviewsCount": 92,
    "altitude": "6,500 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "Loose 50 gm",
    "sku": "TPS-TEAS-2",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Vibrantbutterflypeaflowersinterracotta.png?v=1774609129",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Dried_butterfly_pea_flowers_in_glass_jar.png?v=1774609156",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Dried_butterfly_pea_flowers_in_terracotta_bowl.png?v=1774609248",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/ChatGPT_Image_Mar_27_2026_03_58_17_PM.png?v=1774609267"
    ],
    "badge": "SALE",
    "inStock": true,
    "stockQuantity": 31,
    "description": "Organic Kumaon Chamomile Flower Tea (Whole Dried Buds)\nExperience the Essence of Himalayan Serenity in Every Sip.\n\nFind your moment of peace with the pure, natural tranquility of Organic Kumaon Chamomile Flower Tea. Sourced from the pristine, high-altitude meadows of Uttarakhand, this herbal infusion is crafted from 100% whole-dried Chamomile buds (Matricaria chamomilla), known for their gentle, apple-like fragrance and deeply soothing effects.\n\nEach golden bud is a powerhouse of calm, offering a caffeine-free escape that helps quiet the mind and prepare the body for restful sleep.\n\nKey Features:\n\nPremium Whole Buds: We use only intact, hand-picked flower heads—not crushed dust—to ensure the highest concentration of essential oils and flavor.\n\nThe Ultimate \"Nightcap\": Naturally caffeine-free and widely celebrated for its ability to reduce anxiety, promote deep sleep, and soothe the nervous system.\n\nPure & Organic: A 100% natural herbal tea, free from artificial fragrances, preservatives, or chemical additives.\n\nDigestive Harmony: Traditionally used to ease stomach discomfort, reduce bloating, and support overall digestive wellness.\n\nDelicate Flavor Profile: A light, golden liquor with a naturally sweet, floral taste that pairs beautifully with a touch of honey.\n\nProduct Specifications:\n\nBrand: Organic Kumaon\n\nQuantity: 50g (Premium Whole Dried Flowers)\n\nKey Ingredients: 100% Whole Dried Chamomile Flowers\n\nMRP: ₹350 (Incl. of all taxes)\n\nShelf Life: Best before 18 months from packaging.\n\nOrigin: Proudly packed in Pithoragarh, Uttarakhand.\n\nBrewing Instructions:\n\nPlace 1 teaspoon (approx. 5–7 flowers) in a cup.\n\nPour 150ml of freshly boiled water (90°C) over the flowers.\n\nInfuse for 4–5 minutes to release the full floral aroma.\n\nStrain and enjoy hot, or let it cool for a refreshing iced herbal tea. (Best enjoyed plain or with a light drizzle of honey).\n\nStorage Tip: Store in a cool, dry place in an airtight container. Keep away from direct sunlight and strong odors to maintain the delicate floral fragrance and medicinal properties.",
    "benefits": [
      "Key Features:",
      "Premium Whole Buds: We use only intact, hand-picked flower heads—not crushed dust—to ensure the highest concentration of essential oils and flavor.",
      "The Ultimate \"Nightcap\": Naturally caffeine-free and widely celebrated for its ability to reduce anxiety, promote deep sleep, and soothe the nervous system.",
      "Pure & Organic: A 100% natural herbal tea, free from artificial fragrances, preservatives, or chemical additives."
    ],
    "ingredients": [
      "Chamomile Flower Tea (Loose 50 gm)",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Steep 1 bag or 1 tsp in 100ml hot water for 2-3 minutes. Enjoy hot or iced.",
    "featured": true
  },
  {
    "id": "prod-pahadi-lehesun-achaar500g-aam-ka-achaar",
    "name": "Combo Pack Of -Pahadi Lehesun Achaar(500g) & Aam Ka Achaar(250g)",
    "slug": "pahadi-lehesun-achaar500g-aam-ka-achaar",
    "subtitle": "Pahadi Pickle Combo – Mango Pickle & Garlic Pickle",
    "category": "pickles",
    "categoryName": "Pahadi Pickles",
    "price": 550,
    "originalPrice": 625,
    "discountPercent": 12,
    "rating": 4.9,
    "reviewsCount": 99,
    "altitude": "6,500 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "500g",
    "sku": "TPS-PICKLES-3",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Garlic_and_Mango.png?v=1773684598",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/WhatsApp_Image_2026-03-16_at_3.50.56_PM.jpg?v=1773684184",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/WhatsApp_Image_2026-03-16_at_3.50.25_PM.jpg?v=1773683845"
    ],
    "inStock": true,
    "stockQuantity": 32,
    "description": "🥭🧄 Pahadi Pickle Combo – Mango Pickle & Garlic Pickle\nExperience the authentic taste of the Himalayas with our Pahadi Pickle Combo, featuring two traditional favorites: Pahadi Mango Pickle and Pahadi Garlic Pickle. Inspired by the rich culinary heritage of Uttarakhand, this combo brings together bold, rustic flavors made using time-honored mountain recipes.\n\nEach jar is handcrafted in small batches using fresh, carefully selected ingredients. The Pahadi Mango Pickle delivers a tangy and spicy burst of flavor from sun-cured raw mangoes, while the Pahadi Garlic Pickle offers a bold, aromatic taste made from fresh garlic cloves blended with traditional spices and mustard oil.\n\nTogether, this combo is perfect for anyone who loves authentic homemade pahadi achar that enhances everyday meals with rich, traditional flavor.\n\n🌿 Why You'll Love This Combo\n\nAuthentic Himalayan recipes from **Uttarakhand\n\nMade with fresh raw mangoes and mountain garlic\n\nHandcrafted in small batches for quality and taste\n\nPrepared with pure mustard oil and traditional spices\n\nNo artificial preservatives\n\n🍽 Perfect With\n\nParathas & rotis\n\nDal–chawal\n\nKhichdi\n\nHome-cooked meals\n\nSnacks and lunchboxes\n\n📦 What’s Inside\n\n250 g- Pahadi Mango Pickle (Tangy & spicy raw mango achar)\n\n500g- Pahadi Garlic Pickle (Bold & aromatic garlic achar)\n\n📦 Product Details\n\nIngredients: Raw mango, garlic, mustard oil, traditional spices, salt\n\nFlavor Profile: Tangy, spicy, bold, and aromatic\n\nStorage: Store in a cool, dry place. Always use a dry spoon.\n\nOrigin: Himalayan region of Uttarakhand\n\nEnjoy the true taste of the mountains with this flavorful Pahadi Pickle Combo — a perfect blend of tradition, natural ingredients, and authentic Himalayan taste in every jar. 🥭🧄🌿",
    "benefits": [
      "Experience the authentic taste of the Himalayas with our Pahadi Pickle Combo, featuring two traditional favorites: Pahadi Mango Pickle and Pahadi Garlic Pickle. Inspired by the rich culinary heritage of Uttarakhand, this combo brings together bold, rustic flavors made using time-honored mountain recipes.",
      "Ingredients: Raw mango, garlic, mustard oil, traditional spices, salt",
      "Flavor Profile: Tangy, spicy, bold, and aromatic",
      "Storage: Store in a cool, dry place. Always use a dry spoon."
    ],
    "ingredients": [
      "Combo Pack Of -Pahadi Lehesun Achaar(500g) & Aam Ka Achaar(250g)",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Consume directly or prepare as per dish instructions.",
    "featured": true
  },
  {
    "id": "prod-multi-grain-health-laddu",
    "name": "Multi-Grain Health Laddu (1000 gm)",
    "slug": "multi-grain-health-laddu",
    "subtitle": "Organic Kumaon Multi-Grain Healthy Laddu (Pahadi Energy Balls)",
    "category": "pahadi-foods",
    "categoryName": "Pahadi Foods",
    "price": 800,
    "originalPrice": 1000,
    "discountPercent": 20,
    "rating": 4.7,
    "reviewsCount": 106,
    "altitude": "6,500 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "1000 gm",
    "sku": "TPS-PAHADI-FOODS-4",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Laddu_1.png?v=1774515608",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Laddu_1.jpg?v=1774515671",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Laddu_2.jpg?v=1774515645"
    ],
    "badge": "SALE",
    "inStock": true,
    "stockQuantity": 33,
    "description": "Organic Kumaon Multi-Grain Healthy Laddu (Pahadi Energy Balls)\n\nA Perfect Blend of Heritage, Taste, and Wellness.\n\nRevitalize your energy levels with Organic Kumaon Multi-Grain Health Laddu. Handcrafted using age-old recipes from the Kumaon hills, these energy balls are more than just a sweet treat—they are a nutritional powerhouse.\n\nEach laddu is a balanced fusion of high-altitude mountain grains, crunchy nuts, and pure desi ghee, bringing the authentic flavors of Uttarakhand straight to your doorstep.\n\nKey Highlights:\n\n100% Natural Ingredients: Made with a wholesome mix of Himalayan grains (like Finger Millet/Madua), oats, and premium dry fruits.\n\nInstant Energy Boost: Packed with healthy fats and complex carbohydrates, these are perfect for kids, office goers, and fitness enthusiasts.\n\nNo Refined Sugar: Sweetened with traditional jaggery or natural sweeteners, making them a guilt-free indulgence.\n\nPure Desi Ghee: Prepared with high-quality ghee that aids digestion and provides essential nutrients for bone health.\n\nPreservative-Free: Just like home-made, we use zero artificial flavors, colors, or preservatives.\n\nProduct Details:\n\nBrand: Organic Kumaon\n\nProduct: Multi-Grain Health Laddoo\n\nMain Ingredients: Pure Ghee, Jaggery/Bura, Himalayan Grains, and Finely Chopped Dry Fruits.\n\nIdeal For: A quick breakfast supplement, a healthy lunchbox snack, or a post-workout recovery bite.\n\nOrigin: Pithoragarh, Uttarakhand.\n\nHow to Enjoy:\n\nPair one laddu with a glass of warm milk in the morning for a sustained energy release throughout the day, or enjoy it as a wholesome evening snack to beat those sugar cravings naturally.\n\nStorage Tip: To maintain the original aroma and texture, store in an airtight container in a cool, dry place.",
    "benefits": [
      "Key Highlights:",
      "100% Natural Ingredients: Made with a wholesome mix of Himalayan grains (like Finger Millet/Madua), oats, and premium dry fruits.",
      "Instant Energy Boost: Packed with healthy fats and complex carbohydrates, these are perfect for kids, office goers, and fitness enthusiasts.",
      "No Refined Sugar: Sweetened with traditional jaggery or natural sweeteners, making them a guilt-free indulgence."
    ],
    "ingredients": [
      "Multi-Grain Health Laddu (1000 gm)",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Consume directly or prepare as per dish instructions.",
    "featured": true
  },
  {
    "id": "prod-organic-kumaon-pahadi-cultured-kala-bhatt-dal-1000g",
    "name": "Organic Kumaon Pahadi Cultured Kala Bhatt Dal (1000g)",
    "slug": "organic-kumaon-pahadi-cultured-kala-bhatt-dal-1000g",
    "subtitle": "Discover the authentic taste of the Himalayas with Pahadi Cultured Kala Bhatt Dal, a tradi",
    "category": "pahadi-foods",
    "categoryName": "Pahadi Foods",
    "price": 150,
    "originalPrice": 220,
    "discountPercent": 32,
    "rating": 4.8,
    "reviewsCount": 113,
    "altitude": "6,500 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "1000g",
    "sku": "TPS-PAHADI-FOODS-5",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/KalaBhattDal_Front.png?v=1774771039",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/3.png?v=1774771058",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/4.png?v=1774771073"
    ],
    "badge": "SALE",
    "inStock": false,
    "stockQuantity": 34,
    "description": "Discover the authentic taste of the Himalayas with Pahadi Cultured Kala Bhatt Dal, a traditional black soybean variety cherished in Uttarakhand. Known for its rich flavor, creamy texture, and exceptional nutrition, this rare dal brings the essence of Pahadi cuisine straight to your kitchen.\n\nWhy You’ll Love It\n\n100% Organic & Natural\n Grown in the clean, chemical-free environment of the Kumaon hills.\n\nAuthentic Himalayan Superfood\n A staple in traditional Pahadi dishes, sourced directly from local farmers.\n\nProtein-Rich & Nutrient Dense\n Packed with plant-based protein, iron, and essential nutrients for a balanced diet.\n\nHigh in Fiber\n Supports digestion and helps maintain overall gut health.\n\nUnpolished & Whole\n Preserves natural flavor, texture, and nutritional value.\n\n Perfect For\n\nClassic dishes like Bhatt ki Churkani\n\nRich dals and gravies\n\nHealthy, protein-packed meals\n\nTraditional Uttarakhand recipes\n\nProduct Details\n\nProduct Name: Pahadi Cultured Kala Bhatt Dal\n\nBrand: Organic Kumaon\n\nNet Weight: 1000g\n\nDiet Type: Vegetarian\n\nPackaging: Eco-friendly kraft pouch\n\nSource: Organic farms of Pithoragarh (Uttarakhand), India\n\nFrom the Hills to Your Home\nKala Bhatt Dal is a true Himalayan treasure, offering a perfect blend of taste and nutrition. Carefully cultivated in Uttarakhand’s mountain farms, it brings authenticity, health, and tradition to every meal.\n\n🔹Add this nutrient-rich Himalayan dal to your pantry and enjoy the taste of tradition in every bite!",
    "benefits": [
      "Product Name: Pahadi Cultured Kala Bhatt Dal",
      "Brand: Organic Kumaon",
      "Net Weight: 1000g",
      "Diet Type: Vegetarian"
    ],
    "ingredients": [
      "Organic Kumaon Pahadi Cultured Kala Bhatt Dal (1000g)",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Consume directly or prepare as per dish instructions.",
    "featured": true
  },
  {
    "id": "prod-organic-kumaon-pahadi-cultured-laal-gahat-dal-500g",
    "name": "Organic Kumaon Pahadi Cultured Laal Gahat Dal (500g)",
    "slug": "organic-kumaon-pahadi-cultured-laal-gahat-dal-500g",
    "subtitle": "Bring home the authentic taste of the hills with Pahadi Cultured Laal Gahat Dal, sourced d",
    "category": "pahadi-foods",
    "categoryName": "Pahadi Foods",
    "price": 150,
    "originalPrice": 220,
    "discountPercent": 32,
    "rating": 4.9,
    "reviewsCount": 120,
    "altitude": "6,500 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "500g",
    "sku": "TPS-PAHADI-FOODS-6",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/OrganicKumaonPahadiCulturedLalgahatdalpouch.png?v=1774767142",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/1.png?v=1774767292",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/2.png?v=1774767309",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Lal_Gahat_Dal_Back.png?v=1774767329"
    ],
    "badge": "SALE",
    "inStock": false,
    "stockQuantity": 35,
    "description": "Bring home the authentic taste of the hills with Pahadi Cultured Laal Gahat Dal, sourced directly from the organic farms of Pithoragarh. Known for its earthy flavor and rich nutrition, this traditional Himalayan lentil is a staple in Pahadi households.\n\n Why You’ll Love It\n\n100% Organic & Natural\n Grown in the pristine hills of Kumaon without harmful chemicals or pesticides.\n\nAuthentic Pahadi Produce\n Sourced directly from local farmers, preserving traditional farming practices.\n\nRich in Protein & Fiber\n A wholesome addition to your daily diet that supports digestion and overall health.\n\nUnique Earthy Taste\n Distinct flavor that enhances traditional dishes like Gahat ki Dal, soups, and curries.\n\nUnpolished & Pure\n Retains its natural nutrients, color, and taste—just the way nature intended.\n\n Perfect For\n\nTraditional Pahadi recipes\n\nHealthy everyday meals\n\nSoups, dals, and curries\n\nProtein-rich vegetarian diets\n\n Product Details\n\nProduct Name: Pahadi Cultured Laal Gahat Dal\n\nBrand: Organic Kumaon\n\nNet Weight: 500g\n\nDiet Type: Vegetarian\n\nPackaging: Eco-friendly kraft pouch\n\nSource: Organic farms of Pithoragarh (Uttarakhand), India\n\nFrom the Hills to Your Plate\nCarefully cultivated in the Himalayan region, this Laal Gahat Dal carries the richness of nature and tradition in every grain. Whether you're looking for nutrition or authentic taste, this dal brings both to your kitchen.\n\n🔹Add this superfood from the mountains to your pantry today and experience the true flavor of Uttarakhand!",
    "benefits": [
      "Product Name: Pahadi Cultured Laal Gahat Dal",
      "Brand: Organic Kumaon",
      "Net Weight: 500g",
      "Diet Type: Vegetarian"
    ],
    "ingredients": [
      "Organic Kumaon Pahadi Cultured Laal Gahat Dal (500g)",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Consume directly or prepare as per dish instructions.",
    "featured": true
  },
  {
    "id": "prod-organic-kumaon-pahadi-cultured-safed-bhatt-dal-1000g",
    "name": "Organic Kumaon Pahadi Cultured Safed Bhatt Dal (1000g)",
    "slug": "organic-kumaon-pahadi-cultured-safed-bhatt-dal-1000g",
    "subtitle": "Experience the rich tradition of the Himalayas with Pahadi Cultured Safed Bhatt Dal, a rar",
    "category": "pahadi-foods",
    "categoryName": "Pahadi Foods",
    "price": 150,
    "originalPrice": 220,
    "discountPercent": 32,
    "rating": 4.7,
    "reviewsCount": 127,
    "altitude": "6,500 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "1000g",
    "sku": "TPS-PAHADI-FOODS-7",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/SafedBhattDal_Front.png?v=1774769194",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/5.png?v=1774769235",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/6.png?v=1774769252",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Safed_Bhatt_Dal_Back.png?v=1774769281"
    ],
    "badge": "SALE",
    "inStock": true,
    "stockQuantity": 36,
    "description": "Experience the rich tradition of the Himalayas with Pahadi Cultured Safed Bhatt Dal, a rare and nutritious white soybean variety grown in the pristine valleys of Pithoragarh. Known for its unique taste and high protein content, this dal is a treasured ingredient in authentic Pahadi cuisine.\n\nWhy You’ll Love It\n\n100% Organic & Natural\n Cultivated without chemicals, ensuring purity and natural goodness in every grain.\n\nAuthentic Pahadi Specialty\n Sourced directly from the farms of Kumaon, preserving traditional Himalayan flavors.\n\nHigh in Protein\n A powerhouse of plant-based protein, perfect for a healthy vegetarian diet.\n\nRich in Fiber & Nutrients\n Supports digestion and keeps you feeling full and energized.\n\nUnpolished & Whole\n Retains its natural texture, flavor, and nutritional value.\n\nPerfect For\n\nTraditional dishes like Bhatt ki Churkani\n\nNutritious dals and gravies\n\nHealthy everyday meals\n\nProtein-rich diets\n\nProduct Details\n\nProduct Name: Pahadi Cultured Safed Bhatt Dal\n\nBrand: Organic Kumaon\n\nNet Weight: 1000g\n\nDiet Type: Vegetarian\n\nPackaging: Eco-friendly kraft pouch\n\nSource: Organic farms of Pithoragarh (Uttarakhand), India\n\n A Taste of Himalayan Tradition\nSafed Bhatt Dal is more than just a pulse—it’s a part of Uttarakhand’s culinary heritage. Carefully grown and harvested, it delivers both nutrition and authentic flavor straight from the mountains to your kitchen.\n\n🔹Add this rare Himalayan superfood to your pantry and enjoy wholesome, traditional goodness every day!",
    "benefits": [
      "Product Name: Pahadi Cultured Safed Bhatt Dal",
      "Brand: Organic Kumaon",
      "Net Weight: 1000g",
      "Diet Type: Vegetarian"
    ],
    "ingredients": [
      "Organic Kumaon Pahadi Cultured Safed Bhatt Dal (1000g)",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Consume directly or prepare as per dish instructions.",
    "featured": false
  },
  {
    "id": "prod-pahadi-aam-ka-achaar-500-gm",
    "name": "Pahadi Aam Ka Achaar (500 gm)",
    "slug": "pahadi-aam-ka-achaar-500-gm",
    "subtitle": "Pahadi Aam Ka Achaar – Authentic Himalayan Mango Pickle",
    "category": "pickles",
    "categoryName": "Pahadi Pickles",
    "price": 300,
    "originalPrice": 450,
    "discountPercent": 33,
    "rating": 4.8,
    "reviewsCount": 134,
    "altitude": "6,500 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "500 gm",
    "sku": "TPS-PICKLES-8",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/PremiumAchar.png?v=1773683698",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/WhatsApp_Image_2026-03-16_at_3.50.25_PM.jpg?v=1773683845",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/WhatsApp_Image_2026-03-16_at_3.50.20_PM.jpg?v=1773683845"
    ],
    "badge": "SALE",
    "inStock": true,
    "stockQuantity": 37,
    "description": "🌿 Pahadi Aam Ka Achaar – Authentic Himalayan Mango Pickle\nExperience the true taste of the mountains with our Pahadi Aam Ka Achaar, a traditional mango pickle crafted using time-honored recipes from the Himalayan region. Made with carefully selected raw mangoes, aromatic spices, and pure mustard oil, this pickle delivers a bold, tangy flavor that instantly elevates any meal.\n\nEach batch is prepared in small quantities to preserve the authentic homemade taste. The raw mangoes are hand-cut and slowly matured with a rich blend of spices, allowing the flavors to develop naturally—just like it has been done in Pahadi homes for generations.\n\n🥭 Why You'll Love It\n✔ Authentic Pahadi Recipe – Inspired by traditional Himalayan household methods✔ Premium Raw Mangoes – Carefully selected for perfect tang and texture✔ Rich Spice Blend – Mustard seeds, fennel, fenugreek, and traditional masalas✔ Cold-Pressed Mustard Oil – Enhances flavor and natural preservation✔ No Artificial Preservatives – Pure, clean, and homemade goodness\n\n🍽 Perfect With\n\nHot parathas\n\nSimple dal–chawal\n\nthepla or roti\n\nEveryday home-cooked meals\n\nJust a small spoonful adds a burst of spicy, tangy flavor to your plate.\n\n📦 Product Details\n\nType: Traditional Mango Pickle\n\nStyle: Himalayan / Pahadi Recipe\n\nIngredients: Raw Mango, Mustard Oil, Mustard Seeds, Fenugreek, Fennel, Turmeric, Red Chilli, Salt & Traditional Spices\n\nShelf Life: Long-lasting when stored in a cool, dry place\n\nStorage: Keep the jar tightly closed and always use a dry spoon\n\n❤️ A Taste of Tradition\nOur Pahadi Aam Ka Achaar is more than just a pickle—it’s a piece of mountain heritage, bringing the bold flavors of Himalayan kitchens straight to your table.",
    "benefits": [
      "Type: Traditional Mango Pickle",
      "Style: Himalayan / Pahadi Recipe",
      "Ingredients: Raw Mango, Mustard Oil, Mustard Seeds, Fenugreek, Fennel, Turmeric, Red Chilli, Salt & Traditional Spices",
      "Shelf Life: Long-lasting when stored in a cool, dry place"
    ],
    "ingredients": [
      "Pahadi Aam Ka Achaar (500 gm)",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Consume directly or prepare as per dish instructions.",
    "featured": false
  },
  {
    "id": "prod-pahadi-karele-ka-achaar1000-gm",
    "name": "Pahadi Karele Ka Achaar(1000 gm)",
    "slug": "pahadi-karele-ka-achaar1000-gm",
    "subtitle": "Pahadi Karele ka Achaar – Authentic Himalayan Bitter Gourd Pickle",
    "category": "pickles",
    "categoryName": "Pahadi Pickles",
    "price": 600,
    "originalPrice": 800,
    "discountPercent": 25,
    "rating": 4.9,
    "reviewsCount": 141,
    "altitude": "6,500 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "1000 gm",
    "sku": "TPS-PICKLES-9",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/karela.png?v=1773815588",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/KK.jpg?v=1773815587",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Karela_P.png?v=1773815655"
    ],
    "badge": "SALE",
    "inStock": true,
    "stockQuantity": 38,
    "description": "Pahadi Karele ka Achaar – Authentic Himalayan Bitter Gourd Pickle\nBring home the bold and authentic flavors of the hills with our Pahadi Karele ka Achaar, a traditional Himalayan pickle crafted using fresh, handpicked bitter gourds (karela). Prepared with a time-honored recipe, this achar is blended with premium spices and preserved in pure mustard oil to deliver a rich, tangy, and slightly bitter taste that perfectly complements Indian meals.\n\nCarefully made in small batches, this pickle retains its natural nutrients and offers digestive benefits, making it not just flavorful but also wholesome. Its unique taste profile makes it an ideal side for parathas, dal-chawal, and everyday meals.\n\nKey Features:\n\n✅ Made from fresh, high-quality pahadi karela\n\n✅ Authentic Himalayan recipe\n\n✅ Rich in traditional spices & mustard oil\n\n✅ No artificial preservatives or colors\n\n✅ Handcrafted in small batches for superior quality\n\nTaste Profile:\nA perfect balance of bold bitterness, tanginess, and mild spice, delivering a truly distinctive and addictive flavor.\n\nBest Served With:\nParathas, roti, dal-rice, curd rice, and snacks.\n\nStorage Instructions:\nStore in a cool, dry place. Always use a dry spoon to maintain freshness.\n\nWhy Choose Us?\nWe bring you the essence of traditional pahadi kitchens with a focus on purity, authenticity, and homemade taste in every jar.",
    "benefits": [
      "Key Features:",
      "Taste Profile:",
      "Best Served With:",
      "Storage Instructions:"
    ],
    "ingredients": [
      "Pahadi Karele Ka Achaar(1000 gm)",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Consume directly or prepare as per dish instructions.",
    "featured": false
  },
  {
    "id": "prod-pahadi-lehesun-achaar",
    "name": "Pahadi Lehesun Ka Achaar(500 g)",
    "slug": "pahadi-lehesun-achaar",
    "subtitle": "Pahadi Garlic Pickle – Authentic Himalayan Flavor",
    "category": "pickles",
    "categoryName": "Pahadi Pickles",
    "price": 350,
    "originalPrice": 450.45,
    "discountPercent": 22,
    "rating": 4.7,
    "reviewsCount": 148,
    "altitude": "6,500 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "500 g",
    "sku": "TPS-PICKLES-10",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Garlik_Premium.png?v=1773684184",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/WhatsApp_Image_2026-03-16_at_3.50.37_PM_1.jpg?v=1773684184",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/WhatsApp_Image_2026-03-16_at_3.50.37_PM.jpg?v=1773684184",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/WhatsApp_Image_2026-03-16_at_3.50.56_PM.jpg?v=1773684184",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Real_Garlic_Pickle.png?v=1773686233"
    ],
    "badge": "SALE",
    "inStock": false,
    "stockQuantity": 39,
    "description": "🧄 Pahadi Garlic Pickle – Authentic Himalayan Flavor\nExperience the bold, rustic taste of the Himalayas with our Pahadi Garlic Pickle, handcrafted using traditional mountain recipes and fresh, locally sourced garlic. Made in small batches, this pickle brings the rich culinary heritage of Uttarakhand straight to your table.\n\nOur garlic cloves are carefully sun-cured and blended with aromatic spices, mustard oil, and time-honored techniques that enhance the natural pungent flavor of garlic while delivering a perfectly balanced tangy and spicy kick.\n\nWhether paired with dal-rice, parathas, or simple home-cooked meals, this pickle instantly elevates every bite with its authentic pahadi taste.\n\n🌿 Why You'll Love It\n\nAuthentic Himalayan recipe\n\nMade with fresh mountain garlic\n\nHandcrafted in small batches\n\nRich in natural flavors and aroma\n\nNo artificial preservatives\n\n🍽 Perfect With\n\nParathas & rotis\n\nDal–chawal\n\nKhichdi\n\nSnacks & traditional meals\n\n📦 Product Details\n\nIngredients: Fresh garlic, mustard oil, traditional spices, salt, natural preservatives\n\nFlavor Profile: Spicy, tangy, and bold\n\nStorage: Store in a cool, dry place. Use a dry spoon.\n\nBring home the true taste of the mountains with our handcrafted Pahadi Garlic Pickle — a jar full of tradition, flavor, and warmth.",
    "benefits": [
      "Ingredients: Fresh garlic, mustard oil, traditional spices, salt, natural preservatives",
      "Flavor Profile: Spicy, tangy, and bold",
      "Storage: Store in a cool, dry place. Use a dry spoon."
    ],
    "ingredients": [
      "Pahadi Lehesun Ka Achaar(500 g)",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Consume directly or prepare as per dish instructions.",
    "featured": false
  },
  {
    "id": "prod-pahadi-sher-shilajit-and-rosemary-green-tea-combo-10-gm-50-gm",
    "name": "Pahadi Sher  Shilajit and Rosemary Green Tea Combo  (10 gm + 50 gm)",
    "slug": "pahadi-sher-shilajit-and-rosemary-green-tea-combo-10-gm-50-gm",
    "subtitle": "Pahadi Sher  Shilajit and Rosemary Green Tea Combo  (10 gm + 50 gm)",
    "category": "combos",
    "categoryName": "Combos",
    "price": 1350,
    "originalPrice": 1550,
    "discountPercent": 13,
    "rating": 4.8,
    "reviewsCount": 155,
    "altitude": "6,500 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "10 gm + 50 gm",
    "sku": "TPS-COMBOS-11",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Silajit_Rosemary1.png?v=1774862319"
    ],
    "badge": "BESTSELLER",
    "inStock": true,
    "stockQuantity": 40,
    "description": "Pahadi Sher  Shilajit and Rosemary Green Tea Combo  (10 gm + 50 gm)\nDiscover the perfect fusion of strength and mental clarity with the Pahadi Sher Wellness Combo, a powerful pairing of authentic Himalayan Shilajit and refreshing Rosemary Green Tea. Sourced from the pristine mountains of Pithoragarh in the beautiful region of Kumaon, this combo is designed to energize your body while sharpening your mind—naturally.\n\nWhat’s Inside the Combo?\n1. Pahadi Sher Organic Shilajit Resin\nA rare, mineral-rich Himalayan resin packed with Fulvic Acid, Humic Acid, and 80+ trace minerals. Traditionally purified using Ayurvedic techniques, Shilajit supports stamina, strength, immunity, and overall vitality. Known in Ayurveda as a powerful Rasayana, it helps combat weakness and boost natural energy.\n\n2. Organic Kumaon Rosemary Green Tea (with Lemongrass & Mulethi)\nA refreshing herbal infusion crafted with Rosemary, Green Tea, Lemongrass, and Mulethi. This unique blend enhances mental clarity, improves focus, supports digestion, and provides antioxidant-rich detox benefits—all in a soothing cup.\n\nWhy Choose This Combo?\n✔ Energy + Brain Boost – Shilajit enhances physical strength, while Rosemary improves focus and alertness.\n ✔ Mental Clarity & Productivity – Ideal for students, professionals, and active lifestyles.\n ✔ Immunity & Digestive Support – Helps strengthen natural defenses and improve gut health.\n ✔ Stress Relief & Detox – Promotes relaxation while flushing out toxins naturally.\n ✔ 100% Pure & Natural – Free from chemicals, additives, or artificial flavors.\n\nThe Power of Himalayan Wellness\nRooted in ancient Ayurvedic wisdom and Himalayan purity, this combo brings together the best of nature. Shilajit revitalizes your body at a cellular level, while Rosemary Green Tea refreshes your mind with every sip.\n\nTogether, they create a balanced daily routine—boost your energy, sharpen your focus, and restore your natural vitality.\n\nHow to Use\n\nMorning: Take a small portion of Shilajit with lukewarm water or milk for sustained energy.\n\nDaytime/Evening: Enjoy 1–3 cups of Rosemary Green Tea for mental clarity and relaxation.\n\nPerfect For\n\nStudents & working professionals\n\nMental clarity & focus\n\nDaily energy & stamina\n\nStress management\n\nDetox & digestion support\n\nPahadi Sher Wellness Combo – Strength for the Body, Clarity for the Mind\nElevate your daily routine with this powerful Himalayan duo—crafted for those who seek performance, balance, and natural wellness.",
    "benefits": [
      "Morning: Take a small portion of Shilajit with lukewarm water or milk for sustained energy.",
      "Daytime/Evening: Enjoy 1–3 cups of Rosemary Green Tea for mental clarity and relaxation."
    ],
    "ingredients": [
      "Pahadi Sher  Shilajit and Rosemary Green Tea Combo  (10 gm + 50 gm)",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Steep 1 bag or 1 tsp in 100ml hot water for 2-3 minutes. Enjoy hot or iced.",
    "featured": false
  },
  {
    "id": "prod-pahadi-sher-shilajit-and-tulsi-green-tea-combo-10-gm-50-gm",
    "name": "Pahadi Sher  Shilajit and Tulsi Green Tea Combo  (10 gm + 50 gm)",
    "slug": "pahadi-sher-shilajit-and-tulsi-green-tea-combo-10-gm-50-gm",
    "subtitle": "Pahadi Sher Shilajit (10gm) and Pahadi Sher Organic Tulsi Green Tea (50 gm)",
    "category": "combos",
    "categoryName": "Combos",
    "price": 1350,
    "originalPrice": 1550,
    "discountPercent": 13,
    "rating": 4.9,
    "reviewsCount": 162,
    "altitude": "6,500 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "10 gm + 50 gm",
    "sku": "TPS-COMBOS-12",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Silajit10g_Tulsi1_aaef5595-45c5-44a0-b98a-34bfa743ca91.png?v=1774862049"
    ],
    "badge": "BESTSELLER",
    "inStock": true,
    "stockQuantity": 41,
    "description": "Pahadi Sher Shilajit (10gm) and Pahadi Sher Organic Tulsi Green Tea (50 gm)\nHarness the true essence of Himalayan wellness with the Pahadi Sher Wellness Combo, a powerful combination of authentic Shilajit resin and refreshing Tulsi Green Tea. Sourced from the untouched mountains of Pithoragarh in the serene region of Kumaon, this combo is designed to energize your body and calm your mind—naturally.\n\nWhat’s Inside the Combo?\n1. Pahadi Sher Organic Shilajit \nA rare Himalayan mineral resin, rich in Fulvic Acid, Humic Acid, and 80+ trace minerals. Traditionally purified using Ayurvedic methods, Shilajit is known as the “destroyer of weakness,” helping boost stamina, strength, immunity, and overall vitality.\n\n2. Tulsi Green Tea (with Lemongrass & Mulethi)\nA soothing herbal infusion crafted with Tulsi (Holy Basil), Lemongrass, Mulethi, and Green Tea. This refreshing blend supports immunity, reduces stress, aids digestion, and delivers a calming yet revitalizing experience in every cup.\n\nWhy Choose This Combo?\n✔ Energy + Relaxation Balance – Shilajit fuels your body, while Tulsi tea relaxes your mind.\n✔ Natural Immunity Boost – Both products work together to strengthen your body’s defenses.\n✔ Stress Relief & Mental Clarity – Tulsi calms the mind while Shilajit enhances focus.\n ✔ Improved Digestion & Detox – Supports gut health and natural detoxification.\n ✔ 100% Pure & Chemical-Free – No additives, no fillers—just authentic Himalayan goodness.\n\nThe Power of Ayurveda & Himalayas\nThis combo blends ancient Ayurvedic wisdom with the purity of the Himalayas. Shilajit acts as a powerful Rasayana (rejuvenator), while Tulsi—known as the “Queen of Herbs”—promotes balance, healing, and inner calm.\n\nTogether, they create a complete daily wellness ritual—boost your energy in the morning and unwind naturally throughout the day.\n\nHow to Use\n\nMorning: Take a small portion of Shilajit with lukewarm water or milk for sustained energy.\n\nAnytime: Enjoy a cup of Tulsi Green Tea to relax, refresh, and detox your body.\n\nPerfect For\n\nDaily energy & stamina\n\nStress relief & relaxation\n\nImmunity boosting\n\nDigestive health\n\nHolistic lifestyle lovers\n\nPahadi Sher Wellness Combo – Strength Meets Calm\nBring home the power of the Himalayas and elevate your lifestyle with this perfect blend of strength, purity, and serenity.",
    "benefits": [
      "Morning: Take a small portion of Shilajit with lukewarm water or milk for sustained energy.",
      "Anytime: Enjoy a cup of Tulsi Green Tea to relax, refresh, and detox your body."
    ],
    "ingredients": [
      "Pahadi Sher  Shilajit and Tulsi Green Tea Combo  (10 gm + 50 gm)",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Steep 1 bag or 1 tsp in 100ml hot water for 2-3 minutes. Enjoy hot or iced.",
    "featured": false
  },
  {
    "id": "prod-pahadi-sher-herbal-tea",
    "name": "Pahadi Sher Herbal Tea",
    "slug": "pahadi-sher-herbal-tea",
    "subtitle": "Pahadi Sher Herbal Tea – Buransh, Mulethi, Ginger & Green Tea",
    "category": "teas",
    "categoryName": "Herbal Tea",
    "price": 250,
    "originalPrice": 500,
    "discountPercent": 50,
    "rating": 4.7,
    "reviewsCount": 169,
    "altitude": "6,500 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "Standard Pack",
    "sku": "TPS-TEAS-13",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/herbaltea.jpg?v=1766722058",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/herbaltea_2.jpg?v=1766722059",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/herbaltea_3.jpg?v=1766722058"
    ],
    "badge": "SALE",
    "inStock": true,
    "stockQuantity": 42,
    "description": "Pahadi Sher Herbal Tea – Buransh, Mulethi, Ginger & Green Tea\nPahadi Sher Herbal Tea with Buransh, Mulethi, Ginger & Green Tea ek premium Himalayan wellness tea hai, jo pahadon ke shuddh phoolon aur jadibootiyon se tayaar ki gayi hai. Is special herbal blend mein Buransh (Rhododendron) flower, high-quality green tea, ayurvedic mulethi aur natural ginger ka balanced combination hai, jo taste ke saath-saath health ko bhi support karta hai.\n\nBuransh flower apne antioxidant aur heart-friendly properties ke liye jaana jaata hai, jo body ko detox karne aur freshness dene mein madad karta hai. Green tea metabolism aur natural detox ko support karti hai, jabki ginger digestion ko improve karta hai aur immunity ko boost karta hai. Mulethi gale ke liye soothing hoti hai aur respiratory health ko support karti hai.\n\nYeh herbal tea bilkul 100% natural, chemical-free, preservative-free aur artificial flavour-free hai. Iska taste mild, floral aur halka sa spicy hota hai, jo subah energy boost ke liye ya shaam ko relaxation ke liye perfect hai. Regular use se yeh tea digestion, immunity, stress relief aur overall wellness ko naturally support karti hai.\n\nApni daily lifestyle mein pahadon ki shuddhta aur ayurveda ki taqat shamil karein Pahadi Sher Herbal Tea – Buransh, Mulethi, Ginger & Green Tea ke saath.",
    "benefits": [
      "100% Pure, Organic & Authentically Harvested in Uttarakhand",
      "Packed with natural minerals, antioxidants, and essential nutrients",
      "Sourced directly from local high-altitude Kumaon farmers",
      "Free from artificial preservatives, additives, or synthetic colors"
    ],
    "ingredients": [
      "Pahadi Sher Herbal Tea",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Steep 1 bag or 1 tsp in 100ml hot water for 2-3 minutes. Enjoy hot or iced.",
    "featured": false
  },
  {
    "id": "prod-nettle-green-tea",
    "name": "Pahadi Sher Nettle Green Tea",
    "slug": "nettle-green-tea",
    "subtitle": "Pahadi Sher Nettle Green Tea with Lemongrass & Mulethi",
    "category": "teas",
    "categoryName": "Herbal Tea",
    "price": 250,
    "originalPrice": 500,
    "discountPercent": 50,
    "rating": 4.8,
    "reviewsCount": 176,
    "altitude": "6,500 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "Standard Pack",
    "sku": "TPS-TEAS-14",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/nettletea.jpg?v=1766721765",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/nettletea_2.jpg?v=1766721765",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/nettletea_3.jpg?v=1766721765"
    ],
    "badge": "SALE",
    "inStock": true,
    "stockQuantity": 43,
    "description": "Pahadi Sher Nettle Green Tea with Lemongrass & Mulethi\nPahadi Sher Nettle Green Tea with Lemongrass & Mulethi ek shuddh Himalayan herbal green tea hai, jo health aur wellness ko naturally support karne ke liye banayi gayi hai. Is premium tea blend mein nutrient-rich nettle leaves, high-quality green tea, fresh lemongrass aur ayurvedic mulethi (licorice root) ka balanced combination hai.\n\nNettle (Bichhu Booti) minerals, antioxidants aur iron se bharpoor hoti hai, jo blood purification, metabolism aur immunity ko majboot banane mein madad karti hai. Green tea natural detox aur fat metabolism ko support karti hai, jabki lemongrass body ko cleanse karke refreshing aroma aur taste deta hai. Mulethi digestion ko improve karti hai aur gale ko soothing effect deti hai.\n\nYeh herbal green tea bilkul 100% natural, chemical-free, artificial flavour-free aur preservative-free hai. Daily consumption se yeh tea bloating kam karne, energy badhane aur overall wellness ko support karti hai. Iska mild, refreshing taste bina kisi bitterness ke aata hai, jo ise subah ya shaam peene ke liye perfect banata hai.\n\nApni daily health routine ko aur powerful banayein Pahadi Sher Nettle Green Tea with Lemongrass & Mulethi ke saath – pahadon ki shuddhta aur ayurveda ki wisdom ke saath.",
    "benefits": [
      "100% Pure, Organic & Authentically Harvested in Uttarakhand",
      "Packed with natural minerals, antioxidants, and essential nutrients",
      "Sourced directly from local high-altitude Kumaon farmers",
      "Free from artificial preservatives, additives, or synthetic colors"
    ],
    "ingredients": [
      "Pahadi Sher Nettle Green Tea",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Steep 1 bag or 1 tsp in 100ml hot water for 2-3 minutes. Enjoy hot or iced.",
    "featured": false
  },
  {
    "id": "prod-pahadiorganichoney",
    "name": "Pahadi Sher Organic Honey (100 gm)",
    "slug": "pahadiorganichoney",
    "subtitle": "Pahadi Sher Organic Honey – Pure Himalayan Organic Honey from Pithoragarh",
    "category": "honey",
    "categoryName": "Honey",
    "price": 250,
    "originalPrice": 800,
    "discountPercent": 69,
    "rating": 4.9,
    "reviewsCount": 183,
    "altitude": "6,500 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "100 gm",
    "sku": "TPS-HONEY-15",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Shehed_Edit.png?v=1773819408"
    ],
    "badge": "SALE",
    "inStock": true,
    "stockQuantity": 44,
    "description": "Pahadi Sher Organic Honey – Pure Himalayan Organic Honey from Pithoragarh\nPahadi Sher Organic Honey is a premium-quality natural pahadi honey harvested from the untouched Himalayan forests of Uttarakhand. This organic honey from Pithoragarh is collected from free-roaming mountain bees that feed on wild Himalayan flowers, herbs, and forest flora. Every drop carries the purity, richness, and healing essence of the mountains, offering honey exactly as nature intended — raw, unprocessed, and full of life.\n\nSourced from the high-altitude forests of Chandak, Pithoragarh, this pure Himalayan organic honey reflects the biodiversity of the Kumaun region. The clean mountain air, rich vegetation, and mineral-dense environment make this region ideal for producing truly authentic and nutrient-rich honey.\n\nPure Himalayan Organic Honey Chandak Pithoragarh – Truly Raw & Natural\nOur Pure Himalayan Organic Honey Chandak Pithoragarh is never heated, refined, or chemically processed. Unlike commercial honey that loses its nutritional value due to excessive heating and filtering, Pahadi Sher Organic Honey is gently extracted and minimally strained to preserve:\n\nNatural enzymes\n\nAntioxidants\n\nBee pollen\n\nVitamins & minerals\n\nAntibacterial properties\n\nThis careful process ensures that the honey maintains its authentic aroma, thick golden texture, and rich flavor — the true mark of natural pahadi honey.\n\nWhy Organic Honey from Pithoragarh is Special\nThe Himalayan region of Pithoragarh is known for its clean environment, medicinal plants, and dense forest cover. Bees in this region collect nectar from a wide variety of wild herbs and flowers, making organic honey from Kumaun exceptionally nutritious and therapeutic.\n\nOrganic Honey Pithoragarh stands apart because:\n\nIt comes from pollution-free Himalayan forests\n\nBees forage naturally without human interference\n\nNo artificial feeding or sugar syrup is used\n\nThe honey matures naturally inside the hive\n\nThis results in pure Himalayan organic honey that is rich in taste, aroma, and health-supporting compounds.\n\nKey Features of Pahadi Sher Organic Honey\n✔ 100% Pure Himalayan Organic Honey✔ Sourced from Chandak, Pithoragarh forests✔ Raw, unprocessed & unfiltered✔ Rich in natural enzymes, antioxidants & minerals✔ No chemicals, no added sugar, no preservatives✔ Authentic golden color & natural floral taste✔ Ethically harvested from Himalayan forest bee hives✔ Genuine organic honey from Kumaun\n\nHealth Benefits of Natural Pahadi Honey\n1. Boosts Immunity Naturally\nNatural pahadi honey contains antioxidants and antibacterial compounds that help strengthen the immune system and protect the body from seasonal infections.\n\n2. Supports Digestion & Gut Health\nRegular consumption of organic honey from Pithoragarh helps improve digestion, soothe acidity, and support healthy gut bacteria.\n\n3. Provides Clean & Sustained Energy\nUnlike refined sugar, pure Himalayan organic honey provides natural glucose and fructose that release energy slowly and steadily.\n\n4. Helps Soothe Throat & Respiratory Health\nWarm water or herbal tea with organic honey from Kumaun helps relieve sore throat, cough, and respiratory discomfort.\n\n5. Enhances Skin Glow & Natural Skincare\nApplied topically or consumed daily, natural pahadi honey helps improve skin hydration, glow, and healing due to its antibacterial properties.\n\n6. A Healthy Alternative to Sugar\nThis organic honey Pithoragarh is a perfect natural substitute for refined sugar in tea, desserts, and daily recipes.\n\nHow to Use Pahadi Sher Organic Honey\nYou can enjoy Pure Himalayan Organic Honey Chandak Pithoragarh in many ways:\n\nAdd a spoon to warm water every morning\n\nMix with herbal tea or milk\n\nUse in home remedies and kadha\n\nApply as a natural face mask or lip balm\n\nUse as a sweetener in healthy recipes\n\nDaily use helps unlock the full benefits of organic honey from Kumaun.\n\nWhy Choose Pahadi Sher Organic Honey?\nMany products in the market claim to be “pure” or “organic,” but most are processed, blended, or diluted. Pahadi Sher Organic Honey stands out because it remains true to its Himalayan origin.\n\nDirect sourcing from Pithoragarh & Chandak forests\n\nNo heat treatment or artificial processing\n\nNo mixing with commercial honey\n\nPreserved exactly as collected from the hive\n\nWhen you choose Pahadi Sher Organic Honey, you choose authenticity, purity, and the real taste of the Himalayas.\n\nAuthentic Organic Honey from Kumaun Region\nThe Kumaun Himalayas are known for producing some of the finest honey in India due to rich flora and clean surroundings. Organic honey from Kumaun has been traditionally valued in Ayurveda for its healing and rejuvenating properties.\n\nPahadi Sher Organic Honey proudly represents this tradition by delivering natural pahadi honey that supports wellness in its most natural form.\n\nIf you are looking for Organic Honey Pithoragarh, Pure Himalayan Organic Honey Chandak Pithoragarh, or truly natural pahadi honey, then Pahadi Sher Organic Honey is the perfect choice. Carefully harvested from the Himalayan forests and bottled without tampering, it brings you nature’s purest gift — raw, powerful, and full of life.\n\nNote: Shilajit is produced in-house, while ghee, honey & other product's are sourced from our own units and trusted local farmers of Pithoragarh district, followed by strict quality check\n\nNote - Images shown are digitally generated mockups. Actual product and packaging may vary, but the ingredients and quality remain the same.",
    "benefits": [
      "Our Pure Himalayan Organic Honey Chandak Pithoragarh is never heated, refined, or chemically processed. Unlike commercial honey that loses its nutritional value due to excessive heating and filtering, Pahadi Sher Organic Honey is gently extracted and minimally strained to preserve:",
      "Organic Honey Pithoragarh stands apart because:",
      "You can enjoy Pure Himalayan Organic Honey Chandak Pithoragarh in many ways:",
      "Note: Shilajit is produced in-house, while ghee, honey & other product's are sourced from our own units and trusted local farmers of Pithoragarh district, followed by strict quality check"
    ],
    "ingredients": [
      "Pahadi Sher Organic Honey (100 gm)",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Consume directly or prepare as per dish instructions.",
    "featured": false
  },
  {
    "id": "prod-pahadi-organic-honey",
    "name": "Pahadi Sher Organic Honey (1000 gm)",
    "slug": "pahadi-organic-honey",
    "subtitle": "Pahadi Sher Organic Honey",
    "category": "honey",
    "categoryName": "Honey",
    "price": 2500,
    "originalPrice": 4000,
    "discountPercent": 38,
    "rating": 4.7,
    "reviewsCount": 190,
    "altitude": "6,500 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "1000 gm",
    "sku": "TPS-HONEY-16",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Sheheddd_f2326ed7-4c60-40e1-9418-43b5afd283f2.png?v=1773819573"
    ],
    "badge": "SALE",
    "inStock": true,
    "stockQuantity": 45,
    "description": "Pahadi Sher Organic Honey\nPahadi Sher Organic quality Honey is a unique, pure honey product collected from untouched Himalayan forests. This pure honey is raw, unprocessed, and carefully sourced from free-roaming mountain bees. It retains its natural enzymes, antioxidants, pollen, and a rich golden texture — offering nature's richness exactly as intended. Every jar contains authentic nectar with genuine Himalayan purity.\n\nOur organic product undergoes no heating, filtering, or refining processes. This careful preservation maintains its medicinal properties and natural sweetness intact. Packed with minerals, vitamins, live enzymes, and antibacterial qualities, it supports immunity, digestion, energy production, and overall wellness. This nectar is an excellent reflection of quality Liquid Gold that nature designed.\n\nThis pure Liquid Gold is not just a sweetener but a natural powerhouse enriching your body with essential nutrients. Every spoonful provides the authentic taste and benefits straight from the Himalayan mountain nectar. Whether used for daily health, herbal teas, skincare, or natural sweetening, Pahadi Sher Product offers mountain purity in each precious drop.\n\nKey Features of Our Pure Nectar and Pure Honey\n\n✔ 100% Pure Organic Himalayan product sourced sustainably from pristine forest areas.\n\n✔ Liquid Gold is raw, unprocessed, and unfiltered to retain maximum nutrients and natural goodness.\n\n✔ Naturally rich in enzymes, antioxidants & essential minerals vital for health and vitality.\n\n✔ Contains no chemicals, added sugars, or preservatives, guaranteeing absolute purity.\n\n✔ Collected carefully from Himalayan forest bee hives, untouched by pollution and artificial influences.\n\n✔ Displays an authentic golden color and natural taste, found only in premium quality Liquid Gold.\n\nBenefits of Using Nectar for Wellness\n\nBoosts immunity & natural healing: This pure honey Liquid Gold strengthens your body’s natural defenses and aids rapid recovery.\n\nSupports digestion & gut health: Enzymes and antioxidants in the Product enhance digestion and soothe stomach discomfort.\n\nProvides clean and stable natural energy: Unlike artificial sugars, this product offers a sustained energy release throughout your day.\n\nHelps soothe throat & respiratory health: A trusted natural remedy for coughs, colds, and throat irritations.\n\nGreat for skin glow & natural skincare: The antibacterial and antioxidant properties promote healthy, radiant skin from within.\n\nPerfect natural substitute for sugar: Use this delicious nectar to sweeten your foods naturally, without any chemical additives.\n\nWhy Choose Our Pure products for Daily Wellness?\nThis pure honey Liquid Gold is raw, powerful, and preserved without any tampering. Directly sourced from the Himalayas, it captures the genuine essence and nutrients of mountain nectar. Each jar delivers the true taste and health benefits of quality Liquid Gold, ensuring an unmatched experience in natural sweetness.\n\nOur Liquid Gold undergoes strict quality checks to meet the highest standards. We collaborate with trusted local farmers from the Pithoragarh district, ensuring consistent purity and premium quality. All products, including Liquid Gold, are sourced carefully or produced in-house, guaranteeing authenticity and safety for consumers who value natural health.\n\nRich in natural enzymes, antioxidants, and essential nutrients, our Himalayan nectar honey supports daily immunity, digestion, and natural energy levels. Free from artificial processing, preservatives, and added sugars, this raw Pithoragarh honey retains its original aroma, texture, and medicinal properties. Ideal for daily consumption, it serves as a wholesome natural sweetener for warm water, herbal teas, or traditional remedies—making it a perfect choice for a healthy, balanced lifestyle rooted in Himalayan purity.\n\nNote: Shilajit is produced internally, while ghee, honey, and other products come from our own units and reliable farmers. Each batch is examined thoroughly for quality assurance and safety, so you receive nothing but the best pure honey.\n\nNote - Images shown are digitally generated mockups created solely for illustration purposes. Actual product packaging may vary. However, the ingredients and quality honey remain consistent, ensuring you always get the best natural product straight from the heart of the Himalayas.",
    "benefits": [
      "Boosts immunity & natural healing: This pure honey Liquid Gold strengthens your body’s natural defenses and aids rapid recovery.",
      "Supports digestion & gut health: Enzymes and antioxidants in the Product enhance digestion and soothe stomach discomfort.",
      "Provides clean and stable natural energy: Unlike artificial sugars, this product offers a sustained energy release throughout your day.",
      "Helps soothe throat & respiratory health: A trusted natural remedy for coughs, colds, and throat irritations."
    ],
    "ingredients": [
      "Pahadi Sher Organic Honey (1000 gm)",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Consume directly or prepare as per dish instructions.",
    "featured": false
  },
  {
    "id": "prod-pahadi-sher-organic-honey",
    "name": "Pahadi Sher Organic Honey (500 gm)",
    "slug": "pahadi-sher-organic-honey",
    "subtitle": "Pahadi Sher Organic Pure Honey",
    "category": "honey",
    "categoryName": "Honey",
    "price": 1250,
    "originalPrice": 2000,
    "discountPercent": 38,
    "rating": 4.8,
    "reviewsCount": 197,
    "altitude": "6,500 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "500 gm",
    "sku": "TPS-HONEY-17",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Shehed.png?v=1773819508"
    ],
    "badge": "SALE",
    "inStock": true,
    "stockQuantity": 46,
    "description": "Pahadi Sher Organic Pure Honey\nPahadi Sher product is a premium product sourced from the pristine pahadi forests of Pithoragarh. This honey is pure, raw, and completely unprocessed, collected from free-roaming mountain bees that produce the finest quality. Each jar contains natural enzymes, antioxidants, pollen, and a rich golden texture, exactly as nature intended.\n\nOur organic pahadi product is carefully harvested with no heating, filtering, or refining. This protects all the medicinal values and natural sweetness. Packed with essential minerals, vitamins, live enzymes, and antibacterial properties, it supports immunity, boosts digestion, enhances energy, and promotes overall wellness.\n\nWhether used in daily health routines, added to herbal teas, or applied for natural skincare, Our product presents the pure essence of the mountains in every spoonful. Experience the unmatched quality of pithoragarh product, known locally as one of the best honey varieties from the region.\n\nKey Features of Our Pure Honey\n\n✔ 100% Pure product harvested from pristine natural hives in the Himalayan forests.\n\n✔ Raw, unprocessed, and unfiltered to maintain all its natural properties and benefits.\n\n✔ Rich in enzymes, antioxidants & minerals vital for health and wellbeing.\n\n✔ Contains absolutely no chemicals, added sugar, or preservatives that could affect authenticity.\n\n✔ Collected exclusively from Himalayan forest bee hives in the Pithoragarh forests.\n\n✔ Exhibits an authentic golden color and natural taste true to its mountain origin.\n\nHealth Benefits\n\nEnhances immunity & natural healing due to its potent antibacterial qualities.\n\nSupports digestion & gut health by encouraging the growth of beneficial bacteria.\n\nProvides clean, stable natural energy without causing spikes or crashes.\n\nSoothes throat and promotes respiratory health naturally with anti-inflammatory properties.\n\nImproves skin glow & natural skincare through gentle antibacterial effects.\n\nServes as a perfect natural substitute for sugar, giving a healthier sweetness option.\n\nWhy Choose our products?\nThis is chandak pithoragarh Nectar is raw, powerful, and pure. Sourced directly from the Himalayan mountains, it is bottled without tampering. You receive authentic mountain Nectar with all nutrients intact. This makes it one of the pure quality product choices available.\n\nEvery batch reflects the rich biodiversity of the Himalayan forests. Our careful harvesting preserves natural goodness and ensures you get real pure honey. This keeps your wellness and taste buds fully satisfied with every jar.\n\nHow to Enjoy Our product\nUse our product daily to strengthen your health and enhance the taste of your foods. Add a spoonful to herbal teas, smoothies, or yogurt. It also works beautifully as a natural sweetener to replace processed sugars.\n\nFor skincare, gently apply the honey on your skin. It has antibacterial and moisturizing effects that help improve texture and glow. Its golden color and rich natural taste also enhance any recipe or wellness routine.\n\nAbout Pahadi Nectar from Pithoragarh\nPahadi Nectar from this area is famed for its purity and exceptional natural quality. The Himalayan forests' unique flora produces honey rich in vital nutrients and distinct flavor. Pithoragarh Nectar is known as one of the best honey types in India, ideal for natural health lovers.\n\nEach jar reflects the tradition of responsible harvesting and sustainable practices. These methods support mountain ecosystems and bee populations. Indulge in Pahadi Sher’s pure Nectar and enjoy nature’s finest sweet gift straight from the forest.\n\nRenowned as one of the finest nectar varieties in India, Pithoragarh Nectar Honey is an ideal choice for natural health lovers seeking purity and authenticity. Every jar reflects generations-old traditions of responsible harvesting and sustainable beekeeping practices, ensuring the protection of mountain ecosystems and healthy bee populations.\n\nWe highly recommend Pahadi Sher’s Pure Himalayan Nectar for daily wellness, natural energy, and immunity support. Experience nature’s finest sweet gift—pure, raw, and unprocessed nectar straight from the Himalayan forests.\n\nNote: Shilajit is produced in-house, while ghee, honey & other product's are sourced from our own units and trusted local farmers of Pithoragarh district, followed by strict quality check\n\nNote - Images shown are digitally generated mockups. The actual product and packaging may vary, but the ingredients and quality remain consistent.",
    "benefits": [
      "Note: Shilajit is produced in-house, while ghee, honey & other product's are sourced from our own units and trusted local farmers of Pithoragarh district, followed by strict quality check"
    ],
    "ingredients": [
      "Pahadi Sher Organic Honey (500 gm)",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Consume directly or prepare as per dish instructions.",
    "featured": false
  },
  {
    "id": "prod-rosemary-green-tea-1",
    "name": "Organic Kumaon Rosemary Green Tea",
    "slug": "rosemary-green-tea-1",
    "subtitle": "Brain Focus & Mental Clarity • High-Altitude Rosemary, Lemongrass & Mulethi",
    "category": "teas",
    "categoryName": "Herbal Tea",
    "price": 250,
    "originalPrice": 500,
    "discountPercent": 50,
    "rating": 4.9,
    "reviewsCount": 148,
    "altitude": "6,500 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "25 Tea Bag Envelopes",
    "sku": "TPS-TEA-ROSEM25",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/RosemaryGreenTea_3.png?v=1774513094",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Rosemary_Green_Tea_4.png?v=1774513141",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Rosemary_Green_Tea_2.png?v=1774513168",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Rosemary_Green_Tea_1.png?v=1774513194"
    ],
    "badge": "NEW",
    "inStock": true,
    "stockQuantity": 50,
    "description": "Unlock mental clarity and holistic wellness from the Himalayas. Elevate your daily tea ritual with Organic Kumaon Rosemary Green Tea, a masterful blend designed to nourish mind and body. Sourced from pristine high-altitude landscapes of Kumaon, combining earthy Rosemary with citrusy Lemongrass and soothing Mulethi (Licorice).",
    "benefits": [
      "Brain Power & Focus: Rosemary is known to improve cognitive function, concentration, and alertness",
      "Immunity & Digestion: Lemon Grass provides a powerful antioxidant boost and aids healthy digestion",
      "Soothing Relief: Mulethi supports liver function and provides gentle relief for sore throat and cough",
      "100% Natural: Pure, organic herbal blend free from artificial additives, packed in 25 heat-sealed envelopes"
    ],
    "ingredients": [
      "Organic Kumaon Rosemary",
      "High-Altitude Green Tea",
      "Lemongrass",
      "Mulethi (Licorice)"
    ],
    "howToUse": "Place 1 tea bag in a cup, pour 100ml freshly boiled water. Steep for 2-3 minutes. Drink 1 to 3 cups daily hot or chilled.",
    "featured": true,
    "labCertificateNo": "PAH-TEA-ROSEM-2026",
    "harvestSeason": "Spring Harvest 2026"
  },
  {
    "id": "prod-pahadi-sher-shilajit",
    "name": "Pahadi Sher Shilajit (10 gm)",
    "slug": "pahadi-sher-shilajit",
    "subtitle": "Pahadi Shilajit – Pure Himalayan Shilajit from Pithoragarh",
    "category": "shilajit",
    "categoryName": "Shilajit",
    "price": 1100,
    "originalPrice": 1300,
    "discountPercent": 15,
    "rating": 4.7,
    "reviewsCount": 211,
    "altitude": "18,000 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "10 gm",
    "sku": "TPS-SHILAJIT-19",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/CapCut_b6400026-1a3a-409c-a8b0-177cb17321f3.png?v=1773837258",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/WhatsAppImage2025-12-24at4.29.06PM.jpg?v=1773837258",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Pahadi_sher_shilajit_edit_fbf9771d-dd0b-462a-a706-e3523a9b08c4.png?v=1773838680",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Shilajit_27d06b2b-79b0-4541-a303-fb5ae05c9233.png?v=1773837258",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/WhatsAppImage2025-12-24at4.29.02PM.jpg?v=1773837258"
    ],
    "badge": "BESTSELLER",
    "inStock": true,
    "stockQuantity": 48,
    "description": "Pahadi Shilajit – Pure Himalayan Shilajit from Pithoragarh\nPahadi Sher Organic Shilajit ek premium quality organic shilajit resin hai jo Original Shilajit ke roop mein Uttarakhand ke pahadi ilaakon, khas taur par Pithoragarh ke upper Himalayan region se sustainably source kiya gaya hai. Yeh Pahadi Shilajit Pithoragarh ki shuddh pahaadi chattanon se naturally nikala jaata hai, jahan minerals aur bioactive compounds sabse zyada concentrated hote hain.\n\nAyurveda mein Original shilajit ko “Yogavahi” kaha gaya hai — jo sharir ki energy, stamina aur immunity ko naturally support karta hai. Yeh shilajit traditional Ayurvedic purification process se shuddh kiya jaata hai, jisse iska natural composition, potency aur purity bilkul intact rehti hai.\n\nWhat Makes Pahadi Shilajit?\nHamare Product ko high-altitude Himalayan rocks se hand-collected kiya jaata hai. Yeh koi powder ya capsule nahi, balki 100% original shilajit resin hai jo naturally melt hota hai aur paani ya doodh mein asaani se dissolve ho jaata hai — jo asli shilajit ki pehchaan hoti hai.\n\nPahadi Product mein:\n\nHigh concentration of Fulvic Acid\n\nHumic Acid\n\n80+ trace minerals\n\nNatural antioxidants\n\nBioactive compounds\n\nYeh sab naturally present hote hain, bina kisi chemical, filler ya artificial additive ke.\n\nBenefits of Pahadi Sher Organic Shilajit\nRegular use se Organic Shilajit aapke sharir ko naturally strong aur energetic banane mein madad karta hai:\n\n🔹 Energy & Stamina\n100% Pure Shilajit fatigue ko kam karta hai aur din bhar natural energy provide karta hai. Yeh aapke daily activities ke liye zaroori stamina boost karta hai.\n\n🔹 Strength & Muscle Recovery\nGym jaane wale logon ke liye muscle recovery aur performance ko support karta hai. Yeh natural ingredients se enriched hai jo muscles ko stronger banate hain.\n\n🔹 Immunity Booster\nMinerals se bharpoor hota hai jo immunity aur metabolism ko strong banata hai. Yeh aapke immune system ko enhance karta hai taaki aap kam bimaar padein.\n\n🔹 Mental Clarity & Focus\nOriginal Shilajit brain function, focus aur stress management mein bhi madad karta hai. Iska regular use aapko mentally sharp aur focused rakhta hai.\n\nKey Features of Pahadi Sher Organic Shilajit\n✔ 100% Pure Himalayan Organic Shilajit Resin\n✔ Authentic Pahadi Shilajit Pithoragarh sourced\n✔ High Fulvic Acid content\n✔ Traditionally Ayurvedic purified\n✔ Supports stamina, strength & energy\n✔ Enhances immunity & metabolism\n✔ Chemical-free, filler-free & additive-free\n✔ Lab-tested Original shilajit\n\nWhy Choose This Product?\nAaj market mein bahut saare products “shilajit” ke naam par milte hain, lekin sab asli nahi hote. Yeh specially isliye design kiya gaya hai taaki customers ko pure quality mile — bina compromise ke.\n\nDirect sourcing from Himalayan regions\n\nNo middle-grade processing\n\nNo synthetic enhancement\n\nTrue resin form, not powder\n\nPahadi Shilajit Pithoragarh is an original pure Himalayan shilajit from Pithoragarh, Uttarakhand, naturally processed to boost energy, stamina, and overall wellness.\n\nIsliye yeh un logon ke liye best choice hai jo Original shilajit se real results chahte hain. Yeh daily wellness ke liye ek safe aur effective option hai.\n\nYeh ek premium Original shilajit resin hai jo Pure Himalayan Shilajit ke roop mein Uttarakhand ke pahadi ilaakon, khas taur par Pithoragarh ke upper Himalayan region se sustainably source kiya gaya hai. Yeh Pahadi Shilajit Pithoragarh traditional Ayurvedic purification process se shuddh kiya gaya asli shilajit hai, jo energy, stamina, strength aur immunity ko naturally support karta hai. Fulvic Acid, Humic Acid aur 80+ trace minerals se rich yeh pure shilajit testosterone, metabolism aur recovery ko enhance karne mein madad karta hai. Bilkul chemical-free, filler-free aur lab-tested yeh daily wellness ke liye safe aur effective aap ke liye aur friends ke liye badiya option hai.\n\nNote: Shilajit is produced in-house, while ghee, honey & other product's are sourced from our own units and trusted local farmers of Pithoragarh district, followed by strict quality check\n\nNote - Images shown are digitally generated mockups. Actual product and packaging may vary, but the ingredients and quality remain the same.",
    "benefits": [
      "Pahadi Product mein:",
      "Regular use se Organic Shilajit aapke sharir ko naturally strong aur energetic banane mein madad karta hai:",
      "\udd39 Energy & Stamina",
      "\udd39 Strength & Muscle Recovery"
    ],
    "ingredients": [
      "Pahadi Sher Shilajit (10 gm)",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Consume directly or prepare as per dish instructions.",
    "featured": false
  },
  {
    "id": "prod-pahadi-shilajit-20-gm",
    "name": "Pahadi Sher Shilajit (20 gm)",
    "slug": "pahadi-shilajit-20-gm",
    "subtitle": "Pahadi Sher Organic Shilajit",
    "category": "shilajit",
    "categoryName": "Shilajit",
    "price": 2100,
    "originalPrice": 2600,
    "discountPercent": 19,
    "rating": 4.8,
    "reviewsCount": 218,
    "altitude": "18,000 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "20 gm",
    "sku": "TPS-SHILAJIT-20",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Pahadi_sher_shilajit_edit_fbf9771d-dd0b-462a-a706-e3523a9b08c4.png?v=1773838680",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Shilajit_27d06b2b-79b0-4541-a303-fb5ae05c9233.png?v=1773837258",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/CapCut_b6400026-1a3a-409c-a8b0-177cb17321f3.png?v=1773837258",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/WhatsAppImage2025-12-24at4.29.06PM.jpg?v=1773837258",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/WhatsAppImage2025-12-24at4.29.02PM.jpg?v=1773837258",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Zym_Shilajit_ad3cb554-43cb-4af8-8ead-e7b5c35162a4.png?v=1773837258",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Sher_Shilajit.png?v=1773837258"
    ],
    "badge": "BESTSELLER",
    "inStock": true,
    "stockQuantity": 49,
    "description": "Pahadi Sher Organic Shilajit\nPahadi Sher Organic Shilajit is a premium Himalayan Mineral Pitch resin sourced from the pristine, mineral-rich mountains of Pithoragarh natural resin in the upper Himalayas. This natural resin is hand-collected at high altitudes and carefully purified using traditional Ayurvedic techniques. Each batch delivers maximum potency, purity, and natural energy for your wellness needs.\n\nThe organic resin is rich in bioactive compounds such as Fulvic Acid, Humic Acid, trace minerals, antioxidants. Pahadi Sher Mineral Pitch helps boost stamina, strength, immunity, and overall wellness. It is revered in Ayurveda as the “destroyer of weakness.” This authentic Himalayan resin supports testosterone levels, enhances metabolism, improves recovery, and increases vitality naturally.\n\nOur product contains no additives, no chemicals, and no fillers. It is 100% pure, natural Himalayan shilajit, sealed carefully to preserve freshness and maximum strength. Sourced from the heart of kumaon, this Mineral Pitch connects you directly to nature’s potent energy.\n\nKey Features of our Pithoragarh Shilajit Product\n\n✔ 100% Pure Himalayan Organic Mineral Pitch Resin harvested from the mountains of Pithoragarh.\n\n✔ Rich in Fulvic Acid & over 80 trace minerals essential for body vitality and health.\n\n✔ Sourced and traditionally purified with Ayurvedic methods to ensure maximum potency.\n\n✔ Enhances strength, stamina & energy levels naturally for daily endurance.\n\n✔ Supports testosterone & vitality in men and overall hormonal balance.\n\n✔ Boosts immunity, metabolism & recovery after physical activity.\n\n✔ Completely free from chemicals, fillers, or artificial additives, ensuring purity.\n\n✔ Lab-tested for authenticity and purity to guarantee quality in every jar.\n\nBenefits of Pahadi Sher Product Natural Resin\n\nIncreases natural energy & endurance, helping you stay active longer.\n\nSupports muscle strength, recovery & enhanced performance during workouts.\n\nEnhances mental clarity & focus, promoting better cognitive function.\n\nHelps maintain healthy hormonal balance for sustained vitality.\n\nImproves digestive & cellular health by aiding nutrient absorption.\n\nBoosts overall immunity and vitality, protecting the body naturally.\n\nWhy Choose Pahadi Sher Organic Mineral Pitch from Pithoragarh?\nOur shilajit is crafted with the power and purity of the Himalayan mountains in Pithoragarh. This authentic natural resin delivers unmatched strength, potency, and raw energy from nature itself. It is carefully harvested to preserve the original benefits and ensure you get a superior product every time. Pahadi Sher Mineral Pitch is a perfect addition to your daily wellness routine.\n\nWe respect nature and traditional methods, which means no shortcuts or compromises. Our Himalayan Black Bitumen resin captures the essence of Pithoragarh’s high-altitude environment. The careful purification process retains its powerful nutrients and bioactive compounds for better health support.\n\nAbout the Product Packaging and Authenticity of Pahadi Sher Product\nPahadi Sher Organic Shilajit, widely known by different names such as Mineral Pitch, Black Bitumen, Asphaltum, Himalayan Resin, and Rock Exudate, is a rare and powerful natural substance sourced from the high-altitude Himalayan mountains of Pithoragarh, Uttarakhand. In Ayurveda, Black Bitumen is revered as a Rasayana and Yogavahi, meaning it supports overall rejuvenation and enhances nutrient absorption in the body.\n\nOver centuries, this mineral-rich resin is naturally formed from the decomposition of ancient Himalayan herbs and plants. It absorbs valuable minerals from the surrounding rocks, making it an effective natural resin for health support.\n\nAcross cultures, this potent substance is known by different traditional names reflecting its strength and healing properties. In Russia and Central Asia, it is called Mumiyo or Mumie, while in Tibetan medicine it is known as Brag-shun. Scientifically referred to as Mineral Pitch, pure Himalayan Black Bitumen is packed with Fulvic Acid, Humic Acid, 80+ trace minerals, antioxidants, and bioactive compounds, making it highly effective for boosting natural energy, stamina, immunity, and vitality.\n\nPahadi Sher Organic Shilajit is carefully hand-collected from the pristine cliffs of Pithoragarh, an area known for producing some of the purest Himalayan Black Bitumen in India. It is then purified using traditional Ayurvedic methods to preserve its original resin form and natural potency. The sticky, water-soluble texture of this Himalayan Resin confirms its authenticity and superior quality.\n\nWhether known as Shilajit, Asphaltum, or Mineral Pitch, this ancient wellness treasure continues to be trusted for daily health support. Pahadi Sher delivers 100% pure, lab-tested, chemical-free shilajit resin from Pithoragarh, combining Himalayan tradition with modern quality standards for holistic well-being.\n\nNote: Shilajit is produced in-house, while ghee, honey & other product's are sourced from our own units and trusted local farmers of Pithoragarh district, followed by strict quality check\n\nNote - The images shown are digitally generated mockups. The actual product and packaging may vary. However, the ingredients, quality, and purity remain consistent with what is shown. Pahadi Sher ensures each jar is sealed tightly to maintain freshness and strength of the shilajit resin inside.",
    "benefits": [
      "Note: Shilajit is produced in-house, while ghee, honey & other product's are sourced from our own units and trusted local farmers of Pithoragarh district, followed by strict quality check"
    ],
    "ingredients": [
      "Pahadi Sher Shilajit (20 gm)",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Consume directly or prepare as per dish instructions.",
    "featured": false
  },
  {
    "id": "prod-pahadi-sher-shilajit-30g",
    "name": "Pahadi Sher Shilajit (30 gm)",
    "slug": "pahadi-sher-shilajit-30g",
    "subtitle": "Pahadi Sher Organic Shilajit",
    "category": "shilajit",
    "categoryName": "Shilajit",
    "price": 3200,
    "originalPrice": 3800,
    "discountPercent": 16,
    "rating": 4.9,
    "reviewsCount": 225,
    "altitude": "18,000 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "30 gm",
    "sku": "TPS-SHILAJIT-21",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Shilajit_1_dbf6d506-d8fc-4a5a-9f82-65c93a349060.png?v=1773838680",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Pahadi_sher_shilajit_edit_fbf9771d-dd0b-462a-a706-e3523a9b08c4.png?v=1773838680",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/WhatsAppImage2025-12-24at4.29.06PM.jpg?v=1773837258",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/WhatsAppImage2025-12-24at4.29.02PM.jpg?v=1773837258"
    ],
    "badge": "BESTSELLER",
    "inStock": true,
    "stockQuantity": 50,
    "description": "Pahadi Sher Organic Shilajit\nPahadi Sher Organic Shilajit is a premium Himalayan shilajit resin sourced from the pure, mineral-rich mountains of the upper Himalayas. Hand-collected at high altitudes and purified using traditional Ayurvedic methods, our shilajit delivers maximum potency, purity, and natural energy.\n\nRich in Fulvic Acid, Humic Acid, trace minerals, antioxidants, and bioactive compounds, this organic shilajit resin helps boost stamina, strength, immunity, and overall wellness. Known as the “destroyer of weakness” in Ayurveda, pure shilajit supports testosterone levels, enhances metabolism, improves recovery, and increases vitality naturally.\n\nPahadi Sher Organic Shilajit contains no additives, no chemicals, and no fillers — just 100% pure, natural Himalayan shilajit resin sealed for freshness and maximum strength.\n\nKey Features\n\n✔ 100% Pure Himalayan Organic Shilajit Resin\n\n✔ High in Fulvic Acid & 80+ trace minerals\n\n✔ Traditionally purified for maximum potency\n\n✔ Supports strength, stamina & energy levels\n\n✔ Helps improve testosterone & vitality\n\n✔ Boosts immunity, metabolism & recovery\n\n✔ Free from chemicals, fillers & additives\n\n✔ Lab-tested for purity & authenticity\n\nBenefits\n\nIncreases natural energy & endurance\n\nSupports strength, muscle recovery & performance\n\nEnhances mental clarity & focus\n\nHelps maintain hormonal balance\n\nImproves digestive & cellular health\n\nBoosts overall immunity & vitality\n\nWhy Choose Pahadi Sher Organic Shilajit?\nBecause it’s crafted with the power and purity of the Himalayas — delivering authentic strength, unmatched potency, and the raw energy of nature. A perfect addition to your daily wellness routine.\n\nNote: Shilajit is produced in-house, while ghee, honey & other product's are sourced from our own units and trusted local farmers of Pithoragarh district, followed by strict quality check\n\nNote - Images shown are digitally generated mockups. Actual product and packaging may vary, but the ingredients and quality remain the same.",
    "benefits": [
      "Note: Shilajit is produced in-house, while ghee, honey & other product's are sourced from our own units and trusted local farmers of Pithoragarh district, followed by strict quality check"
    ],
    "ingredients": [
      "Pahadi Sher Shilajit (30 gm)",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Consume directly or prepare as per dish instructions.",
    "featured": false
  },
  {
    "id": "prod-pahadi-sher-shilajit-40-gm",
    "name": "Pahadi Sher Shilajit (40 gm)",
    "slug": "pahadi-sher-shilajit-40-gm",
    "subtitle": "Pahadi Sher Organic Shilajit",
    "category": "shilajit",
    "categoryName": "Shilajit",
    "price": 4200,
    "originalPrice": 5200,
    "discountPercent": 19,
    "rating": 4.7,
    "reviewsCount": 232,
    "altitude": "18,000 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "40 gm",
    "sku": "TPS-SHILAJIT-22",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Pahadi_sher_shilajit_edit_fbf9771d-dd0b-462a-a706-e3523a9b08c4.png?v=1773838680",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Shilajit_2.png?v=1773838711",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Zym_Shilajit_ad3cb554-43cb-4af8-8ead-e7b5c35162a4.png?v=1773837258",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Sher_Shilajit.png?v=1773837258",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/WhatsAppImage2025-12-24at4.29.06PM.jpg?v=1773837258",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/WhatsAppImage2025-12-24at4.29.02PM.jpg?v=1773837258"
    ],
    "badge": "BESTSELLER",
    "inStock": true,
    "stockQuantity": 51,
    "description": "Pahadi Sher Organic Shilajit\nPahadi Sher Organic Shilajit is a premium Himalayan shilajit resin sourced from the pure, mineral-rich mountains of the upper Himalayas. Hand-collected at high altitudes and purified using traditional Ayurvedic methods, our shilajit delivers maximum potency, purity, and natural energy.\n\nRich in Fulvic Acid, Humic Acid, trace minerals, antioxidants, and bioactive compounds, this organic shilajit resin helps boost stamina, strength, immunity, and overall wellness. Known as the “destroyer of weakness” in Ayurveda, pure shilajit supports testosterone levels, enhances metabolism, improves recovery, and increases vitality naturally.\n\nPahadi Sher Organic Shilajit contains no additives, no chemicals, and no fillers — just 100% pure, natural Himalayan shilajit resin sealed for freshness and maximum strength.\n\nKey Features\n\n✔ 100% Pure Himalayan Organic Shilajit Resin\n\n✔ High in Fulvic Acid & 80+ trace minerals\n\n✔ Traditionally purified for maximum potency\n\n✔ Supports strength, stamina & energy levels\n\n✔ Helps improve testosterone & vitality\n\n✔ Boosts immunity, metabolism & recovery\n\n✔ Free from chemicals, fillers & additives\n\n✔ Lab-tested for purity & authenticity\n\nBenefits\n\nIncreases natural energy & endurance\n\nSupports strength, muscle recovery & performance\n\nEnhances mental clarity & focus\n\nHelps maintain hormonal balance\n\nImproves digestive & cellular health\n\nBoosts overall immunity & vitality\n\nWhy Choose Pahadi Sher Organic Shilajit?\nBecause it’s crafted with the power and purity of the Himalayas — delivering authentic strength, unmatched potency, and the raw energy of nature. A perfect addition to your daily wellness routine.\n\nNote: Shilajit is produced in-house, while ghee, honey & other product's are sourced from our own units and trusted local farmers of Pithoragarh district, followed by strict quality check\n\nNote - Images shown are digitally generated mockups. Actual product and packaging may vary, but the ingredients and quality remain the same.",
    "benefits": [
      "Note: Shilajit is produced in-house, while ghee, honey & other product's are sourced from our own units and trusted local farmers of Pithoragarh district, followed by strict quality check"
    ],
    "ingredients": [
      "Pahadi Sher Shilajit (40 gm)",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Consume directly or prepare as per dish instructions.",
    "featured": false
  },
  {
    "id": "prod-pahadi-sher-shilajit-and-chamomile-flower-tea-combo-10-gm-50-gm",
    "name": "Pahadi Sher Shilajit and Chamomile Flower Tea Combo  (10 gm + 50 gm)",
    "slug": "pahadi-sher-shilajit-and-chamomile-flower-tea-combo-10-gm-50-gm",
    "subtitle": "Pahadi Sher Shilajit and Chamomile Flower Tea Combo  (10 gm + 50 gm)",
    "category": "combos",
    "categoryName": "Combos",
    "price": 1350,
    "originalPrice": 1550,
    "discountPercent": 13,
    "rating": 4.8,
    "reviewsCount": 239,
    "altitude": "6,500 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "10 gm + 50 gm",
    "sku": "TPS-COMBOS-23",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Silajit_Camomile1.png?v=1774862590"
    ],
    "badge": "BESTSELLER",
    "inStock": true,
    "stockQuantity": 52,
    "description": "Pahadi Sher Shilajit and Chamomile Flower Tea Combo  (10 gm + 50 gm)\nExperience the perfect balance of power and peace with the Pahadi Sher Wellness Combo, a thoughtfully crafted pairing of authentic Himalayan Shilajit and calming Chamomile Flower Tea. Sourced from the untouched natural beauty of Pithoragarh in the serene region of Kumaon, this combo supports your body with energy by day and relaxation by night.\n\nWhat’s Inside the Combo?\n1. Pahadi Sher Organic Shilajit Resin\nA rare Himalayan mineral resin formed over centuries, rich in Fulvic Acid, Humic Acid, and 80+ trace minerals. Traditionally purified using Ayurvedic methods, Shilajit is known as a powerful Rasayana, helping boost stamina, strength, immunity, and overall vitality.\n\n2. Organic Kumaon Chamomile Flower Tea (Whole Dried Buds)\nA premium, caffeine-free herbal tea made from 100% whole dried Chamomile flowers (Matricaria chamomilla). Known for its gentle floral aroma and calming properties, it helps reduce stress, improve sleep quality, and support digestive health.\n\nWhy Choose This Combo?\n✔ Energy + Deep Relaxation – Shilajit energizes your body, while Chamomile calms your mind.\n ✔ Better Sleep Cycle – Ideal for improving sleep quality and reducing anxiety naturally.\n ✔ Stress & Recovery Support – Helps the body recover while relaxing the nervous system.\n ✔ Digestive Wellness – Supports gut health and reduces bloating.\n ✔ 100% Pure & Natural – No chemicals, additives, or artificial ingredients.\n\nThe Power of Himalayan Wellness\nRooted in Ayurvedic tradition and Himalayan purity, this combo creates a complete daily wellness ritual. Shilajit fuels your body with strength and endurance, while Chamomile tea provides a peaceful, restorative experience.\n\nTogether, they help you stay active during the day and unwind deeply at night.\n\nHow to Use\n\nMorning: Take a small portion of Shilajit with lukewarm water or milk for sustained energy.\n\nNight: Brew Chamomile Flower Tea before bedtime to relax your mind and support deep sleep.\n\nPerfect For\n\nStress relief & relaxation\n\nBetter sleep & recovery\n\nDaily energy & stamina\n\nDigestive support\n\nHolistic lifestyle seekers\n\nPahadi Sher Wellness Combo – Strength by Day, Serenity by Night\nReconnect with nature’s rhythm through this powerful Himalayan duo—crafted for those who seek balance, calm, and complete wellness.",
    "benefits": [
      "Morning: Take a small portion of Shilajit with lukewarm water or milk for sustained energy.",
      "Night: Brew Chamomile Flower Tea before bedtime to relax your mind and support deep sleep."
    ],
    "ingredients": [
      "Pahadi Sher Shilajit and Chamomile Flower Tea Combo  (10 gm + 50 gm)",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Steep 1 bag or 1 tsp in 100ml hot water for 2-3 minutes. Enjoy hot or iced.",
    "featured": false
  },
  {
    "id": "prod-shilajit-honey-combo",
    "name": "Pahadi Sher Shilajit and Honey Combo (10 gm + 100 gm)",
    "slug": "shilajit-honey-combo",
    "subtitle": "Pahadi Sher Organic Honey (100gm) and Pahadi Sher Organic Shilajit (10gm) together form a ",
    "category": "combos",
    "categoryName": "Combos",
    "price": 1250,
    "originalPrice": 2100,
    "discountPercent": 40,
    "rating": 4.9,
    "reviewsCount": 246,
    "altitude": "6,500 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "10 gm + 100 gm",
    "sku": "TPS-COMBOS-24",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Shehed_And_Shilajit.png?v=1773821723"
    ],
    "badge": "BESTSELLER",
    "inStock": true,
    "stockQuantity": 53,
    "description": "Pahadi Sher Organic Honey (100gm) and Pahadi Sher Organic Shilajit (10gm) together form a premium Shilajit and Honey Combo designed to boost natural strength, immunity, and daily vitality. This Quality Honey Combo originates from the pristine Himalayan regions. It ensures the highest quality by combining the unparalleled benefits of Raw organic Honey and pahadi organic shilajit. These natural nutrients help support your body’s wellness every day for optimal health.\n\nOur Pahadi Honey is carefully harvested from the mountains and is completely unprocessed and chemical-free. It is rich in natural enzymes, antioxidants, and essential minerals. These elements deliver clean, natural energy that supports digestion and boosts immunity. This honey is a perfect natural sweetener for anyone following a health-conscious lifestyle.\n\nThe Shilajit and Honey Combo is notable for its unique synergistic benefits. The Himalyan shilajit resin included in this combo is traditionally purified and packed with fulvic acid and over 80 trace minerals. The potent 10gm dosage of this premium shilajit resin is ideal for daily use. It helps improve strength, stamina, metabolism, and hormonal balance to enhance overall vitality.\n\nWhat’s Included in the Shilajit and Honey Combo\n\nPahadi Sher Organic Honey – 100gm (Raw and Unprocessed Himalayan Honey)\n\nPahadi Sher Organic Shilajit – 10gm (Premium Himalayan Resin with high potency)\n\nKey Features of Our Pahadi Shilajit and Honey Combo\n\n✔ 100% pure and natural Himalayan products sourced from trusted mountain regions\n\n✔ Raw organic honey loaded with natural enzymes, antioxidants, and essential minerals\n\n✔ Pure shilajit resin rich in fulvic acid and over 80 trace minerals\n\n✔ Free from preservatives, chemicals, and added sugars for pure quality\n\n✔ Crafted to meet rigorous purity standards of organic honey and shilajit products\n\n✔ Lab-tested for safety and high potency, guaranteeing superior effectiveness\n\nBenefits of the Shilajit and Honey Combo\n\nBoosts natural energy and stamina, making it an ideal natural energy combo\n\nSupports immunity and digestive health with every nutritious spoonful\n\nEnhances metabolism and accelerates recovery from fatigue and exhaustion\n\nHelps maintain hormonal balance and overall vitality for daily wellness\n\nProvides clean nutrition comparable to traditional Pahadi Honey health diets\n\nPromotes overall strength, endurance, and wellness for active lifestyles\n\nThis Shilajit and Honey Combo suits individuals seeking pure Himalayan products with authentic organic ingredients. It echoes the rich tradition of organic Pahadi Shilajit and pure honey, making it essential for your natural wellness regimen. These products work together, maximizing the benefits of your natural health routine.\n\nThe unique pairing of raw honey and the Himalayan shilajit resin is formulated to provide targeted health advantages. These elements complement each other to amplify their effects when used daily. Whether you need a powerful strength booster or a healthful sweetener, this combo fits perfectly into your lifestyle.\n\nEach item in this combo is sourced directly from the Himalayan mountains. Strict collection and purification methods ensure maximum potency and authenticity. You receive only pure pahadi organic shilajit and unadulterated Raw organic Honey, affirming the product’s superior quality.\n\nNote - Images shown are digitally generated mockups. Actual product and packaging may vary, but ingredients and quality remain consistently excellent.\n\nOrganic Shilajit, Pahadi Sher Shilajit, Organic Shilajit Uttarakhand, Himalayan Shilajit Resin, Pure Himalayan Shilajit, Raw Shilajit Resin, Best Shilajit India, Natural Shilajit, Premium Shilajit, High Potency Shilajit, Shilajit Benefits, Fulvic Acid Shilajit, Original Shilajit, Ayurvedic Shilajit, Pure Resin Shilajit, Pahadi Shilajit, Himalayan Organic Shilajit, Best Shilajit Brand, Shilajit for Strength, Shilajit for Stamina, Men’s Vitality Shilajit, Energy Booster Shilajit, Natural Energy Shilajit, Authentic Himalayan Shilajit, Shilajit from Mountains, Uttarakhand Shilajit, Organic Shilajit Resin, Purest Shilajit, Lab Tested Shilajit, Traditional Shilajit, Shilajit Supplement\n\nOrganic Honey, Pahadi Sher Honey, Raw Organic Honey, Himalayan Honey, Uttarakhand Honey, Pithoragarh Honey, Wildforest Honey, Herbal Honey, Natural Honey, Pure Honey, Pure Organic Honey, Raw Mountain Honey, Unprocessed Honey, Chemical Free Honey, Natural Energy Honey, Honey for Immunity, Best Organic Honey, Ayurvedic Honey, Wildflower Honey, Raw Bee Honey, Cold Extracted Honey, Real Honey, Pure Raw Honey, Mountain Nectar Honey, Healthy Honey, Natural Sweetener Honey, Organic Honey Brand, Raw Himalayan Honey, Natural Wellness Honey, High Quality Honey\n\nOrganic Ghee, Pahadi Sher Ghee, Himalayan Ghee, Bilona Ghee, A2 Cow Ghee, Pure Organic Ghee, Desi Ghee Organic, Uttarakhand Ghee, Mountain Ghee, Traditional Bilona Ghee, Cow Ghee Organic, High Nutrient Ghee, Natural Cow Ghee, Farm Fresh Ghee, A2 Gir Ghee, Ayurvedic Ghee, Desi Cow Ghee, Grassfed Ghee, Pure Desi Ghee, Village Ghee, Mountain Made Ghee, Best Organic Ghee, Premium Ghee Brand, Herbal Ghee, Himalayan Cow Ghee, Organic A2 Ghee, Raw Organic Ghee, Traditional Organic Ghee, Pure Handmade Ghee, Authentic Himalayan Ghee.\n\nNote: Shilajit is produced in-house, while ghee, honey & other product's are sourced from our own units and trusted local farmers of Pithoragarh district, followed by strict quality check",
    "benefits": [
      "Note: Shilajit is produced in-house, while ghee, honey & other product's are sourced from our own units and trusted local farmers of Pithoragarh district, followed by strict quality check"
    ],
    "ingredients": [
      "Pahadi Sher Shilajit and Honey Combo (10 gm + 100 gm)",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Consume directly or prepare as per dish instructions.",
    "featured": false
  },
  {
    "id": "prod-pahadi-shilajit-combo",
    "name": "Pahadi Sher Shilajit,  Ghee and Honey Triple Combo (10gm + 500gm + 100gm)",
    "slug": "pahadi-shilajit-combo",
    "subtitle": "Pahadi Wellness Combo (Ghee 500gm + Shilajit 10gm + Honey 100gm)",
    "category": "combos",
    "categoryName": "Combos",
    "price": 2400,
    "originalPrice": 3600,
    "discountPercent": 33,
    "rating": 4.7,
    "reviewsCount": 253,
    "altitude": "6,500 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "10gm + 500gm + 100gm",
    "sku": "TPS-COMBOS-25",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Shilajit_sehed_Ghee.png?v=1773823305"
    ],
    "badge": "BESTSELLER",
    "inStock": false,
    "stockQuantity": 54,
    "description": "Pahadi Wellness Combo (Ghee 500gm + Shilajit 10gm + Honey 100gm)\nExperience the profound nourishment of the Himalayas with the Pahadi Sher Organic Ghee (500gm), Organic Shilajit (10gm), and Organic Honey (100gm) combo. This powerful blend known as the pahadi shilajit honey combo is handcrafted to enhance natural strength, boost immunity, and promote overall wellness.\n\nThis exclusive trio combines quality Organic ghee, high-potency Pahadi shilajit, and Pahadi honey. All ingredients come from the pristine Himalayan region, ensuring each product is pure, rich, and authentic. Together, these ingredients represent the best in organic wellness foods for your health and vitality.\n\nPahadi Organic Ghee – 500gm\nPrepared using the traditional bilona method, this best quality ghee originates from grass-fed Himalayan cows. It contains omega fatty acids, vitamins A, D, E & K, and antioxidants. These nutrients support gut health, digestion, brain function, immunity, and natural energy all day.\n\nThe high purity level of this ghee sets a strong benchmark for 100% pure ghee quality. It is essential for anyone following a natural health diet, especially Ayurveda or fitness enthusiasts seeking wellness benefits.\n\nPahadi Organic Shilajit – 10gm\nThis shilajit resin is harvested from high-altitude Himalayan rocks and is full of Fulvic Acid, Humic Acid, and more than 80 trace minerals. It supports stamina, strength, metabolism, hormonal balance, and recovery. Despite the small jar size, the power of this 10gm shilajit is significant for daily health support.\n\nInclusion of pure shilajit creates a true powerhouse for vitality and wellness support in this combo.\n\nPahadi Sher Organic Honey – 100gm\nCollected from Himalayan forest bees, this raw and unprocessed honey packs enzymes, minerals, and natural antioxidants. It naturally boosts immunity, improves digestion, and increases energy levels. This Pahadi honey is both a natural sweetener and a health booster daily.\n\nThe 100% pure honey in the combo preserves natural flavors and nutrition without additives. It ensures genuine Himalayan sweetness in every drop for true health benefits.\n\nKey Features of the Pahadi Shilajit Honey Combo\n\n100% pure, natural & organic Chandak Pithorgarh sourced ingredients\n\nOrganic ghee prepared traditionally with the bilona method\n\nPure, unfiltered Himalayan forest honey\n\nHigh-potency shilajit resin enriched with Fulvic Acid\n\nFree from chemicals, preservatives, or adulteration\n\nMeets premium organic ghee purity standards\n\nPerfect for Ayurveda, fitness routines, and daily wellness\n\nBenefits of Using the Pahadi Wellness Combo\n\nBoosts energy, stamina & overall strength naturally\n\nSupports gut health, digestion & immunity\n\nEnhances metabolism and promotes hormonal balance\n\nImproves mental clarity and accelerates recovery processes\n\nProvides clean, natural nutrition similar to traditional organic ghee wellness diets\n\nEncourages comprehensive Himalayan wellness\n\nWhy Choose the Pahadi 3-in-1 Combo Pack?\nThis pahadi shilajit honey and Ghee delivers pure organic ghee, robust Pahadi shilajit, and sweet raw Pahadi honey. Each product is crafted with purity and authenticity under the trusted Pahadi brand.\n\nThe combo pack serves as a complete natural health package supporting vitality every day. It suits Ayurveda enthusiasts and fitness seekers alike. This versatile pack promotes wellness in a natural and safe way.\n\nIncorporating this combo pack into your lifestyle encourages long-term health inspired by authentic Himalayan methods and pure ingredients.\n\nEnhance Your Daily Wellness with the Pahadi Shilajit Honey Combo\nRegular use of this pahadi wellness combo means enjoying the finest natural food supplements. Its blend of organic ghee, shilajit, and honey targets many health areas simultaneously. This makes it uniquely effective compared to single supplements.\n\nRely on the power of this pahadi shilajit honey combo for natural strength, improved immunity, and lasting vitality. The purity of each product guarantees maximum nutritional benefits and authentic quality.\n\nHere’s What Makes This Combo Pack Special\nEach jar contains responsibly sourced, carefully crafted ingredients ensuring the highest quality. Our Product is made using traditional methods, preserving valuable nutrients. The potent shilajit resin remains pure and untainted. The Pahadi honey is raw, unprocessed, and rich in natural health benefits.\n\nThis harmonized product is perfect for those seeking authentic Himalayan wellness all in one pack.\n\nNote: Shilajit is produced in-house, while ghee, honey & other products are sourced from trusted local farmers of Pithoragarh district, followed by a strict quality check.",
    "benefits": [
      "Note: Shilajit is produced in-house, while ghee, honey & other products are sourced from trusted local farmers of Pithoragarh district, followed by a strict quality check."
    ],
    "ingredients": [
      "Pahadi Sher Shilajit,  Ghee and Honey Triple Combo (10gm + 500gm + 100gm)",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Consume directly or prepare as per dish instructions.",
    "featured": false
  },
  {
    "id": "prod-tulsi-green-tea",
    "name": "Organic Kumaon Tulsi Green Tea",
    "slug": "tulsi-green-tea",
    "subtitle": "Immunity & Stress Relief • Sacred Tulsi, Citrus Lemongrass & Sweet Mulethi",
    "category": "teas",
    "categoryName": "Herbal Tea",
    "price": 250,
    "originalPrice": 500,
    "discountPercent": 50,
    "rating": 4.95,
    "reviewsCount": 210,
    "altitude": "6,500 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "25 Tea Bag Envelopes",
    "sku": "TPS-TEA-TULSI25",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/TulsiGreenTea_4.png?v=1774509030",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Tulsi_Green_Tea_2.png?v=1774509074",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Tulsi_Green_Tea_1.png?v=1774509115",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Tulsi_Green_Tea_3.png?v=1774509148"
    ],
    "badge": "NEW",
    "inStock": true,
    "stockQuantity": 45,
    "description": "Experience the essence of the Himalayas in every sip. Rejuvenate body and mind with Organic Kumaon Tulsi Green Tea. Sourced from the pristine hills of Uttarakhand, this blend combines the Queen of Herbs (Tulsi) with refreshing Lemongrass and soothing Mulethi (Licorice). Each tea bag is a powerhouse of antioxidants.",
    "benefits": [
      "Sacred Adaptogenic Tulsi: Helps lower daily stress, anxiety, and enhances natural immunity",
      "Immunity & Digestive Power: Lemongrass aids metabolic speed and digestive freshness",
      "Respiratory Comfort: Mulethi soothes throat irritation and supports respiratory wellness",
      "Heat-Sealed Freshness: 25 envelopes individually sealed to lock in natural essential oils"
    ],
    "ingredients": [
      "Organic Holy Tulsi Leaves",
      "High-Altitude Himalayan Green Tea",
      "Lemongrass",
      "Mulethi (Licorice)"
    ],
    "howToUse": "Place 1 tea bag in a cup, pour 100ml freshly boiled water. Steep for 2-3 minutes. Enjoy hot or iced without milk.",
    "featured": true,
    "labCertificateNo": "PAH-TEA-TULSI-2026",
    "harvestSeason": "Spring Harvest 2026"
  },
  {
    "id": "prod-pahadi-sher-wellness-combo-shilajit-10-gm-buransh-herbal-tea-50-gm",
    "name": "Pahadi Sher Wellness Combo – Shilajit (10 gm) + Buransh Herbal Tea (50 gm)",
    "slug": "pahadi-sher-wellness-combo-shilajit-10-gm-buransh-herbal-tea-50-gm",
    "subtitle": "Pahadi Sher Shilajit (10 gm) + Buransh Herbal Tea (50 gm)",
    "category": "combos",
    "categoryName": "Combos",
    "price": 1350,
    "originalPrice": 1550,
    "discountPercent": 13,
    "rating": 4.9,
    "reviewsCount": 267,
    "altitude": "6,500 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "10 gm",
    "sku": "TPS-COMBOS-27",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Silajit_Herbal1_1c843dd5-c700-47d9-b38f-e051db20a535.png?v=1774857515"
    ],
    "badge": "BESTSELLER",
    "inStock": true,
    "stockQuantity": 31,
    "description": "Pahadi Sher Shilajit (10 gm) + Buransh Herbal Tea (50 gm)\nExperience the pure power of the Himalayas with the Pahadi Sher Wellness Combo, a thoughtfully curated duo that combines the strength of authentic Himalayan Shilajit with the soothing goodness of Kumaoni Buransh Herbal Tea. Sourced directly from the pristine mountains of Pithoragarh in the Kumaon region, this combo delivers a perfect balance of energy, vitality, and daily wellness.\n\nWhat’s Inside the Combo?\n1. Pahadi Sher  Shilajit \n A rare, mineral-rich Himalayan resin, hand-collected from high-altitude cliffs and purified using traditional Ayurvedic methods. Packed with Fulvic Acid, Humic Acid, and 80+ trace minerals, this natural powerhouse supports stamina, strength, immunity, and overall vitality.\n\n2. Buransh Herbal Tea (with Mulethi & Ginger Green Tea)\n A refreshing floral infusion made from Buransh (Rhododendron) petals, blended with Ginger, Mulethi, and Green Tea. This soothing beverage promotes heart health, digestion, immunity, and detoxification while delivering a calming, aromatic experience.\n\nWhy Choose This Himalayan Combo?\n✔ Complete Daily Wellness – Boost your energy with Shilajit and relax your body with antioxidant-rich herbal tea.\n ✔ Natural Stamina & Recovery – Supports physical performance, endurance, and post-workout recovery.\n ✔ Immunity & Detox Support – Strengthens natural defenses while helping cleanse the body.\n ✔ Mental Clarity & Relaxation – Enhances focus during the day and promotes calmness in the evening.\n ✔ 100% Pure & Chemical-Free – No additives, fillers, or artificial ingredients—only authentic Himalayan goodness.\n\nThe Power of the Himalayas\nThis combo captures the essence of ancient Ayurvedic wisdom and the untouched purity of the Himalayas. While Shilajit is revered as a powerful Rasayana (rejuvenator), Buransh tea brings centuries-old herbal wellness traditions into your daily routine. Together, they create a balanced lifestyle—energize your body, calm your mind, and strengthen your immunity naturally.\n\nHow to Use\n\nMorning: Take a small portion of Shilajit resin with lukewarm water or milk for sustained energy.\n\nEvening: Unwind with a warm cup of Buransh Herbal Tea for relaxation and detox.\n\nPerfect For\n\nDaily energy & stamina\n\nStress relief & relaxation\n\nImmunity boosting\n\nFitness & recovery support\n\nHolistic lifestyle seekers\n\nPahadi Sher Wellness Combo – Where Strength Meets Serenity\nReconnect with nature and elevate your wellness routine with this powerful Himalayan duo—crafted for those who seek purity, performance, and peace in every day.",
    "benefits": [
      "Morning: Take a small portion of Shilajit resin with lukewarm water or milk for sustained energy.",
      "Evening: Unwind with a warm cup of Buransh Herbal Tea for relaxation and detox."
    ],
    "ingredients": [
      "Pahadi Sher Wellness Combo – Shilajit (10 gm) + Buransh Herbal Tea (50 gm)",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Steep 1 bag or 1 tsp in 100ml hot water for 2-3 minutes. Enjoy hot or iced.",
    "featured": false
  },
  {
    "id": "prod-pahadi-combo",
    "name": "Pahadi Shilajit and Ghee Combo (10gm + 500gm)",
    "slug": "pahadi-combo",
    "subtitle": "Pahadi Organic Ghee (500gm) + Shilajit (10gm)",
    "category": "combos",
    "categoryName": "Combos",
    "price": 2200,
    "originalPrice": 2800,
    "discountPercent": 21,
    "rating": 4.7,
    "reviewsCount": 274,
    "altitude": "6,500 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "10gm + 500gm",
    "sku": "TPS-COMBOS-28",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Ghee_and_Shilajit.png?v=1773823651"
    ],
    "badge": "BESTSELLER",
    "inStock": false,
    "stockQuantity": 32,
    "description": "Pahadi Organic Ghee (500gm) + Shilajit (10gm)\nExperience authentic Himalayan wellness with the Pahadi Shilajit Ghee Combo, a carefully curated blend of organic ghee and premium mountain-sourced Shilajit. This unique Pahadi Combo supports daily strength, immunity, energy, and overall vitality, inspired by centuries-old Ayurvedic traditions.\n\nThe ghee in this combo is prepared from milk of grass-fed cows in the chandak hills regions. Using the traditional bilona method, it retains healthy fats, natural omegas, and fat-soluble vitamins like A, D, E, and K. This pure ghee enhances digestion, supports immunity, sharpens mental focus, and provides steady, natural energy. It suits cooking, wellness routines, and Ayurvedic diets alike.\n\nIncluded in this package is the Pahadi Shilajit Pithoragarh, a hand-purified Himalayan resin rich in Fulvic Acid, Humic Acid, and over 80 trace minerals. Regular use of this pure shilajit promotes stamina, metabolism, recovery, hormonal balance, and overall vitality. Even a small daily serving delivers powerful natural benefits.\n\nWhy Choose This Pahadi Shilajit Ghee Combo\n\nBoosts natural energy, stamina, and strength with nutrition sourced directly from the hills\n\nSupports immunity and healthy metabolism through mineral-rich Shilajit and bilona-made organic ghee\n\nImproves digestion, gut health, and nutrient absorption naturally\n\nIdeal for Ayurveda, fitness routines, and daily wellness with 100% natural ingredients\n\nWhat’s Included\n\nPithoragarh Pahadi Ghee – 500gm (Bilona method, grass-fed cows, pure desi ghee)\n\nPahadi Shilajit – 10gm (Himalayan hand-purified resin)\n\nKey Features\n\nMade using traditional methods in the Pithoragarh region\n\nNaturally rich in beneficial fats, vitamins, and antioxidants\n\nPithoragarh, Chandak Hill Pure Shilajit High-quality resin containing Fulvic Acid and essential minerals\n\nFree from chemicals, preservatives, and adulteration\n\nSuitable for daily nutrition, wellness, and active lifestyles\n\nBenefits\n\nPahadi Shilajit Helps increase energy, stamina, and physical strength\n\nSupports digestion and gut balance\n\nStrengthens immunity and improves metabolism\n\nAids hormonal balance and overall vitality\n\nPromotes mental clarity, recovery, and long-term wellness\n\nNote: Shilajit is produced in-house, while ghee, honey & other product's are sourced from our own units and trusted local farmers of Pithoragarh district, followed by strict quality check\n\nNote: Images shown are digitally generated mockups. Actual product and packaging may vary, though ingredients and quality stay consistent.",
    "benefits": [
      "Note: Shilajit is produced in-house, while ghee, honey & other product's are sourced from our own units and trusted local farmers of Pithoragarh district, followed by strict quality check",
      "Note: Images shown are digitally generated mockups. Actual product and packaging may vary, though ingredients and quality stay consistent."
    ],
    "ingredients": [
      "Pahadi Shilajit and Ghee Combo (10gm + 500gm)",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Consume directly or prepare as per dish instructions.",
    "featured": false
  },
  {
    "id": "prod-pahadi-soya-chunks",
    "name": "Pahadi Soya Chunks (250gm)",
    "slug": "pahadi-soya-chunks",
    "subtitle": "Organic Kumaon High-Protein Soya Chunks (Soya Badi)",
    "category": "pahadi-foods",
    "categoryName": "Pahadi Foods",
    "price": 250,
    "originalPrice": 350,
    "discountPercent": 29,
    "rating": 4.8,
    "reviewsCount": 281,
    "altitude": "6,500 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": "250gm",
    "sku": "TPS-PAHADI-FOODS-29",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Soyabin_1.jpg?v=1774522043",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Soyabin_1_08150ef2-039b-4652-9e45-e54f00e24c58.jpg?v=1774522131",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Soyabin_3.jpg?v=1774522186",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Soyabin_2.jpg?v=1774522213"
    ],
    "badge": "SALE",
    "inStock": true,
    "stockQuantity": 33,
    "description": "Organic Kumaon High-Protein Soya Chunks (Soya Badi)\n\nPure Plant-Based Protein from the Heart of the Himalayas.\n\nBring the health and taste of the hills to your kitchen with Organic Kumaon Soya Chunks. Known as \"Soya Badi,\" these chunks are a versatile, nutrient-dense meat substitute that provides a powerful protein punch for vegetarians and fitness enthusiasts alike.\n\nSourced with care, our soya chunks are processed to maintain their natural texture, ensuring they absorb flavors beautifully in every curry, pulao, or stir-fry you create.\n\nKey Benefits:\n\nHigh Protein Content: A fantastic source of plant-based protein, essential for muscle building and daily energy.\n\nLow in Fat & Cholesterol: A heart-healthy alternative to meat that keeps you feeling light and active.\n\nSuperior Texture: Soft, spongy, and juicy once cooked; they perfectly soak up spices and gravies.\n\nRich in Fiber: Supports healthy digestion and keeps you full for longer.\n\nChemical-Free: Naturally processed without artificial preservatives or additives.\n\nProduct Specifications:\n\nBrand: Organic Kumaon\n\nItem: Soya Chunks (Soya Badi)\n\nDietary Type: 100% Vegetarian / Vegan-friendly\n\nOrigin: Pithoragarh, Uttarakhand\n\nUsage: Ideal for Soya Curry, Biryani, Salads, and Manchurian.\n\nCooking Instructions:\n\nSoak: Add the soya chunks to boiling water with a pinch of salt.\n\nWait: Let them soak for 10–15 minutes until they become soft and double in size.\n\nSqueeze: Rinse with cold water and squeeze out the excess moisture.\n\nCook: Add them to your favorite masala base or stir-fry and enjoy!\n\nStorage Tip: Keep in an airtight container in a cool, dry place to maintain crispness and nutritional value.",
    "benefits": [
      "Key Benefits:",
      "High Protein Content: A fantastic source of plant-based protein, essential for muscle building and daily energy.",
      "Low in Fat & Cholesterol: A heart-healthy alternative to meat that keeps you feeling light and active.",
      "Superior Texture: Soft, spongy, and juicy once cooked; they perfectly soak up spices and gravies."
    ],
    "ingredients": [
      "Pahadi Soya Chunks (250gm)",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Consume directly or prepare as per dish instructions.",
    "featured": false
  },
  {
    "id": "prod-pahadisherorganic-ghee",
    "name": "Pure Pahadi Organic Ghee ( 500 gm )",
    "slug": "pahadisherorganic-ghee",
    "subtitle": "Pahadi Ghee – Pure Himalayan Nutrition from Pithoragarh",
    "category": "ghee",
    "categoryName": "Ghee",
    "price": 1300,
    "originalPrice": 1500,
    "discountPercent": 13,
    "rating": 4.9,
    "reviewsCount": 288,
    "altitude": "6,500 FT",
    "origin": "Pithoragarh, Uttarakhand",
    "netQuantity": " 500 gm ",
    "sku": "TPS-GHEE-30",
    "images": [
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Pahadi_Ghee.png?v=1773822440",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Ghee.jpg?v=1773822440",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/WhatsApp_Image_2026-03-16_at_3.51.27_PM.jpg?v=1773822440",
      "https://cdn.shopify.com/s/files/1/0739/5223/1476/files/WhatsApp_Image_2026-03-16_at_3.52.00_PM.jpg?v=1773822440"
    ],
    "badge": "BESTSELLER",
    "inStock": true,
    "stockQuantity": 34,
    "description": "Pahadi Ghee – Pure Himalayan Nutrition from Pithoragarh\nOrganic Ghee is a premium-grade Himalayan bilona ghee crafted from pure, organic mountain milk. It is sourced directly from the Kumaun region of Pithoragarh, a place renowned for its clean air and rich biodiversity. This pristine environment helps preserve the original purity and high quality of the Himalayan bilona ghee. As a natural cooking ghee, it fits perfectly into daily wellness routines and traditional diets alike.\n\nThis organic ghee is produced in small batches to maintain its authentic aroma, rich golden color, and maximum nutritional benefits. The preparation follows the traditional bilona method—a slow, meticulous Ayurvedic process that preserves essential nutrients. This technique ensures the ghee is flavorful yet easy to digest, offering significant health advantages for daily use.\n\nNaturally Sourced & Carefully Prepared\nThe milk used in this grass-fed cow ghee comes from cows grazing freely on Himalayan grasses and native herbs. This natural diet significantly enriches the flavor and purity of the final product. No preservatives, chemicals, or artificial flavors are added at any stage, guaranteeing genuine authenticity and safety.\n\nSuch careful sourcing results in a natural cooking ghee rich in fat-soluble vitamins like A, D, E, and K, alongside healthy fats and antioxidants. These key nutrients support digestion, boost immunity, strengthen bones, and promote mental wellness. Additionally, naturally occurring conjugated linoleic acid (CLA) aids metabolism and provides clean, sustained energy throughout the day.\n\nHealth Benefits of Pahadi Sher Organic Ghee\n\nSupports digestion and helps maintain gut balance\n\nBoosts natural immunity and overall wellness\n\nPromotes joint, bone, and muscle health\n\nEnhances brain function and memory retention\n\nNourishes skin and hair deeply from within\n\nIn Ayurveda, this traditional Indian ghee is treasured as a rejuvenating food. It honors that legacy by delivering purity, care, and consistent quality every time you open a jar.\n\nEveryday Versatility of Pahadi Sher Organic Ghee\nThis Himalayan bilona ghee suits a variety of uses, including cooking, daily meal preparation, Ayurvedic treatments, and rituals. Its natural taste blends effortlessly with both traditional Indian diets and modern eating habits. It enhances flavors subtly without overpowering meals, making it an excellent choice for all ages and cuisines.\n\nWhy Choose Pahadi Sher Organic Ghee?\nPahadi Sher stands as a symbol of authenticity, transparency, and Himalayan heritage. Each jar reflects care in sourcing, traditional grassroots preparation, and deep respect for nature. It is more than just a natural cooking ghee it represents a balanced and mindful lifestyle option embraced by many.\n\nIf you seek a wholesome, natural choice that supports daily nutrition and long-term wellness, Pahadi Sher Organic Ghee is a reliable option rooted in rich tradition and quality craftsmanship.\n\nPahadi ghee is a traditional Himalayan food, valued for its purity, nutrition, natural cooking ghee and Himalayan bilona ghee methods. It is slowly prepared to preserve aroma, texture, and essential nutrients. The natural fats help support daily energy and overall balance. Regular use fits well into mindful eating habits and traditional lifestyles. Its smooth consistency and rich flavor enhance everyday meals without overpowering them. Suitable for cooking and daily consumption, it blends easily into modern routines. Prepared with care and attention, this nourishing food reflects heritage, simplicity, and long-term wellness. It is a trusted choice for households seeking clean, wholesome nourishment.\n\nNote: Shilajit is produced in-house, while ghee, honey & other product's are sourced from our own units and trusted local farmers of Pithoragarh district, followed by strict quality check\n\nNote: Images shown here are digitally generated mockups. Actual product packaging and appearance may vary, but the ingredients, purity, and quality always remain unchanged.\n\nAll products are made or processed in the Chandak Hills of Pithoragarh, Uttarakhand. This Himalayan region is celebrated for its clean air, natural ecosystems, and traditional preparation methods. The traditional indian ghee is made in small batches using time-honored techniques, preserving authenticity, nutrition, and long-term wellness benefits. Inspired by Himalayan living traditions.",
    "benefits": [
      "Note: Shilajit is produced in-house, while ghee, honey & other product's are sourced from our own units and trusted local farmers of Pithoragarh district, followed by strict quality check",
      "Note: Images shown here are digitally generated mockups. Actual product packaging and appearance may vary, but the ingredients, purity, and quality always remain unchanged."
    ],
    "ingredients": [
      "Pure Pahadi Organic Ghee ( 500 gm )",
      "Pure Himalayan Natural Ingredients"
    ],
    "howToUse": "Consume directly or prepare as per dish instructions.",
    "featured": false
  }
];

export const products: Product[] = rawProducts.map(p => {
  const threshold = p.lowStockThreshold || 5;
  const isDisc = p.isDiscontinued || false;

  const enrichedVariants = p.variants?.map(v => {
    const vThreshold = v.lowStockThreshold || 5;
    const vReserved = v.reservedQuantity || 0;
    const vAvailable = Math.max(0, v.stockQuantity - vReserved);
    const vSold = v.soldQuantity || Math.floor(v.stockQuantity * 1.8) + 12;
    const vStatus = computeInventoryStatus(vAvailable, vThreshold, isDisc);
    return {
      ...v,
      reservedQuantity: vReserved,
      availableQuantity: vAvailable,
      soldQuantity: vSold,
      lowStockThreshold: vThreshold,
      status: vStatus,
      inStock: vAvailable > 0 && vStatus !== 'Discontinued'
    };
  });

  const reserved = p.reservedQuantity || 0;
  const available = Math.max(0, p.stockQuantity - reserved);
  const sold = p.soldQuantity || Math.floor(p.stockQuantity * 2.2) + 45;
  const status = computeInventoryStatus(available, threshold, isDisc);

  return {
    ...p,
    reservedQuantity: reserved,
    availableQuantity: available,
    soldQuantity: sold,
    lowStockThreshold: threshold,
    status: status,
    inStock: available > 0 && status !== 'Discontinued',
    variants: enrichedVariants
  };
});
