export interface ImageMerger {
  background: string;
  bgWidth: number;
  bgHeight: number;

  label: string;
  top: number;
  left: number;
  opacity: number;
  size: number;
  color: string;
}

export function imageMerger(images: ImageMerger[]): string[] {
  
  const results = images.map((imgSettings, i) => {
    const canvas = document.createElement('canvas');

    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = imgSettings.background;

    canvas.width = img.width;
    canvas.height = img.height;

    const scale = imgSettings.bgWidth / img.width;

    ctx!.drawImage(img, 0, 0);

    ctx!.globalAlpha = imgSettings.opacity;

    const label = new Image();
    label.style.color = imgSettings.color;
    label.onload = () => {
      ctx?.drawImage(label, Math.trunc(imgSettings.left / scale), Math.trunc(imgSettings.top / scale), Math.trunc(imgSettings.size / scale), Math.trunc(imgSettings.size / scale));
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/jpeg', 1.0);
      a.target = '_self';
      a.download = `test_${i}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    window.requestAnimationFrame(() => label.src = window.URL.createObjectURL(new Blob([imgSettings.label], { type: 'image/svg+xml' })));
    
    return canvas.toDataURL('image/jpeg');

  });

  return results;
}

// label.src = window.URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(label)], { type: 'image/svg+xml' }));
// label.onload = 
// () => ctx?.drawImage(label, imgSettings.left, imgSettings.top);

