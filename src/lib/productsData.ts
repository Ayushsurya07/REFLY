export interface ProductColor {
  name: string;
  hex: string;
  available: boolean;
}

export interface ProductSize {
  label: string;
  available: boolean;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductFabric {
  composition: string;
  weight: string;
  origin: string;
  finish: string;
  stretch: string;
}

export interface FullProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  subcategory?: string;
  fit: string;
  price: number;
  mrp: number;
  discount: number;
  gstRate: number;
  hsnCode: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  tag?: string;
  description: string;
  colors: ProductColor[];
  sizes: ProductSize[];
  images: ProductImage[];
  fabric: ProductFabric;
  care: string[];
}

export const PRODUCTS_LIST: FullProduct[] = [
  // CARGOS
  {
    id: 'zip-cargos',
    name: 'Tactical Zip Cargo Pants',
    sku: 'RFY-CRG-001',
    category: 'cargos',
    subcategory: 'Zip cargos',
    fit: 'Relaxed Tapered',
    price: 3499,
    mrp: 5499,
    discount: 36,
    gstRate: 18,
    hsnCode: '6203',
    rating: 4.9,
    reviewCount: 189,
    inStock: true,
    tag: 'New',
    description: 'Engineered for modern movement. Features high-tensile zip cargo pockets, heavy-duty Japanese cotton twill, and an ergonomic tapered leg.',
    colors: [
      { name: 'Tactical Olive', hex: '#4a4a3a', available: true },
      { name: 'Stealth Black', hex: '#1a1a1a', available: true },
    ],
    sizes: [
      { label: '30', available: true },
      { label: '32', available: true },
      { label: '34', available: true },
      { label: '36', available: true },
    ],
    images: [
      { src: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80', alt: 'Tactical Zip Cargo Pants Front' },
      { src: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&q=80', alt: 'Tactical Zip Cargo Detail' },
    ],
    fabric: {
      composition: '95% Ripstop Cotton, 5% Spandex',
      weight: '10.5 oz',
      origin: 'Kobe, Japan',
      finish: 'DWR Water-Repellent',
      stretch: '4-Way Ergonomic Stretch',
    },
    care: ['Machine wash cold (30°C)', 'Wash inside out', 'Do not bleach', 'Air dry recommended'],
  },
  {
    id: 'patch-pocket-cargo',
    name: 'Utility Patch Pocket Cargo',
    sku: 'RFY-CRG-002',
    category: 'cargos',
    subcategory: 'patch pocket cargo',
    fit: 'Tapered',
    price: 3999,
    mrp: 5999,
    discount: 33,
    gstRate: 18,
    hsnCode: '6203',
    rating: 4.8,
    reviewCount: 154,
    inStock: true,
    description: 'Crafted with dual patch bellow pockets and reinforced double-layer knees. Premium utility construction tailored for street and outdoor wear.',
    colors: [
      { name: 'Jet Black', hex: '#000000', available: true },
      { name: 'Military Khaki', hex: '#3a3a2a', available: true },
    ],
    sizes: [
      { label: '28', available: true },
      { label: '30', available: true },
      { label: '32', available: true },
      { label: '34', available: true },
    ],
    images: [
      { src: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80', alt: 'Utility Patch Pocket Cargo' },
      { src: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&q=80', alt: 'Patch Pocket Detail' },
    ],
    fabric: {
      composition: '98% Cotton Twill, 2% Elastane',
      weight: '11.0 oz',
      origin: 'Okayama, Japan',
      finish: 'Garment Dyed',
      stretch: 'Comfort Stretch',
    },
    care: ['Machine wash cold', 'Wash with dark colors', 'Cool iron if needed'],
  },
  {
    id: 'elastic-cargo',
    name: 'Elastic Comfort Cargo',
    sku: 'RFY-CRG-003',
    category: 'cargos',
    subcategory: 'elastic cargo',
    fit: 'Regular',
    price: 2999,
    mrp: 4499,
    discount: 33,
    gstRate: 18,
    hsnCode: '6203',
    rating: 4.7,
    reviewCount: 112,
    inStock: true,
    description: 'Combines an elasticated drawcord waist with functional cargo utility. Soft brushed cotton with flexible range of motion.',
    colors: [
      { name: 'Navy Blue', hex: '#2c3e50', available: true },
      { name: 'Charcoal', hex: '#1a1a1a', available: true },
    ],
    sizes: [
      { label: '30', available: true },
      { label: '32', available: true },
      { label: '34', available: true },
      { label: '36', available: true },
    ],
    images: [
      { src: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80', alt: 'Elastic Comfort Cargo' },
    ],
    fabric: {
      composition: '97% Brushed Cotton, 3% Spandex',
      weight: '9.5 oz',
      origin: 'Coimbatore, India',
      finish: 'Soft Wash',
      stretch: '2-Way Stretch',
    },
    care: ['Machine wash cold', 'Tumble dry low'],
  },
  {
    id: 'cargo-shorts-item',
    name: 'Rugged Cargo Shorts',
    sku: 'RFY-CRG-004',
    category: 'cargos',
    subcategory: 'cargo shorts',
    fit: 'Relaxed',
    price: 1999,
    mrp: 2999,
    discount: 33,
    gstRate: 18,
    hsnCode: '6203',
    rating: 4.8,
    reviewCount: 95,
    inStock: true,
    description: 'Durable warm-weather cargo shorts designed with deep flap pockets and an above-knee length cut.',
    colors: [
      { name: 'Olive', hex: '#4a4a3a', available: true },
      { name: 'Black', hex: '#1a1a1a', available: true },
    ],
    sizes: [
      { label: '30', available: true },
      { label: '32', available: true },
      { label: '34', available: true },
    ],
    images: [
      { src: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80', alt: 'Rugged Cargo Shorts' },
    ],
    fabric: {
      composition: '100% Heavyweight Cotton Canvas',
      weight: '8.5 oz',
      origin: 'Ahmedabad, India',
      finish: 'Vintage Wash',
      stretch: 'Non-stretch',
    },
    care: ['Machine wash warm', 'Hang dry'],
  },
  {
    id: 'loose-fit-cargo',
    name: 'Loose Fit Combat Cargo',
    sku: 'RFY-CRG-005',
    category: 'cargos',
    subcategory: 'loose fit cargo',
    fit: 'Relaxed',
    price: 3799,
    mrp: 5799,
    discount: 34,
    gstRate: 18,
    hsnCode: '6203',
    rating: 4.9,
    reviewCount: 210,
    inStock: true,
    tag: 'Best Seller',
    description: 'Wide-leg oversized combat cargo trousers featuring adjustable ankle cuffs and 6 spacious utility pockets.',
    colors: [
      { name: 'Dark Slate', hex: '#2d2d2d', available: true },
      { name: 'Army Olive', hex: '#3a3a2a', available: true },
    ],
    sizes: [
      { label: '30', available: true },
      { label: '32', available: true },
      { label: '34', available: true },
      { label: '36', available: true },
    ],
    images: [
      { src: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80', alt: 'Loose Fit Combat Cargo' },
    ],
    fabric: {
      composition: '100% Ripstop Cotton',
      weight: '10.0 oz',
      origin: 'Osaka, Japan',
      finish: 'Matte Enzyme Wash',
      stretch: 'Natural Comfort',
    },
    care: ['Machine wash cold', 'Wash inside out'],
  },

  // LINEN
  {
    id: 'linen-loose-fit',
    name: 'Linen Loose Fit Trousers',
    sku: 'RFY-LIN-001',
    category: 'linen',
    subcategory: 'lenin loose fit',
    fit: 'Relaxed',
    price: 2799,
    mrp: 4499,
    discount: 38,
    gstRate: 18,
    hsnCode: '6203',
    rating: 4.8,
    reviewCount: 176,
    inStock: true,
    tag: 'Limited',
    description: '100% Pure European Flax Linen trousers designed for effortless breathability and relaxed sophistication.',
    colors: [
      { name: 'Natural Oatmeal', hex: '#d4c5a9', available: true },
      { name: 'Sand Beige', hex: '#c8b99a', available: true },
    ],
    sizes: [
      { label: '30', available: true },
      { label: '32', available: true },
      { label: '34', available: true },
      { label: '36', available: true },
    ],
    images: [
      { src: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80', alt: 'Linen Loose Fit Trousers' },
    ],
    fabric: {
      composition: '100% Pure Linen',
      weight: '6.5 oz',
      origin: 'Normandy, France',
      finish: 'Air Softened',
      stretch: 'Breathable Natural Weave',
    },
    care: ['Hand wash or gentle machine wash', 'Line dry in shade'],
  },
  {
    id: 'linen-chinos',
    name: 'Tailored Linen Chinos',
    sku: 'RFY-LIN-002',
    category: 'linen',
    subcategory: 'Lenin chinos',
    fit: 'Slim',
    price: 2999,
    mrp: 4999,
    discount: 40,
    gstRate: 18,
    hsnCode: '6203',
    rating: 4.9,
    reviewCount: 143,
    inStock: true,
    description: 'Blended linen-cotton chinos combining tailored structure with lightweight airy comfort.',
    colors: [
      { name: 'Off White', hex: '#e8dcc8', available: true },
      { name: 'Warm Taupe', hex: '#b8a898', available: true },
    ],
    sizes: [
      { label: '30', available: true },
      { label: '32', available: true },
      { label: '34', available: true },
    ],
    images: [
      { src: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=800&q=80', alt: 'Tailored Linen Chinos' },
    ],
    fabric: {
      composition: '55% Linen, 45% Cotton',
      weight: '7.5 oz',
      origin: 'Kerala, India',
      finish: 'Pre-shrunk Soft Touch',
      stretch: 'Light Natural Stretch',
    },
    care: ['Machine wash cold', 'Warm iron while damp'],
  },
  {
    id: 'linen-shorts-item',
    name: 'Resort Linen Shorts',
    sku: 'RFY-LIN-003',
    category: 'linen',
    subcategory: 'Lenin shorts',
    fit: 'Regular',
    price: 1899,
    mrp: 2999,
    discount: 36,
    gstRate: 18,
    hsnCode: '6203',
    rating: 4.7,
    reviewCount: 88,
    inStock: true,
    description: 'Linen drawstring shorts designed for vacation and warm coastal afternoons.',
    colors: [
      { name: 'Sand', hex: '#c8b99a', available: true },
      { name: 'Earth Brown', hex: '#8b7355', available: true },
    ],
    sizes: [
      { label: '30', available: true },
      { label: '32', available: true },
      { label: '34', available: true },
    ],
    images: [
      { src: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=800&q=80', alt: 'Resort Linen Shorts' },
    ],
    fabric: {
      composition: '100% Linen',
      weight: '5.8 oz',
      origin: 'France',
      finish: 'Bio-wash',
      stretch: 'None',
    },
    care: ['Gentle cycle wash', 'Do not tumble dry'],
  },
  {
    id: 'zip-pocket-linen',
    name: 'Zip Pocket Linen Pants',
    sku: 'RFY-LIN-004',
    category: 'linen',
    subcategory: 'zip pocket lenin',
    fit: 'Regular',
    price: 3199,
    mrp: 4999,
    discount: 36,
    gstRate: 18,
    hsnCode: '6203',
    rating: 4.8,
    reviewCount: 104,
    inStock: true,
    description: 'Contemporary linen trousers updated with concealed security zip pockets for travel and sleek aesthetics.',
    colors: [
      { name: 'Oatmeal', hex: '#d4c5a9', available: true },
      { name: 'Midnight Black', hex: '#1a1a1a', available: true },
    ],
    sizes: [
      { label: '30', available: true },
      { label: '32', available: true },
      { label: '34', available: true },
      { label: '36', available: true },
    ],
    images: [
      { src: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80', alt: 'Zip Pocket Linen Pants' },
    ],
    fabric: {
      composition: '70% Linen, 30% Organic Cotton',
      weight: '7.0 oz',
      origin: 'Portugal',
      finish: 'Garment Wash',
      stretch: 'Minimal',
    },
    care: ['Machine wash cold', 'Iron low'],
  },

  // COTTON PANTS
  {
    id: 'cotton-chinos',
    name: 'Classic Cotton Chinos',
    sku: 'RFY-COT-001',
    category: 'cotton-pants',
    subcategory: 'Cotton chinos',
    fit: 'Regular',
    price: 2299,
    mrp: 3799,
    discount: 39,
    gstRate: 18,
    hsnCode: '6203',
    rating: 4.9,
    reviewCount: 230,
    inStock: true,
    description: 'Essential everyday cotton chinos featuring a smooth satin weave finish and versatile flat-front tailoring.',
    colors: [
      { name: 'Camel Tan', hex: '#c8a882', available: true },
      { name: 'Dark Khaki', hex: '#8b6914', available: true },
    ],
    sizes: [
      { label: '30', available: true },
      { label: '32', available: true },
      { label: '34', available: true },
      { label: '36', available: true },
    ],
    images: [
      { src: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=800&q=80', alt: 'Classic Cotton Chinos' },
    ],
    fabric: {
      composition: '97% Compact Cotton, 3% Elastane',
      weight: '8.8 oz',
      origin: 'Coimbatore, India',
      finish: 'Peach Finish',
      stretch: 'Comfort Stretch',
    },
    care: ['Machine wash cold', 'Tumble dry medium'],
  },
  {
    id: 'china-bold',
    name: 'China Bold Heavy Twill',
    sku: 'RFY-COT-002',
    category: 'cotton-pants',
    subcategory: 'China bold',
    fit: 'Slim',
    price: 2799,
    mrp: 4299,
    discount: 35,
    gstRate: 18,
    hsnCode: '6203',
    rating: 4.8,
    reviewCount: 167,
    inStock: true,
    tag: 'Hot',
    description: 'Heavyweight cotton twill pants built with structured seams and a bold modern slim cut.',
    colors: [
      { name: 'Forest Teal', hex: '#2f4f4f', available: true },
      { name: 'Charcoal Black', hex: '#1a1a1a', available: true },
    ],
    sizes: [
      { label: '30', available: true },
      { label: '32', available: true },
      { label: '34', available: true },
    ],
    images: [
      { src: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800&q=80', alt: 'China Bold Heavy Twill' },
    ],
    fabric: {
      composition: '98% Heavy Cotton Twill, 2% Spandex',
      weight: '10.2 oz',
      origin: 'Ludhiana, India',
      finish: 'Enzyme Softened',
      stretch: 'Light Stretch',
    },
    care: ['Machine wash inside out'],
  },
  {
    id: 'cotton-shorts-item',
    name: 'Relaxed Cotton Shorts',
    sku: 'RFY-COT-003',
    category: 'cotton-pants',
    subcategory: 'Cotton shorts',
    fit: 'Relaxed',
    price: 1699,
    mrp: 2599,
    discount: 34,
    gstRate: 18,
    hsnCode: '6203',
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    description: 'Breathable 100% cotton casual shorts featuring slant pockets and an elastic drawstring waist.',
    colors: [
      { name: 'Beige', hex: '#c8a882', available: true },
      { name: 'Slate Blue', hex: '#2c3e50', available: true },
    ],
    sizes: [
      { label: '30', available: true },
      { label: '32', available: true },
      { label: '34', available: true },
    ],
    images: [
      { src: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=800&q=80', alt: 'Relaxed Cotton Shorts' },
    ],
    fabric: {
      composition: '100% Combed Cotton',
      weight: '7.2 oz',
      origin: 'Tirupur, India',
      finish: 'Bio-washed',
      stretch: 'Natural Comfort',
    },
    care: ['Machine wash cold'],
  },

  // SHORTS
  {
    id: 'poly-shorts',
    name: 'Performance Polyester Shorts',
    sku: 'RFY-SHT-001',
    category: 'shorts',
    subcategory: 'Polyester shorts',
    fit: 'Tapered',
    price: 1499,
    mrp: 2499,
    discount: 40,
    gstRate: 18,
    hsnCode: '6203',
    rating: 4.9,
    reviewCount: 201,
    inStock: true,
    tag: 'New',
    description: 'Lightweight quick-dry active shorts built from micro-polyester grid matrix fabric with zipper pockets.',
    colors: [
      { name: 'Stealth Black', hex: '#1a1a1a', available: true },
      { name: 'Dark Steel', hex: '#2c2c2c', available: true },
    ],
    sizes: [
      { label: '30', available: true },
      { label: '32', available: true },
      { label: '34', available: true },
    ],
    images: [
      { src: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80', alt: 'Performance Polyester Shorts' },
    ],
    fabric: {
      composition: '92% Recycled Polyester, 8% Elastane',
      weight: '4.8 oz',
      origin: 'Taiwan',
      finish: 'Moisture Wicking, Anti-Odor',
      stretch: '4-Way Performance Stretch',
    },
    care: ['Machine wash cold', 'Quick dry'],
  },
  {
    id: 'shorts-cargo',
    name: 'Heavy Duty Cargo Shorts',
    sku: 'RFY-SHT-002',
    category: 'shorts',
    subcategory: 'Cargo shorts',
    fit: 'Relaxed',
    price: 1799,
    mrp: 2799,
    discount: 35,
    gstRate: 18,
    hsnCode: '6203',
    rating: 4.8,
    reviewCount: 134,
    inStock: true,
    description: 'Reinforced canvas cargo shorts engineered with dual bellows pockets and gusseted crotch.',
    colors: [
      { name: 'Olive Green', hex: '#4a4a3a', available: true },
      { name: 'Dark Grey', hex: '#2d2d2d', available: true },
    ],
    sizes: [
      { label: '30', available: true },
      { label: '32', available: true },
      { label: '34', available: true },
    ],
    images: [
      { src: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80', alt: 'Heavy Duty Cargo Shorts' },
    ],
    fabric: {
      composition: '95% Cotton, 5% Spandex',
      weight: '8.0 oz',
      origin: 'India',
      finish: 'Garment Dyed',
      stretch: 'Comfort Stretch',
    },
    care: ['Machine wash warm'],
  },
  {
    id: 'shorts-linen',
    name: 'Breezy Linen Drawstring Shorts',
    sku: 'RFY-SHT-003',
    category: 'shorts',
    subcategory: 'Linen shorts',
    fit: 'Regular',
    price: 1699,
    mrp: 2699,
    discount: 37,
    gstRate: 18,
    hsnCode: '6203',
    rating: 4.7,
    reviewCount: 92,
    inStock: true,
    description: 'Ultralight linen shorts featuring an adjustable drawcord waist and relaxed leg opening.',
    colors: [
      { name: 'Oatmeal Linen', hex: '#c8b99a', available: true },
      { name: 'Bark Brown', hex: '#8b7355', available: true },
    ],
    sizes: [
      { label: '30', available: true },
      { label: '32', available: true },
      { label: '34', available: true },
    ],
    images: [
      { src: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=800&q=80', alt: 'Breezy Linen Shorts' },
    ],
    fabric: {
      composition: '100% Linen',
      weight: '5.5 oz',
      origin: 'France',
      finish: 'Softened',
      stretch: 'Natural Air Flow',
    },
    care: ['Hand wash or gentle wash'],
  },
  {
    id: 'shorts-cotton',
    name: 'Everyday Cotton Shorts',
    sku: 'RFY-SHT-004',
    category: 'shorts',
    subcategory: 'Cotton shorts',
    fit: 'Regular',
    price: 1399,
    mrp: 2199,
    discount: 36,
    gstRate: 18,
    hsnCode: '6203',
    rating: 4.8,
    reviewCount: 165,
    inStock: true,
    description: 'Soft cotton shorts perfect for lounge, casual outings, or beachwear.',
    colors: [
      { name: 'Heather Grey', hex: '#808080', available: true },
      { name: 'Deep Black', hex: '#1a1a1a', available: true },
    ],
    sizes: [
      { label: '30', available: true },
      { label: '32', available: true },
      { label: '34', available: true },
    ],
    images: [
      { src: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=800&q=80', alt: 'Everyday Cotton Shorts' },
    ],
    fabric: {
      composition: '100% Organic Cotton',
      weight: '6.8 oz',
      origin: 'India',
      finish: 'Bio-wash',
      stretch: 'Natural Comfort',
    },
    care: ['Machine wash cold'],
  },

  // FORMAL
  {
    id: 'slate-formal',
    name: 'Slate Formal Trousers',
    sku: 'RFY-FRM-001',
    category: 'formal',
    subcategory: 'Formal trousers',
    fit: 'Slim',
    price: 2499,
    mrp: 3999,
    discount: 38,
    gstRate: 18,
    hsnCode: '6203',
    rating: 4.9,
    reviewCount: 182,
    inStock: true,
    description: 'Bespoke modern tailored formal trousers with hidden waist adjusters and crease-resistant drape.',
    colors: [
      { name: 'Slate Grey', hex: '#708090', available: true },
      { name: 'Charcoal', hex: '#2f2f2f', available: true },
    ],
    sizes: [
      { label: '30', available: true },
      { label: '32', available: true },
      { label: '34', available: true },
      { label: '36', available: true },
    ],
    images: [
      { src: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4d42?w=800&q=80', alt: 'Slate Formal Trousers' },
    ],
    fabric: {
      composition: '70% Wool, 28% Viscose, 2% Elastane',
      weight: '8.5 oz',
      origin: 'Biella, Italy',
      finish: 'Matte Crease-Resistant',
      stretch: 'Comfort Stretch',
    },
    care: ['Dry clean recommended', 'Cool iron with cloth'],
  },
  {
    id: 'midnight-formal',
    name: 'Midnight Formal Pants',
    sku: 'RFY-FRM-002',
    category: 'formal',
    subcategory: 'Slim fit formal',
    fit: 'Regular',
    price: 2799,
    mrp: 4499,
    discount: 38,
    gstRate: 18,
    hsnCode: '6203',
    rating: 4.8,
    reviewCount: 145,
    inStock: true,
    description: 'Deep midnight navy luxury trousers featuring French extension closure and clean tapered finish.',
    colors: [
      { name: 'Midnight Black', hex: '#0d0d0d', available: true },
      { name: 'Deep Navy', hex: '#1a1a2e', available: true },
    ],
    sizes: [
      { label: '30', available: true },
      { label: '32', available: true },
      { label: '34', available: true },
      { label: '36', available: true },
    ],
    images: [
      { src: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=800&q=80', alt: 'Midnight Formal Pants' },
    ],
    fabric: {
      composition: '65% Polyester, 33% Rayon, 2% Spandex',
      weight: '8.0 oz',
      origin: 'South Korea',
      finish: 'Anti-Wrinkle Finish',
      stretch: '2-Way Stretch',
    },
    care: ['Dry clean or machine wash gentle'],
  },
];

export function getProductById(id: string): FullProduct {
  if (!id) return PRODUCTS_LIST[0];
  try {
    const cleanId = decodeURIComponent(id).trim().toLowerCase();
    
    // 1. Exact ID match
    const exactId = PRODUCTS_LIST.find((p) => p.id.toLowerCase() === cleanId);
    if (exactId) return exactId;

    // 2. Match by hyphenated slug
    const slug = cleanId.replace(/\s+/g, '-');
    const matchSlug = PRODUCTS_LIST.find(
      (p) =>
        p.id.toLowerCase() === slug ||
        p.name.toLowerCase().replace(/\s+/g, '-') === slug ||
        (p.subcategory && p.subcategory.toLowerCase().replace(/\s+/g, '-') === slug)
    );
    if (matchSlug) return matchSlug;

    // 3. Match by partial substring in name, category, or subcategory
    const matchPartial = PRODUCTS_LIST.find(
      (p) =>
        p.name.toLowerCase().includes(cleanId) ||
        p.category.toLowerCase().includes(cleanId) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(cleanId))
    );
    if (matchPartial) return matchPartial;
  } catch {
    // Fallback if decodeURIComponent fails
  }

  return PRODUCTS_LIST[0];
}
