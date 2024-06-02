import React from 'react';
import style from "./toolbar.module.css";


const Toolbox = ({ fontSize, fontSizes, changeFontSize, isBold, toggleBold, fontColor, changeFontColor, fontFamily, changeFontFamily }) => {
  return (
    <div className={style.controls}>
      <select value={fontSize} onChange={changeFontSize}>
        {fontSizes.map((size) => (
          <option key={size} value={size}>{size}px</option>
        ))}
      </select>
      <button className={style.bold} style={{ fontWeight: isBold ? 'bold' : 'normal' }} onClick={toggleBold}>
        B
      </button>
      <input type="color" value={fontColor} onChange={changeFontColor} />
      <select value={fontFamily} onChange={changeFontFamily}>
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Courier New">Courier New</option>
      </select>
    </div>
  );
};

export default Toolbox;

