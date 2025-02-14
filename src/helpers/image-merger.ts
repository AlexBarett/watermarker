
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

export function imageMerger(images: ImageMerger[]) {
  
  images.map((imgSettings, i) => {
    
    const img = new Image();
    img.src = imgSettings.background;
    
    console.warn(img.naturalWidth, img.naturalHeight)
    const canvas = new OffscreenCanvas(img.naturalWidth, img.naturalHeight);
    const ctx = canvas.getContext('2d')!;


    const scale = imgSettings.bgWidth / img.width;
    console.warn(scale)
    ctx!.drawImage(img, 0, 0);

    ctx!.globalAlpha = imgSettings.opacity;
    console.warn(imgSettings.size / scale)
    const label = new Image(Math.trunc(imgSettings.size / scale), Math.trunc(imgSettings.size / scale));
    label.onload = async () => {
      await ctx.drawImage(
        label,
        Math.trunc(imgSettings.left / scale),
        Math.trunc(imgSettings.top / scale),
        Math.trunc(imgSettings.size / scale),
        Math.trunc(imgSettings.size / scale)
      );
      const a = document.createElement('a');
      const blob = await canvas.convertToBlob();
      a.href = URL.createObjectURL(blob);
      a.target = '_self';
      a.download = `test_${i}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    window.requestAnimationFrame(() => label.src = window.URL.createObjectURL(new Blob([imgSettings.label], { type: 'image/svg+xml' })));
    
    // return canvas.toDataURL('image/jpeg');

  });

  // return results;
}

// label.src = window.URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(label)], { type: 'image/svg+xml' }));
// label.onload = 
// () => ctx?.drawImage(label, imgSettings.left, imgSettings.top);

