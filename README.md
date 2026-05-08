# Oscar's Cybersecurity Portfolio

A premium modern cybersecurity and software engineering portfolio website built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

### Main Portfolio
- **Hero Section** - Animated introduction with typing effect
- **About Section** - Professional biography and highlights
- **Skills Section** - Interactive skill bars with categories (Cybersecurity, Development, Tools)
- **Projects Section** - Featured project showcase with GitHub links
- **Learning Journey** - Timeline of learning milestones and certifications
- **TryHackMe Showcase** - Cybersecurity learning progress display
- **AI Chatbot** - Interactive portfolio assistant
- **Contact Section** - Contact form and social links
- **Animated Background** - Dynamic gradients, particles, and mouse-following effects

### Admin Dashboard
- **Secure Authentication** - JWT-based login with rate limiting
- **Visitor Analytics** - Track page views, device stats, and browser usage
- **Social Links Management** - Edit GitHub, TryHackMe, LinkedIn, Twitter, and email links

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **Jose** - JWT handling
- **bcryptjs** - Password hashing

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your values:
```
AUTH_SECRET=your-secret-key-here
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=hashed-password
```

4. Generate a password hash:
```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('your-password', 12).then(console.log);"
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Admin Access

- **Login URL**: `/admin/login`
- **Default credentials** (for development):
  - Email: `admin@example.com`
  - Password: `admin123`

> ⚠️ **Important**: Change the default credentials in production by setting `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH` in your `.env` file.

## Project Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── login/       # Admin login page
│   │   └── dashboard/   # Admin dashboard
│   ├── api/
│   │   ├── auth/        # Authentication endpoints
│   │   ├── github/      # GitHub API integration
│   │   └── visitor/     # Visitor tracking
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/
│   ├── sections/        # Page sections
│   └── ui/              # Reusable UI components
├── data/
│   └── portfolio.ts     # Portfolio content data
├── hooks/               # Custom React hooks
├── lib/
│   └── auth.ts          # Authentication utilities
├── types/               # TypeScript definitions
└── utils/               # Helper functions
```

## Customization

### Editing Content

Most content is configured in `src/data/portfolio.ts`:
- Navigation links
- Social links
- Hero section text
- About section content
- Skills and proficiency levels
- Projects
- Certifications
- Learning journey
- Chatbot responses

### Styling

- Global styles: `src/app/globals.css`
- CSS variables for colors and effects
- Tailwind CSS for utility classes
- Custom animations defined in globals.css

## Security Features

- **JWT Authentication** - Secure session management
- **Rate Limiting** - Prevents brute force attacks
- **Password Hashing** - bcrypt with salt rounds
- **HttpOnly Cookies** - Secure session storage
- **Input Sanitization** - XSS protection
- **CSRF Protection** - SameSite cookie policy

## Visitor Tracking

The portfolio includes ethical, privacy-conscious visitor tracking:
- Page view counts
- Device type detection (desktop/mobile/tablet)
- Browser statistics
- Recent visitor log

No personal data is collected or stored.

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Other Platforms

Build the project and deploy the `.next` folder:

```bash
npm run build
# Deploy .next folder to your hosting provider
```

## License

MIT License - Feel free to use this portfolio as inspiration for your own!

## Links

- **GitHub**: [github.com/The-Red-Serpent](https://github.com/The-Red-Serpent)
- **TryHackMe**: [tryhackme.com/p/Oscar.Senior](https://tryhackme.com/p/Oscar.Senior)