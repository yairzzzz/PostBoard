# PostBoard

A modern, responsive web application for browsing, searching, and creating posts. Built with React, TypeScript, Zustand, TailwindCSS, DaisyUI, and Vite.

## Features

- **Browse Posts:** View a paginated list of posts fetched from [JSONPlaceholder](https://jsonplaceholder.typicode.com).
- **Search:** Instantly filter posts by title using the search bar.
- **View Post Details:** Click a post to view its details and associated comments.
- **Add New Post:** Create new posts locally with validation and instant feedback.
- **Theme Switcher:** Select from multiple DaisyUI themes for a personalized experience.
- **Responsive Design:** Optimized for desktop and mobile devices.
- **Loading Skeletons:** Smooth loading experience with animated skeleton components.
- **Persistent State:** Locally created posts are saved using browser storage.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/postboard.git
   cd postboard
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Running locally — start the development server:**

   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. **Preview the production build:**
   ```sh
   npm run preview
   # or
   yarn preview
   ```

## Project Structure

- `src/` — Main source code
  - `components/` — Reusable UI components
  - `pages/` — Application pages (Home, View Post)
  - `store/` — Zustand stores for state management
  - `constants/` — Theme definitions
  - `lib/` — Axios API configuration
  - `types/` — TypeScript types

## Additional Notes

- **Validation:** New posts require a title and body (letters only, max 70/140 chars).
- **Toast Notifications:** User feedback for actions and errors.
- **Persistent Pagination:** Current page is saved in local storage.
- **Accessibility:** Semantic HTML and accessible components.
- **Tech Stack:** React 19, Zustand, DaisyUI, TailwindCSS, Vite, TypeScript.
