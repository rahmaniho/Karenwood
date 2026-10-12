#!/usr/bin/env python3
"""
KARENWOOD Asset Generator
Generates all bespoke brand SVGs, architectural illustrations, patterns,
favicons, Apple touch icon, and OG social cards using only Karenwood brand colors:
- walnut: #3B2A1E
- bronze: #C8A165
- cream:  #F5F1EA
- ink:    #1A1A1A
- moss:   #7A8B6F
"""

import os
import struct
import zlib
import math

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_DIR = os.path.join(BASE_DIR, "public")
IMAGES_DIR = os.path.join(PUBLIC_DIR, "images")

for sub in ["subsidiaries", "projects", "team", "blog", "patterns"]:
    os.makedirs(os.path.join(IMAGES_DIR, sub), exist_ok=True)


def write_file(path: str, content: str):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")


# ---------------------------------------------------------------------------
# 1. LOGO SVGs (Monogram "K" formed from wood grain lines & tree rings + wordmark)
# ---------------------------------------------------------------------------
LOGO_LIGHT_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 80" fill="none" role="img" aria-label="KARENWOOD — هلدینگ صنایع چوب کارن‌وود">
  <defs>
    <linearGradient id="kw-walnut" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3B2A1E"/>
      <stop offset="100%" stop-color="#1A1A1A"/>
    </linearGradient>
    <linearGradient id="kw-bronze" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#C8A165"/>
      <stop offset="50%" stop-color="#F5F1EA"/>
      <stop offset="100%" stop-color="#C8A165"/>
    </linearGradient>
  </defs>
  <!-- Emblem Background & Tree Ring Monogram -->
  <g transform="translate(6, 6)">
    <rect x="2" y="2" width="64" height="64" rx="14" fill="#F5F1EA" stroke="#C8A165" stroke-width="1.5"/>
    <!-- Concentric Wood Rings -->
    <circle cx="34" cy="34" r="27" stroke="#C8A165" stroke-width="0.75" stroke-dasharray="4 3" opacity="0.55"/>
    <path d="M13 34 C13 21, 22 13, 34 13 C46 13, 55 21, 55 34 C55 46, 46 55, 34 55" stroke="#7A8B6F" stroke-width="0.9" opacity="0.45" fill="none"/>
    <path d="M18 34 C18 24, 25 18, 34 18 C43 18, 50 25, 50 34" stroke="#C8A165" stroke-width="0.9" opacity="0.5" fill="none"/>
    <!-- Wood Grain Monogram K -->
    <path d="M23 17 V51" stroke="#3B2A1E" stroke-width="4.2" stroke-linecap="round"/>
    <path d="M26.5 19 V49" stroke="#C8A165" stroke-width="1.2" stroke-linecap="round" opacity="0.85"/>
    <path d="M46 18 L27 34.5 L47 51" stroke="#3B2A1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M43 22 L31 33.5" stroke="#C8A165" stroke-width="1.5" stroke-linecap="round"/>
    <!-- Subtle Botanical Leaf / Wood Heart Accent -->
    <path d="M43 16 C48 16, 50 20, 46 23 C42 23, 41 19, 43 16 Z" fill="#7A8B6F"/>
    <circle cx="23" cy="34" r="2" fill="#C8A165"/>
  </g>
  <!-- Wordmark -->
  <g transform="translate(86, 0)">
    <text x="0" y="42" font-family="'Playfair Display', Georgia, serif" font-size="27" font-weight="700" letter-spacing="4.5" fill="#3B2A1E">KARENWOOD</text>
    <line x1="0" y1="51" x2="72" y2="51" stroke="#C8A165" stroke-width="1.5"/>
    <circle cx="80" cy="51" r="2" fill="#7A8B6F"/>
    <text x="90" y="55" font-family="'Inter', sans-serif" font-size="9.5" font-weight="600" letter-spacing="3.2" fill="#7A8B6F">HOLDING ATELIER</text>
  </g>
</svg>"""

LOGO_DARK_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 80" fill="none" role="img" aria-label="KARENWOOD — هلدینگ صنایع چوب کارن‌وود">
  <g transform="translate(6, 6)">
    <rect x="2" y="2" width="64" height="64" rx="14" fill="#3B2A1E" stroke="#C8A165" stroke-width="1.5"/>
    <circle cx="34" cy="34" r="27" stroke="#C8A165" stroke-width="0.75" stroke-dasharray="4 3" opacity="0.5"/>
    <path d="M13 34 C13 21, 22 13, 34 13 C46 13, 55 21, 55 34 C55 46, 46 55, 34 55" stroke="#7A8B6F" stroke-width="0.9" opacity="0.55" fill="none"/>
    <path d="M18 34 C18 24, 25 18, 34 18 C43 18, 50 25, 50 34" stroke="#C8A165" stroke-width="0.9" opacity="0.55" fill="none"/>
    <path d="M23 17 V51" stroke="#F5F1EA" stroke-width="4.2" stroke-linecap="round"/>
    <path d="M26.5 19 V49" stroke="#C8A165" stroke-width="1.3" stroke-linecap="round"/>
    <path d="M46 18 L27 34.5 L47 51" stroke="#C8A165" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M43 22 L31 33.5" stroke="#F5F1EA" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M43 16 C48 16, 50 20, 46 23 C42 23, 41 19, 43 16 Z" fill="#7A8B6F"/>
    <circle cx="23" cy="34" r="2" fill="#C8A165"/>
  </g>
  <g transform="translate(86, 0)">
    <text x="0" y="42" font-family="'Playfair Display', Georgia, serif" font-size="27" font-weight="700" letter-spacing="4.5" fill="#F5F1EA">KARENWOOD</text>
    <line x1="0" y1="51" x2="72" y2="51" stroke="#C8A165" stroke-width="1.5"/>
    <circle cx="80" cy="51" r="2" fill="#7A8B6F"/>
    <text x="90" y="55" font-family="'Inter', sans-serif" font-size="9.5" font-weight="600" letter-spacing="3.2" fill="#C8A165">HOLDING ATELIER</text>
  </g>
</svg>"""

write_file(os.path.join(PUBLIC_DIR, "logo.svg"), LOGO_LIGHT_SVG)
write_file(os.path.join(IMAGES_DIR, "logo.svg"), LOGO_LIGHT_SVG)
write_file(os.path.join(PUBLIC_DIR, "logo-dark.svg"), LOGO_DARK_SVG)
write_file(os.path.join(IMAGES_DIR, "logo-dark.svg"), LOGO_DARK_SVG)


