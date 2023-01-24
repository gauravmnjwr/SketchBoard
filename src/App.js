import "./App.css";
import { useEffect, useState } from "react";
import { fabric } from "fabric";

let canvas = '';
function App() {

  const [color, setColor] = useState('#0052cc');
  const [size, setSize] = useState(3);
  const [erase, setErase] = useState({ size: 0, canErase: false });

  useEffect(() => {
    canvas = new fabric.Canvas("canvas");
    canvas.setHeight(window.innerHeight);
    canvas.setWidth(window.innerWidth);
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = size;
    canvas.freeDrawingBrush.color = color;
    canvas.set('erasable', true);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    canvas.freeDrawingBrush.color = color;
    canvas.freeDrawingBrush.width = size;
    console.log(size);

  }, [color, size]);

  useEffect(() => {
    if (erase.canErase) {
      canvas.freeDrawingBrush.width = erase.size;
    }

  }, [erase]);


  const handleColor = (color) => {
    console.log(color)
    setColor(color);
  }
  const handleChange = (event) => {
    console.log(event.target.value)
    if (erase.canErase) {
      setErase({ ...erase, canErase: false });
    }
    switch (event.target.value) {
      case '1':
        setSize(8);
        return;
      case '2':
        setSize(12);
        return;

      case '3':
        setSize(20);
        return;

      case '4':
        setSize(25);
        return;

      case '5':
        setSize(35);
        return;

      default:
        setSize(3);
        return;

    }
  }
  const handleEraser = () => {
    const temp = !(erase.canErase);
    setErase({ ...erase, canErase: temp });
    if (erase.canErase) {
      canvas.freeDrawingBrush.color = color;
      canvas.freeDrawingBrush.width = size;
    }
    else {
      canvas.freeDrawingBrush.color = 'white';
      canvas.freeDrawingBrush.width = erase.size;
    }
  }

  const handleEraserChange = (event) => {
    console.log(event.target.value)
    switch (event.target.value) {
      case '1':
        setErase({ ...erase, size: 15 });

        return;
      case '2':
        setErase({ ...erase, size: 20 });

        return;

      case '3':
        setErase({ ...erase, size: 30 });
        return;

      case '4':
        setErase({ ...erase, size: 35 });
        return;

      case '5':
        setErase({ ...erase, size: 45 });
        return;

      default:
        setErase({ ...erase, size: 8 });
        return;
    }


  }

  return (
    <>
      <div id="edit-list">
        <div id="colorlist-container">
          <ul id="color-list">
            <li onClick={() => handleColor('green')}>G</li>
            <li onClick={() => handleColor('black')}>B</li>
            <li onClick={() => handleColor('red')}>R</li>
          </ul>
        </div>
        <div id="pensize-container">
          <label htmlFor="rangeinp">Size</label>
          <input
            id="rangeinp"
            type="range"
            min="0" max="5"
            onChange={handleChange}
            defaultValue="0"
            step="1" />
        </div>
        <div id="eraser-container">
          <label htmlFor="rangeinp">Size</label>
          <input type="range"
            id="rangeinp"
            min="0" max="5"
            defaultValue="0"
            step="1"
            onChange={handleEraserChange} />
          <img src="https://cdn-icons-png.flaticon.com/512/2661/2661282.png" alt="eraser" onClick={handleEraser} />
        </div>
      </div>
      <canvas id="canvas" />
    </>
  )
}

export default App;
