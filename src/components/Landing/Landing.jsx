import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import style from './Landing.module.css'
import background from "../../images/62cc8ab14bc76.jpg"
import pandora from "../../images/pandora-box.png"
import arrowLeft from "../../images/arrow_right.png"
import arrowright from "../../images/arrow_right.png"


export default class Landing extends Component {
  render() {
    return (
    <div className={`${style.page}`}>
       <img className={`${style.background}`} src={background} alt="Welcome" />
       <img className={`${style.arrowLeft}`} src={arrowLeft} alt="arrowLeft"></img>
       <img className={`${style.arrowRight}`} src={arrowright} alt="arrowLeft"></img>
       <Link className={`${style.link}`} to='/home'><img className={`${style.pandora}`} src={pandora} alt="pandora box" /></Link>
      
      <h1>Welcome to the Gamer Cave</h1>
      <h3>Enter to the cave</h3>
      <a className={`${style.buton}`} href="/about"><span>ABOUT</span><i></i></a>
  </div>
    )
  }
}