# ---------------------------------------------------------------------------
# 2. HERO BACKGROUND SVG (Abstract Wood Grain & Topographic Tree Rings)
# ---------------------------------------------------------------------------
HERO_BG_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" fill="none" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="hero-base" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3B2A1E"/>
      <stop offset="55%" stop-color="#1A1A1A"/>
      <stop offset="100%" stop-color="#3B2A1E"/>
    </linearGradient>
    <radialGradient id="hero-glow" cx="0.72" cy="0.35" r="0.58">
      <stop offset="0%" stop-color="#C8A165" stop-opacity="0.28"/>
      <stop offset="55%" stop-color="#3B2A1E" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#1A1A1A" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="hero-moss" cx="0.2" cy="0.8" r="0.5">
      <stop offset="0%" stop-color="#7A8B6F" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#1A1A1A" stop-opacity="0"/>
    </radialGradient>
    <pattern id="kumiko-subtle" width="120" height="120" patternUnits="userSpaceOnUse">
      <path d="M0 0 L120 120 M120 0 L0 120 M60 0 V120 M0 60 H120" stroke="#C8A165" stroke-width="0.45" stroke-opacity="0.12"/>
      <rect x="0" y="0" width="120" height="120" stroke="#C8A165" stroke-width="0.6" stroke-opacity="0.14" fill="none"/>
    </pattern>
  </defs>
  <rect width="1920" height="1080" fill="url(#hero-base)"/>
  <rect width="1920" height="1080" fill="url(#hero-glow)"/>
  <rect width="1920" height="1080" fill="url(#hero-moss)"/>
  <rect width="1920" height="1080" fill="url(#kumiko-subtle)"/>

  <!-- Organic Flowing Wood Grain Contours -->
  <g stroke="#C8A165" fill="none" opacity="0.32">
    <path d="M-100 180 C380 90, 740 310, 1220 190 C1560 110, 1780 240, 2020 170" stroke-width="1.4"/>
    <path d="M-100 250 C410 150, 770 380, 1250 260 C1580 180, 1790 310, 2020 240" stroke-width="1.0"/>
    <path d="M-100 330 C440 220, 790 450, 1270 340 C1610 250, 1810 380, 2020 320" stroke-width="0.8"/>
    <path d="M-100 420 C460 320, 820 530, 1300 420 C1630 330, 1820 460, 2020 410" stroke-width="1.3"/>
    <path d="M-100 520 C490 430, 850 610, 1330 510 C1650 430, 1830 550, 2020 500" stroke-width="0.9"/>
    <path d="M-100 630 C520 540, 880 710, 1360 610 C1680 530, 1850 640, 2020 600" stroke-width="1.2"/>
    <path d="M-100 740 C540 650, 910 810, 1390 710 C1700 630, 1860 730, 2020 700" stroke-width="0.8"/>
    <path d="M-100 850 C570 760, 940 900, 1420 810 C1720 730, 1880 820, 2020 800" stroke-width="1.1"/>
    <path d="M-100 950 C600 860, 970 980, 1450 900 C1740 830, 1890 910, 2020 890" stroke-width="0.7"/>
  </g>

  <!-- Architectural Tree Heart Concentric Knot -->
  <g transform="translate(1380, 440)" stroke="#C8A165" fill="none">
    <ellipse cx="0" cy="0" rx="420" ry="260" transform="rotate(-14)" stroke-width="1.1" stroke-opacity="0.24"/>
    <ellipse cx="0" cy="0" rx="340" ry="205" transform="rotate(-12)" stroke-width="1.0" stroke-opacity="0.28"/>
    <ellipse cx="0" cy="0" rx="265" ry="155" transform="rotate(-10)" stroke-width="1.2" stroke-opacity="0.32" stroke-dasharray="12 6"/>
    <ellipse cx="0" cy="0" rx="195" ry="112" transform="rotate(-8)" stroke-width="1.1" stroke-opacity="0.38"/>
    <ellipse cx="0" cy="0" rx="130" ry="74" transform="rotate(-6)" stroke-width="1.4" stroke-opacity="0.45"/>
    <ellipse cx="0" cy="0" rx="72" ry="42" transform="rotate(-4)" stroke-width="1.5" stroke-opacity="0.55"/>
    <circle cx="0" cy="0" r="14" fill="#C8A165" fill-opacity="0.25" stroke-width="1.5" stroke-opacity="0.75"/>
  </g>

  <!-- Vertical Architectural Slat Lines -->
  <g stroke="#F5F1EA" stroke-opacity="0.06" stroke-width="1">
    <line x1="240" y1="0" x2="240" y2="1080"/>
    <line x1="480" y1="0" x2="480" y2="1080"/>
    <line x1="720" y1="0" x2="720" y2="1080"/>
    <line x1="960" y1="0" x2="960" y2="1080"/>
    <line x1="1200" y1="0" x2="1200" y2="1080"/>
    <line x1="1440" y1="0" x2="1440" y2="1080"/>
    <line x1="1680" y1="0" x2="1680" y2="1080"/>
  </g>
</svg>"""

write_file(os.path.join(IMAGES_DIR, "hero-bg.svg"), HERO_BG_SVG)


# ---------------------------------------------------------------------------
# 3. PATTERN OVERLAY SVGs
# ---------------------------------------------------------------------------
WOOD_GRAIN_PATTERN = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none">
  <path d="M0 40 Q100 20 200 45 T400 35" stroke="#3B2A1E" stroke-opacity="0.12" stroke-width="1.2"/>
  <path d="M0 95 Q120 75 220 100 T400 90" stroke="#C8A165" stroke-opacity="0.16" stroke-width="1"/>
  <path d="M0 155 Q90 180 200 150 T400 165" stroke="#3B2A1E" stroke-opacity="0.1" stroke-width="1.4"/>
  <path d="M0 215 Q130 190 240 220 T400 210" stroke="#C8A165" stroke-opacity="0.15" stroke-width="1"/>
  <path d="M0 275 Q110 300 210 270 T400 285" stroke="#7A8B6F" stroke-opacity="0.12" stroke-width="1.1"/>
  <path d="M0 340 Q140 320 250 350 T400 335" stroke="#3B2A1E" stroke-opacity="0.12" stroke-width="1.2"/>
</svg>"""

TREE_RINGS_PATTERN = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none">
  <g transform="translate(200,200)" stroke="#C8A165" stroke-opacity="0.22">
    <circle r="30" stroke-width="1.2"/>
    <circle r="65" stroke-width="1" stroke-dasharray="8 4"/>
    <circle r="100" stroke-width="1.1"/>
    <circle r="138" stroke-width="0.9"/>
    <circle r="176" stroke-width="1.2" stroke-dasharray="14 6"/>
  </g>
</svg>"""

KUMIKO_PATTERN = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
  <g stroke="#C8A165" stroke-opacity="0.2" stroke-width="1">
    <rect x="0" y="0" width="100" height="100"/>
    <rect x="100" y="0" width="100" height="100"/>
    <rect x="0" y="100" width="100" height="100"/>
    <rect x="100" y="100" width="100" height="100"/>
    <path d="M0 0 L200 200 M200 0 L0 200 M100 0 L0 100 L100 200 L200 100 Z"/>
  </g>
</svg>"""

write_file(os.path.join(IMAGES_DIR, "patterns", "wood-grain.svg"), WOOD_GRAIN_PATTERN)
write_file(os.path.join(IMAGES_DIR, "patterns", "tree-rings.svg"), TREE_RINGS_PATTERN)
write_file(os.path.join(IMAGES_DIR, "patterns", "kumiko.svg"), KUMIKO_PATTERN)


