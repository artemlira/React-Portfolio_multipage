# Artem Lira Portfolio

Personal portfolio website for presenting projects, skills, contacts, and professional background. The application includes a public multilingual portfolio and a protected admin area for managing portfolio content.

Repository: [artemlira/React-Portfolio_multipage](https://github.com/artemlira/React-Portfolio_multipage)

Live website: [https://artem-lira.netlify.app](https://artem-lira.netlify.app)

Backend API: [https://mern-portfolio-back.vercel.app](https://mern-portfolio-back.vercel.app)

Backend repository: [artemlira/MERN_Portfolio-back](https://github.com/artemlira/MERN_Portfolio-back)

## Overview

This project is a multi-page React portfolio built with Vite. Public pages fetch data from a MongoDB-backed REST API, while authenticated admin routes allow managing projects, skills, contacts, media links, and facts.

The portfolio supports English and Ukrainian localization, responsive layouts, animated sections, project sliders, and dynamic project cards.

## Features

- Multi-page portfolio: Home, Projects, About, Contacts
- English and Ukrainian language support
- Dynamic data from a REST API
- Protected admin routes for content management
- CRUD flows for projects, small projects, skills, contacts, media, and facts
- Project cards with optional fields: empty links/descriptions are hidden
- Newest-first project sorting across the site
- Swiper carousel for completed projects on the home page
- Save states and validation feedback in admin forms
- Responsive layout for desktop, tablet, and mobile
- Netlify-ready SPA routing via `_redirects`

## Tech Stack

- React
- Vite
- React Router
- Redux Toolkit
- React Redux
- Axios
- SCSS Modules
- i18next / react-i18next
- Swiper
- Framer Motion
- GSAP
- Material UI icons/components
- Netlify

## Project Structure

```text
src/
  assets/              Static images and icons
  components/          Reusable UI and page sections
  pages/               Route-level pages
  redux/               Redux store and data slices
  styles/              Global SCSS utilities and variables
  utils/               API client and shared helpers
public/
  locales/             i18n translation files
  _redirects           Netlify SPA fallback
```

## Environment Variables

Create a local `.env.local` file when developing against a local or custom API:

```env
VITE_API_URL=http://localhost:4444
```

For production on Netlify, set:

```env
VITE_API_URL=https://mern-portfolio-back.vercel.app
```

If `VITE_API_URL` is not provided, the app falls back to the production backend URL.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run lint checks:

```bash
npm run lint
```

## Admin Workflow

Authenticated users can access admin pages for creating and editing content:

- `/add-project`
- `/add-small`
- `/add-skill`
- `/add-contact`
- `/add-media`
- `/add-fact`

Edit routes are protected as well, for example:

- `/projects/:id/edit`
- `/smalls/:id/edit`
- `/skills/:id/edit`

If the backend JWT secret changes, old tokens become invalid. In that case, log out or clear `localStorage`, then log in again.

## Deployment

The frontend is deployed on Netlify.

Recommended Netlify settings:

- Build command: `npm run build`
- Publish directory: `dist`
- Environment variable: `VITE_API_URL=https://mern-portfolio-back.vercel.app`

The `public/_redirects` file handles client-side routing:

```text
/* /index.html 200
```

## Quality Checks

Before deployment, run:

```bash
npm run lint
npm run build
npm audit --audit-level=moderate
```

Current checks pass with no moderate-or-higher npm vulnerabilities.

## Notes

Project images are currently returned by the API as base64 strings stored in MongoDB. This works for the current portfolio, but a future improvement would be moving media assets to Cloudinary, S3, Vercel Blob, or another dedicated object storage service.
