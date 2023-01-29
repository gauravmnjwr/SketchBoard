import "./App.css";
import { useEffect, useState, useRef } from "react";
import { fabric } from "fabric";


let canvas = '';
function App() {

  const [color, setColor] = useState('black');
  const [size, setSize] = useState(3);
  const [erase, setErase] = useState({ size: 3, canErase: false });


  const node = useRef([]);

  useEffect(() => {
    canvas = new fabric.Canvas("canvas");
    canvas.setHeight(window.innerHeight - 95);
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

  }, [color, size]);

  useEffect(() => {
    if (erase.canErase) {
      canvas.freeDrawingBrush.width = erase.size;
    }

  }, [erase]);


  const handleColor = (color) => {
    for (let i of node.current) {
      if (i.id === color || (color === '#0052cc' && i.id === 'blue')) {
        i.style.boxShadow = `0 0 20px ${color}`;
      }
      else {
        i.style.boxShadow = '0 0 0 0';
      }
    }
    setColor(color);
  }
  const handleChange = (event) => {
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
  const handleEraser = (event) => {
    const temp = !(erase.canErase);
    if (canvas.isDrawingMode === false) {
      canvas.isDrawingMode = true;
    }
    setErase({ ...erase, canErase: temp });
    if (erase.canErase) {
      canvas.freeDrawingBrush.color = color;
      canvas.freeDrawingBrush.width = size;
      canvas.selectable = true;
      event.target.style.backgroundColor = '';



    }
    else {
      canvas.freeDrawingBrush.color = 'white';
      canvas.freeDrawingBrush.width = erase.size;
      canvas.set('erasable', false);
      event.target.style.backgroundColor = 'orange';


    }
  }

  const handleEraserChange = (event) => {
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

  //shapes

  const handleLine = () => {
    var line = new fabric.Line([50, 10, 200, 150], {
      stroke: 'black',
      left: 100,
      top: 100,
      right: 100,
      bottom: 100
    });

    canvas.add(line);
  }
  const handleSquare = () => {
    var square = new fabric.Rect({
      width: 100,
      height: 100,
      fill: '',
      stroke: 'black',
      strokeWidth: 1,
      left: 100,
      top: 100,
      right: 300,
      bottom: 200
    });
    canvas.add(square);

  }

  const handleRect = () => {
    var rectangle = new fabric.Rect({
      width: 200,
      height: 100,
      fill: '',
      stroke: 'black',
      strokeWidth: 1,
      left: 100,
      top: 300,
      right: 100,
      bottom: 100
    });

    canvas.add(rectangle);
  }
  const handleStar = () => {
    var hexagon = new fabric.Polygon([
      { x: 349.9, y: 75, },
      { x: 379, y: 160.9, },
      { x: 469, y: 160.9, },
      { x: 397, y: 214.9, },
      { x: 423, y: 300.9, },
      { x: 350, y: 249.9, },
      { x: 276.9, y: 301, },
      { x: 303, y: 215, },
      { x: 231, y: 161, },
      { x: 321, y: 161, },], {
      fill: '',
      stroke: 'black',
      strokeWidth: 1
    });

    canvas.add(hexagon);
  }

  const handleCircle = () => {
    var circle = new fabric.Circle({
      radius: 50,
      fill: '',
      stroke: 'black',
      strokeWidth: 1
    });
    canvas.add(circle);

  }
  const handleTraingle = () => {

    var triangle = new fabric.Triangle({
      width: 150,
      height: 75,
      fill: '',
      strokeWidth: 1,
      stroke: 'black',
      left: 100,
      top: 100,
      right: 100,
      bottom: 100

    });

    canvas.add(triangle);

  }
  const handleEllipse = () => {
    var ellipse = new fabric.Ellipse({
      rx: 80,
      ry: 40,
      fill: '',
      stroke: 'black',
      strokeWidth: 1
    })
    canvas.add(ellipse)
  }
  const handlePentagon = () => {

    var pentagon = new fabric.Polygon([
      { x: 200, y: 10 },
      { x: 250, y: 50 },
      { x: 230, y: 100 },
      { x: 170, y: 100 },
      { x: 150, y: 50 }], {
      fill: '',
      strokeWidth: 1,
      stroke: 'black',

    })
    canvas.add(pentagon)
  }

  const handleDrawingMode = (event) => {
    canvas.isDrawingMode = !(canvas.isDrawingMode);
    let objectx = canvas.getObjects();
    for (let i = 0; i < objectx.length; i++) {
      if (objectx[i].stroke === 'white') {
        let eraserObj = objectx[i];
        for (let j = 0; j < objectx.length; j++) {
          if (objectx[j] === eraserObj) {
            continue;
          }
          else {
            if (((eraserObj.cacheTranslationX - objectx[j].cacheTranslationX) <= 10 && (objectx[j].cacheTranslationX - eraserObj.cacheTranslationX) <= 10) ||
              ((eraserObj.cacheTranslationY - objectx[j].cacheTranslationY) <= 10 && (objectx[j].cacheTranslationY - eraserObj.cacheTranslationX) <= 10)) {
              objectx[j].selectable = false;
            }
          }
        }
        objectx[i].selectable = false;
      }
    }
  }


  return (
    <>
      <div id="edit-list">
        <div id="pensize-container">
          <label htmlFor="rangeinp"><img id="range-img" src="https://cdn-icons-png.flaticon.com/512/1250/1250615.png" alt="" /></label>
          <input
            id="rangeinp"
            type="range"
            min="0" max="5"
            onChange={handleChange}
            defaultValue="0"
            step="1" />
        </div>
        <div id="color-list">
          <div ref={(el) => node.current[0] = el} onClick={() => handleColor('black')} id='black'></div>
          <div ref={(el) => node.current[1] = el} onClick={() => handleColor('yellow')} id='yellow'></div>
          <div ref={(el) => node.current[2] = el} onClick={() => handleColor('#0052cc')} id='blue'></div>
          <div ref={(el) => node.current[3] = el} onClick={() => handleColor('red')} id='red'></div>
          <div ref={(el) => node.current[4] = el} onClick={() => handleColor('green')} id='green'></div>
        </div>
        <div id="eraser-container">
          <label htmlFor="rangeinp"><img id="range-img" src="https://cdn-icons-png.flaticon.com/512/2661/2661282.png" alt="eraser" onClick={handleEraser} /></label>
          <input type="range"
            id="rangeinp"
            min="0" max="5"
            defaultValue="0"
            step="1"
            onChange={handleEraserChange} />

        </div>
        <div onClick={handleDrawingMode}>
          <img id="range-img" src="https://cdn-icons-png.flaticon.com/512/827/827980.png" alt="elementselector" />
        </div>
        <div id="shape-container">
          <button onClick={handleLine}><img src="https://cdn-icons-png.flaticon.com/512/581/581838.png" alt="" /></button>
          <button onClick={handleTraingle}><img src="https://cdn-icons-png.flaticon.com/512/8571/8571310.png" alt="" /></button>
          <button onClick={handleCircle}><img src="https://cdn-icons-png.flaticon.com/512/597/597669.png" alt="" /></button>
          <button onClick={handleSquare}><img src="https://cdn-icons-png.flaticon.com/512/649/649730.png" alt="" /></button>
          <br />
          <button onClick={handleRect}><img src="https://cdn-icons-png.flaticon.com/512/33/33848.png" alt="" /></button>
          <button onClick={handlePentagon}><img src="https://cdn-icons-png.flaticon.com/512/33/33807.png" alt="" /></button>
          <button onClick={handleStar}><img src="https://cdn-icons-png.flaticon.com/512/1828/1828970.png" alt="" /></button>
          <button onClick={handleEllipse}><img src="https://cdn-icons-png.flaticon.com/512/33/33822.png" alt="" /></button>
        </div>
      </div>
      <canvas id="canvas" />
    </>
  )
}

export default App;
