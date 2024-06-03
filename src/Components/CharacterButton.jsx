



const CharacterButton = ({ isBold,fontColor,fontSize,fontFamily }) => {
  let style = '';
    if (isBold) style += `font-weight: bold; `;
    if (fontColor) style += `color: ${fontColor}; `;
    if (fontSize) style += ` font-size: ${fontSize}px; `;
    if (fontFamily) style += `font-family: ${fontFamily}; `;
    return `<span style="${style}">${char}</span>`;
};



export default CharacterButton;