# ---------------------------------------------------------------------------
# 4. 10 SUBSIDIARY ILLUSTRATIONS (Architectural Line + Luxury Wood Composition)
# ---------------------------------------------------------------------------
SUBSIDIARY_SVGS = {
    "kitchen": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 440" fill="none" role="img" aria-label="Kitchen Woodcraft — آشپزخانه چوبی کارن‌وود">
  <rect width="640" height="440" rx="20" fill="#F5F1EA"/>
  <rect x="20" y="20" width="600" height="400" rx="14" fill="#3B2A1E"/>
  <!-- Architectural Fluted Timber Wall -->
  <g stroke="#C8A165" stroke-opacity="0.22" stroke-width="1.5">
    <line x1="60" y1="40" x2="60" y2="260"/><line x1="80" y1="40" x2="80" y2="260"/>
    <line x1="100" y1="40" x2="100" y2="260"/><line x1="120" y1="40" x2="120" y2="260"/>
    <line x1="140" y1="40" x2="140" y2="260"/><line x1="160" y1="40" x2="160" y2="260"/>
    <line x1="180" y1="40" x2="180" y2="260"/><line x1="200" y1="40" x2="200" y2="260"/>
  </g>
  <!-- Upper Minimalist Walnut Cabinetry -->
  <rect x="230" y="55" width="340" height="110" rx="6" fill="#1A1A1A" stroke="#C8A165" stroke-width="1.8"/>
  <line x1="343" y1="55" x2="343" y2="165" stroke="#C8A165" stroke-width="1.2"/>
  <line x1="456" y1="55" x2="456" y2="165" stroke="#C8A165" stroke-width="1.2"/>
  <!-- Pendant Sculptural Wooden Lamps -->
  <line x1="220" y1="20" x2="220" y2="195" stroke="#C8A165" stroke-width="1.5"/>
  <path d="M195 195 Q220 170 245 195 Z" fill="#C8A165"/>
  <line x1="340" y1="20" x2="340" y2="195" stroke="#C8A165" stroke-width="1.5"/>
  <path d="M315 195 Q340 170 365 195 Z" fill="#C8A165"/>
  <!-- Sculptural Monolith Kitchen Island with Waterfall Walnut Edge -->
  <rect x="90" y="250" width="460" height="135" rx="8" fill="#C8A165"/>
  <rect x="102" y="262" width="436" height="123" rx="4" fill="#3B2A1E" stroke="#F5F1EA" stroke-width="1" stroke-opacity="0.3"/>
  <!-- Slatted Island Front -->
  <g stroke="#C8A165" stroke-width="2" stroke-opacity="0.65">
    <line x1="130" y1="270" x2="130" y2="375"/><line x1="155" y1="270" x2="155" y2="375"/>
    <line x1="180" y1="270" x2="180" y2="375"/><line x1="205" y1="270" x2="205" y2="375"/>
    <line x1="230" y1="270" x2="230" y2="375"/><line x1="255" y1="270" x2="255" y2="375"/>
    <line x1="280" y1="270" x2="280" y2="375"/><line x1="305" y1="270" x2="305" y2="375"/>
    <line x1="330" y1="270" x2="330" y2="375"/><line x1="355" y1="270" x2="355" y2="375"/>
  </g>
  <!-- Minimalist Faucet & Vessel on Island -->
  <path d="M440 250 V218 Q440 205 454 205 H464 V220" stroke="#F5F1EA" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="M380 250 Q395 226 410 250 Z" fill="#7A8B6F"/>
  <circle cx="565" cy="85" r="24" stroke="#7A8B6F" stroke-width="1.5" fill="none" opacity="0.6"/>
</svg>""",

    "bathroom": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 440" fill="none" role="img" aria-label="Bathroom & Spa Woodwork — حمام و سرویس چوبی کارن‌وود">
  <rect width="640" height="440" rx="20" fill="#F5F1EA"/>
  <rect x="20" y="20" width="600" height="400" rx="14" fill="#1A1A1A"/>
  <!-- Japanese Hinoki Slatted Backdrop -->
  <g stroke="#3B2A1E" stroke-width="8">
    <line x1="70" y1="40" x2="70" y2="380"/><line x1="95" y1="40" x2="95" y2="380"/>
    <line x1="120" y1="40" x2="120" y2="380"/><line x1="145" y1="40" x2="145" y2="380"/>
    <line x1="170" y1="40" x2="170" y2="380"/><line x1="195" y1="40" x2="195" y2="380"/>
  </g>
  <!-- Circular Halo Illuminated Mirror -->
  <circle cx="240" cy="165" r="78" fill="#3B2A1E" stroke="#C8A165" stroke-width="4"/>
  <circle cx="240" cy="165" r="66" stroke="#F5F1EA" stroke-width="1" stroke-opacity="0.4"/>
  <!-- Floating Live-Edge Walnut Vanity -->
  <rect x="110" y="270" width="260" height="58" rx="8" fill="#3B2A1E" stroke="#C8A165" stroke-width="2"/>
  <path d="M120 298 H360" stroke="#C8A165" stroke-width="1.2" stroke-opacity="0.6"/>
  <!-- Carved Wooden Vessel Sink -->
  <path d="M200 270 C200 244, 280 244, 280 270 Z" fill="#C8A165"/>
  <!-- Hinoki Ofuro Soaking Tub -->
  <path d="M400 265 H575 L558 375 H417 Z" fill="#3B2A1E" stroke="#C8A165" stroke-width="2.2"/>
  <line x1="408" y1="298" x2="567" y2="298" stroke="#C8A165" stroke-width="2"/>
  <line x1="412" y1="335" x2="563" y2="335" stroke="#C8A165" stroke-width="2"/>
  <!-- Botanical Zen Branch -->
  <path d="M490 210 Q515 165 555 150" stroke="#7A8B6F" stroke-width="2.5" stroke-linecap="round"/>
  <ellipse cx="520" cy="175" rx="12" ry="6" transform="rotate(-25 520 175)" fill="#7A8B6F"/>
  <ellipse cx="545" cy="158" rx="12" ry="6" transform="rotate(-15 545 158)" fill="#7A8B6F"/>
</svg>""",

    "doors": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 440" fill="none" role="img" aria-label="Architectural Wooden Doors — درب‌های چوبی تمام‌چوب کارن‌وود">
  <rect width="640" height="440" rx="20" fill="#F5F1EA"/>
  <rect x="20" y="20" width="600" height="400" rx="14" fill="#3B2A1E"/>
  <!-- Grand Pivot Door Frame -->
  <rect x="195" y="42" width="250" height="356" rx="6" fill="#1A1A1A" stroke="#C8A165" stroke-width="2.5"/>
  <!-- Pivoting Solid Walnut Slab with Chevron Grain -->
  <polygon points="225,52 415,38 415,402 225,388" fill="#3B2A1E" stroke="#C8A165" stroke-width="2"/>
  <g stroke="#C8A165" stroke-width="1.3" stroke-opacity="0.55">
    <path d="M240 100 L320 75 L400 100"/>
    <path d="M240 150 L320 125 L400 150"/>
    <path d="M240 200 L320 175 L400 200"/>
    <path d="M240 250 L320 225 L400 250"/>
    <path d="M240 300 L320 275 L400 300"/>
    <path d="M240 350 L320 325 L400 350"/>
  </g>
  <!-- Full-Height Bronze Architectural Pull Handle -->
  <rect x="378" y="105" width="10" height="230" rx="5" fill="#C8A165"/>
  <!-- Top & Bottom Pivot Hardware -->
  <rect x="250" y="42" width="24" height="8" fill="#C8A165"/>
  <rect x="250" y="392" width="24" height="8" fill="#C8A165"/>
  <!-- Side Architectural Sidelights -->
  <rect x="125" y="52" width="52" height="336" rx="4" stroke="#7A8B6F" stroke-width="1.5" fill="#1A1A1A" fill-opacity="0.5"/>
  <rect x="463" y="52" width="52" height="336" rx="4" stroke="#7A8B6F" stroke-width="1.5" fill="#1A1A1A" fill-opacity="0.5"/>
</svg>""",

    "decor": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 440" fill="none" role="img" aria-label="Interior Wooden Decoration — دکوراسیون داخلی چوبی کارن‌وود">
  <rect width="640" height="440" rx="20" fill="#F5F1EA"/>
  <rect x="20" y="20" width="600" height="400" rx="14" fill="#1A1A1A"/>
  <!-- Parametric Acoustic Wave Timber Wall -->
  <g stroke="#C8A165" stroke-width="3" stroke-linecap="round">
    <path d="M70 80 Q180 50 320 95 T570 75" opacity="0.9"/>
    <path d="M70 115 Q190 80 320 130 T570 110" opacity="0.8"/>
    <path d="M70 150 Q200 115 320 165 T570 145" opacity="0.7"/>
    <path d="M70 185 Q210 150 320 200 T570 180" opacity="0.6"/>
    <path d="M70 220 Q220 185 320 235 T570 215" opacity="0.75"/>
  </g>
  <!-- Bespoke Minimalist Credenza & Shelving -->
  <rect x="105" y="285" width="430" height="72" rx="8" fill="#3B2A1E" stroke="#C8A165" stroke-width="2"/>
  <line x1="248" y1="285" x2="248" y2="357" stroke="#C8A165" stroke-width="1.5"/>
  <line x1="392" y1="285" x2="392" y2="357" stroke="#C8A165" stroke-width="1.5"/>
  <line x1="150" y1="357" x2="135" y2="388" stroke="#C8A165" stroke-width="3" stroke-linecap="round"/>
  <line x1="490" y1="357" x2="505" y2="388" stroke="#C8A165" stroke-width="3" stroke-linecap="round"/>
  <!-- Sculptural Wooden Objects on Credenza -->
  <circle cx="185" cy="260" r="24" fill="#C8A165"/>
  <path d="M440 285 C440 245, 480 245, 480 285 Z" fill="#7A8B6F"/>
</svg>""",

    "handicrafts": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 440" fill="none" role="img" aria-label="Handcrafted Wooden Art — صنایع دستی و هنر چوبی کارن‌وود">
  <rect width="640" height="440" rx="20" fill="#F5F1EA"/>
  <rect x="20" y="20" width="600" height="400" rx="14" fill="#3B2A1E"/>
  <!-- Kumiko Sacred Geometric Mandala Frame -->
  <g transform="translate(215, 220)" stroke="#C8A165" stroke-width="1.8">
    <circle cx="0" cy="0" r="125" fill="#1A1A1A"/>
    <circle cx="0" cy="0" r="115" stroke-dasharray="6 4"/>
    <polygon points="0,-110 95,55 -95,55" fill="none"/>
    <polygon points="0,110 95,-55 -95,-55" fill="none"/>
    <circle cx="0" cy="0" r="54" fill="#3B2A1E"/>
    <path d="M-95 -55 L95 55 M-95 55 L95 -55 M0 -110 V110" stroke-opacity="0.6"/>
    <circle cx="0" cy="0" r="16" fill="#C8A165"/>
  </g>
  <!-- Lathe-Turned Wabi-Sabi Wooden Vessel -->
  <g transform="translate(455, 235)">
    <path d="M-45 -95 H45 C65 -45, 78 20, 48 85 C35 110, -35 110, -48 85 C-78 20, -65 -45, -45 -95 Z" fill="#C8A165" stroke="#F5F1EA" stroke-width="1.5"/>
    <path d="M-58 -25 Q0 -5 58 -25" stroke="#3B2A1E" stroke-width="2.2" fill="none"/>
    <path d="M-64 15 Q0 35 64 15" stroke="#3B2A1E" stroke-width="2.2" fill="none"/>
    <path d="M-52 55 Q0 72 52 55" stroke="#3B2A1E" stroke-width="1.8" fill="none"/>
    <!-- Natural Wabi-Sabi Bowtie Inlay (Chigiri) -->
    <polygon points="-14,-5 14,-15 14,15 -14,5" fill="#3B2A1E"/>
  </g>
</svg>""",

    "flooring": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 440" fill="none" role="img" aria-label="Luxury Wooden Flooring & Parquet — کفپوش و پارکت تمام‌چوب کارن‌وود">
  <rect width="640" height="440" rx="20" fill="#F5F1EA"/>
  <rect x="20" y="20" width="600" height="400" rx="14" fill="#1A1A1A"/>
  <!-- Isometric Herringbone / Chevron Royal Oak Parquet Grid -->
  <g transform="translate(70, 55)" stroke="#C8A165" stroke-width="2">
    <!-- Column 1 -->
    <polygon points="0,60 125,0 125,55 0,115" fill="#3B2A1E"/>
    <polygon points="0,115 125,55 125,110 0,170" fill="#7A8B6F" fill-opacity="0.35"/>
    <polygon points="0,170 125,110 125,165 0,225" fill="#3B2A1E"/>
    <polygon points="0,225 125,165 125,220 0,280" fill="#C8A165" fill-opacity="0.28"/>
    <polygon points="0,280 125,220 125,275 0,335" fill="#3B2A1E"/>
    <!-- Column 2 -->
    <polygon points="125,0 250,60 250,115 125,55" fill="#C8A165" fill-opacity="0.35"/>
    <polygon points="125,55 250,115 250,170 125,110" fill="#3B2A1E"/>
    <polygon points="125,110 250,170 250,225 125,165" fill="#C8A165" fill-opacity="0.25"/>
    <polygon points="125,165 250,225 250,280 125,220" fill="#3B2A1E"/>
    <polygon points="125,220 250,280 250,335 125,275" fill="#7A8B6F" fill-opacity="0.35"/>
    <!-- Column 3 -->
    <polygon points="250,60 375,0 375,55 250,115" fill="#3B2A1E"/>
    <polygon points="250,115 375,55 375,110 250,170" fill="#C8A165" fill-opacity="0.3"/>
    <polygon points="250,170 375,110 375,165 250,225" fill="#3B2A1E"/>
    <polygon points="250,225 375,165 375,220 250,280" fill="#7A8B6F" fill-opacity="0.35"/>
    <polygon points="250,280 375,220 375,275 250,335" fill="#3B2A1E"/>
    <!-- Column 4 -->
    <polygon points="375,0 500,60 500,115 375,55" fill="#7A8B6F" fill-opacity="0.35"/>
    <polygon points="375,55 500,115 500,170 375,110" fill="#3B2A1E"/>
    <polygon points="375,110 500,170 500,225 375,165" fill="#C8A165" fill-opacity="0.35"/>
    <polygon points="375,165 500,225 500,280 375,220" fill="#3B2A1E"/>
    <polygon points="375,220 500,280 500,335 375,275" fill="#C8A165" fill-opacity="0.25"/>
  </g>
</svg>""",

    "stairs": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 440" fill="none" role="img" aria-label="Cantilevered & Sculptural Wooden Stairs — پله‌های چوبی معلق و مدرن کارن‌وود">
  <rect width="640" height="440" rx="20" fill="#F5F1EA"/>
  <rect x="20" y="20" width="600" height="400" rx="14" fill="#3B2A1E"/>
  <!-- Architectural Spine Wall -->
  <line x1="120" y1="40" x2="120" y2="400" stroke="#C8A165" stroke-width="3"/>
  <!-- Floating Cantilevered Solid Walnut Treads -->
  <g>
    <rect x="120" y="340" width="160" height="24" rx="4" fill="#C8A165"/>
    <rect x="160" y="290" width="175" height="24" rx="4" fill="#F5F1EA"/>
    <rect x="205" y="240" width="190" height="24" rx="4" fill="#C8A165"/>
    <rect x="255" y="190" width="205" height="24" rx="4" fill="#F5F1EA"/>
    <rect x="310" y="140" width="215" height="24" rx="4" fill="#C8A165"/>
    <rect x="370" y="90" width="210" height="24" rx="4" fill="#7A8B6F"/>
  </g>
  <!-- Tension Bronze Rods / Minimalist Balustrade -->
  <g stroke="#C8A165" stroke-width="1.5" stroke-opacity="0.65">
    <line x1="250" y1="40" x2="250" y2="340"/>
    <line x1="310" y1="40" x2="310" y2="290"/>
    <line x1="370" y1="40" x2="370" y2="240"/>
    <line x1="430" y1="40" x2="430" y2="190"/>
    <line x1="490" y1="40" x2="490" y2="140"/>
  </g>
  <!-- Handrail Sweeping Curve -->
  <path d="M180 280 L540 45" stroke="#C8A165" stroke-width="4" stroke-linecap="round"/>
</svg>""",

    "office": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 440" fill="none" role="img" aria-label="Executive Wooden Office Furniture — مبلمان و دکوراسیون اداری کارن‌وود">
  <rect width="640" height="440" rx="20" fill="#F5F1EA"/>
  <rect x="20" y="20" width="600" height="400" rx="14" fill="#1A1A1A"/>
  <!-- Bookcase & Acoustic Partition Backdrop -->
  <rect x="75" y="55" width="490" height="175" rx="6" fill="#3B2A1E" stroke="#C8A165" stroke-width="1.8"/>
  <line x1="238" y1="55" x2="238" y2="230" stroke="#C8A165" stroke-width="1.5"/>
  <line x1="401" y1="55" x2="401" y2="230" stroke="#C8A165" stroke-width="1.5"/>
  <line x1="75" y1="142" x2="565" y2="142" stroke="#C8A165" stroke-width="1.5"/>
  <!-- Sculptural Executive Cantilevered Desk -->
  <path d="M115 275 H525 L545 295 H95 Z" fill="#C8A165"/>
  <rect x="130" y="295" width="110" height="85" rx="4" fill="#3B2A1E" stroke="#C8A165" stroke-width="1.8"/>
  <path d="M485 295 L515 380 H465 L445 295 Z" fill="#C8A165"/>
  <!-- Minimalist Architectural Desk Lamp & Monitor Silhouette -->
  <rect x="285" y="205" width="90" height="55" rx="4" fill="#1A1A1A" stroke="#F5F1EA" stroke-width="2"/>
  <line x1="330" y1="260" x2="330" y2="275" stroke="#C8A165" stroke-width="4"/>
  <path d="M450 275 V215 L415 230" stroke="#7A8B6F" stroke-width="3" stroke-linecap="round" fill="none"/>
</svg>""",

    "outdoor": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 440" fill="none" role="img" aria-label="Outdoor Wooden Structures & Pergolas — سازه‌های چوبی فضای باز و ترمووود کارن‌وود">
  <rect width="640" height="440" rx="20" fill="#F5F1EA"/>
  <rect x="20" y="20" width="600" height="400" rx="14" fill="#3B2A1E"/>
  <!-- Horizon Sun / Moon in Bronze -->
  <circle cx="485" cy="125" r="46" fill="#C8A165" fill-opacity="0.35" stroke="#C8A165" stroke-width="1.5"/>
  <!-- Architectural Thermowood Pergola Pavilion -->
  <rect x="85" y="95" width="470" height="18" rx="3" fill="#C8A165"/>
  <!-- Louvered Roof Blades -->
  <g stroke="#F5F1EA" stroke-width="3" stroke-linecap="round">
    <line x1="115" y1="82" x2="135" y2="115"/><line x1="155" y1="82" x2="175" y2="115"/>
    <line x1="195" y1="82" x2="215" y2="115"/><line x1="235" y1="82" x2="255" y2="115"/>
    <line x1="275" y1="82" x2="295" y2="115"/><line x1="315" y1="82" x2="335" y2="115"/>
    <line x1="355" y1="82" x2="375" y2="115"/><line x1="395" y1="82" x2="415" y2="115"/>
    <line x1="435" y1="82" x2="455" y2="115"/><line x1="475" y1="82" x2="495" y2="115"/>
  </g>
  <!-- Heavy Timber Columns -->
  <rect x="105" y="113" width="22" height="225" fill="#1A1A1A" stroke="#C8A165" stroke-width="1.8"/>
  <rect x="513" y="113" width="22" height="225" fill="#1A1A1A" stroke="#C8A165" stroke-width="1.8"/>
  <!-- Teak Outdoor Decking Platform -->
  <polygon points="55,338 585,338 610,390 30,390" fill="#C8A165"/>
  <g stroke="#3B2A1E" stroke-width="2">
    <line x1="50" y1="352" x2="590" y2="352"/>
    <line x1="42" y1="366" x2="598" y2="366"/>
    <line x1="35" y1="380" x2="605" y2="380"/>
  </g>
  <!-- Landscape Foliage Accent -->
  <path d="M165 338 C165 290, 225 290, 225 338 Z" fill="#7A8B6F"/>
  <path d="M210 338 C210 305, 255 305, 255 338 Z" fill="#7A8B6F" fill-opacity="0.75"/>
</svg>""",

    "custom": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 440" fill="none" role="img" aria-label="Bespoke Wooden Commissions — سفارشات خاص و سفارشی چوبی کارن‌وود">
  <rect width="640" height="440" rx="20" fill="#F5F1EA"/>
  <rect x="20" y="20" width="600" height="400" rx="14" fill="#1A1A1A"/>
  <!-- Golden Ratio Fibonacci Spiral & Architectural Blueprint Grid -->
  <g stroke="#C8A165" stroke-opacity="0.22" stroke-width="1">
    <rect x="80" y="60" width="480" height="320"/>
    <line x1="380" y1="60" x2="380" y2="380"/>
    <line x1="380" y1="240" x2="560" y2="240"/>
    <line x1="450" y1="240" x2="450" y2="380"/>
  </g>
  <!-- Live-Edge Master Slab + Brass Butterfly Joinery -->
  <path d="M110 155 C210 140, 310 165, 530 148 L520 292 C330 308, 220 280, 115 295 Z" fill="#3B2A1E" stroke="#C8A165" stroke-width="2.5"/>
  <path d="M125 222 C240 205, 360 238, 510 218" stroke="#C8A165" stroke-width="1.5" stroke-dasharray="8 5"/>
  <!-- Dovetail Bowtie Keys (Chigiri) -->
  <polygon points="235,205 265,195 265,235 235,225" fill="#C8A165"/>
  <polygon points="375,215 405,205 405,245 375,235" fill="#7A8B6F"/>
  <!-- Caliper / Compass Precision Emblem -->
  <circle cx="320" cy="115" r="22" stroke="#C8A165" stroke-width="2" fill="#1A1A1A"/>
  <path d="M312 132 L285 200 M328 132 L355 200" stroke="#F5F1EA" stroke-width="2.5" stroke-linecap="round"/>
</svg>"""
}

