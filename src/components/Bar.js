import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeShape } from '../redux/configReducer';

/// /// import images
import style from '../assets/styles/Bar.module.css';
import cursor from '../assets/images/cursor.svg';
import square from '../assets/images/square.svg';
import diamond from '../assets/images/diamond.svg';
import circle from '../assets/images/circle.svg';
import arrow from '../assets/images/arrow-right.svg';
import dash from '../assets/images/dash-lg.svg';
import pencil from '../assets/images/pencil.svg';
import text from '../assets/images/fonts.svg';
import image from '../assets/images/card-image.svg';
import eraser from '../assets/images/eraser.svg';
/// ///////////////////////////////////////////////

function Bar() {
  const dispatch = useDispatch();
  const [position, setPosition] = useState({ x: 500, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [choosedOption, setChoosedOption] = useState('pencil');

  const handleMouseDown = (e) => {
    if (e.target !== e.currentTarget) return;
    setInitialPosition({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (e.target !== e.currentTarget) return;
    if (!isDragging) {
      return;
    }
    setPosition({
      x: position.x + e.clientX - initialPosition.x,
      y: position.y + e.clientY - initialPosition.y,
    });
    setInitialPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  return (
    <div
      className={style.container}
      style={{
        cursor: 'grab',
        border: isDragging ? '2px solid blue' : '1px solid black',
        position: 'absolute',
        left: position.x,
        top: position.y,
        zIndex: '1',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        style={{
          backgroundColor: choosedOption === 'cursor' ? '#E3E2FE' : 'white',
        }}
        onClick={() => setChoosedOption('cursor')}
        className={style['img-container']}
      >
        <img src={cursor} alt="cursor" />
      </div>
      <div
        className={style['img-container']}
        style={{
          backgroundColor: choosedOption === 'square' ? '#E3E2FE' : 'white',
        }}
        onClick={() => {
          setChoosedOption('square');
          dispatch(changeShape('rectangle'));
        }}

      >
        <img src={square} alt="square" />
      </div>
      <div
        className={style['img-container']}
        style={{
          backgroundColor: choosedOption === 'diamond' ? '#E3E2FE' : 'white',
        }}
        onClick={() => setChoosedOption('diamond')}
      >
        <img src={diamond} alt="diamond" />
      </div>
      <div
        className={style['img-container']}
        style={{
          backgroundColor: choosedOption === 'circle' ? '#E3E2FE' : 'white',
        }}
        onClick={() => {
          setChoosedOption('circle');
          dispatch(changeShape('ellipse'));
        }}
      >
        <img src={circle} alt="circle" />
      </div>
      <div
        className={style['img-container']}
        style={{
          backgroundColor: choosedOption === 'arrow' ? '#E3E2FE' : 'white',
        }}
        onClick={() => {
          setChoosedOption('arrow');
          dispatch(changeShape('arrow'));
        }}
      >
        <img src={arrow} alt="arrow" />
      </div>
      <div
        className={style['img-container']}
        style={{
          backgroundColor: choosedOption === 'dash' ? '#E3E2FE' : 'white',
        }}
        onClick={() => {
          setChoosedOption('dash');
          dispatch(changeShape('line'));
        }}
      >
        <img src={dash} alt="dash" />
      </div>
      <div
        className={style['img-container']}
        style={{
          backgroundColor: choosedOption === 'pencil' ? '#E3E2FE' : 'white',
        }}
        onClick={() => {
          setChoosedOption('pencil');
          dispatch(changeShape('doodle'));
        }}
      >
        <img src={pencil} alt="pencil" />
      </div>
      <div
        className={style['img-container']}
        style={{
          backgroundColor: choosedOption === 'text' ? '#E3E2FE' : 'white',
        }}
        onClick={() => setChoosedOption('text')}
      >
        <img src={text} alt="text" />
      </div>
      <div
        className={style['img-container']}
        style={{
          backgroundColor: choosedOption === 'image' ? '#E3E2FE' : 'white',
        }}
        onClick={() => setChoosedOption('image')}
      >
        <img src={image} alt="img" />
      </div>
      <div
        className={style['img-container']}
        style={{
          backgroundColor: choosedOption === 'eraser' ? '#E3E2FE' : 'white',
        }}
        onClick={() => setChoosedOption('eraser')}
      >
        <img src={eraser} alt="eraser" />
      </div>
    </div>
  );
}

export default Bar;
