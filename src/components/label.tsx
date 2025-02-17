import React, { MouseEvent, useState } from "react";
import { Appearance, LabelTypes, Size } from "../interfaces";

export interface LabelProps {
  label: string;
  type: LabelTypes;

  changeSizes: () => Size;
}


export default function Label({ label, type, changeSizes }: LabelProps) {
  const [isFocus, setIsFocus] = useState(false);


  function createLabel() {
    switch (type) {
      case LabelTypes.Svg: {
        return (
          <>
            {label}
          </>
        );
      }
      case LabelTypes.Unknown:
      default:
        return (
          <img src={label}>
          </img>
        );
    }
  }

  // function resizeByAngle(angle: 'LT' | 'RT' | 'LB' | 'RB') {
  //   return (event: MouseEvent | TouchEvent) => {
  //     let [left, top] = [0, 0];
  //     const block = (event instanceof MouseEvent)
  //       ? ((event.target) as HTMLElement)
  //       : ((event as TouchEvent).targetTouches[0].target as HTMLElement);

  //     switch (angle) {
  //       case "LT":
  //         left = -1;
  //         top = -1;
  //         break;
  //       case "RT":
  //         left = 1;
  //         top = -1;
  //         break;
  //       case "LB":
  //         left = -1;
  //         top = 1;
  //         break;
  //       case "RB":
  //       default:
  //         left = 1;
  //         top = 1;
  //         break;
  //     }

  //     block = 

  //   }
  // }

  return (
    <div className="label-container">
      <div className="angle-resizer lt"></div>
      <div className="angle-resizer rt"></div>
      {createLabel()}
      <div className="angle-resizer lb"></div>
      <div className="angle-resizer rb"></div>
    </div>
  )
}