import React from 'react';
import style from "./toolbar.module.css";

const Toolbox = (props) => {

  return (
    <div className={style.controls}>
      <select value={props.fontSize} onChange={props.changeFontSize}>
        {props.fontSizes.map((size) => (
          <option key={size} value={size}>{size}px</option>
        ))}
      </select>
      <button className={style.bold} style={{ fontWeight: props.isBold ? 'bold' : 'normal' }} onClick={props.toggleBold}>
        {props.isBold ? 'B' : 'B'}
      </button>
      <input type="color" value={props.fontColor} onChange={props.changeFontColor} />
      <select value={props.fontFamily} onChange={props.changeFontFamily}>
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Verdana">Helvetica</option>
        <option value="Times New Roman">Courier New</option>
        
      </select>
    </div>
  );
};

export default Toolbox;
