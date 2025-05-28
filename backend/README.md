# Podcast Backend API

This is the backend API for the podcast application built with Fastify, Prisma, and TypeScript.

## Features

- Search for podcasts using iTunes API
- Fetch podcast episodes
- Save and retrieve episode data
- Database caching for improved performance

## Prerequisites

- Node.js 18+
- npm or yarn
- SQLite (default) or PostgreSQL database

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Update `.env` with your settings:

```env
PORT=4000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
DATABASE_URL="file:./dev.db"  # SQLite default
```

### 3. Database Setup

Initialize the database:

```bash
npx prisma generate
npx prisma db push
```

### 4. Run the Server

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

The server will start at `http://localhost:4000` (or the port specified in your environment).

## API Endpoints

### Search

- `GET /search?term={query}` - Search for podcasts

### Episodes

- `GET /episodes?ids={comma-separated-ids}` - Get episodes for podcast IDs
- `GET /episodes/saved?podcastTitle={title}&limit={number}` - Get saved episodes

## Deployment

### Environment Variables for Production

- `PORT` - Server port (default: 4000)
- `ALLOWED_ORIGINS` - Comma-separated list of allowed frontend URLs
- `DATABASE_URL` - Database connection string

### Example Production Environment

```env
PORT=4000
ALLOWED_ORIGINS=https://your-frontend-domain.com
DATABASE_URL=your_production_database_url
```

## Technology Stack

- **Framework**: Fastify
- **Database**: Prisma ORM with SQLite/PostgreSQL
- **Language**: TypeScript
- **External APIs**: iTunes Search API
