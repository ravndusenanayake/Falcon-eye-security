# MASTER PROMPT TEMPLATE (ENTERPRISE FULL-STACK SYSTEM v FINAL)
*Tailored for Falcon Eye Security - Public Website + Admin Panel + Backend + API + DevOps System*

## ROLE DEFINITION (AI BEHAVIOR CONTRACT)
You are acting as a combined expert engineering team:
● Senior Software Architect (System Design & Scalability)
● Senior Full-Stack Engineer (Implementation Strategy)
● UI/UX Architect (Design Systems & User Experience)
● DevOps Engineer (Infrastructure & Deployment)
● Security Engineer (Application Security & Compliance)
● Database Architect (Data Modeling & Optimization)

## CORE OBJECTIVE
Design a:
Production-grade, scalable, secure, maintainable, high-performance full-stack system

The system must include:
● Public Website (Frontend)
● Admin Panel (Internal System)
● Backend API System
● Database Architecture
● Security Layer
● DevOps Setup
● Analytics System
● Media System
● Audit System
● **Real-time Monitoring System (NEW)**
● **Client Portal (NEW)**

---

## 1. PROJECT INPUT CONFIGURATION
(UNCHANGED — USER PROVIDED)

## 2. SYSTEM ARCHITECTURE REQUIREMENTS
### 2.1 Architecture Style
● Monolithic / Modular Monolith / Microservices
● Justify selection based on scalability

### 2.2 Layered Architecture
● Presentation Layer (Frontend + Admin + Client Portal)
● Application Layer (Business Logic)
● Domain Layer (Core Rules)
● Data Layer (Database + Cache)

### 2.3 System Components
● Public Website
● Admin Panel
● Client Portal
● API Layer
● Background Job System
● Notification System
● Analytics System
● **Real-time Event Bus (NEW)**

### 2.4 ANALYTICS & TRACKING SYSTEM
System MUST include:
● User behavior tracking system
● Event-based analytics (clicks, conversions, sessions)
● Admin dashboard analytics
● Page performance tracking
● Business KPI tracking
Tools: Google Analytics / Custom event tracking system

### 2.5 REAL-TIME COMMUNICATION SYSTEM (NEW MODULE)
*Crucial for a security system requiring live updates.*
● WebSockets (Socket.io/SignalR) for real-time alerts
● WebRTC integration (if live video/camera feeds are needed)
● Push Notifications (Web/Mobile)

---

## 3. PUBLIC WEBSITE & FRONTEND ARCHITECTURE
### 3.1 Page Structure
● Homepage
● About Us
● Services / Products
● Blog System
● Contact
● Auth Pages (Login, Register, Forgot Password)

### 3.2 UI/UX DESIGN SYSTEM (MANDATORY)
Must include:
*Design System Library:*
● Color tokens (primary, secondary, success, warning, danger)
● Typography system
● 8px spacing grid system
● Shadows / elevation system
● Border radius system

*Component Library:*
● Buttons, Inputs, Cards, Tables, Modals, Navigation, Alerts/Toasts, Pagination

### 3.3 RESPONSIVE DESIGN RULES
● Mobile-first approach
● Tablet optimization
● Desktop enhancement
● Flexible grid system

### 3.4 PROTECTED ROUTING
Frontend MUST include:
● Route guards (auth-based)
● Role-based UI rendering
● Admin/Client route protection
● Session/token validation
● Redirect handling

### 3.5 FRONTEND STATE MANAGEMENT & DATA FETCHING (NEW)
● Global State: Zustand / Redux Toolkit
● Server State/Caching: React Query (TanStack Query) / SWR
● Form Handling: React Hook Form + Zod

### 3.6 SEO ARCHITECTURE
● Meta tag system
● OpenGraph / Twitter cards
● Sitemap.xml & robots.txt
● Schema.org structured data
● SEO-friendly URLs

### 3.7 CLIENT PORTAL (NEW MODULE)
*Dedicated area for customers of Falcon Eye Security.*
● Secure dashboard for customers to view their security status
● Incident/Report viewing
● Invoice and billing history
● Support ticketing interface

### 3.8 DYNAMIC CONTENT RENDERING
● CMS-like system
● Page builder structure
● Section-based rendering (Hero, Features, Testimonials, CTA blocks)

---

## 4. ADMIN PANEL ARCHITECTURE
### 4.1 MODULE STRUCTURE
● Dashboard Module
● User Management Module
● Role & Permission Module
● Content Management Module
● Transaction Module
● Reports Module
● Settings Module
● Notification Module
● Audit Log Module
● Media Manager Module
● **Incident & Ticket Module (NEW)**
● **Device & Asset Module (NEW)**

### 4.2 MEDIA MANAGER SYSTEM
Must include:
● File upload system
● Image optimization (WebP/AVIF)
● Storage support (local + cloud - AWS S3/Cloudinary)
● Folder/category system
● File reuse system across modules

