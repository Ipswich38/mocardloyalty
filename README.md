# MOCards - Digital Dental Loyalty Card System

<div align="center">
  <img src="./public/webstorm-icon-logo.svg" alt="MOCards Logo" width="120" height="120">
  <h3>Your digital dental loyalty card system</h3>
  <p>Track benefits, earn points, and maintain oral health with ease</p>
  
  [![Build Status](https://img.shields.io/github/workflow/status/mocards/mocardloyalty/CI?style=flat-square)](https://github.com/mocards/mocardloyalty/actions)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-18.3-blue?style=flat-square)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue?style=flat-square)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
</div>

## ✨ Features

### 🎯 Core Features
- **Digital Loyalty Card** - Beautiful, interactive loyalty card with tier-based theming
- **Benefits Tracking** - Monitor dental benefits usage throughout the year
- **Service History** - Complete history of dental services and points earned
- **Tier System** - Bronze, Silver, Gold, and Platinum membership tiers
- **Points System** - Earn and track loyalty points with multipliers
- **Dark Theme** - Modern glassmorphism design with dark mode

### 🏥 Dental Features
- **Benefit Categories** - Oral prophylaxis, extractions, fillings, fluoride treatments
- **Service Categories** - Preventive, restorative, cosmetic, surgical, orthodontic, emergency
- **Provider Tracking** - Track which dentist performed each service
- **Notes System** - Detailed notes for each service
- **Expiry Tracking** - Monitor benefit expiration dates

### 💎 Premium Experience
- **Apple-Inspired Design** - Clean, intuitive interface following HIG principles
- **Smooth Animations** - Motion-powered animations for delightful interactions
- **Responsive Design** - Perfect on mobile, tablet, and desktop
- **Glassmorphism UI** - Modern translucent design elements
- **Progressive Web App** - Install and use like a native app

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** 7.0.0 or higher (or yarn 3.0.0+)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mocards/mocardloyalty.git
   cd mocardloyalty
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

### Demo Access
Use these credentials to explore the application:
- **Username:** `demo`
- **Password:** `password123`

## 🏗️ Technology Stack

### Frontend
- **[React 18](https://reactjs.org/)** - UI library with hooks and concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Fast build tool and dev server
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### UI Components
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[Lucide React](https://lucide.dev/)** - Beautiful SVG icons
- **[Motion](https://motion.dev/)** - Production-ready motion library
- **Custom Shadcn/ui** - Styled component system

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Husky](https://typicode.github.io/husky/)** - Git hooks (future)

### Production
- **[Docker](https://www.docker.com/)** - Containerization
- **[Nginx](https://nginx.org/)** - Web server
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD

## 📁 Project Structure

```
mocardloyalty/
├── public/                 # Static assets
│   ├── fonts/             # Custom fonts (JetBrains Sans/Mono)
│   ├── icons/             # App icons and favicons
│   ├── manifest.json      # PWA manifest
│   └── robots.txt         # SEO robots file
├── src/                   # Source code
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components (Shadcn-style)
│   │   ├── LoginScreen.tsx
│   │   ├── PatientDashboard.tsx
│   │   ├── VirtualCard.tsx
│   │   ├── BenefitsTracker.tsx
│   │   └── ServiceHistory.tsx
│   ├── lib/              # Utilities and constants
│   │   ├── utils.ts      # Helper functions
│   │   └── constants.ts  # App constants and config
│   ├── types.ts          # TypeScript type definitions
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # App entry point
│   └── index.css         # Global styles
├── docs/                 # Documentation
├── .github/              # GitHub workflows
└── docker/               # Docker configuration
```

## 🎨 Design System

### Color Palette
```css
/* Tier Colors */
--tier-bronze: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)
--tier-silver: linear-gradient(135deg, #94a3b8 0%, #64748b 100%)
--tier-gold: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)
--tier-platinum: linear-gradient(135deg, #a855f7 0%, #6366f1 100%)

/* Glassmorphism */
--glass-subtle: rgba(255, 255, 255, 0.05)
--glass-light: rgba(255, 255, 255, 0.1)
--glass-medium: rgba(255, 255, 255, 0.15)
```

### Typography
- **Font Family:** JetBrains Sans (headings), JetBrains Mono (code)
- **Scale:** Based on 14px root with perfect ratio scaling
- **Line Height:** 1.5 for optimal readability

### Spacing
- **System:** 4px base unit with consistent scale
- **Components:** Consistent padding and margins
- **Layouts:** Responsive grid system

## 🏥 Dental Features

### Membership Tiers

| Tier | Points Required | Multiplier | Benefits |
|------|----------------|------------|----------|
| **Bronze** | 0 - 999 | 1.0x | Basic benefits, 10% birthday discount |
| **Silver** | 1,000 - 2,999 | 1.2x | Enhanced benefits, 15% birthday discount |
| **Gold** | 3,000 - 7,499 | 1.5x | Premium benefits, 20% birthday discount |
| **Platinum** | 7,500+ | 2.0x | VIP benefits, 25% birthday discount |

### Benefit Categories
- **Oral Prophylaxis** - Professional cleaning and plaque removal
- **Tooth Extraction** - Safe removal of damaged teeth
- **Light Cure Filling** - Composite resin cavity treatment
- **Fluoride Treatment** - Enamel protection application

### Service Categories
- **Preventive** - Routine care to prevent problems
- **Restorative** - Treatments to restore damaged teeth
- **Cosmetic** - Treatments to improve smile appearance
- **Surgical** - Surgical dental procedures
- **Orthodontic** - Teeth alignment and bite correction
- **Emergency** - Urgent dental care

## 📱 Usage Guide

### Getting Started
1. **Login** - Use demo credentials or your account
2. **View Card** - See your digital loyalty card with current tier
3. **Track Benefits** - Monitor your annual dental benefits
4. **Service History** - Review past and upcoming services

### Navigation
- **Overview Tab** - Contact information and account summary
- **Benefits Tab** - Detailed benefits tracking and usage
- **Services Tab** - Complete service history with filters

### Key Features
- **Interactive Card** - Tap to view different card sections
- **Progress Tracking** - Visual progress bars for tier advancement
- **Detailed History** - Expandable service details with notes
- **Responsive Design** - Works perfectly on all devices

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run preview      # Preview production build

# Building
npm run build        # Build for production
npm run type-check   # Run TypeScript checks

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Application
VITE_APP_ENV=development
VITE_APP_VERSION=1.0.0

# API (Future)
VITE_API_BASE_URL=http://localhost:3001
VITE_API_TIMEOUT=10000

# Features
VITE_ENABLE_DEMO_MODE=true
VITE_ENABLE_ANIMATIONS=true
```

### Development Workflow

1. **Feature Development**
   ```bash
   git checkout -b feature/new-feature
   npm run dev
   # Make your changes
   npm run type-check
   npm run lint
   npm run build
   git commit -m "feat: add new feature"
   ```

2. **Code Quality**
   - TypeScript for type safety
   - ESLint for code quality
   - Prettier for formatting
   - Consistent file naming

3. **Component Structure**
   ```typescript
   // Component template
   interface ComponentProps {
     // Define props
   }

   export function Component({ prop }: ComponentProps) {
     // Component logic
     return (
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
       >
         {/* Component JSX */}
       </motion.div>
     )
   }
   ```

## 🐳 Deployment

### Docker Deployment

1. **Build Docker image**
   ```bash
   docker build -t mocards:latest .
   ```

2. **Run container**
   ```bash
   docker run -p 3000:80 mocards:latest
   ```

3. **Using Docker Compose**
   ```bash
   docker-compose up -d
   ```

### Static Hosting (Netlify/Vercel)

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder**
   - Upload to your hosting provider
   - Configure redirects for SPA routing

### Environment-Specific Builds

```bash
# Development
VITE_APP_ENV=development npm run build

# Staging
VITE_APP_ENV=staging npm run build

# Production
VITE_APP_ENV=production npm run build
```

## 🔒 Security

### Security Features
- **Content Security Policy** - Prevents XSS attacks
- **Secure Headers** - X-Frame-Options, X-Content-Type-Options
- **Input Validation** - Client-side validation for all inputs
- **Session Management** - Secure token handling
- **HTTPS Only** - Forced HTTPS in production

### Security Best Practices
- No sensitive data in localStorage
- Secure credential handling
- Regular dependency updates
- Environment variable protection

## ♿ Accessibility

### WCAG 2.1 AA Compliance
- **Keyboard Navigation** - Full keyboard support
- **Screen Readers** - Semantic HTML and ARIA labels
- **Color Contrast** - High contrast ratios (4.5:1 minimum)
- **Touch Targets** - Minimum 44px touch targets
- **Focus Management** - Visible focus indicators

### Accessibility Features
- Alt text for images
- Proper heading hierarchy
- Form labels and validation
- Skip navigation links
- Reduced motion support

## 📊 Performance

### Metrics
- **First Contentful Paint** < 1.5s
- **Largest Contentful Paint** < 2.5s
- **Cumulative Layout Shift** < 0.1
- **First Input Delay** < 100ms

### Optimization Techniques
- **Code Splitting** - Lazy loading of components
- **Asset Optimization** - Optimized images and fonts
- **Bundle Analysis** - Regular bundle size monitoring
- **Caching Strategy** - Aggressive caching of static assets

## 🧪 Testing

### Testing Strategy
- **Component Testing** - React Testing Library
- **Type Testing** - TypeScript compilation
- **Linting** - ESLint rules
- **E2E Testing** - Playwright (future)

### Running Tests
```bash
npm run test          # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## 🤝 Contributing

### Contribution Guidelines
1. **Fork the repository**
2. **Create a feature branch**
3. **Write tests** for new features
4. **Follow code style** guidelines
5. **Submit a pull request**

### Development Setup
```bash
git clone https://github.com/mocards/mocardloyalty.git
cd mocardloyalty
npm install
npm run dev
```

### Code Style
- Use TypeScript for all new code
- Follow existing naming conventions
- Write self-documenting code
- Add JSDoc for complex functions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help
- **Documentation** - Check our comprehensive docs
- **Issues** - Report bugs on GitHub Issues
- **Discussions** - Community discussions on GitHub
- **Email** - support@mocards.com

### Common Issues

**Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript Errors**
```bash
# Run type checking
npm run type-check
```

**Styling Issues**
```bash
# Rebuild Tailwind
npm run build
```

## 🔄 Changelog

### Version 1.0.0 (2024-01-XX)
- ✨ Initial release
- 🎯 Core loyalty card features
- 🏥 Dental benefits tracking
- 📱 Responsive design
- 🎨 Glassmorphism UI
- 🔒 Security features

## 🎯 Roadmap

### Version 1.1.0
- [ ] User authentication system
- [ ] Real-time notifications
- [ ] Appointment booking
- [ ] Payment integration

### Version 1.2.0
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Family accounts
- [ ] Referral system

### Version 2.0.0
- [ ] Native mobile apps
- [ ] Offline support
- [ ] Advanced reporting
- [ ] Practice management integration

---

<div align="center">
  <p>Made with ❤️ by the MOCards team</p>
  <p>
    <a href="https://mocards.app">Website</a> •
    <a href="https://github.com/mocards/mocardloyalty">GitHub</a> •
    <a href="mailto:support@mocards.com">Support</a>
  </p>
</div>