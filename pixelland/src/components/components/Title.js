import React from "react"
import './style.css';
import { Link } from "react-router-dom";

export default function Group1() {
    return (
        <div className="frame flex-col-hstart-vstart clip-contents">
          <div className="group-2410 flex-col">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/7mfvw5nu15v-19%3A52?alt=media&token=1f2c8166-fb1a-4e1f-8a2a-404d2cb430e5"
              alt="Not Found"
              className="frame-3"
            />
            <div className="group-26">
              <div className="group-2410 flex-col">
                <div className="frame-4 flex-row-vstart-hstart">
                  <p className="txt-469">Play</p>
                </div>
                <div className="group-8510 flex-row">
                  <p className="txt-562">Create Verse</p>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/7mfvw5nu15v-19%3A57?alt=media&token=48c7b641-5a38-4266-9ce3-ebcb0438a409"
                    alt="Not Found"
                    className="group-25"
                  />
                </div>
                <Link style={{textDecoration: 'none'}} to='../character' className="txt-6108">Create Character</Link>
                <Link style={{textDecoration: 'none'}} to='../marketplace'className="txt-252">Marketplace</Link>
                <div className="rectangle flex-col-hstart-vstart"></div>
              </div>
              <p className="txt-551 flex-hcenter">Install App</p>
              <p className="txt-284">Join the Community</p>
              <p className="txt-8910">!</p>
              <p className="txt-035">Closed Beta</p>
              <div className="frame-5 flex-row-vstart-hstart">
                <p className="txt-471">Completion unlocks</p>
              </div>
              <p className="txt-461">Tutorial</p>
            </div>
            <Link style={{textDecoration: 'none'}} to='../character' className="txt-594">Login</Link>
          </div>
        </div>
  )
}