# Architecture Overview

## Cau truc thu muc
- app/ - Next.js App Router pages
  - (auth)/ - Cac trang xac thuc
  - (dashboard)/ - Cac trang he thong
  - api/ - API routes
- components/ - React components
  - ui/ - Base UI components (shadcn/ui)
  - layout/ - Layout components
  - charts/ - Chart components
  - providers/ - Context providers
- lib/ - Business logic
  - firebase/ - Firebase configuration va services
  - hooks/ - Custom React hooks
  - services/ - Business services
  - utils/ - Utility functions
  - validations/ - Zod schemas
  - constants/ - App constants
- types/ - TypeScript type definitions
- docs/ - Documentation
- public/ - Static assets

## Tech Stack
- Frontend: Next.js 14, React 18, TypeScript
- Styling: TailwindCSS, shadcn/ui, Radix UI
- Backend: Firebase (Auth, Firestore, Storage)
- AI: Groq SDK
- Charts: Recharts
- Forms: React Hook Form + Zod
