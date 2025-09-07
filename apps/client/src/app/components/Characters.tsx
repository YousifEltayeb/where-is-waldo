import { Chars } from '../types';

export default function Characters({ characters }: Chars) {
  return (
    <div className="flex justify-center m-5">
      <ul className="flex gap-5">
        <li>
          <span>{characters[0].name}</span>
          <img src={characters[0].link} alt="" className="w-20" />
        </li>
        <li>
          <span>{characters[1].name}</span>
          <img src={characters[1].link} alt="" className="w-20" />
        </li>

        <li>
          <span>{characters[2].name}</span>
          <img src={characters[2].link} alt="" className="w-20" />
        </li>
      </ul>
    </div>
  );
}