for slug, svg_content in SUBSIDIARY_SVGS.items():
    write_file(os.path.join(IMAGES_DIR, "subsidiaries", f"{slug}.svg"), svg_content)
    write_file(os.path.join(IMAGES_DIR, f"{slug}.svg"), svg_content)


# ---------------------------------------------------------------------------
# 5. 12 PROJECT THUMBNAILS (Abstract Geometric & Architectural Wood Compositions)
# ---------------------------------------------------------------------------
PROJECTS_META = [
    ("project-1", "Zafaraniyeh Penthouse Monolith Kitchen", "#3B2A1E", "#C8A165", "#7A8B6F", "island"),
    ("project-2", "Lavasan Hinoki Sanctuary Spa & Ofuro", "#1A1A1A", "#C8A165", "#7A8B6F", "zen"),
    ("project-3", "Elahiyeh 4-Meter Bronze & Walnut Pivot Door", "#3B2A1E", "#C8A165", "#F5F1EA", "pivot"),
    ("project-4", "Niavaran Parametric Acoustic Concert Wall", "#1A1A1A", "#C8A165", "#3B2A1E", "wave"),
    ("project-5", "Isfahan Royal Kumiko & Lattice Screen", "#3B2A1E", "#C8A165", "#7A8B6F", "kumiko"),
    ("project-6", "Fereshteh Smoked Oak Chevron Gallery Floor", "#1A1A1A", "#C8A165", "#7A8B6F", "chevron"),
    ("project-7", "Darrous Helical Floating Walnut Staircase", "#3B2A1E", "#F5F1EA", "#C8A165", "spiral"),
    ("project-8", "Jordan Flagship Executive Boardroom Suite", "#1A1A1A", "#3B2A1E", "#C8A165", "boardroom"),
    ("project-9", "Shemiranat Biophilic Thermowood Pavilion", "#3B2A1E", "#7A8B6F", "#C8A165", "pergola"),
    ("project-10", "Velenjak Private Walk-In Cigar & Wine Humidor", "#1A1A1A", "#C8A165", "#3B2A1E", "cellar"),
    ("project-11", "Caspian Cliffside Cedar Cantilever Villa", "#3B2A1E", "#C8A165", "#7A8B6F", "villa"),
    ("project-12", "Tajrish Wabi-Sabi Live-Edge Tea Ceremony Hall", "#1A1A1A", "#7A8B6F", "#C8A165", "tea"),
]

