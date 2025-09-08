import { useState } from 'react';
import { UsePositionReturnType } from '../types';
export const usePosition = (): UsePositionReturnType => {
  const [realXPos, setRealXPos] = useState(0);
  const [realYPos, setRealYPos] = useState(0);
  const [onScreenXPos, setOnScreenXPos] = useState(0);
  const [onScreenYPos, setOnScreenYPos] = useState(0);
  const [isHitboxVisible, setIsHitboxVisible] = useState(false);

  const updatePosition = (
    e: React.MouseEvent<HTMLImageElement>,
    imgWidth: number
  ) => {
    const normalizedXPos = Math.round(
      (e.nativeEvent.offsetX / e.currentTarget.width) * imgWidth
    );
    const normalizedYPos = Math.round(
      (e.nativeEvent.offsetY / e.currentTarget.width) * imgWidth
    );

    setOnScreenXPos(e.pageX);
    setOnScreenYPos(e.pageY);

    setRealXPos(normalizedXPos);
    setRealYPos(normalizedYPos);
  };

  const toggleHitbox = () => setIsHitboxVisible((prev) => !prev);
  return {
    realPosition: { x: realXPos, y: realYPos },
    screenPosition: { x: onScreenXPos, y: onScreenYPos },
    isHitboxVisible,
    updatePosition,
    toggleHitbox,
  };
};
