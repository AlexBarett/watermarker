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
  
  const results = images.map(imgSettings => {
    const canvas = document.createElement('canvas');

    const ctx = canvas.getContext('2d');

    canvas.width = imgSettings.bgWidth;
    canvas.height = imgSettings.bgHeight;

    const img = new Image();
    img.src = imgSettings.background;

    ctx!.drawImage(img, 0, 0);

    ctx!.globalAlpha = imgSettings.opacity;

    const label = new Image();
    label.src = window.URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(label)], { type: 'image/svg+xml' }));
    label.onload = 
    () => ctx?.drawImage(label, imgSettings.left, imgSettings.top);

    
    return canvas.toDataURL('jpg');

  });

  return results;
}
