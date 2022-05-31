import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import '../App.css';
import 'react-awesome-slider/dist/styles.css';



function Game2() {



   return(
       <div className='Main'>
 <Link to='/' style={{textDecoration: 'none'}}>
     <button className='buttonpic' type='button'>Home</button>
 </Link>
  <img className="pen-preview-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/b4-pen-preview.png"/>


 <Link to='game2' style={{textDecoration: 'none'}}>
     <button className='buttonpic' type='button'>Level 2</button>
 </Link>
 </div>
  )
} 



export default Game2;
