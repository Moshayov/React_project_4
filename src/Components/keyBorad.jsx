import React, { useState } from 'react';
import style from "./keyBorad.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faBackspace, faArrowUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import Toolbox from '../Components/ToolBar';

function Keyboard() {
  const [enterValue, setEnterValue] = useState("");
  const [isCapsLock, setCapsLock] = useState(false);
  const [languageChange, setLanguageChange] = useState(false);
  const [IsImogi, setImogiValue] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState(false);
  const [fontColor, setFontColor] = useState("#000000");
  const [selectedText, setSelectedText] = useState("");
  const fontSizes = [12, 14, 16, 18, 20, 24];
  const [fontFamily, setFontFamily] = useState("Arial");
  const [IsShift, setIsShiftValue] = useState(false);
  const [ChangeValue, setChangeValue] = useState("");

 
    
  const changeFontSize = (event) => {
    setFontSize(parseInt(event.target.value));
    if (IsShift) {
      document.execCommand("fontSize", false, event.target.value);
      setSelectedText(""); // Clear selection after applying formatting
    }
  };
  
  const changeFontFamily = (event) => {
    setFontFamily(event.target.value);
    if (IsShift) {
      document.execCommand("fontName", false, event.target.value);
      setSelectedText(""); // Clear selection after applying formatting
    }
  };
  
  const toggleBold = () => {
    setIsBold((prevBold) => !prevBold);
    if (IsShift) {
      applyBoldToSelection();
    }
  };
  
  const changeFontColor = (event) => {
    setFontColor(event.target.value);
    if (IsShift) {
      applyFontColorToSelection(event.target.value);
    }
  };
  const applyBoldToSelection = () => {
    if (IsShift) {
      document.execCommand("bold", false, null);
      setSelectedText("");
    }
  };

  const applyFontColorToSelection = (color) => {
    if (IsShift) {
      document.execCommand("foreColor", false, color);
      setSelectedText("");
    }
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

  const handleButtons = (val) => {
    switch (val) {
      case "backspace":
        setEnterValue((prevVal) => prevVal.slice(0, -1));
        break;
      case "capl":
        setCapsLock((prev) => !prev);
        break;
      case "space":
        setEnterValue((prevValue) => prevValue + " ");
        break;
      case "enter":
        setEnterValue((prevValue) => prevValue + "\n");
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
        setEnterValue(() => "");
        break;
      case "shift":
        {
          setIsShiftValue((prevVal) => !prevVal);
          console.log(val)
         
              
          break;
        }
      default:
        if(IsShift ){
          setChangeValue((prevVal) => prevVal + getCharacter(val));
          console.log({ChangeValue})    }
        else{
          setChangeValue(() => "");
        }
        setEnterValue((prevVal) => prevVal + getCharacter(val));
        break;
    }
  };
  const handleInputChange = (event) => {
    setEnterValue(event.target.value);
  };
  const renderButton = (key) => (
    <button className={style.renderButton} onClick={() => handleButtons(key)}>
      {getCharacter(key)}
    </button>
  );

  return (
    <div className={style.body}>
      <div className={style.main}>
      <div className={style.textbox} style={{ fontSize: `${fontSize}px`, fontWeight: isBold ? 'bold' : 'normal', color: fontColor, fontFamily: fontFamily }}>
          <textarea
            value={enterValue}
           
            onChange={handleInputChange}
            readOnly={false}
            style={{ fontSize: `${fontSize}px`, fontWeight: isBold ? 'bold' : 'normal', color: fontColor, fontFamily: fontFamily, height: '300px', width: '650px' }}
          />
        </div>
        <Toolbox
            fontSize={fontSize}
            fontSizes={fontSizes}
            changeFontSize={changeFontSize}
            isBold={isBold}
            toggleBold={toggleBold}
            fontColor={fontColor}
            changeFontColor={changeFontColor}
            selectedText={selectedText}
            isshift={IsShift}
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
              {renderButton(".")}
            </div>
          </div>
          <div className={style.four_line}>
            <div>
              <button className={style.lang} onClick={() => handleButtons("lang")}>
                <FontAwesomeIcon icon={faGlobe} />
              </button>
            </div>
            <div>
            <button className={style.renderButton} onClick={() => handleButtons("shift")}>
                sh
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