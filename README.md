# Recipe Management App Frontend

A modern React-based frontend application for managing and sharing recipes. Built with React 19, Vite, and Tailwind CSS.

## 🚀 Features

- **Recipe Discovery**: Browse recipes by categories
- **Recipe Details**: View detailed recipe information with ingredients and instructions
- **User Authentication**: Login, register, and logout functionality
- **User Profiles**: View user profiles and manage favorites
- **Add Recipes**: Create and share your own recipes (authenticated users only)
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Updates**: Powered by React Query for efficient data fetching

## 🛠️ Tech Stack

### Core Framework

- **React 19** - Modern React with concurrent features
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing

### State Management & Data Fetching

- **TanStack React Query** - Server state management and caching
- **Zustand** - Client state management for modals and UI state

### UI & Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **React Hot Toast** - Toast notifications
- **Swiper** - Touch-enabled sliders

### Forms & Validation

- **Formik** - Form management
- **Yup** - Schema validation

### HTTP Client

- **Axios** - Promise-based HTTP client

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Run linters on staged files

## 📁 Project Structure

```
src/
├── app/
│   ├── providers/          # App-wide providers (router, query client)
│   └── components/         # Global components (modals, etc.)
├── entities/               # Business logic entities (user, recipe, etc.)
├── features/               # Feature-specific components and logic
├── pages/                  # Page components
├── queries/                # React Query hooks and API calls
├── shared/                 # Shared utilities and UI components
│   ├── api/               # Base API configuration
│   ├── lib/               # Utility libraries
│   └── ui/                # Reusable UI components
└── widgets/               # Complex UI widgets (layout, recipes)
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API server running

### Installation

1. Clone the repository:

```bash
git clone https://github.com/SergeyPoly/goit-node-final-project-FE.git
cd goit-node-final-project-FE
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run dev:host` - Start development server with host binding
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### API Integration

The app expects a REST API backend with endpoints for:

- Authentication (login, register, logout)
- Users (profile, favorites, following)
- Recipes (CRUD operations)
- Categories and ingredients
- Testimonials

## 📱 Pages & Features

### Public Pages

- **Home** (`/`) - Landing page with featured content
- **Recipes** (`/recipes`) - Browse all recipes
- **Recipe Categories** (`/recipes/:category`) - Filter recipes by category
- **Recipe Details** (`/recipe/:id`) - View individual recipe

### Private Pages (Require Authentication)

- **Add Recipe** (`/recipe/add`) - Create new recipes
- **User Profile** (`/user/:id`) - View user profiles and recipes

### Authentication

- Login modal
- Registration modal
- Logout confirmation

## 🎨 UI Components

### Shared Components

- Button, TextField, Select - Form elements
- Modal - Reusable modal system
- Loader, Skeleton - Loading states
- RecipeCard, RecipePreview - Recipe display components
- Pagination - Page navigation

### Layout Components

- SharedLayout - Main app layout with navigation
- Hero - Landing page hero section
- MobileMenu - Responsive navigation menu

## 🔐 Authentication Flow

The app uses modal-based authentication:

1. User clicks login/register
2. Modal opens with form
3. On success, token is stored and user is authenticated
4. Private routes become accessible
5. Logout clears token and redirects to home

## 📊 State Management

### Server State (React Query)

- API data caching and synchronization
- Background refetching
- Optimistic updates

### Client State (Zustand)

- Modal visibility states
- UI preferences
- Form data

## 🚀 Deployment

1. Build the project:

```bash
npm run build
```

2. The `dist` folder contains the production build.

3. Serve the `dist` folder with any static server.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📝 Development Notes

- Uses Feature-Sliced Design architecture
- Implements custom hooks for business logic
- Follows React best practices with modern patterns
- Includes comprehensive TypeScript types (planned)
- Uses CSS modules and utility classes

## 📄 License

This project is part of a learning exercise and is not licensed for commercial use.
