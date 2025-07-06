# MonitoCorp - Live Service Monitoring Dashboard

A modern, responsive SRE monitoring dashboard built with React, TypeScript, and Tailwind CSS. Features real-time service monitoring, optimistic updates, and comprehensive error handling.

## 🚀 Features

### Core Functionality
- **Real-time Service Monitoring**: Live status updates every 15 seconds
- **Service Management**: Full CRUD operations with optimistic updates
- **Service Details**: Comprehensive view with historical events
- **Infinite Scroll**: Efficient loading of historical events
- **Search & Filter**: Filter services by status and search by name
- **Tab Visibility**: Automatic refresh when returning to the tab

### Technical Features
- **Dark Mode Design**: Professional dark theme optimized for SRE environments
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Error Handling**: Comprehensive error states and user feedback
- **Loading States**: Skeleton loaders and smooth transitions
- **Optimistic Updates**: Immediate UI updates with rollback on failure
- **Background Refresh**: Automatic cache invalidation and updates

## 🛠 Architecture

### Frontend Stack
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS with custom dark theme
- **React Query**: Intelligent data fetching, caching, and synchronization
- **Wouter**: Lightweight client-side routing
- **React Hook Form**: Efficient form handling with validation
- **Zod**: Schema validation for type-safe forms

### State Management Strategy
- **Server State**: Managed by React Query with intelligent caching
- **Client State**: Local component state with React hooks
- **Background Updates**: Automatic polling every 15 seconds
- **Optimistic Updates**: Immediate UI updates with automatic rollback
- **Cache Invalidation**: Strategic cache invalidation on mutations

### Mock API (MSW)
- **Mock Service Worker**: Realistic API simulation
- **Network Conditions**: Random delays (300ms-1000ms) and 5% failure rate
- **All Endpoints**: Complete implementation of specified API endpoints
- **Live Data**: Simulated status changes for realistic monitoring

## 📡 API Endpoints

### Services
- `GET /api/services` - List services with pagination and filtering
- `GET /api/services/:id` - Get single service details
- `POST /api/services` - Create new service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Events
- `GET /api/services/:id/events` - Get service events with pagination

### Statistics
- `GET /api/stats` - Get dashboard statistics

## 🎨 Design System

### Color Scheme
- **Background**: Deep dark grays for reduced eye strain
- **Primary**: Blue accent for actions and highlights
- **Success**: Green for online/healthy states
- **Warning**: Yellow for degraded states
- **Error**: Red for offline/error states

### Typography
- **Font**: Inter for clean, readable text
- **Hierarchy**: Clear visual hierarchy with proper spacing
- **Accessibility**: High contrast ratios for readability

### Components
- **Modular**: Reusable components for consistent design
- **Responsive**: Mobile-first approach with breakpoints
- **Interactive**: Hover states and smooth transitions

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd monitocorp-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
