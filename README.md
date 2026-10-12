# KARENWOOD — Luxury Wood Industry Holding Website

**هلدینگ صنایع چوب لوکس کارن‌وود | KARENWOOD Architectural Woodwork Holding**

An ultra-premium, multilingual (**FA / EN**, full **RTL / LTR**) static-export website built with **Next.js 14 (`output: 'export'`)**, **Tailwind CSS**, **Framer Motion**, **GSAP**, **Lenis Smooth Scroll**, and **Zustand**, engineered for single-push deployment to **GitHub Pages**.

---

## 🏛️ Aesthetic & Brand System

**Design Language:** *Scandinavian Minimalist × Japanese Wabi-Sabi × Modern Luxury* (inspired by Apple, Muji, Poliform, and Bulthaup).

### Color Palette (`tailwind.config.ts`)
| Token | Hex | Usage |
| :--- | :--- | :--- |
| `walnut` | `#3B2A1E` | Primary dark walnut brown |
| `bronze` | `#C8A165` | Brushed gold/bronze architectural accent |
| `cream` | `#F5F1EA` | Warm light background |
| `ink` | `#1A1A1A` | Deep charcoal typography & dark surfaces |
| `moss` | `#7A8B6F` | Botanical secondary accent & CTA |

### Typography
- **English Headings:** `Playfair Display`
- **English Body:** `Inter`
- **Persian Headings:** `Estedad`
- **Persian Body:** `Vazirmatn`

---

## 📄 Pages & Specialized Ateliers

1. **`/` Homepage** — Parallax Wood Hero, Split-Text Reveal, Holding Manifesto, 10-Subsidiary 3D Tilt Grid, Animated Stats Counter, Masonry Featured Projects Gallery with Lightbox, 5-Step Production Process, Testimonials Slider, Journal Preview, and Bespoke CTA.
2. **10 Specialized Subsidiary Pages**:
   - `/kitchen` — Kitchen Woodcraft (آشپزخانه چوبی)
   - `/bathroom` — Bathroom & Spa Woodwork (حمام و سرویس چوبی ضدآب)
   - `/doors` — Monumental & Pivot Wooden Doors (درب چوبی)
   - `/decor` — Interior Wooden Decoration & Acoustic Walls (دکوراسیون داخلی چوبی)
   - `/handicrafts` — Handcrafted Wooden Art, Kumiko & Orosi (صنایع دستی چوبی)
   - `/flooring` — Chevron, Herringbone & Versailles Parquet (کفپوش و پارکت تمام‌چوب)
   - `/stairs` — Cantilevered & Helical Wooden Stairs (پله چوبی معلق و مدرن)
   - `/office` — Executive Office Furniture & Smart Boardrooms (مبلمان و دکوراسیون اداری)
   - `/outdoor` — Bioclimatic Pergolas, Decking & Thermowood (سازه‌های چوبی فضای باز)
   - `/custom` — Bespoke One-of-One Commissions (سفارشات خاص و سفارشی)
3. **`/about`** — 1998–2026 Heritage Timeline, Core Values, Master Artisans Team, and 42,000 m² Industrial Campus.
4. **`/projects`** — Triple-Filterable Portfolio Gallery (Category × Timber Species × Design Style + Search + Dossier Modal).
5. **`/blog` & `/blog/[slug]`** — 6 full-length bilingual monographs on Wabi-Sabi architecture, kitchen timber science, waterproof spa wood, Kumiko joinery, FSC forestry, and biophilic acoustics.
6. **`/contact`** — Interactive Bespoke Consultation Form (`mailto:` + Formspree-ready) and Interactive Architectural Map.
7. **`/faq`**, **`/privacy`**, **`/terms`**, and custom **`404` (`not-found.tsx`)**.

---

## 🛠️ Local Development & Static Build

### 1. Run Locally
```bash
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

### 2. Build Static Export (`out/`)
```bash
npm run build
```
This runs Next.js with `output: 'export'` and generates a self-contained static site inside the `out/` directory.

---

## 🚀 GitHub Pages Deployment

### Automatic Deployment (GitHub Actions)
1. Push your code to the `main` branch:
   ```bash
   git push origin main
   ```
2. The workflow in `.github/workflows/deploy.yml` automatically:
   - Installs dependencies (`npm install`)
   - Auto-detects the repository name from `GITHUB_REPOSITORY` for `basePath` and `assetPrefix` in `next.config.js`
   - Builds the static site into `out/` and ensures `out/.nojekyll` is present
   - Publishes `out/` to the `gh-pages` branch
3. In your GitHub Repository **Settings → Pages**:
   - Under **Build and deployment**, set **Source** to **Deploy from a branch**
   - Select branch: **`gh-pages`** and folder: **`/ (root)`**, then click **Save**.

### Connecting a Custom Domain (`CNAME`)
1. Add a `CNAME` file inside `public/CNAME` containing your domain (e.g., `karenwood.com`), or set the repository variable `CUSTOM_DOMAIN` in **Settings → Secrets and variables → Actions → Variables**.
2. At your DNS provider, configure:
   - **A Records** pointing `@` to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **CNAME Record** pointing `www` to `<your-github-username>.github.io`.
3. If using a root custom domain (`https://karenwood.com`), set `REPO_NAME=""` or remove the subpath prefix in `next.config.js`.
