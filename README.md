# REFLY — Premium Men's Bottom Wear

**REFLY** is a state-of-the-art e-commerce web application engineered for premium men's bottomwear. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS, REFLY offers a luxury shopping experience featuring cinematic dark mode aesthetics, interactive 3D product cards, dynamic filtering, smooth animations, and Supabase integration.

---

## 🌟 Key Features

- **Luxury Aesthetics & Micro-Interactions**: Custom gold & dark cinematic theme, glassmorphism UI elements, custom interactive cursor, smooth momentum scrolling (Lenis), and 3D card tilt effects.
- **Dynamic Category & Subcategory Architecture**:
  - **Main Categories**: Cargos, Linen, Cotton Pants, Shorts, Formal.
  - **Category-Specific Subcategory Filters**:
    - **Cargos**: Zip cargos, Patch pocket cargo, Elastic cargo, Cargo shorts, Loose fit cargo
    - **Linen**: Linen loose fit, Linen chinos, Linen shorts, Zip pocket linen
    - **Cotton Pants**: Cotton chinos, China bold, Cotton shorts
    - **Shorts**: Polyester shorts, Cargo shorts, Linen shorts, Cotton shorts
    - **Formal**: Formal trousers, Slim fit formal
- **Advanced Filtering & Sorting**:
  - Filter by Availability (In Stock Only), Price Range slider (₹0 – ₹10,000), Waist Sizes (28 to 42), Fit types (Slim, Regular, Relaxed, Tapered), and dynamic Category Subcategories.
  - Sort by Featured, Newest, Price (Low to High / High to Low), and Best Discount.
- **Interactive Shopping Bag (Cart Drawer)**: Slide-out drawer with real-time subtotal calculation, coupon discounts (`REFLY10`), free delivery bar, and checkout integration.
- **Authentication & User Profiles**: Supabase-powered authentication for user login, dashboard access, wishlist management, and order history.
- **Responsive & SEO Optimized**: Fully optimized for mobile, tablet, and desktop views with meta tags and structured schemas.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/), [GSAP 3](https://gsap.com/), [Lenis 1.3](https://lenis.darkroom.engineering/)
- **Backend & Auth**: [Supabase SSR](https://supabase.com/docs/guides/auth/server-side/nextjs) (`@supabase/ssr`, `@supabase/supabase-js`)
- **Icons**: Lucide React, Heroicons, React Icons

---

## 🚀 Getting Started (Run Locally)

### Prerequisites

Ensure you have **Node.js** (v18.0.0 or higher) and **npm** installed on your system.

```bash
node -v
npm -v
```

### 1. Clone & Navigate to Project

```bash
cd "c:\My Projects\REFLY"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create or check your `.env` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-instance.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Run Development Server

Start the Next.js development server locally on port **4028**:

```bash
npm run dev
```

Open [http://localhost:4028](http://localhost:4028) in your browser to view the application live.

---

## 📦 Available NPM Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `npm run dev` | `next dev -p 4028` | Starts the local dev server on port 4028 |
| `npm run build` | `next build` | Compiles production build bundle |
| `npm run start` | `next dev -p 4028` | Runs dev server on port 4028 |
| `npm run serve` | `next start` | Starts the compiled production server |
| `npm run type-check` | `tsc --noEmit` | Runs TypeScript type checker |
| `npm run lint` | `next lint` | Runs ESLint code quality check |
| `npm run format` | `prettier --write ...` | Formats codebase using Prettier |

---

## 📁 Directory Architecture

```
REFLY/
├── public/                     # Static images, assets & logos
├── src/
│   ├── app/                    # Next.js 15 App Router pages
│   │   ├── page.tsx            # Homepage
│   │   ├── collections/        # Collections page with CategoryTabs & FilterSidebar
│   │   │   └── components/     # CollectionsBanner, ProductGrid, FilterSidebar
│   │   ├── products/[id]/      # Product detail pages
│   │   ├── checkout/           # Checkout & payment workflow
│   │   ├── dashboard/          # User dashboard
│   │   ├── login/              # Sign in & Authentication page
│   │   └── components/         # Homepage section components (Hero, Bento, Featured)
│   ├── components/             # Reusable UI components (Header, Footer, CartDrawer)
│   │   └── ui/                 # Core UI atoms (AppImage, AppIcon, AppLogo)
│   ├── contexts/               # React Context Providers (AuthContext, CartContext)
│   └── lib/                    # Utilities & Supabase client/server setup
├── next.config.mjs             # Next.js configuration
├── tailwind.config.js          # Custom theme, colors & font setup
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies & build scripts
```

---

## 💡 Category & Subcategory Reference

When updating or adding products in `src/app/collections/components/ProductGrid.tsx`, map them to the corresponding `category` and `subcategory`:

```typescript
// Category Keys: 'all' | 'cargos' | 'linen' | 'cotton-pants' | 'shorts' | 'formal'

export const SUBCATEGORIES = {
  cargos: ['Zip cargos', 'patch pocket cargo', 'elastic cargo', 'cargo shorts', 'loose fit cargo'],
  linen: ['lenin loose fit', 'Lenin chinos', 'Lenin shorts', 'zip pocket lenin'],
  'cotton-pants': ['Cotton chinos', 'China bold', 'Cotton shorts'],
  shorts: ['Polyester shorts', 'Cargo shorts', 'Linen shorts', 'Cotton shorts'],
  formal: ['Formal trousers', 'Slim fit formal'],
};
```

---

## 🔒 License & Credits

- Designed and built for **REFLY** — Move Different.
- Built with Next.js, React, Tailwind CSS, and Supabase.



