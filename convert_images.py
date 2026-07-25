import os, sys
from PIL import Image

# Force UTF-8 output
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

src_dir = "public/images"
converted = 0
errors = 0

for fname in os.listdir(src_dir):
    if not fname.lower().endswith(('.jpg', '.jpeg', '.png')):
        continue
    src_path = os.path.join(src_dir, fname)
    base = os.path.splitext(fname)[0]
    webp_name = base.lower().replace(' ', '-')
    for ch in ['é','è','ê','ë','à','â','ä','ç','ô','ö','ù','û','ü','î','ï','’',"'",'--']:
        webp_name = webp_name.replace(ch, '-')
    webp_name = webp_name.strip('-').replace('--', '-')
    dest_path = os.path.join(src_dir, webp_name + '.webp')
    
    try:
        img = Image.open(src_path)
        if img.mode == 'RGBA':
            img = img.convert('RGB')
        img.save(dest_path, 'WEBP', quality=80)
        kb = os.path.getsize(dest_path) / 1024
        print(f"  OK {fname} -> {webp_name}.webp ({kb:.0f} KB)")
        converted += 1
    except Exception as e:
        print(f"  FAIL {fname}: {e}")
        errors += 1

print(f"\nDone: {converted} converted, {errors} errors")
