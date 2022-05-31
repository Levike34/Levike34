import QuestPage from "./pages/QuestPage";
import Game1 from "./pages/Game1";
import Game2 from "./pages/Game2";
import Group1 from "./components/Title";
import Home from "./pages/Home";
import MobilePage from "./pages/MobilePage";
import MarketPage from "./pages/MarketPage";
import CharacterPage from "./pages/CharacterPage";
import React, { useState, useHook, useEffect } from "react";
import { Routes, Route } from "react-router-dom"
import './App.css';
import 'react-awesome-slider/dist/styles.css';
import './styles.css';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [width, setWidth] = useState();

function handleWindowSizeChange() {
    setWidth(window.innerWidth);
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    }
}
useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange());
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange());
    }
}, []);

if(isMobile) {
  return(
  <Routes>
    <Route path="/" element={ <MobilePage/> } />
    <Route path="quests" element={ <QuestPage/> } />
    <Route path="character" element={ <CharacterPage/> } />
  </Routes>
  )
} else {
  return(
    <Routes>
      <Route path="/" element={ <Group1/> } />
      <Route path="quests" element={ <QuestPage/> } />
      <Route path="marketplace" element={ <MarketPage/> } />
      <Route path="character" element={ <CharacterPage/> } />
      <Route path="game1" element={ <Game1/> } />
      <Route path="game1/game2" element={ <Game2/> } />
   
    </Routes>
  )
}

}


export default App;