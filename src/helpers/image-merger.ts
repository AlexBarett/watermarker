export interface ImageMerger {
  background: string;
  bgWidth: number;
  bgHeight: number;

  label: string;
  top: number;
  left: number;
  opacity: number;
}

export function imageMerger(images: ImageMerger[]): string[] {
  
  const results = images.map((imgSettings, i) => {
    const canvas = document.createElement('canvas');

    const ctx = canvas.getContext('2d');

    canvas.width = imgSettings.bgWidth;
    canvas.height = imgSettings.bgHeight;

    const img = new Image();
    img.src = imgSettings.background;

    ctx!.drawImage(img, 0, 0);

    ctx!.globalAlpha = imgSettings.opacity;

    const label = new Image();
    console.warn('PRE LOAD', new Blob([imgSettings.label], { type: 'image/svg+xml' }))
    label.onload = () => {
      console.warn('ON LOAD')
      ctx?.drawImage(label, imgSettings.left, imgSettings.top);
      const a = document.createElement('a');
      a.href = canvas.toDataURL('jpg');
      a.target = '_self';
      a.download = `test_${i}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    label.src = window.URL.createObjectURL(new Blob([imgSettings.label], { type: 'image/svg+xml' }));
    
    return canvas.toDataURL('jpg');

  });

  return results;
}

// label.src = window.URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(label)], { type: 'image/svg+xml' }));
// label.onload = 
// () => ctx?.drawImage(label, imgSettings.left, imgSettings.top);

