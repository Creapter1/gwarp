import random, math
random.seed(7)
W=H=3000   # costume units; use the sprite at size 1000% -> 30,000 x 30,000 world (walls at +-15,000)
def cloud(cx, cy, s, op, fill='#ffffff', shade='#c9dcf2'):
    parts=[]
    n=random.randint(5,9)
    for i in range(n):
        dx=random.uniform(-1.6,1.6)*s; dy=random.uniform(-0.35,0.35)*s
        rx=random.uniform(0.55,1.0)*s; ry=rx*random.uniform(0.45,0.7)
        parts.append(f'<ellipse cx="{cx+dx:.0f}" cy="{cy+dy+ry*0.25:.0f}" rx="{rx:.0f}" ry="{ry*0.8:.0f}" fill="{shade}"/>')
        parts.append(f'<ellipse cx="{cx+dx:.0f}" cy="{cy+dy:.0f}" rx="{rx:.0f}" ry="{ry:.0f}" fill="{fill}"/>')
    return f'<g opacity="{op:.2f}" filter="url(#soft)">'+''.join(parts)+'</g>'
out=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">',
'''<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0" stop-color="#070b24"/><stop offset="0.16" stop-color="#11205a"/>
 <stop offset="0.38" stop-color="#1f56b3"/><stop offset="0.62" stop-color="#4c9be8"/>
 <stop offset="0.82" stop-color="#9fd2ff"/><stop offset="0.93" stop-color="#ffe0b5"/><stop offset="1" stop-color="#ffb37a"/>
</linearGradient>
<radialGradient id="sun" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fffbe8"/><stop offset="0.18" stop-color="#fff2c2" stop-opacity="0.9"/><stop offset="0.55" stop-color="#ffd38a" stop-opacity="0.25"/><stop offset="1" stop-color="#ffd38a" stop-opacity="0"/></radialGradient>
<radialGradient id="haze" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ffffff" stop-opacity="0.35"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
<filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6"/></filter>
</defs>''',
f'<rect width="{W}" height="{H}" fill="url(#sky)"/>']
# stars in the high, dark part
for i in range(260):
    y=random.uniform(0,H*0.3); a=max(0.0,1-y/(H*0.3))
    out.append(f'<circle cx="{random.uniform(0,W):.0f}" cy="{y:.0f}" r="{random.uniform(1.2,3.2):.1f}" fill="#ffffff" opacity="{a*random.uniform(0.4,1):.2f}"/>')
# sun + glow, low on the sky
out.append(f'<circle cx="{W*0.68:.0f}" cy="{H*0.80:.0f}" r="520" fill="url(#sun)"/>')
# big soft haze patches
for i in range(14):
    out.append(f'<ellipse cx="{random.uniform(0,W):.0f}" cy="{random.uniform(H*0.45,H*0.95):.0f}" rx="{random.uniform(250,600):.0f}" ry="{random.uniform(60,160):.0f}" fill="url(#haze)"/>')
# cloud banks: thin and few high up, big and many low down
for i in range(520):
    t=random.random()**0.7
    y=H*(0.25+0.72*t)
    s=10+48*t
    op=0.35+0.55*t
    shade='#b8cbe6' if y>H*0.85 else '#c9dcf2'
    fill='#fff6ea' if y>H*0.86 else '#ffffff'
    out.append(cloud(random.uniform(-100,W+100), y, s, op, fill, shade))
out.append('</svg>')
open('world-sky.svg','w').write('\n'.join(out))

# seamless cloud layer for parallax (tiles left/right/up/down without seams)
TW,TH=2400,1800; random.seed(11); o=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{TW}" height="{TH}" viewBox="0 0 {TW} {TH}"><defs><filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="7"/></filter></defs>']
for i in range(26):
    cx,cy,s=random.uniform(0,TW),random.uniform(0,TH),random.uniform(40,110); op=random.uniform(0.55,0.95)
    st=random.getstate(); g=None
    for dx in (-TW,0,TW):
        for dy in (-TH,0,TH):
            random.setstate(st); o.append(cloud(cx+dx,cy+dy,s,op))
    random.setstate(st); [random.random() for _ in range(40)]
o.append('</svg>'); open('cloud-layer-tile.svg','w').write(''.join(o))
import os; print(os.path.getsize('world-sky.svg'), os.path.getsize('cloud-layer-tile.svg'))
