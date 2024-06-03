import React, { useState } from 'react';
import style from "./keyBorad.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faBackspace, faArrowUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import Toolbox from '../Components/ToolBar';



function Keyboard() {

  const [alltext,setAllText] = useState("");
  const [enterValue, setEnterValue] = useState("");
  const [isCapsLock, setCapsLock] = useState(false);
  const [languageChange, setLanguageChange] = useState(false);
  const [IsImogi, setImogiValue] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState(false);
  const [fontColor, setFontColor] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [IsShift, setIsShiftValue] = useState(false);
  const [undoStack, setUndoStack] = useState([]);
  const [undoAllStack, setAllUndoStack] = useState([]);

  const changeFontSize = (event) => {
    const newFontSize = parseInt(event.target.value);
    setFontSize(newFontSize);
    
   
  };
  

  const toggleBold = () => {
    setIsBold((prevBold) => !prevBold);
   
  };
  
  const changeFontFamily = (event) => {
    setFontFamily(event.target.value);
  };
  
  
  const changeFontColor = (event) => {
    setFontColor(event.target.value);
 
  };
  
  const applyShiftStyleToAllText = () => {
    console.log(alltext)
    console.log(enterValue)
      let style = '';
      if (isBold) style += `font-weight: bold; `;
      if (fontColor) style += `color: ${fontColor}; `;
      if (fontSize) style += `font-size: ${fontSize}px; `;
      if (fontFamily) style += `font-family: ${fontFamily}; `;
      setEnterValue(()=>"")
      setEnterValue(`<span style="${style}">${alltext}</span>`);
  };
  
  const buttonMapping = {
    a: ["a", "A", "ש", "+", '👻'],
    b: ["b", "B", "נ", "*", '😿'],
    c: ["c", "C", "ב", ",", '😂'],
    d: ["d", "D", "ג", "/", '😼'],
    f: ["f", "F", "פ", "{", '😻'],
    g: ["g", "G", "ע", "}", '😹'],
    h: ["h", "H", "ח", "!", '💀'],
    i: ["i", "I", "י", "@", '👽'],
    j: ["j", "J", "י", "#", '😱'],
    k: ["k", "K", "כ", "$", '🥳'],
    l: ["l", "L", "ל", "%", '🤩'],
    m: ["m", "M", "מ", "^", '🥸'],
    n: ["n", "N", "נ", "&", '🥰'],
    o: ["o", "O", "ם", "*", '❤️'],
    p: ["p", "P", "פ", "(", '😎'],
    q: ["q", "Q", "/", ")", '🙏'],
    e: ["e", "E", "ק", "¿", '😇'],
    r: ["r", "R", "ר", "\"", '🥹'],
    s: ["s", "S", "ס", ":", '🤣'],
    t: ["t", "T", "ת", ";", '🏆'],
    u: ["u", "U", "ו", "?", '😘'],
    v: ["v", "V", "ה", "○", '👆'],
    w: ["w", "W", "'", "●", '🙂'],
    x: ["x", "X", "ס", "□", '😌'],
    y: ["y", "Y", "י", "■", '🥲'],
    z: ["z", "Z", "ז", "♤", '🤷‍♀️'],
    "!#1": ["!#1", "!#1", "!#1", "ABC"]
  };

  const getCharacter = (key) => {
    
    if (!buttonMapping[key]) return key;

    const [lower, upper, heb, spchar, imogi] = buttonMapping[key];
    if (specialChar) {
      return spchar;
    } else if (languageChange) {
      return heb;
    } else if (isCapsLock) {
      return upper;
    } else if (IsImogi) {
      return imogi;
    } else {
      return lower;
    }
  };

  const handleBackspace = () => {
    const spanRegex = /<span[^>]*>[^<]*<\/span>/g;
    const matches = Array.from(enterValue.matchAll(spanRegex));
    const lastSpanIndex = matches.length > 0 ? matches[matches.length - 1].index : -1;
  
    if (matches.length === 1) {
   
      const match = matches[0];
      const spanContent = match[0];
      const spanContentWithoutTags = spanContent.replace(/<[^>]+>/g, '');
      if (spanContentWithoutTags.length > 0) {
        const newContent = spanContentWithoutTags.slice(0, -1);
        const newSpanContent = spanContent.replace(spanContentWithoutTags, newContent);
        const newText = enterValue.replace(spanContent, newSpanContent);
        setEnterValue(newText);
      } else {
        setEnterValue((prevValue) => prevValue.slice(0, -1));
      }
    } else if (lastSpanIndex >= 0) {
      const newText = enterValue.substring(0, lastSpanIndex);
      setEnterValue(newText);
    } else {
      setEnterValue((prevValue) => prevValue.slice(0, -1));
    }
  };
  
  
  const handleButtons = (val) => {
    switch (val) {
      case "backspace":
        setUndoStack([...undoStack, enterValue]);
        setAllUndoStack([...undoAllStack,alltext]);
        setAllText((prevVal) => prevVal.slice(0, -1));
        handleBackspace();
        break;
      case "undo":
        if (undoStack.length > 0) {
          const lastAction = undoStack.pop();
          const lastActiona = undoAllStack.pop();
          setAllText(lastActiona);
          setEnterValue(lastAction);
          setUndoStack([...undoStack]);
        }
        break;
      case "capl":
        setCapsLock((prev) => !prev);
        break;
      case "space":
        setEnterValue((prevValue) => prevValue + " ");
        break;
      case "enter":
        setEnterValue((prevValue) => prevValue + "<br>");
        break;
      case "lang":
        setLanguageChange((prev) => !prev);
        break;
      case "schar":
        setSpecialChar((prev) => !prev);
        break;
      case "tab":
        setEnterValue((prevValue) => prevValue + "    ");
        break;
      case "imog":
        setImogiValue((prev) => !prev);
        break;
      case "clear":
        setUndoStack([...undoStack, enterValue]);
        setAllUndoStack([...undoAllStack,alltext]);
        setAllText(() => "");
        setEnterValue(() => "");
        
        break;
      case "all":
        setIsShiftValue((prevVal) => !prevVal);
        console.log(IsShift)
        applyShiftStyleToAllText();
        break;
      default:
        const char = getCharacter(val);
        const formattedChar = formatCharacter(char);
        setAllText((prevVal)=>prevVal+val);
        setEnterValue((prevVal) => prevVal + formattedChar);
        break;
    }
  };

  const formatCharacter = (char) => {
    let style = '';
    if (isBold) style += `font-weight: bold; `;
    if (fontColor) style += `color: ${fontColor}; `;
    if (fontSize) style += ` font-size: ${fontSize}px; `;
    if (fontFamily) style += `font-family: ${fontFamily}; `;
    return `<span style="${style}">${char}</span>`;
  };

  const renderButton = (key) => (
    <button className={style.renderButton} onClick={() => handleButtons(key)}>
      {getCharacter(key)}
    </button>
  );

  return (
    <div className={style.body}>
      <div className={style.main}>
      <div  >
          <div
            contentEditable
            dangerouslySetInnerHTML={{ __html: enterValue }}
            className={style.editor}
            id="text-editor"
          ></div>
        </div>
        <Toolbox
          fontSize={fontSize}
          fontSizes={[12, 14, 16, 18, 20, 24]}
          changeFontSize={changeFontSize}
          isBold={isBold}
          toggleBold={toggleBold}
          fontColor={fontColor}
          changeFontColor={changeFontColor}
          fontFamily={fontFamily}
          changeFontFamily={changeFontFamily}
        />
        <div className={style.Keyboard}>
          <div className={style.f_line}>
            <div className={style.characters}>
              <button className={style.renderButton} onClick={() => handleButtons("clear")}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
            <div className={style.number}>
              {renderButton("1")}
              {renderButton("2")}
              {renderButton("3")}
              {renderButton("4")}
              {renderButton("5")}
              {renderButton("6")}
              {renderButton("7")}
              {renderButton("8")}
              {renderButton("9")}
              {renderButton("0")}
            </div>
            <div className={style.characters}>
              {renderButton("-")}
              {renderButton("+")}
              <button className={style.backspace} onClick={() => handleButtons("backspace")}>
                <FontAwesomeIcon icon={faBackspace} />
              </button>
            </div>
          </div>
          <div className={style.s_line}>
            <div className={style.characters}>
              <button className={style.tab} onClick={() => handleButtons("tab")}>Tab</button>
            </div>
            <div className={style.letter}>
              {renderButton("q")}
              {renderButton("w")}
              {renderButton("e")}
              {renderButton("r")}
              {renderButton("t")}
              {renderButton("y")}
              {renderButton("u")}
              {renderButton("i")}
              {renderButton("o")}
              {renderButton("p")}
            </div>
            <div className={style.characters}>
              {renderButton("[")}
              {renderButton("]")}
              {renderButton("\\")}
            </div>
          </div>
          <div className={style.t_line}>
            <div>
              <button className={style.capslock} onClick={() => handleButtons("capl")}>
                <FontAwesomeIcon icon={faArrowUp} />
              </button>
              <button className={style.imog} onClick={() => handleButtons("imog")}>👻❤️</button>
            </div>
            <div className={style.letter}>
              {renderButton("a")}
              {renderButton("s")}
              {renderButton("d")}
              {renderButton("f")}
              {renderButton("g")}
              {renderButton("h")}
              {renderButton("j")}
              {renderButton("k")}
              {renderButton("l")}
            </div>
            <div className={style.characters}>
              {renderButton(":")}
              {renderButton("|")}
              <button className={style.renderButton} onClick={() => handleButtons("undo")}>
               Un
              </button>
            </div>
          </div>
          <div className={style.four_line}>
            <div>
              <button className={style.lang} onClick={() => handleButtons("lang")}>
                <FontAwesomeIcon icon={faGlobe} />
              </button>
            </div>
            <div>
            <button className={style.spe_char} onClick={() => handleButtons("all")}>
                All
              </button>
              {renderButton("z")}
              {renderButton("x")}
              {renderButton("c")}
              {renderButton("v")}
              {renderButton("b")}
              {renderButton("n")}
              {renderButton("m")}
            </div>
            <div className={style.characters}>
              {renderButton("<")}
              {renderButton(">")}
            
              <button className={style.spe_char} onClick={() => handleButtons("schar")}>
                {specialChar ? "ABC" : "!#1"}
              </button>
              <button className={style.enter} onClick={() => handleButtons("enter")}>Enter</button>
            </div>
          </div>
          <div className={style.sb}>
            <button className={style.spacebar} onClick={() => handleButtons("space")}></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Keyboard;