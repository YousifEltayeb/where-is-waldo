'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
export default function Game() {
  const [xPos, setXPost] = useState(0);
  const [yPos, setYPost] = useState(0);
  const [displayBox, setDisplayBox] = useState('none');
  const mark = (e: any) => {
    setXPost(e.pageX);
    setYPost(e.pageY);
    const normalized = (e.nativeEvent.offsetX / e.target.width) * 3030;
    console.log(normalized);

    setDisplayBox(displayBox === 'none' ? 'block' : 'none');
  };
  const getCoordinates = (e) => {
    console.log(xPos, yPos);
  };
  return (
    <main>
      <h1>Find these characters</h1>
      <div className="flex justify-center m-5">
        <ul className="flex gap-5">
          <li>
            Bessie
            <img src="../../../public/Bessie.png" alt="" className="w-20" />
          </li>
          <li>
            Bessie
            <img src="../../../public/Bessie.png" alt="" className="w-20" />
          </li>

          <li>
            Bessie
            <img src="../../../public/Bessie.png" alt="" className="w-20" />
          </li>
        </ul>
      </div>
      <div className="w-full relative">
        <img
          className="absolute cursor-crosshair"
          src="../../../public/cityport.png"
          alt=""
          onClick={mark}
        />
      </div>
      <div style={{ display: displayBox }}>
        <div
          style={{
            top: yPos - 20 + 'px',
            left: xPos - 20 + 'px',
          }}
          className="absolute w-10 h-10 border-4 border-solid border-red-500"
        />
        <div
          style={{
            top: yPos - 20 + 'px',
            left: xPos + 20 + 'px',
          }}
          className="absolute  h-30 ml-5 "
        >
          <ul className="flex flex-col gap-3">
            <Button onClick={getCoordinates}>Bossie</Button>
            <Button>Bossie</Button>
            <Button>Bossie</Button>
            <Button>Bossie</Button>
          </ul>
        </div>
      </div>
    </main>
  );
}
