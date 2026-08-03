# 🚐 Travel Trucks — Camper Rental Service

A web application for searching and booking motorhomes (campers) across Ukraine. Find the perfect vehicle for your next adventure using a convenient catalog and an advanced filtration system.

## 🌟 Key Features

- **Camper Catalog**: View a full list of available vehicles with smooth pagination ("Load More").
- **Detailed Descriptions**: Individual pages for each camper featuring a photo gallery, technical specifications, and user reviews.
- **Smart Filtration**: Search by location, body type, and specific amenities (AC, Kitchen, TV, etc.).
- **Dynamic SEO**: Individual metadata for every page and Open Graph support for enhanced social media sharing.
- **Responsive Design**: Fully optimized for desktops and mobile devices (including Retina display support).
- **State Handling**: Custom animated loaders (branded bus with a spinning wheel) and a stylized 404 error page.

## 🛠 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org) — server-side rendering and performance optimization.
- **State Management**:
  - [TanStack Query v5](https://tanstack.com) — asynchronous requests and data caching.
  - [Zustand](https://pmnd.rs) — lightweight and fast global state management (for favorite campers).
- **Forms & Validation**:
  - [Formik](https://formik.org) — handling booking forms.
  - [Yup](https://github.com) — schema-based data validation.
- **HTTP Client**: [Axios](https://axios-http.com) — reliable API communication.
- **UI Components & Effects**:
  - [Swiper](https://swiperjs.com) — modern slider for image galleries.
  - [React Hot Toast](https://react-hot-toast.com) — stylish and lightweight notifications.
  - [Modern Normalize](https://github.com) — CSS reset for cross-browser consistency.
- **Styling**: CSS Modules — isolated styles for each component.

## 🚀 Installation and Run

### Requirements

- **Node.js 18+** (latest LTS recommended)

### Steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd travel-trucks
   ```

Installation and Run
Requirements
Node.js 18+ (latest LTS recommended)
Steps:

1. Clone the repository.
2. Create your local environment file based on .env.example:
   cp .env.example .env
3. Install dependencies:
   npm install
4. Run in development mode:
   npm run dev
5. Open in browser:
   http://localhost:3000

📂 Project Structure
/app — routing, pages, and global layouts.
/components — reusable React components (Loader, Button, Sidebar, etc.).
/lib — API configuration (Axios instance) and request functions.
/public — static assets (icons, logos).
/types — TypeScript interface definitions.

👤 Author
Yevhenii Pavlushchenko
Deploy: https://travel-trucks-nine-vert.vercel.app
GitHub: https://github.com/Yevhenii-Pavlushchenko
LinkedIn: https://www.linkedin.com/in/yevhenii-pavlushchenko/
