# Portfolio — Dineth Wijesinghe

A modern, interactive React portfolio showcasing projects, skills, and experience in Software Engineering, Cloud, DevOps, and Site Reliability Engineering.

🔗 **Live Site:** [dineth.vercel.app](https://dineth.vercel.app) *(updated after deployment)*

---

## 📋 Project Structure

```
portfolio/
├── public/
│   ├── profile.jpg          # Profile photo
│   ├── cv.pdf               # Downloadable CV
│   └── Dineth_Wijesinghe.pdf
├── src/
│   ├── App.jsx              # Main app — all sections, data, and components
│   └── index.css            # Global styles & animations
├── .github/
│   └── workflows/
│       └── ci.yml           # GitHub Actions CI workflow
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Prerequisites

- **Node.js** v18+ — [Download](https://nodejs.org/)
- **npm** v8+ — comes with Node.js
- **Git** — [Download](https://git-scm.com/)

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/dineTH2003-dev/portfolio.git
cd portfolio

# Install dependencies
npm install
```

---

## 🏃 Running Locally

```bash
# Development server with hot reload
npm run dev
```

Opens at `http://localhost:3000`

```bash
# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## 🛠️ Customisation

All personal data is defined as constants at the top of `src/App.jsx`:

| Constant | Purpose |
|---|---|
| `PROFILE` | Name, bio, email, phone, GitHub, LinkedIn, career goal |
| `SKILLS` | Skill categories and tech stack items |
| `PROJECTS` | Project cards with descriptions, tech, and links |
| `TIMELINE` | Education history |
| `LEADERSHIP` | Leadership roles and activities |
| `ARTICLES` | Technical writing / Medium articles |

To update your info, just edit those constants — no hunting through components needed.

---

## 📱 Features

- ✨ Animated hero with typing effect and particle background
- 🎨 Dark/Light theme toggle
- 📊 Skills grid with tech icons
- 🚀 Project cards with GitHub & Live Site links
- 🏆 Leadership & Activities section
- ✍️ Technical Writing section with Medium article covers
- 📧 Contact form + copy-to-clipboard for email/phone
- 📱 Fully responsive mobile layout
- ⚡ Built with Vite for fast builds

---

## 🔧 Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint code check |

---

## 🌐 Deployment

This portfolio is deployed on **Vercel** with automatic CI/CD via GitHub Actions.

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import repo
3. Vercel auto-detects Vite — click **Deploy**
4. Every `git push main` auto-deploys ✅

### GitHub Actions CI

On every push/PR, the CI workflow runs `npm run build` to catch broken code before it reaches production.

```yaml
# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm
      - run: npm ci
      - run: npm run build
```

---

## 🐛 Troubleshooting

**`npm install` fails**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port already in use**
```bash
npm run dev -- --port 3001
```

**Changes not reflecting**
Hard refresh: `Ctrl + Shift + R`

---

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [GSAP / SplitText](https://gsap.com/)
- [Vercel Docs](https://vercel.com/docs)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 💬 Contact

- **Email:** wijesinghegdd.23@uom.lk
- **Phone:** +94 76 911 9747
- **GitHub:** [github.com/dineTH2003-dev](https://github.com/dineTH2003-dev)
- **LinkedIn:** [linkedin.com/in/dineth-wijesinghe](https://www.linkedin.com/in/dineth-wijesinghe)
- **Medium:** [@dinethwijesinghe](https://medium.com/@dinethwijesinghe)

---

*Built with passion & curiosity — Dineth Wijesinghe, 2026* 🚀
