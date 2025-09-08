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
