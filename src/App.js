import "./App.css";
import { useEffect, useState } from "react";
import { fabric } from "fabric";

let canvas = '';
function App() {

  const [color, setColor] = useState('#0052cc');
  const [size, setSize] = useState(3);

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


  const handleColor = (color) => {
    console.log(color)
    setColor(color);
  }
  const handleChange = (event) => {
    console.log(event.target.value)
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
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);

    canvas.isDrawingMode = true;
  }

  return (
    <>
      <div id="edit-list">
        <ul id="color-list">
          <li onClick={() => handleColor('green')}>G</li>
          <li onClick={() => handleColor('black')}>B</li>
          <li onClick={() => handleColor('red')}>R</li>
        </ul>
        <input
          id="rangeinp"
          type="range"
          min="0" max="5"
          onChange={handleChange}
          defaultValue="0"
          step="1" />
        <img src="https://cdn-icons-png.flaticon.com/512/2661/2661282.png" alt="eraser" onClick={handleEraser} />
      </div>
      <canvas id="canvas" />
    </>
  )
}

export default App;
