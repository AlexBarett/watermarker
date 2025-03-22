import { MouseEventHandler } from "react";
import { GeneralStats, Size } from "../interfaces";

export interface PcLabelProps {
  label: string;
  settings: GeneralStats

  changeSizes: (ch: Size) => void;
}

const SLOWER = Math.SQRT2;

export default function PcLabel(props: PcLabelProps) {

  const createLabel = function() {
    if (props.settings.isSvg) {
      return (
        <div
          className="label-container-wrapper w-100 h-100"
          dangerouslySetInnerHTML={{ __html: props.label }}
          style={{
            opacity: props.settings.opacity
          }}
        >
        </div>)
    } else {
      return (
        <div className="label-container-wrapper w-100 h-100">
          <img
            className="w-100 h-100"
            src={props.label}
            style={{
              opacity: props.settings.opacity
            }}
          >
            </img>
        </div>);
    }
  }

  const stopChanging = () => {
    console.warn('stopChanging')
    const background = document.querySelector('.active.carousel-item .background-img') as HTMLImageElement;
    const label = document.querySelector('.active.carousel-item .label-container') as HTMLElement;
    
    background.style.zIndex = '0';
    background.onpointermove = null;
    background.onmouseup = null;
    background.onmouseleave = null;
    label.onpointermove = null;
    label!.onmouseup = null;
    setTimeout(() => label.classList.remove('force-hover'), 2000)
  }

  const resize: ((dx: number, dy: number, resize?: boolean) => MouseEventHandler<HTMLDivElement>) = (dx, dy, resize = true) => function(e) {
    e.preventDefault();
    e.stopPropagation();

    const background = document.querySelector('.active.carousel-item .background-img') as HTMLImageElement;
    const label = document.querySelector('.active.carousel-item .label-container') as HTMLElement;
    const p = [0, 0, 0, 0]; //1,2 - текущий 3,4 - перемещенный
    p[0] = e.clientX;
    p[1] = e.clientY;
    label.classList.add('force-hover')

    if (background) {
      background.style.zIndex = '200';
      const onPionterMove = (e: PointerEvent) => {
        p[2] = e.clientX;
        p[3] = e.clientY;
        let dw = (p[2] - p[0]) * dx;
        let dh = (p[3] - p[1]) * dy;
        const dl = (dx < 0) ? -dw : 0;
        const dt = (dy < 0) ? -dh : 0;

        if (Math.abs(dw) > Math.abs(dh)) {
          dh = (dw * props.settings.labelRatio) / SLOWER;
          dw = dw / SLOWER;
        } else {
          dw = (dh / props.settings.labelRatio) / SLOWER;
          dh = dh / SLOWER;
        }

        if (!resize) {
          dw = 0;
          dh = 0;
        }

        props.changeSizes({ dw, dh, dt, dl });
        p[0] = p[2];
        p[1] = p[3];
      };
      background.onpointermove = onPionterMove;
      label.onpointermove = onPionterMove;
      
      background.onmouseup = stopChanging;
      label.onmouseup = stopChanging;

      background.onmouseleave = (e) => {
        console.warn('onmouseleave', e)
        if (e.relatedTarget) {
          if (
            (e.relatedTarget as HTMLDivElement).classList.contains('angle-resizer')
            || ['svg', 'img'].includes((e.relatedTarget as HTMLDivElement).nodeName)
          ) {
            return
          }
        }

        background.style.zIndex = '0';
        background.onpointermove = null;
        background.onmouseup = null;
        background.onmouseleave = null;
        label.onpointermove = null
        label.onmouseup = null
      };

      return;
    }

    console.warn('BACKGROUND IS MISSING')
  }

  return (
    <div
      className={'label-container' + (props.label ? '' : 'd-none')}
      style={{
        height: `${props.settings.labelHeight}px`,
        width: `${props.settings.labelWidth}px`
      }}
      onMouseUp={stopChanging}
      onMouseDown={resize(-1, -1, false)}
    >
      <div className="angle-resizer lt" onMouseDown={resize(-1, -1)} onMouseUp={stopChanging}></div>
      <div className="angle-resizer rt" onMouseDown={resize(1, -1)} onMouseUp={stopChanging}></div>
      {createLabel()}
      <div className="angle-resizer lb" onMouseDown={resize(-1, 1)} onMouseUp={stopChanging}></div>
      <div className="angle-resizer rb" onMouseDown={resize(1, 1)} onMouseUp={stopChanging}></div>
    </div>
  )
}
