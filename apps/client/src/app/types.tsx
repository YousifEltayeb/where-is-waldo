export interface Chars {
  characters: Char[];
}
export interface Char {
  id: string;
  name: string;
  link: string;
}
export interface GameType {
  name: string;
  id: string;
  link: string;
  Characters: Chars;
}
interface Position {
  x: number;
  y: number;
}

export interface UsePositionReturnType {
  realPosition: Position;
  screenPosition: Position;
  isHitboxVisible: boolean;
  updatePosition: (
    event: React.MouseEvent<HTMLImageElement>,
    imgWidth: number
  ) => void;
  toggleHitbox: () => void;
}
