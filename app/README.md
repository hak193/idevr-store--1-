
# i-devr code LLC - E-commerce Platform

A modern, full-featured e-commerce platform built with Next.js 14, React 18, TypeScript, and Tailwind CSS. Features a complete shopping cart, user authentication, payment processing with Stripe, and order management system.

## 🚀 Features

### Core E-commerce Features
- **Product Catalog**: Browse and search mobile apps and desktop software
- **Shopping Cart**: Add/remove items, quantity management with persistent storage
- **User Authentication**: Secure signup/login with NextAuth.js
- **Checkout Process**: Multi-step checkout with billing information
- **Payment Processing**: Stripe integration for secure payments
- **Order Management**: Complete order history and tracking
- **Responsive Design**: Mobile-first design that works on all devices

### Technical Features ###
- **Next.js 14**: App Router, Server Components, and API Routes
- **TypeScript**: Full type safety throughout the application
- **Prisma ORM**: Type-safe database operations with PostgreSQL
- **Tailwind CSS**: Utility-first CSS framework with custom components
- **Zustand**: Lightweight state management for cart functionality
- **Radix UI**: Accessible, unstyled UI components
- **Framer Motion**: Smooth animations and transitions

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **PostgreSQL** database
- **Stripe Account** (for payment processing)

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd idevr-store/app
```

### 2. Install Dependencies
```bash
# Using yarn (recommended)
yarn install

# Or using npm
npm install
```

### 3. Environment Configuration
Copy the environment example file and configure your variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Database - Replace with your PostgreSQL connection string
DATABASE_URL="postgresql://username:password@localhost:5432/idevr_store"

# NextAuth.js - Generate a secure secret
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Stripe - ✅ LIVE KEYS CONFIGURED
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_***" # Live publishable key configured
STRIPE_SECRET_KEY="sk_live_***" # Live secret key configured

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Seed the database with sample data
npx prisma db seed
```

### 5. Start Development Server
```bash
yarn dev
# or
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🔧 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |
| `NEXTAUTH_URL` | Application URL for NextAuth | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Secret key for NextAuth.js | `your-secret-key` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (LIVE) | `pk_live_***` ✅ |
| `STRIPE_SECRET_KEY` | Stripe secret key (LIVE) | `sk_live_***` ✅ |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_URL` | Public application URL | `http://localhost:3000` |
| `SMTP_HOST` | Email server host | Not required |
| `SMTP_PORT` | Email server port | Not required |
| `SMTP_USER` | Email username | Not required |
| `SMTP_PASS` | Email password | Not required |

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub/GitLab**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your repository
   - Configure environment variables in Vercel dashboard
   - Deploy

3. **Database Setup**
   - Use Vercel Postgres or external PostgreSQL provider
   - Update `DATABASE_URL` in Vercel environment variables
   - Run migrations: `npx prisma db push`
   - Seed data: `npx prisma db seed`

### Netlify

1. **Build Configuration**
   Create `netlify.toml`:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **Deploy**
   - Connect repository to Netlify
   - Configure environment variables
   - Deploy

### Railway

1. **Deploy**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli

   # Login and deploy
   railway login
   railway init
   railway up
   ```

2. **Add PostgreSQL**
   ```bash
   railway add postgresql
   ```

3. **Configure Environment**
   - Set environment variables in Railway dashboard
   - Deploy with `railway up`

### DigitalOcean App Platform

1. **Create App**
   - Connect to GitHub repository
   - Configure build settings:
     - Build Command: `npm run build`
     - Run Command: `npm start`

2. **Add Database**
   - Create PostgreSQL database cluster
   - Update `DATABASE_URL` environment variable

3. **Configure Environment Variables**
   - Add all required environment variables
   - Deploy

### AWS (EC2 + RDS)

1. **Setup EC2 Instance**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install PM2 for process management
   sudo npm install -g pm2
   ```

2. **Setup RDS PostgreSQL**
   - Create PostgreSQL RDS instance
   - Configure security groups
   - Update `DATABASE_URL`

3. **Deploy Application**
   ```bash
   # Clone repository
   git clone <repository-url>
   cd idevr-store/app

   # Install dependencies
   npm install

   # Build application
   npm run build

   # Start with PM2
   pm2 start npm --name "idevr-store" -- start
   pm2 startup
   pm2 save
   ```

### Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine

   WORKDIR /app

   COPY package*.json ./
   RUN npm ci --only=production

   COPY . .
   RUN npm run build

   EXPOSE 3000

   CMD ["npm", "start"]
   ```

2. **Docker Compose**
   ```yaml
   version: '3.8'
   services:
     app:
       build: .
       ports:
         - "3000:3000"
       environment:
         - DATABASE_URL=postgresql://postgres:password@db:5432/idevr_store
         - NEXTAUTH_SECRET=your-secret
       depends_on:
         - db

     db:
       image: postgres:15
       environment:
         - POSTGRES_DB=idevr_store
         - POSTGRES_PASSWORD=password
       volumes:
         - postgres_data:/var/lib/postgresql/data

   volumes:
     postgres_data:
   ```

3. **Deploy**
   ```bash
   docker-compose up -d
   ```

## 💳 Payment Gateway Setup

### Stripe Integration ✅ LIVE & READY

**🎉 PRODUCTION STATUS: Live Stripe keys are configured and active!**

The application is ready to process **real payments** using live Stripe keys:
- ✅ Live publishable key configured
- ✅ Live secret key configured  
- ✅ API connection verified and working
- ✅ Checkout functionality ready for production

⚠️ **Important**: This application will process **real payments**. Only use real payment methods for actual purchases.

**For Development/Testing:**
If you need to switch back to test mode for development:

1. **Get Test Keys** from Stripe Dashboard:
   - Toggle to "View test data" in Stripe Dashboard
   - Copy test keys and replace in `.env.local`

2. **Test Cards** (only works with test keys):
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`

3. **Production Webhook** (when needed):
   - Add webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`

## 📁 Project Structure

```
idevr-store/app/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── checkout/             # Checkout processing
│   │   ├── orders/               # Order management
│   │   ├── payments/             # Payment processing
│   │   └── products/             # Product endpoints
│   ├── auth/                     # Authentication pages
│   ├── checkout/                 # Checkout flow
│   ├── orders/                   # Order history
│   ├── products/                 # Product catalog
│   └── globals.css               # Global styles
├── components/                   # React Components
│   ├── auth/                     # Authentication components
│   ├── cart/                     # Shopping cart components
│   ├── checkout/                 # Checkout components
│   ├── layout/                   # Header, footer, navigation
│   ├── products/                 # Product display components
│   ├── sections/                 # Homepage sections
│   └── ui/                       # Reusable UI components
├── lib/                          # Utilities and configurations
│   ├── cart-store.ts             # Cart state management
│   ├── db.ts                     # Database connection
│   ├── types.ts                  # TypeScript types
│   └── utils.ts                  # Utility functions
├── prisma/                       # Database schema and migrations
├── scripts/                      # Database seeding scripts
└── public/                       # Static assets
```

## 🔐 Security Considerations

### Authentication
- Passwords are hashed using bcrypt
- JWT tokens for session management
- CSRF protection enabled
- Secure HTTP-only cookies

### Payment Security
- PCI DSS compliant via Stripe
- No card data stored on servers
- SSL/TLS encryption required
- Webhook signature verification

### Data Protection
- Environment variables for secrets
- Database connection pooling
- Input validation and sanitization
- Rate limiting on API endpoints

## 🧪 Testing

### Run Tests
```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

### Test Payment Flow
1. Add products to cart
2. Proceed to checkout
3. Use test card: `4242 4242 4242 4242`
4. Complete payment
5. Verify order creation

## 🐛 Troubleshooting

### Common Issues

#### Database Connection Issues
```bash
# Check database connection
npx prisma db pull

# Reset database
npx prisma migrate reset

# Regenerate client
npx prisma generate
```

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules
rm -rf node_modules package-lock.json
npm install
```

#### Payment Issues
- Verify Stripe keys are correct
- Check webhook configuration
- Ensure SSL is enabled in production
- Verify currency settings

#### Environment Variables
- Ensure all required variables are set
- Check for typos in variable names
- Verify database URL format
- Confirm NextAuth secret is set

### Development Tips

1. **Hot Reload Issues**
   ```bash
   # Restart development server
   yarn dev
   ```

2. **Database Schema Changes**
   ```bash
   # Apply schema changes
   npx prisma db push
   ```

3. **Clear Application Data**
   ```bash
   # Clear browser localStorage (cart data)
   # Clear database and reseed
   npx prisma migrate reset
   npx prisma db seed
   ```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout

### Product Endpoints
- `GET /api/products` - List all products
- `GET /api/products/[id]` - Get product details

### Checkout Endpoints
- `POST /api/checkout` - Create order and payment intent
- `POST /api/payments/confirm` - Confirm payment

### Order Endpoints
- `GET /api/orders` - Get user orders
- `GET /api/orders/[id]` - Get order details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, please contact:
- **Email**: contact@i-devrcode.com
- **Phone**: 508-688-4378
- **Address**: 15 Monroe Avenue, Worcester, Massachusetts 01602

---

**Built with ❤️ by i-devr code LLC**
