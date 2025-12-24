# 🎥 FactsnReel

**FactsnReel** is a modern, high-performance web platform dedicated to curating fascinating facts, educational reels, and insightful content. Built with a “static-first” approach, it delivers lightning-fast performance by leveraging local data modules, eliminating the need for a complex backend while maintaining a dynamic feel. We are currently working on backend integration to enable real-time content updates, user personalization, and advanced scalability for future growth.

## ✨ What We Do
- **Curate Knowledge**: We hand-pick interesting facts and stories across various categories like Science, History, Technology, and more.
- **Educational Entertainment**: Combining "Facts" and "Reels" to provide a snackable yet informative browsing experience.
- **Verified Content**: Ensuring all shared information is reliable and engaging.
- **Curated Shopping**: A dedicated "Store" section with hand-picked products and affiliate deals categorized for easy discovery.

## 🚀 How It Works
The website is a fully static React application that prioritizes speed and user experience.
- **Data-Driven Architecture**: All content (posts, facts, store items) is managed through structured JS modules in `src/data/`, allowing for easy updates and 100% SEO-friendly static generation.
- **Fuzzy Search**: Implements `Fuse.js` for instant, intelligent searching across all blog posts and reels.
- **Dynamic Routing**: Uses `react-router-dom` to provide seamless navigation between the feed, individual posts, and store categories.
- **Premium UI**: Styled with **Tailwind CSS** for a sleek, responsive design that looks stunning on mobile and desktop alike.
- **Smooth Interaction**: Powered by **Framer Motion** for micro-animations and smooth transitions.

## 🛠️ Tech Stack
- **Frontend Framework**: [React 19](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Search Engine**: [Fuse.js](https://www.fusejs.io/)
- **Routing**: [React Router](https://reactrouter.com/)

## 📂 Project Structure
```text
├── src/
│   ├── components/  # Reusable UI building blocks (Cards, Layout, Nav)
│   ├── pages/       # Main view components (Home, Posts, QuickFacts, Store)
│   ├── data/        # Static content storage (posts.js, facts.js, store.js)
│   ├── hooks/       # Custom React logic (search, scroll handling)
│   ├── assets/      # Images and global styling
│   └── App.jsx      # Root component & routing logic
├── backend/         # Future Backend implementation (Work in Progress)
└── public/          # Static assets (favicons, logos)
```

## 🔮 Future Roadmap
- **Backend Integration**: We are actively working on a backend implementation to support dynamic content management, user authentication, and real-time updates.
- **Admin Dashboard**: A dedicated portal for content creators to manage posts and facts more efficiently.

## 🏁 Getting Started
1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start Dev Server**:
   ```bash
   npm run dev
   ```
3. **Build for Production**:
   ```bash
   npm run build
   ```
