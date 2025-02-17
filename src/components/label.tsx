import React, { useState } from "react";
import { LabelStats as LabelSettings, LabelTypes } from "../interfaces";

export interface LabelProps {
  label: string;
  settings: LabelSettings

  // changeSizes: () => Size;
}


export default function Label(props: LabelProps) {
  const [isFocus, setIsFocus] = useState(false);


  function createLabel() {
    switch (props.type) {
      case LabelTypes.Svg: {
        console.warn(props.label)
        return <div dangerouslySetInnerHTML={{ __html: props.label }}></div>
      }
      case LabelTypes.Unknown:
      default:
        return (
          <img src={props.label}>
          </img>
        );
    }
  }

  return (
    <div className={'label-container' + (props.label ? '' : 'd-none')}>
      <div className="angle-resizer lt"></div>
      <div className="angle-resizer rt"></div>
      {createLabel()}
      <div className="angle-resizer lb"></div>
      <div className="angle-resizer rb"></div>
    </div>
  )
}