### 4.3 ADMIN UX RULES
● Table-first system
● Bulk actions
● Advanced filtering
● Inline editing
● Fast navigation sidebar

### 4.4 AUDIT LOG SYSTEM
Must track:
● User actions & Role changes
● Data updates & Admin operations
● Login/logout activity (including IP and Device metadata)

### 4.5 INCIDENT & TICKET MANAGEMENT MODULE (NEW)
● Alert triage and resolution tracking
● Security breach reporting workflow
● Priority-based queuing (Critical, High, Medium, Low)

### 4.6 LIVE MONITORING DASHBOARD & ASSET MANAGEMENT (NEW)
● Tracking physical/virtual security assets (Cameras, Sensors, Firewalls)
● Real-time status map or grid (Online, Offline, Maintenance)
● Active alerts ticker

---

## 5. ROLE-BASED ACCESS CONTROL (RBAC)
● Dynamic role creation & permission creation
● Role-permission mapping & User-role assignment
*Permission format:* module.action (e.g., user.create, report.view, camera.monitor)
*Enforcement:* Backend middleware, API layer protection, Frontend UI hiding, Admin panel enforcement

---

## 6. DATABASE ARCHITECTURE
### 6.1 RULES
● 3NF normalization
● Indexing strategy
● Soft deletes
● Audit fields (created_at, updated_at, created_by)

### 6.2 CORE ENTITIES
● users, roles, permissions, role_permissions, user_roles
● **incidents, devices, client_subscriptions (NEW)**

### 6.3 SEED SYSTEM (IMPORTANT)
Must include:
*System Seeds:* Default admin user, roles, permissions, system configuration
*RBAC Seeds:* Super Admin, Admin, Agent, Client, User
*Rules:* Idempotent execution, Safe re-run support, Environment-based execution

---

## 7. API ARCHITECTURE
● REST or GraphQL
● Versioning (/api/v1)
● Standard response format (`success`, `message`, `data`)

### 7.1 THIRD-PARTY API INTEGRATION
Must include:
● API service abstraction layer
● Webhook system
● External integrations: Payment (Stripe), Email (SendGrid), SMS services (Twilio), Cloud storage
*Rules:* No direct controller API calls, Centralized service layer only, Retry + fallback logic required

---

## 8. SECURITY ARCHITECTURE (UPGRADED FOR SECURITY DOMAIN)
● Authentication (JWT / Session / OAuth)
● **Multi-Factor Authentication (MFA / 2FA) (NEW)**
● **Passkeys (WebAuthn) Support (NEW)**
● Password hashing (bcrypt/argon2)
● CSRF protection & XSS prevention
● SQL/NoSQL injection protection
● Rate limiting & API throttling
● Secure headers (CSP, HSTS)
● **Strict Session Management (Absolute timeouts, concurrent login limits) (NEW)**
● **IP Allowlisting & Geoblocking (NEW)**
● **End-to-End Encryption for sensitive data (NEW)**
● OWASP Top 10 compliance

---

## 9. PERFORMANCE & SCALABILITY
● Redis caching
● CDN integration
● Lazy loading
● Queue-based processing (BullMQ / RabbitMQ)
● DB optimization
● Horizontal scaling readiness
● Asset optimization

---

## 10. SYSTEM MONITORING & ANALYTICS (UPGRADED)
● User behavior & Event tracking
● Conversion & Page performance metrics
● **Error Tracking (Sentry / Datadog) (NEW)**
● **Application Performance Monitoring (APM) (NEW)**

---

## 11. CODING STANDARDS & QUALITY ASSURANCE (UPGRADED)
● Clean folder structure & Naming conventions
● Service layer architecture
● Separation of concerns (No business logic in controllers)
● DRY & SOLID principles
● Error handling & Logging system
● **Testing Strategy (NEW):**
  ○ Unit Tests (Jest / Vitest)
  ○ Integration Tests
  ○ E2E Tests (Cypress / Playwright)
  ○ API / Load Tests (K6)

---

## 12. DOCUMENTATION SYSTEM
System MUST generate:
● README.md (setup + architecture)
● API documentation (Swagger/OpenAPI)
● Module documentation
● Deployment guide
● Developer onboarding guide
● **Disaster Recovery Playbook (NEW)**

---

## 13. DEVOPS & DEPLOYMENT (UPGRADED)
● CI/CD pipeline (GitHub Actions / GitLab CI)
● Docker & Container orchestration setup
● Environment separation (dev, staging, production)
● Logging + monitoring
● Backup strategy
● **Infrastructure as Code (IaC) - Terraform/CloudFormation (NEW)**
● **High Availability (HA) Setup (NEW)**

---

## 14. FINAL OUTPUT REQUIREMENTS
Must generate:
● System architecture diagram
● Database schema & API structure
● RBAC matrix
● Folder structure
● Admin modules & Client Portal structure
● Public website pages
● Security, Performance & DevOps plan
● Media, Audit log & Analytics systems
● Seed system structure
