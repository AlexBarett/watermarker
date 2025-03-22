
export interface ImageMerger {
  background: string;
  bgWidth: number;
  bgHeight: number;

  label: string;
  lWidth: number;
  lHeight: number;

  opacity: number;
  top: number;
  left: number;

  displayedWidth: number;
  displayedHeight: number;
  name: string
}

export function imageMerger(images: ImageMerger[]) {
  console.warn(images)
  images.map(async (imgSettings) => {
    console.warn('==================================', imgSettings.label)
    const img = new Image();
    img.src = imgSettings.background;
    
    console.warn(img.naturalWidth, img.naturalHeight)
    const canvas = new OffscreenCanvas(imgSettings.bgWidth || img.naturalWidth, imgSettings.bgHeight || img.naturalHeight);
    const ctx = canvas.getContext('2d')!;


    const scaleX = imgSettings.displayedWidth / imgSettings.bgWidth;
    const scaleY = imgSettings.displayedHeight / imgSettings.bgHeight;

    ctx!.drawImage(img, 0, 0, imgSettings.bgWidth || img.naturalWidth, imgSettings.bgHeight || img.naturalHeight);

    ctx!.globalAlpha = imgSettings.opacity;
    
    const container = document.createElement('div');

    container.innerHTML = imgSettings.label;

    const svg = container.querySelector('svg')! as SVGElement;

    svg.setAttribute('width', Math.trunc(imgSettings.lWidth / scaleX) + 'px');
    svg.setAttribute('height', Math.trunc(imgSettings.lHeight / scaleY) + 'px');


    imgSettings.label = container.innerHTML;

    const label = new Image(Math.trunc(imgSettings.lWidth / scaleX), Math.trunc(imgSettings.lHeight / scaleY));

    label.onload = async () => {

      ctx.drawImage(
        label,
        Math.trunc(imgSettings.left / scaleX),
        Math.trunc(imgSettings.top / scaleY),
        label.width,
        label.height
      );
      const a = document.createElement('a');
      const blob = await canvas.convertToBlob({
        type: 'image/jpeg',
      });
      a.href = URL.createObjectURL(blob);
      a.target = '_self';
      a.download = imgSettings.name + '.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    window.requestAnimationFrame(() => label.src = window.URL.createObjectURL(new Blob([imgSettings.label], { type: 'image/svg+xml' })));
  });

}
