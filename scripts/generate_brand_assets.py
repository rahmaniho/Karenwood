#!/usr/bin/env python3
"""
Generate KARENWOOD brand assets from the master logo artwork.

Source : public/brand/karenwood-logo-original.png  (white background, 1254x1254)
Output : transparent logo / lockup / mark PNGs (light + dark variants),
         favicons, PWA icons and the Open Graph image.

Usage (from the repository root):
    pip install pillow numpy
    python3 scripts/generate_brand_assets.py
"""
import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter
SRC='public/brand/karenwood-logo-original.png'
im=np.asarray(Image.open(SRC).convert('RGB')).astype(float)
mn=im.min(axis=2)
T=95.0
soft=np.clip((255-mn-5)/T,0,1)
# Background = near-white region connected to the image border (flood fill)
near=Image.fromarray(((mn>228)*255).astype(np.uint8),'L').copy()
ImageDraw.floodfill(near,(0,0),128)
bg=np.asarray(near)==128
edge=np.asarray(Image.fromarray((bg*255).astype(np.uint8)).filter(ImageFilter.MaxFilter(7)))>0
# Mark rows (y<740): opaque interior, soft only at the outer edge. Text rows: soft everywhere.
a=soft.copy()
markrows=np.zeros_like(bg); markrows[:740]=True
a=np.where(markrows & ~edge, 1.0, a)
a=np.where(bg & (mn>246), 0.0, a)
safe=np.maximum(a,1e-3)
rgb=np.clip((im-(1-a[...,None])*255)/safe[...,None],0,255)
rgba=np.dstack([rgb,a*255]).astype(np.uint8)
T=Image.fromarray(rgba,'RGBA')
def crop(box):
    c=T.crop(box); bb=c.getchannel('A').point(lambda v:255 if v>8 else 0).getbbox(); return c.crop(bb)
full=crop((150,200,1110,1010))
mark=crop((400,220,850,740))
word=crop((150,750,1110,860))     # KARENWOOD
hold=crop((150,885,1110,930))     # ─ HOLDING ─
fa=crop((400,935,860,995))        # هلدینگ کارن چوب
def dark(img):
    arr=np.asarray(img).astype(float); lum=0.299*arr[...,0]+0.587*arr[...,1]+0.114*arr[...,2]
    m=lum<100; arr[m,0:3]=[245,241,234]
    arr[~m,0:3]=np.clip(arr[~m,0:3]*1.12,0,255); return Image.fromarray(arr.astype(np.uint8),'RGBA')
def glow(img,color=(245,241,234),r=6,strength=0.55):
    a=img.getchannel('A').filter(ImageFilter.GaussianBlur(r)); a=a.point(lambda v:int(v*strength))
    g=Image.new('RGBA',img.size,color+(0,)); g.putalpha(a); out=g.copy(); out.alpha_composite(img); return out
def pad(img,p):
    o=Image.new('RGBA',(img.width+2*p,img.height+2*p),(0,0,0,0)); o.paste(img,(p,p)); return o
def fit_h(img,h): return img.resize((round(img.width*h/img.height),h),Image.LANCZOS)
def fit_w(img,w): return img.resize((w,round(img.height*w/img.width)),Image.LANCZOS)

# Header lockup: mark | KARENWOOD over HOLDING
def lockup(mk,wd,hd):
    H=240; mk=fit_h(mk,H); wd=fit_w(wd,620); hd=fit_w(hd,620)
    gap=36; textH=wd.height+28+hd.height
    W=mk.width+gap+620; out=Image.new('RGBA',(W,H),(0,0,0,0))
    out.alpha_composite(mk,(0,0)); y=(H-textH)//2
    out.alpha_composite(wd,(mk.width+gap,y)); out.alpha_composite(hd,(mk.width+gap,y+wd.height+28)); return out

lk=lockup(mark,word,hold); lk.save('public/brand/karenwood-lockup.png',optimize=True)
markd=Image.merge('RGBA',(*ImageEnhance.Brightness(mark.convert('RGB')).enhance(1.25).split(),mark.getchannel('A')))
lkd=lockup(markd,dark(word),hold); lkd.save('public/brand/karenwood-lockup-dark.png',optimize=True)
fit_w(full,720).save('public/brand/karenwood-logo.png',optimize=True)
# dark full: recolor text browns only below the mark (rows of text start at 761-200 offset)
top=full.crop((0,0,full.width,mark.height+10)); top=Image.merge('RGBA',(*ImageEnhance.Brightness(top.convert('RGB')).enhance(1.25).split(),top.getchannel('A')))
fd=dark(full); fd.paste(top,(0,0))
fit_w(fd,720).save('public/brand/karenwood-logo-dark.png',optimize=True)
fit_h(mark,320).save('public/brand/karenwood-mark.png',optimize=True)
fit_h(word,120).save('public/brand/karenwood-wordmark.png',optimize=True)
fit_h(hold,40).save('public/brand/karenwood-holding.png',optimize=True)
fit_h(fa,60).save('public/brand/karenwood-fa.png',optimize=True)
# Icons
def square(img,size,bg=None,padf=0.1):
    s=size; inner=int(s*(1-2*padf)); m=img.copy(); m.thumbnail((inner,inner),Image.LANCZOS)
    o=Image.new('RGBA',(s,s),bg+(255,) if bg else (0,0,0,0)); o.alpha_composite(m,((s-m.width)//2,(s-m.height)//2)); return o
CREAM=(245,241,234)
square(mark,32,CREAM,0.06).save('public/favicon-32.png')
square(mark,16,CREAM,0.04).save('public/favicon-16.png')
square(mark,180,CREAM,0.14).convert('RGB').save('public/apple-touch-icon.png')
square(mark,512,CREAM,0.16).convert('RGB').save('public/icon-512.png',optimize=True)
square(mark,192,CREAM,0.16).convert('RGB').save('public/icon-192.png',optimize=True)
square(mark,256,CREAM,0.06).save('public/favicon.ico',sizes=[(16,16),(32,32),(48,48)])
# OG image
og=Image.new('RGBA',(1200,630),CREAM+(255,)); f=full.copy(); f.thumbnail((900,520),Image.LANCZOS)
og.alpha_composite(f,((1200-f.width)//2,(630-f.height)//2)); og.convert('RGB').save('public/og-image.png',optimize=True)
print(full.size,mark.size,word.size,hold.size,fa.size,lk.size)

import shutil; shutil.copy('public/og-image.png','public/images/og-image.png')
