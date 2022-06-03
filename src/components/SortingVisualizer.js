import React, { useState, useEffect } from 'react';

const ARRAY_SIZE = 60;
const ANIMATE_SPEED = 500;
const MIN_HEIGHT = 20;
const MAX_HEIGHT = 80;

const Visualizer = () => {
  const [bars, setBars] = useState([]);
  const [running, setRunning] = useState(false);

  const randomizeArray = () => {
    if (running) return;

    for (let i = 0; i < bars.length; i++) {
      let bar = document.getElementById(i).style;
      bar.backgroundColor = '#67b9a7';
    }
    let array = [];
    for (let i = 0; i < ARRAY_SIZE; i++) {
      const randomVal = Math.floor(
        Math.random() * (MIN_HEIGHT - MAX_HEIGHT + 1) + MAX_HEIGHT
      );
      array.push(randomVal);
    }

    setBars(array);
  };

  useEffect(() => {
    randomizeArray();
  }, []);

  const sleep = (milliSeconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliSeconds));
  };

  const finishedAnimation = async () => {
    for (let i = 0; i < bars.length; i++) {
      let bar = document.getElementById(i).style;
      bar.backgroundColor = 'green';
      await sleep(ANIMATE_SPEED);
    }
    setRunning(false);
  };

  // Bubble Sort
  const bubbleSort = async () => {
    if (running) return;

    setRunning(true);
    let currentArr = bars;
    let sorted = false;

    while (!sorted) {
      sorted = true;

      for (let i = 0; i < currentArr.length - 1; i++) {
        for (let j = 0; j < currentArr.length - i - 1; j++) {
          if (currentArr[j] > currentArr[j + 1]) {
            let temp = currentArr[j];
            currentArr[j] = currentArr[j + 1];
            currentArr[j + 1] = temp;
            setBars([...bars, currentArr]);

            let bar1 = document.getElementById(j).style;
            let bar2 = document.getElementById(j + 1).style;
            bar1.backgroundColor = '#c76e24';
            bar2.backgroundColor = '#2943b7';

            await sleep(ANIMATE_SPEED);

            bar1.backgroundColor = '#67b9a7';
            bar2.backgroundColor = '#67b9a7';

            sorted = false;
          }
        }
      }
      if (sorted) finishedAnimation();
    }
  };

  const sortBars = bars.map((val, key) => {
    return (
      <div
        className='array-bar'
        id={key}
        key={key}
        style={{ height: `${val}vmin`, width: `${100 / ARRAY_SIZE}vw` }}
      ></div>
    );
  });

  const graphRange = () => {
    const rangeArr = [];
    for (let i = MAX_HEIGHT; i >= 0; i--) {
      if (i % 10 === 0) {
        rangeArr.push(i);
      }
    }

    return rangeArr;
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='header__buttons'>
          <button className='button' onClick={bubbleSort}>
            Visualize
          </button>
          <button className='button' onClick={randomizeArray}>
            Reset
          </button>
        </div>
      </div>
      <main className='grid-container'>
        <span className='desc desc__vertical'>{'Length of Bars ---->'}</span>
        <span className='desc desc__horizontal'>{'Bars'} </span>
        <div className='values'>
          {graphRange().map((val, key) => (
            <span className='value' key={key}>
              {val}
            </span>
          ))}
        </div>
        <div className='line__container'>
          <div className='line line__vertical'>
            <div className='array-bars'>{sortBars}</div>
          </div>
          <div className='line line__horizontal'></div>
        </div>
      </main>
    </div>
  );
};

export default Visualizer;
