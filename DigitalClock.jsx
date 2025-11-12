import React from 'react';
import { useState, useEffect } from 'react'

function App() {
  const [time, setTime] = useState(new Date())
  const [colors, setColors] = useState(['rgb(0,0,256)','rgb(256,0,0)','rgb(256,0,0)'])
  const getRandomColor = ()=>{
    return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`
  }
  const updateColors = ()=>{
    const colors = [];
    while(colors.length < 3){
      const color = getRandomColor();
      if (!colors.includes(color)) {
        colors.push(color)
      }
    }
    setColors(colors)
  }
useEffect(()=>{
   let timeout = setInterval(()=> {
     setTime(new Date())
     updateColors();
   }, 1000);
   return ()=>{
     clearInterval(timeout)
   }
},[])
  return (
    <div>
      <h1><span style={{color:colors[0]}}>{time.getHours()}</span>:<span style={{color:colors[1]}}>{time.getMinutes()}</span>:<span style={{color:colors[2]}}>{time.getSeconds()}</span></h1>
    </div>
  )
}

export default App