for idx, (slug, title, bg, accent, secondary, motif) in enumerate(PROJECTS_META, start=1):
    angle = (idx * 29) % 360
    r1 = 110 + (idx % 4) * 22
    r2 = 65 + (idx % 3) * 18
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" role="img" aria-label="{title}">
  <defs>
    <linearGradient id="pg-{idx}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{bg}"/>
      <stop offset="100%" stop-color="#1A1A1A"/>
    </linearGradient>
    <radialGradient id="pr-{idx}" cx="0.65" cy="0.35" r="0.6">
      <stop offset="0%" stop-color="{accent}" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="{bg}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="600" fill="url(#pg-{idx})"/>
  <rect width="800" height="600" fill="url(#pr-{idx})"/>
  <!-- Architectural Frame -->
  <rect x="32" y="32" width="736" height="536" rx="12" stroke="{accent}" stroke-opacity="0.35" stroke-width="1.5"/>
  <!-- Wood Grain Topographic Lines -->
  <g stroke="{accent}" stroke-opacity="0.22" stroke-width="1.2">
    <path d="M32 {130 + idx*8} Q260 {80 + idx*10} 480 {150 + idx*6} T768 {120 + idx*7}"/>
    <path d="M32 {240 + idx*6} Q290 {190 + idx*8} 510 {260 + idx*5} T768 {230 + idx*5}"/>
    <path d="M32 {370 + idx*5} Q270 {320 + idx*7} 520 {390 + idx*4} T768 {350 + idx*6}"/>
    <path d="M32 {470 + idx*3} Q310 {430 + idx*5} 540 {485 + idx*3} T768 {460 + idx*4}"/>
  </g>
  <!-- Central Architectural Composition -->
  <g transform="translate(400, 290)">
    <circle cx="0" cy="0" r="{r1 + 48}" stroke="{accent}" stroke-opacity="0.25" stroke-width="1" stroke-dasharray="10 6"/>
    <circle cx="0" cy="0" r="{r1}" fill="#3B2A1E" fill-opacity="0.7" stroke="{accent}" stroke-width="2"/>
    <rect x="-{r1 - 15}" y="-{r2}" width="{(r1 - 15)*2}" height="{r2*2}" rx="8" transform="rotate({angle})" fill="#1A1A1A" fill-opacity="0.65" stroke="{secondary}" stroke-width="2"/>
    <!-- Slatted Timber Joinery Detail -->
    <g stroke="#C8A165" stroke-width="2.2" stroke-opacity="0.8">
      <line x1="-90" y1="-45" x2="90" y2="-45"/>
      <line x1="-110" y1="-15" x2="110" y2="-15"/>
      <line x1="-110" y1="15" x2="110" y2="15"/>
      <line x1="-90" y1="45" x2="90" y2="45"/>
    </g>
    <circle cx="0" cy="0" r="26" fill="{accent}"/>
    <circle cx="0" cy="0" r="10" fill="#F5F1EA"/>
  </g>
  <!-- Edition Number Plate -->
  <rect x="64" y="488" width="96" height="40" rx="6" fill="#3B2A1E" stroke="#C8A165" stroke-width="1.2"/>
  <text x="112" y="514" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="16" font-weight="700" fill="#F5F1EA">KW—{idx:02d}</text>
</svg>"""
    write_file(os.path.join(IMAGES_DIR, "projects", f"{slug}.svg"), svg)


# ---------------------------------------------------------------------------
# 6. 4 TEAM AVATAR SVGs (Minimalist Architectural Illustrated Portraits)
# ---------------------------------------------------------------------------
TEAM_SVGS = [
    ("team-1", "Kourosh Radmehr — Founder & Master Architect", "#3B2A1E", "#C8A165", "glasses"),
    ("team-2", "ava Rostami — Head of Interior & Wabi-Sabi Design", "#1A1A1A", "#7A8B6F", "minimal"),
    ("team-3", "Sohrab Movahed — Master Artisan & Joinery Director", "#3B2A1E", "#C8A165", "beard"),
    ("team-4", "Taraneh Farzad — Sustainability & Timber Engineering Lead", "#1A1A1A", "#C8A165", "architect"),
]

for idx, (slug, label, bg, accent, style) in enumerate(TEAM_SVGS, start=1):
    hair_path = (
        "M135 155 C135 95, 265 95, 265 155 C265 125, 135 125, 135 155 Z"
        if idx % 2 == 1
        else "M125 185 C120 100, 280 100, 275 185 C265 130, 135 130, 125 185 Z"
    )
    glasses_el = (
        '<g stroke="#3B2A1E" stroke-width="3" fill="none"><circle cx="176" cy="178" r="16"/><circle cx="224" cy="178" r="16"/><line x1="192" y1="178" x2="208" y2="178"/></g>'
        if style in ("glasses", "architect")
        else ""
    )
    beard_el = (
        '<path d="M156 205 Q200 252 244 205 Q232 242 200 245 Q168 242 156 205 Z" fill="#3B2A1E" opacity="0.85"/>'
        if style == "beard"
        else ""
    )
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none" role="img" aria-label="{label}">
  <rect width="400" height="400" rx="28" fill="{bg}"/>
  <circle cx="200" cy="200" r="162" stroke="{accent}" stroke-width="1.2" stroke-opacity="0.4" stroke-dasharray="8 6"/>
  <circle cx="200" cy="200" r="136" fill="#F5F1EA" fill-opacity="0.06"/>
  <!-- Shoulders / Architectural Collar -->
  <path d="M85 370 C95 290, 145 270, 200 270 C255 270, 305 290, 315 370 Z" fill="#C8A165"/>
  <path d="M155 270 L200 335 L245 270 Z" fill="#3B2A1E"/>
  <!-- Neck & Head -->
  <rect x="180" y="232" width="40" height="48" rx="14" fill="#F5F1EA"/>
  <ellipse cx="200" cy="178" rx="54" ry="64" fill="#F5F1EA" stroke="#3B2A1E" stroke-width="2"/>
  <!-- Hair / Silhouette -->
  <path d="{hair_path}" fill="#3B2A1E"/>
  {glasses_el}
  <!-- Minimalist Facial Line -->
  <path d="M198 168 V196 L206 200" stroke="#3B2A1E" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M186 214 Q200 222 214 214" stroke="#3B2A1E" stroke-width="2.2" stroke-linecap="round"/>
  {beard_el}
  <!-- Wood Ring Badge -->
  <circle cx="325" cy="75" r="22" fill="#7A8B6F"/>
  <circle cx="325" cy="75" r="12" stroke="#F5F1EA" stroke-width="1.5"/>
</svg>"""
    write_file(os.path.join(IMAGES_DIR, "team", f"{slug}.svg"), svg)


# ---------------------------------------------------------------------------
# 7. 6 BLOG COVER SVGs (Editorial Abstract Wood-Themed Illustrations)
# ---------------------------------------------------------------------------
BLOG_COVERS = [
    ("blog-1", "Wabi-Sabi in Contemporary Wood Architecture", "#3B2A1E", "#C8A165", "#7A8B6F"),
    ("blog-2", "Selecting Timber for Luxury Bespoke Kitchens", "#1A1A1A", "#C8A165", "#3B2A1E"),
    ("blog-3", "Waterproof Wood Engineering for Spa Bathrooms", "#3B2A1E", "#7A8B6F", "#C8A165"),
    ("blog-4", "Japanese Kumiko & Mortise Joinery Without Nails", "#1A1A1A", "#C8A165", "#7A8B6F"),
    ("blog-5", "Sustainable Forestry & Kiln-Seasoning Aged Walnut", "#3B2A1E", "#7A8B6F", "#C8A165"),
    ("blog-6", "Biophilic Design & Acoustic Timber Architecture", "#1A1A1A", "#C8A165", "#3B2A1E"),
]

for idx, (slug, title, bg, accent, secondary) in enumerate(BLOG_COVERS, start=1):
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" fill="none" role="img" aria-label="{title}">
  <rect width="800" height="480" fill="{bg}"/>
  <rect x="28" y="28" width="744" height="424" rx="14" stroke="{accent}" stroke-opacity="0.4" stroke-width="1.5"/>
  <!-- Editorial Geometric Composition -->
  <circle cx="{260 + idx*35}" cy="240" r="145" fill="{secondary}" fill-opacity="0.35" stroke="{accent}" stroke-width="2"/>
  <circle cx="{260 + idx*35}" cy="240" r="98" stroke="#F5F1EA" stroke-opacity="0.4" stroke-width="1.2" stroke-dasharray="8 6"/>
  <path d="M80 {340 - idx*15} C240 {180 + idx*10}, 520 {390 - idx*12}, 720 {200 + idx*15}" stroke="{accent}" stroke-width="3" fill="none"/>
  <path d="M80 {375 - idx*15} C240 {215 + idx*10}, 520 {425 - idx*12}, 720 {235 + idx*15}" stroke="#F5F1EA" stroke-opacity="0.45" stroke-width="1.5" fill="none"/>
  <rect x="{460 - idx*20}" y="110" width="180" height="260" rx="8" fill="#1A1A1A" fill-opacity="0.6" stroke="{accent}" stroke-width="1.8"/>
  <line x1="{490 - idx*20}" y1="150" x2="{610 - idx*20}" y2="150" stroke="#C8A165" stroke-width="3"/>
  <line x1="{490 - idx*20}" y1="185" x2="{580 - idx*20}" y2="185" stroke="#F5F1EA" stroke-opacity="0.6" stroke-width="2"/>
  <circle cx="110" cy="95" r="24" fill="{accent}"/>
  <text x="695" y="420" text-anchor="end" font-family="'Playfair Display', Georgia, serif" font-size="20" fill="#F5F1EA" opacity="0.7">JOURNAL 0{idx}</text>
</svg>"""
    write_file(os.path.join(IMAGES_DIR, "blog", f"{slug}.svg"), svg)


# ---------------------------------------------------------------------------
# 8. OG IMAGE SVG (1200x630 Branded Social Card)
# ---------------------------------------------------------------------------
OG_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" fill="none" role="img" aria-label="KARENWOOD — Luxury Wood Industry Holding">
  <rect width="1200" height="630" fill="#3B2A1E"/>
  <rect x="36" y="36" width="1128" height="558" rx="20" fill="#1A1A1A" stroke="#C8A165" stroke-width="2"/>
  <!-- Concentric Wood Rings Background -->
  <g transform="translate(920, 315)" stroke="#C8A165" stroke-opacity="0.25" fill="none">
    <circle r="320" stroke-width="1.2"/>
    <circle r="260" stroke-width="1.2" stroke-dasharray="12 8"/>
    <circle r="200" stroke-width="1.5"/>
    <circle r="145" stroke-width="1.2"/>
    <circle r="90" stroke-width="2"/>
    <circle r="36" fill="#C8A165" fill-opacity="0.25"/>
  </g>
  <!-- Brand Monogram K -->
  <g transform="translate(96, 140)">
    <rect x="0" y="0" width="96" height="96" rx="20" fill="#3B2A1E" stroke="#C8A165" stroke-width="2.5"/>
    <path d="M32 24 V72" stroke="#F5F1EA" stroke-width="6" stroke-linecap="round"/>
    <path d="M68 24 L40 48 L70 72" stroke="#C8A165" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <!-- Typography -->
  <text x="96" y="320" font-family="'Playfair Display', Georgia, serif" font-size="68" font-weight="700" letter-spacing="8" fill="#F5F1EA">KARENWOOD</text>
  <text x="96" y="378" font-family="'Inter', sans-serif" font-size="24" font-weight="500" letter-spacing="6" fill="#C8A165">LUXURY WOOD INDUSTRY HOLDING</text>
  <line x1="96" y1="415" x2="540" y2="415" stroke="#7A8B6F" stroke-width="2"/>
  <text x="96" y="468" font-family="'Vazirmatn', sans-serif" font-size="26" fill="#F5F1EA" opacity="0.9">هلدینگ صنایع چوب لوکس کارن‌وود — اصالت چوب، معماری ماندگار</text>
</svg>"""

write_file(os.path.join(IMAGES_DIR, "og-image.svg"), OG_SVG)


# ---------------------------------------------------------------------------
# 9. PURE PYTHON RASTER PNG & ICO GENERATOR (Favicons, Apple Touch Icon, OG PNG)
# ---------------------------------------------------------------------------
def make_png(width: int, height: int, pixel_fn) -> bytes:
    """Create a valid RGBA PNG image using pure Python zlib + struct."""
    raw_rows = bytearray()
    for y in range(height):
        raw_rows.append(0)  # filter type 0 (None)
        for x in range(width):
            r, g, b, a = pixel_fn(x, y, width, height)
            raw_rows.extend((r, g, b, a))

    def chunk(chunk_type: bytes, data: bytes) -> bytes:
        crc = zlib.crc32(chunk_type + data) & 0xFFFFFFFF
        return struct.pack(">I", len(data)) + chunk_type + data + struct.pack(">I", crc)

    ihdr = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    idat = zlib.compress(bytes(raw_rows), level=9)
    return b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr) + chunk(b"IDAT", idat) + chunk(b"IEND", b"")


