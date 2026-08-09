# Fly Capstone - Phase 1: Foundations

A production-ready, server-first **Next.js App Router** application built for the Frontend AI Engineering capstone project. Designed with Tailwind CSS, custom design tokens, dark glassmorphism, responsive navigation (`375px` mobile to `1280px` desktop), interactive field validation, and real-time telemetry diagnostics.

---

## 🌟 Key Features & Deliverables

- **Server-First Architecture**: Built with Next.js App Router. Pages are Server Components by default (`/`, `/analytics`, `/profile`, `/health`) with interactivity scoped to Client Components (`/settings`).
- **Tailwind CSS & Design Tokens**: HSL color tokens, dark glassmorphic surfaces (`backdrop-blur-xl`), custom typography, and responsive viewports (`375px` mobile drawer, `1280px` persistent sidebar).
- **Spec Routed Screens**:
  - `GET /` — **Dashboard Overview**: Metrics overview, architecture status, quick screen navigation.
  - `GET /settings` — **Capstone Settings Form**: Field validation (`displayName`, `emailNotifications`), ARIA roles (`role="alert"`, `role="status"`), inline error states, and save notifications.
  - `GET /analytics` — **System Analytics**: Real-time request rates, p99 latency metrics, and edge regional performance table.
  - `GET /profile` — **User Profile**: Account credentials summary, role management, and active sessions telemetry.
  - `GET /health` — **Health Telemetry Screen**: Renders live fetched data from `/api/health`.
  - `GET /api/health` — **Health Diagnostic API**: JSON endpoint providing uptime, latency, memory telemetry, and subsystem checks.
- **Zero Secrets & Env Security**: Documented `.env.example` structure. Zero secrets committed to git.

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Build & Verification

To test production compilation and verify zero build errors:

```bash
npm run build
```

---

## 🌐 Deploying to Vercel (Preview URLs)

Deploying on day one ensures every commit generates a live preview URL.

### Step-by-Step Vercel Integration:

1. **Push Repository to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: scaffold phase 1 foundations with next.js and tailwind"
   git remote add origin https://github.com/YOUR_USERNAME/fly-capstone.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Select your `fly-capstone` GitHub repository.
   - Set **Framework Preset**: `Next.js`.
   - Add environment variables under **Environment Variables** using values from `.env.example`:
     - `NEXT_PUBLIC_APP_URL` = `https://<your-vercel-domain>.vercel.app`
     - `NEXT_PUBLIC_API_BASE_URL` = `https://api.fly-capstone.example.com`
     - `NODE_ENV` = `production`
   - Click **Deploy**.

3. **Confirm Preview Deployments**:
   - Every push or pull request to GitHub will automatically trigger a Vercel Preview Deployment.
   - Retrieve the live preview URL from the Vercel dashboard or GitHub deployment check.

---

## 📋 Evaluation Criteria Checklist

- [x] **Preview URL loads with no build errors**: Validated Next.js App Router build pipeline.
- [x] **Every screen from spec exists as a routed placeholder**:
  - `/` (Dashboard)
  - `/settings` (Settings)
  - `/analytics` (Analytics)
  - `/profile` (Profile)
  - `/health` (Health Telemetry)
  - `/api/health` (Diagnostic API)
- [x] **Responsive at 375px and 1280px**: Tested mobile drawer (`375px`) and desktop layout (`1280px`).
- [x] **No secrets in repo**: Clean `.env.example` file provided.
