# 🌸 Kalpana Joyce Dovari — Personal Portfolio

> *"I turn data into decisions and ideas into deployed applications."*

A personal portfolio website built with **Next.js**, designed with a soft dark aesthetic — deep navy backgrounds, lavender and rose accents, and glassmorphism cards. Built to showcase my work in AI/ML engineering in a way that actually feels like me.

🔗 **Live site:** [my-portfolio-taupe-kappa-13.vercel.app](https://my-portfolio-taupe-kappa-13.vercel.app)

---

## ✨ Features

- **Soft dark aesthetic** — deep navy + lavender/rose gradient palette
- **Responsive design** — works across desktop and mobile
- **Featured Projects** — alternating layout with cover images and story descriptions
- **Projects Page** — full project cards with cover, screenshot, tagline and tech stack
- **Blog** — write and publish posts from a secret `/admin` page, stored in localStorage
- **Live date & time widget** — shows local time, date and timezone
- **Categorised Tech Stack** — skills grouped by Frontend, Backend, AI/ML and Tools
- **About & Contact pages** — clean, personal, recruiter-friendly
- **Resume download** — direct PDF link from the hero section
- **Deployed on Vercel** — auto-deploys on every push to `main`

---

## 🛠️ Built With

| Category | Technologies |
|---|---|
| **Framework** | Next.js 14, React, TypeScript |
| **Styling** | CSS Variables, Glassmorphism, Google Fonts (Inter + Playfair Display) |
| **Images** | Next.js Image component |
| **Blog storage** | localStorage |
| **Deployment** | Vercel |
| **Version control** | GitHub |

---

## 📁 Project Structure

```
my-portfolio/
├── app/
│   ├── about/
│   │   └── page.tsx          # About page
│   ├── admin/
│   │   └── page.tsx          # Secret blog admin page
│   ├── blog/
│   │   ├── page.tsx          # Blog listing page
│   │   └── [id]/
│   │       └── page.tsx      # Individual blog post
│   ├── contact/
│   │   └── page.tsx          # Contact page
│   ├── projects/
│   │   └── page.tsx          # All projects page
│   ├── globals.css            # Global styles + design tokens
│   ├── layout.tsx             # Navbar + Footer
│   └── page.tsx               # Homepage
├── public/
│   ├── projects/              # Project cover + screenshot images
│   └── resume.pdf             # Downloadable CV
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/kalpanajoycedovari/my-portfolio.git

# Navigate into the project
cd my-portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 Adding a Blog Post

1. Go to `/admin` on the live site
2. Enter the password
3. Write your title, pick a tag, write your post
4. Hit **Publish** — it appears on `/blog` instantly

---

## 🖼️ Projects Featured

| Project | Tech |
|---|---|
| **JoBo (Journalising Book)** | Python, OpenCV, Tesseract OCR, NumPy, Pandas |
| **Solite's Corner** | Firebase, GitHub Pages, Email Auth, JavaScript |
| **Speech Recognition Mini Pipeline** | Wav2Vec, PyTorch, NumPy, Speech Processing |
| **AI Resume Analyzer** | NLP, Python, Machine Learning, spaCy |

---

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#0d0f1a` |
| Card | `rgba(255,255,255,0.04)` |
| Accent Lavender | `#c084fc` |
| Accent Rose | `#f472b6` |
| Accent Mint | `#34d399` |
| Text Primary | `#f1f5f9` |
| Text Secondary | `#94a3b8` |
| Heading Font | Playfair Display |
| Body Font | Inter |

---

## 📬 Contact

- **GitHub:** [kalpanajoycedovari](https://github.com/kalpanajoycedovari)
- **Portfolio:** [my-portfolio-taupe-kappa-13.vercel.app](https://my-portfolio-taupe-kappa-13.vercel.app)

---

<p align="center">Designed & built with 💜 by Kalpana Joyce Dovari</p>