def dist_to_segment(px, py, x1, y1, x2, y2):
    dx, dy = x2 - x1, y2 - y1
    if dx == 0 and dy == 0:
        return math.hypot(px - x1, py - y1)
    t = max(0.0, min(1.0, ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy)))
    return math.hypot(px - (x1 + t * dx), py - (y1 + t * dy))


def icon_pixel(x: int, y: int, w: int, h: int):
    # Normalized coordinates [-1, 1]
    nx = (x + 0.5) / w * 2.0 - 1.0
    ny = (y + 0.5) / h * 2.0 - 1.0
    r = math.hypot(nx, ny)

    # Rounded square mask
    max_c = max(abs(nx), abs(ny))
    if max_c > 0.94:
        return (0, 0, 0, 0)

    # Colors: Walnut (#3B2A1E = 59,42,30), Bronze (#C8A165 = 200,161,101), Cream (#F5F1EA = 245,241,234)
    bg = (59, 42, 30, 255)
    bronze = (200, 161, 101, 255)
    cream = (245, 241, 234, 255)

    # Border ring
    if 0.84 <= max_c <= 0.90:
        return bronze

    # Subtle concentric wood ring
    if abs(r - 0.72) < 0.025:
        return (122, 139, 111, 255)  # moss

    # Draw Monogram 'K'
    d_stem = dist_to_segment(nx, ny, -0.32, -0.52, -0.32, 0.52)
    d_up = dist_to_segment(nx, ny, -0.22, 0.02, 0.36, -0.50)
    d_down = dist_to_segment(nx, ny, -0.18, -0.02, 0.38, 0.52)

    thickness = 0.115 if w >= 32 else 0.15
    if d_stem < thickness:
        return cream
    if min(d_up, d_down) < thickness:
        return bronze

    return bg


