import { TouchEvent, useRef } from "react";
import { GeneralStats, Size } from "../interfaces";

export interface PcLabelProps {
  label: string;
  settings: GeneralStats

  changeSizes: (ch: Size) => void;
}

const SLOWER = Math.SQRT2;

export default function TouchLabel(props: PcLabelProps) {
  const prevChange = useRef([0, 0]);
  const prevPosition = useRef([0, 0]);

  const createLabel = function() {
    if (props.settings.isSvg) {
      return (
        <div
          className="label-container-wrapper w-100 h-100 position-relative"
          dangerouslySetInnerHTML={{ __html: props.label }}
          style={{
            opacity: props.settings.opacity,
            zIndex: 249,
            pointerEvents: 'none',
          }}
        >
        </div>)
    } else {
      return (
        <div className="label-container-wrapper w-100 h-100">
          <img className=" w-100 h-100" src={props.label}></img>
        </div>);
    }
  }

  const initEditing = (e: TouchEvent) => {
    console.warn('initEditing')
    const background = document.querySelector('.active.carousel-item .background-img') as HTMLImageElement;
    const label = document.querySelector('.active.carousel-item .label-container') as HTMLElement;

    background.style.zIndex = '200';

    prevPosition.current = [e.touches[0].clientX, e.touches[0].clientY];

    background.ontouchmove = (moveEvent) => {
      console.warn('background.ontouchmove', moveEvent);

      if (moveEvent.touches.length > 1) {
        resize(moveEvent.touches);
      }

      if (moveEvent.touches.length === 1) {
        move(moveEvent.touches);
      }
    };

    window.requestAnimationFrame(() => background.dispatchEvent(new Event('touchstart')))
    label.ontouchmove = (e) => {
      e.stopImmediatePropagation();
      e.stopPropagation();
      console.warn('label.ontouchmove', e);

      if (e.touches.length > 1) {
        resize(e.touches);
        return;
      }
      move(e.touches);
    };

    background.ontouchend = stopEditing;
  }

  const stopEditing = (e: globalThis.TouchEvent | TouchEvent) => {
    console.warn('stopEditing')
    if (e.touches.length) {
      return;
    }

    const background = document.querySelector('.active.carousel-item .background-img') as HTMLImageElement;
    const label = document.querySelector('.active.carousel-item .label-container') as HTMLElement;
    
    background.style.zIndex = '0';
    background.onpointermove = null;
    background.ontouchmove = null;
    label.onpointermove = null;
    label!.ontouchmove = null;
    prevChange.current = [0, 0];
    prevPosition.current = [0, 0];
  }

  const resize = ({ 0: touch1, 1: touch2}: TouchList) => {
    let dw = Math.abs(touch2.clientX - touch1.clientX);
    let dh = Math.abs(touch2.clientY - touch1.clientY);
    const pdw = prevChange.current[0];
    const pdh = prevChange.current[1];

    if (!prevChange.current[0] && !prevChange.current[1]) {
      prevChange.current = [dw, dh];
      return;
    }

    prevChange.current = [dw, dh];

    dw = dw - pdw;
    dh = dh - pdh;

    if (Math.abs(dw) > Math.abs(dh)) {
      dh = (dw * props.settings.labelRatio) / SLOWER;
      dw = dw / SLOWER;
    } else {
      dw = (dh / props.settings.labelRatio) / SLOWER;
      dh = dh / SLOWER;
    }

    const dl = -dh / 2;
    const dt = -dw / 2;

    props.changeSizes({ dw, dh, dl, dt });
  };

  const move = ({ 0: touch }: TouchList) => {
    if (!prevPosition.current[0] && !prevPosition.current[1]) {
      prevPosition.current = [touch.clientX, touch.clientY];
      return;
    }

    const pl = prevPosition.current[0];
    const pt = prevPosition.current[1];

    const dt = touch.clientY - pt;
    const dl = touch.clientX - pl;

    console.warn('move', touch, dt, dl)


    prevPosition.current = [touch.clientX, touch.clientY]

    props.changeSizes({ dh: 0, dw: 0, dt, dl });
  }

  return (
    <div
      className={'label-container' + (props.label ? '' : 'd-none')}
      style={{
        height: `${props.settings.labelHeight}px`,
        width: `${props.settings.labelWidth}px`,
      }}
      onTouchMove={(e) => {
        e.stopPropagation();
        initEditing(e)
      }}
      onTouchEnd={(e) => stopEditing(e)}
    >
      {createLabel()}
    </div>
  )
}
