import React from "react"
import './style.css';
import { Link } from "react-router-dom";

export default function Group1() {
    return (
        <div className='frame'>
        <div >
          <div className="group-2410 flex-col">
          <div >
          <img className='titleNew' src='title.png' />
          </div>
            <div className="column">
              <div className="group-2410 flex-col">
                <div className="frame-4 flex-row-vstart-hstart">
                  <Link style={{textDecoration: 'none'}} to='../game1' className="txt-469 paddedOut">Play</Link>
                </div>
                <div className="group-8510">
                  <p className="txt-562 overRight paddedOut">Create Verse</p>
                  <div className='row'>
                  <div className='bordered paddedOut'>
              
              <p className="txt-461 ">Tutorial</p>
              <div className='row'>
              <p className="txt-471 ">Completion unlocks</p>
              <p className="txt-035 ">Closed Beta !</p>
              </div>
             
              </div>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/7mfvw5nu15v-19%3A57?alt=media&token=48c7b641-5a38-4266-9ce3-ebcb0438a409"
                    alt="Not Found"
                    className="group-25"
                  />
                </div>
                <div className='column'>
                <Link style={{textDecoration: 'none'}} to='../marketplace'className="txt-252 over paddedOut">Marketplace</Link>
                <Link style={{textDecoration: 'none'}} to='../character' className="txt-252 overLeft paddedOut">Create Character</Link>
                </div>
          
                <div className='column'>
             
             <p className="txt-284 paddedOut">Join the Community</p>
             <p className="txt-551 flex-hcenter paddedOut">Install App</p>    
             <Link style={{textDecoration: 'none'}} to='../character' className="txt-594 paddedOut">Login</Link>  
             </div>

           </div>
              </div>
             
          
          </div>
        </div>
        </div>
        </div>
  )
}