def og_pixel(x: int, y: int, w: int, h: int):
    nx = x / w
    ny = y / h
    # Frame border
    if x < 24 or x >= w - 24 or y < 24 or y >= h - 24:
        return (59, 42, 30, 255)
    if 24 <= x < 28 or w - 28 <= x < w - 24 or 24 <= y < 28 or h - 28 <= y < h - 24:
        return (200, 161, 101, 255)
    # Concentric wood rings on right side
    cx, cy = w * 0.75, h * 0.5
    dist = math.hypot(x - cx, y - cy)
    if int(dist) % 45 in (0, 1):
        return (120, 95, 62, 255)
    # Monogram emblem box on left
    if 90 <= x <= 250 and 195 <= y <= 355:
        ix = (x - 90) / 160.0 * 2.0 - 1.0
        iy = (y - 195) / 160.0 * 2.0 - 1.0
        return icon_pixel(int((ix + 1) * 50), int((iy + 1) * 50), 100, 100)
    # Horizontal bronze accent bar
    if 290 <= x <= 820 and 308 <= y <= 316:
        return (200, 161, 101, 255)
    if 290 <= x <= 640 and 340 <= y <= 345:
        return (122, 139, 111, 255)
    # Warm dark walnut gradient background
    r = int(26 + 22 * (1 - nx))
    g = int(26 + 12 * (1 - ny))
    b = 24
    return (r, g, b, 255)


