# SwarmWare - AI Agent Orchestration Platform

## Overview

SwarmWare is a comprehensive AI agent orchestration platform that enables users to create, manage, and monitor swarms of AI agents. The application follows a full-stack architecture with a React frontend and Express.js backend, designed to handle complex multi-agent AI systems with enterprise-grade security features including "Swarm Shield" protection. The platform supports real-time monitoring, template-based deployment, and secure agent coordination across distributed environments.

## User Preferences

Preferred communication style: Simple, everyday language.

**Protected Pages Policy**: The following core pages should NOT be modified unless explicitly requested by the user:
- Dashboard (`client/src/pages/dashboard.tsx`)
- Swarms (`client/src/pages/swarms.tsx`) 
- Agents (`client/src/pages/agents.tsx`)
- Monitoring (`client/src/pages/monitoring.tsx`)
- Docs/API (`client/src/pages/api-docs.tsx`)

These pages represent stable, completed functionality that the user wants preserved.

**Recent User Instructions (August 20, 2025)**:
- Removed Deploy Swarm box and notification badge from dashboard top bar
- Changed "Templates" to "Deploy Swarm" in navigation
- Added collapsible sidebar functionality (logo and SwarmWare always visible)
- Removed admin profile section from sidebar
- Updated Quick Actions: "Deploy Template" → "Deploy Swarm", "Create Agent" → "Active Swarms" (links to /swarms)
- Quick Actions now navigate properly: Security Report → /security, API Docs → /api-docs
- Dynamic statistics: Active swarms increment with deployments, Security alerts fluctuate 1-5 every 30 minutes, Total agents show realistic growth, API calls grow gradually based on swarm count
- Enhanced messaging with bio-inspired content emphasizing swarm intelligence, hyperscale deployment, and quantum-grade security

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for client-side routing with file-based page organization
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Real-time Communication**: WebSocket integration for live updates and notifications

### Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **Database ORM**: Drizzle ORM with PostgreSQL for type-safe database operations
- **Real-time Features**: WebSocket server implementation for broadcasting live updates
- **API Design**: RESTful API architecture with structured error handling
- **Session Management**: Express sessions with PostgreSQL session storage

### Database Design
- **Primary Database**: PostgreSQL with Neon serverless hosting
- **Schema Management**: Drizzle migrations with schema versioning
- **Core Entities**: 
  - Users (authentication and profile management)
  - Swarms (agent cluster management)
  - Agents (individual AI agent instances)
  - Templates (pre-configured swarm blueprints)
  - Security Alerts (threat detection and monitoring)
  - API Calls (usage tracking and analytics)
- **Data Types**: Extensive use of PostgreSQL enums and JSON fields for flexible configuration storage

### Security Architecture
- **Swarm Shield**: Custom security framework for AI agent protection
- **Agent Isolation**: Configurable isolation policies for containing rogue agents
- **Encryption**: End-to-end encryption for inter-agent communication
- **Anomaly Detection**: Real-time monitoring for unusual coordination patterns
- **Access Control**: Role-based permissions with user session management

### Real-time System
- **WebSocket Implementation**: Bidirectional communication for live dashboard updates
- **Event Broadcasting**: System-wide notifications for swarm status changes
- **Performance Monitoring**: Real-time metrics collection and alerting
- **Connection Management**: Automatic reconnection and connection state handling

### Development Patterns
- **Type Safety**: Full TypeScript implementation across frontend and backend
- **Shared Types**: Common schema definitions shared between client and server
- **Component Architecture**: Modular React components with consistent design patterns
- **Error Boundaries**: Comprehensive error handling with user-friendly feedback
- **Performance Optimization**: Query caching, lazy loading, and efficient re-rendering strategies

## External Dependencies

### Database & Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle Kit**: Database migration and schema management tooling

### Frontend Libraries
- **React Ecosystem**: React 18, React DOM, React Hook Form
- **UI Components**: Radix UI primitives (@radix-ui/react-*)
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack React Query for server state
- **Form Validation**: Zod for runtime type checking and validation
- **Date Handling**: date-fns for date manipulation and formatting
- **Icons**: Font Awesome for consistent iconography

### Backend Dependencies
- **Express.js**: Web application framework with TypeScript support
- **Database**: Drizzle ORM with Neon serverless PostgreSQL adapter
- **Session Storage**: connect-pg-simple for PostgreSQL-backed sessions
- **WebSocket**: Native WebSocket (ws) library for real-time communication
- **Development**: tsx for TypeScript execution, esbuild for production builds

### Development Tools
- **Build System**: Vite for frontend development and building
- **TypeScript**: Full type safety with strict compiler options
- **Replit Integration**: Vite plugins for Replit development environment
- **PostCSS**: CSS processing with Tailwind CSS integration

### Security & Monitoring
- **Environment Management**: Process environment variables for configuration
- **Error Tracking**: Custom error handling and logging systems
- **Performance Monitoring**: Built-in metrics collection for agent performance
- **Security Scanning**: Anomaly detection for AI agent behavior patterns