# TravelZero

TravelZero is a Next.js-based AI Trip Planner that helps users create travel plans interactively through chat.
Users only need to answer AI prompts (origin, destination, budget, duration, group type, and interests), and the system will automatically generate a daily itinerary and hotel recommendations.

## What This App Does

TravelZero focuses on three core goals:

1. Collect user travel preferences through a conversational flow.
2. Generate a structured trip plan (hotels + daily activities) using AI.
3. Save trip results to the user account so they can be reopened in My Trips.

## Key Features

- AI chat planner with a step-by-step guided flow.
- Dynamic UI based on prompt context (group size, budget, trip duration).
- Final itinerary generation in a structured format.
- Google Places integration for location photo previews.
- My Trips page for user trip history.
- View Trip page for itinerary details and map view.
- Authentication with Clerk.
- User and trip data storage with Convex.
- AI request rate limiting / credit limiting with Arcjet.

## Tech Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Clerk (authentication + pricing table)
- Convex (database + backend functions)
- OpenRouter/OpenAI SDK (AI completion)
- Arcjet (token bucket rate limiting)
- MapLibre GL (map rendering)

## Quick Start

### 1. Clone and Setup

```bash
git clone <repository-url>
cd travel-zero
npm install
```

### 2. Configure Environment Variables

Copy `.env.local` with required keys from prerequisites section below.

### 3. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Start Planning

- Click "Get Started" and sign in with Clerk
- Try the AI planner by entering a travel query or selecting a suggestion
- Answer AI questions step-by-step
- View your generated itinerary and save it

## Important Pages

- `/` landing page + initial trip input
- `/create-new-trip` chat planner + itinerary/map panel
- `/my-trips` user trip history
- `/view-trip/[tripId]` specific trip detail view
- `/pricing` subscription plans page
- `/contact-me` contact page + FAQ

## Architecture Overview

1. User signs in via Clerk.
2. User starts a prompt from the Hero section or Create Trip page.
3. Frontend sends chat messages to API `app/api/aimodel/route.ts`.
4. API calls the AI model through OpenRouter with Arcjet protection.
5. At the final step, AI returns a `trip_plan` JSON payload.
6. Frontend stores the result in Convex `TripDetailTable`.
7. User can reopen saved trips from My Trips at any time.

## Prerequisites

- Node.js 20+
- npm / pnpm / yarn
- Accounts/projects for:
    - Clerk
    - Convex
    - OpenRouter
    - Google Places API
    - Arcjet

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Convex
NEXT_PUBLIC_CONVEX_URL=

# AI / LLM
OPENROUTER_API_KEY=

# Google Places
GOOGLE_PLACE_API_KEY=

# Arcjet
ARCJET_KEY=
```

Notes:

- `NEXT_PUBLIC_CONVEX_URL` is typically available after setting up/deploying your Convex project.
- Make sure your Google Places API key has access to Places API v1 endpoints.

## Installation and Local Run

```bash
npm install
```

Run the app:

```bash
npm run dev
```

Default URL:

```text
http://localhost:3000
```

## NPM Scripts

- `npm run dev` - run development server (Turbopack)
- `npm run build` - build for production
- `npm run start` - run production build
- `npm run lint` - lint the project

## Data Model (Convex)

Main tables:

- `UserTable`

    - `name`
    - `imageUrl`
    - `email`
    - `subscription` (optional)

- `TripDetailTable`
    - `tripId`
    - `tripDetail` (full itinerary JSON)
    - `uid` (relation to `UserTable`)

## API Endpoints Internal

- `POST /api/aimodel`
    - Guided chat mode and final itinerary generation.
- `POST /api/google-place-detail`
    - Fetches place photo references from Google Places.
- `GET /api/arcjet`
    - Example Arcjet-protected / rate-limited endpoint.

## Project Structure

```
app/
├── (auth)/                    # Authentication pages (sign-in, sign-up)
├── api/                       # API routes
│   ├── aimodel/              # AI completion endpoint
│   ├── arcjet/               # Rate limiting example
│   └── google-place-detail/  # Google Places integration
├── _components/              # Shared page components
├── create-new-trip/          # Trip creation with AI chat
├── my-trips/                 # User trip history
├── view-trip/                # Trip detail view
├── pricing/                  # Pricing page
├── contact-me/               # Contact & FAQ
├── provider.tsx              # Root providers (Clerk, Convex, Contexts)
└── layout.tsx                # Root layout

components/
├── ui/                        # Reusable UI components (buttons, inputs, etc.)
└── magicui/                   # Magic UI components (hero video)

context/                       # React contexts
├── UserDetailContext.tsx      # User data
├── TripDetailContext.tsx      # Current trip planning
└── InitialMessageContext.tsx  # Initial chat message

convex/                        # Convex backend
├── schema.ts                  # Database schema
├── user.ts                    # User mutations/queries
└── tripDetail.ts              # Trip mutations/queries

lib/
├── arcjet.ts                  # Arcjet configuration
└── utils.ts                   # Utility functions

public/                        # Static assets (images, logos)
```

## Troubleshooting

### Issue: "Environment variables not found"

**Solution:** Ensure `.env.local` file exists in the project root with all required keys. Restart dev server after changes.

### Issue: Convex queries fail

**Solution:**

1. Check `NEXT_PUBLIC_CONVEX_URL` is correct
2. Run `npx convex dev` in a separate terminal to sync schema
3. Verify Convex project is active and connected

### Issue: Clerk authentication not working

**Solution:**

1. Verify `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` are correct
2. Check allowed redirect URIs in Clerk dashboard include `localhost:3000`
3. Clear browser cookies and try again

### Issue: Google Places photos not loading

**Solution:**

1. Verify `GOOGLE_PLACE_API_KEY` is valid and has Places API v1 enabled
2. Check API key has `places.googleapis.com` in allowed domains
3. Ensure quota is not exceeded in Google Cloud Console

### Issue: AI request returns error

**Solution:**

1. Check `OPENROUTER_API_KEY` is valid
2. Verify Arcjet rate limit hasn't been exceeded
3. Review API response for specific error message in browser dev tools

## Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request with a clear description of changes

### Development Guidelines

- Use TypeScript for all new code
- Follow the existing component structure
- Test locally before submitting PR
- Update README if adding new features or env variables
- Keep commits focused and descriptive

## Current Product Status

Currently available:

- End-to-end flow from chat to saved trip.
- Trip listing and trip detail pages.
- Auth + database + AI integrations.

Recommended next improvements:

- Add automated tests (unit/integration/e2e).
- Validate AI response schema (e.g., with Zod) before writing to DB.
- Connect Contact Form to a real backend/email service.
- Add observability (production error tracking/logging).

## Deployment

Vercel is the recommended deployment platform.

Pre-deployment checklist:

1. All environment variables are configured in the deployment dashboard.
2. Clerk production keys are active.
3. Convex deployment is ready and public URL is correct.
4. Production domain is configured in related providers (Clerk, Arcjet, Google API if required).

## Credits

**Developer:** Affan

This project is built with amazing open-source tools and services:

- [Next.js](https://nextjs.org/) - React framework
- [Clerk](https://clerk.com/) - Authentication
- [Convex](https://www.convex.dev/) - Backend & database
- [OpenRouter](https://openrouter.ai/) - AI model access
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [MapLibre GL](https://maplibre.org/) - Map rendering

## License

Add a license that matches your project needs (e.g., MIT) before publishing.

For questions or support, reach out via the Contact page or email.
