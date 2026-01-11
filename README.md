# Cosmos Log

A modern, responsive personal blog platform built with React 19 and TypeScript. This project leverages a component-driven architecture to deliver a seamless reading experience with robust internationalization, theming support, and performant content delivery.

## Tech Stack

### Core
- **Framework:** React 19
- **Build Tool:** Vite
- **Language:** TypeScript

### State & Routing
- **State Management:** Zustand
- **Routing:** React Router v7

### Styling & UI
- **CSS Framework:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Typography:** @tailwindcss/typography

### Data & Backend
- **BaaS:** Supabase (PostgreSQL)
- **Content Rendering:** react-markdown, remark-gfm

### Utilities
- **Internationalization:** i18next, react-i18next
- **SEO:** react-helmet-async
- **Date Handling:** date-fns

## Key Features

- **Dynamic Content Management:** Supports rich-text blog posts via Markdown, integrated seamlessly with Supabase.
- **Advanced Theming:** System-aware Dark/Light mode toggle with persistent user preference.
- **Internationalization (i18n):** Full support for multi-language content (Korean/English) with dynamic locale switching.
- **SEO Optimization:** Dynamic meta tag management for improved search engine visibility.
- **Responsive Design:** Mobile-first architecture ensuring consistent experience across all devices.

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/okdol1/cosmos-log.git
   cd cosmos-log
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### Development

Start the development server:
```bash
npm run dev
```

### Build

Create a production build:
```bash
npm run build
```

## Project Structure

```
src/
├── assets/        # Static assets
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/           # Library configurations (Supabase, etc.)
├── locales/       # i18n translation files
├── pages/         # Route components
├── services/      # API and data fetching services
├── store/         # Global state management (Zustand)
├── types/         # TypeScript type definitions
└── utils/         # Helper functions
```

## License

This project is licensed under the MIT License.