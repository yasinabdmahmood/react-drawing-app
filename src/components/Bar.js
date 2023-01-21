import React from 'react';
import style from '../assets/styles/Bar.module.css';
import cursor from '../assets/images/cursor.svg'
import square from '../assets/images/square.svg'
import diamond from '../assets/images/diamond.svg'
import circle from '../assets/images/circle.svg'
import arrow from '../assets/images/arrow-right.svg'
import dash from '../assets/images/dash-lg.svg'
import pencil from '../assets/images/pencil.svg'
import text from '../assets/images/fonts.svg'
import image from '../assets/images/card-image.svg'
import eraser from '../assets/images/eraser.svg'

function Bar() {
  return (
    <div className={style.container}>
        <div className={style['img-container']}>
            <img src={cursor} alt="cursor" />
        </div>
        <div className={style['img-container']}>
            <img src={square} alt="square" />
        </div>
        <div className={style['img-container']}>
            <img src={diamond} alt="diamond" />
        </div>
        <div className={style['img-container']}>
            <img src={circle} alt="circle" />
        </div>
        <div className={style['img-container']}>
            <img src={arrow} alt="arrow" />
        </div>
        <div className={style['img-container']}>
            <img src={dash} alt="dash" />
        </div>
        <div className={style['img-container']}>
            <img src={pencil} alt="pencil" />
        </div>
        <div className={style['img-container']}>
            <img src={text} alt="text" />
        </div>
        <div className={style['img-container']}>
            <img src={image} alt="image" />
        </div>
        <div className={style['img-container']}>
            <img src={eraser} alt="eraser" />
        </div>
    </div>
  );
}

export default Bar;
