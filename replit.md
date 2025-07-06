# MonitoCorp - Live Service Monitoring Dashboard

## Overview

MonitoCorp is a modern, responsive SRE monitoring dashboard built with React and TypeScript. It provides real-time service monitoring capabilities with a professional dark theme optimized for SRE environments. The application features comprehensive service management, real-time status updates, and efficient data handling through optimistic updates and intelligent caching.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for type safety and modern React features
- **Vite** as the build tool for fast development and optimized builds
- **Tailwind CSS** for utility-first styling with a custom dark theme
- **Wouter** for lightweight client-side routing
- **Shadcn/ui** components for consistent UI patterns

### Backend Strategy
- **Mock Service Worker (MSW)** for API simulation instead of a real backend
- **Simulated Network Conditions**: Random delays (300-1000ms) and 5% failure rate
- **In-Memory Data Storage** for development and testing

### Database Design
- **Drizzle ORM** with PostgreSQL schema definitions
- **Tables**: Services and ServiceEvents with proper relationships
- **Prepared for Production**: Database configuration ready for PostgreSQL deployment

## Key Components

### State Management
- **React Query (@tanstack/react-query)** for server state management
- **Intelligent Caching**: Automatic cache invalidation and background updates
- **Optimistic Updates**: Immediate UI updates with automatic rollback on failure
- **Polling Strategy**: 15-second intervals for real-time monitoring

### Data Flow
1. **Service List**: Paginated API with filtering and search capabilities
2. **Real-time Updates**: Background polling with tab visibility detection
3. **Optimistic CRUD**: Immediate UI updates for create/update/delete operations
4. **Infinite Scroll**: Efficient loading of service event history

### UI Components
- **Service Table**: Comprehensive service listing with filtering and pagination
- **Service Details**: Individual service view with event history
- **Service Forms**: Modal-based create/edit functionality
- **Loading States**: Skeleton loaders and smooth transitions
- **Error Handling**: Comprehensive error states and user feedback

## Data Flow

### Service Management Flow
1. User initiates CRUD operation
2. Optimistic update applied to UI immediately
3. API request sent to MSW handlers
4. On success: Cache updated, UI remains consistent
5. On failure: Rollback to previous state, show error message

### Real-time Monitoring Flow
1. Initial data load on page mount
2. Background polling every 15 seconds
3. Tab visibility detection for smart refresh
4. Cache invalidation on window focus
5. Automatic status updates reflected in UI

## External Dependencies

### Core Libraries
- **React Query**: Data fetching and state management
- **React Hook Form**: Form handling with Zod validation
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Date-fns**: Date manipulation utilities

### Development Tools
- **MSW**: API mocking for realistic development
- **Drizzle Kit**: Database schema management
- **ESBuild**: Server-side bundling
- **TSX**: TypeScript execution for development

## Deployment Strategy

### Development Environment
- **Vite Dev Server**: Hot module replacement and fast builds
- **MSW Browser Integration**: Service worker-based API mocking
- **TypeScript Compilation**: Real-time type checking

### Production Build
- **Static Asset Generation**: Optimized client-side bundle
- **Server Bundle**: Express.js server with API routes
- **Database Integration**: PostgreSQL with connection pooling via @neondatabase/serverless

### Database Migration
- **Drizzle Migrations**: Version-controlled schema changes
- **Environment Variables**: DATABASE_URL configuration required
- **Connection Strategy**: Prepared for serverless PostgreSQL deployment

## Changelog

```
Changelog:
- July 06, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```