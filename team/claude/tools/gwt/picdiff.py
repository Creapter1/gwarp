import sys
from PIL import Image,ImageChops
pre=sys.argv[1];a=Image.open(pre+'_scratch.png').convert('RGB').resize((480,360));b=Image.open(pre+'_gwarp.png').convert('RGB').resize((480,360))
d=ImageChops.difference(a,b).convert('L');px=d.load();bad=sum(1 for y in range(360) for x in range(480) if px[x,y]>60)
print(f'pixels clearly different: {bad} of 172800 ({bad/1728:.2f}%)')
o=Image.new('RGB',(1440,360),'white');o.paste(a,(0,0));o.paste(b,(480,0));o.paste(d.point(lambda v:255 if v>60 else 0).convert('RGB'),(960,0));o.save(pre+'_cmp.png')