png_16 = make_png(16, 16, icon_pixel)
png_32 = make_png(32, 32, icon_pixel)
png_180 = make_png(180, 180, icon_pixel)
png_og = make_png(1200, 630, og_pixel)

with open(os.path.join(PUBLIC_DIR, "favicon-16.png"), "wb") as f:
    f.write(png_16)
with open(os.path.join(PUBLIC_DIR, "favicon-32.png"), "wb") as f:
    f.write(png_32)
with open(os.path.join(PUBLIC_DIR, "apple-touch-icon.png"), "wb") as f:
    f.write(png_180)
with open(os.path.join(PUBLIC_DIR, "og-image.png"), "wb") as f:
    f.write(png_og)
with open(os.path.join(IMAGES_DIR, "og-image.png"), "wb") as f:
    f.write(png_og)

# Build multi-icon favicon.ico containing 16x16 and 32x32 PNGs
ico_header = struct.pack("<HHH", 0, 1, 2)
offset_1 = 6 + 16 * 2
offset_2 = offset_1 + len(png_16)
entry_16 = struct.pack("<BBBBHHII", 16, 16, 0, 0, 1, 32, len(png_16), offset_1)
entry_32 = struct.pack("<BBBBHHII", 32, 32, 0, 0, 1, 32, len(png_32), offset_2)
with open(os.path.join(PUBLIC_DIR, "favicon.ico"), "wb") as f:
    f.write(ico_header + entry_16 + entry_32 + png_16 + png_32)

print("All KARENWOOD SVG & PNG assets generated successfully.")
