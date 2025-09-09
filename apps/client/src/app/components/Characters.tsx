import { Chars } from '../types';

export default function Characters({ characters }: Chars) {
  return (
    <div className="flex justify-center m-5">
      <ul className="flex gap-5">
        {characters.map((char) => {
          return (
            <li>
              <span>{char.name}</span>
              <img src={char.link} alt="" className="w-20" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
