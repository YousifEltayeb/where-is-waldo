import { Link } from 'react-router-dom';
import { ModeToggle } from './ModeToggle';
export default function Header() {
  return (
    <header>
      <nav className="flex justify-between px-5">
        <Link className="self-center " to="/">
          PickChar
        </Link>
        <div className="flex gap-5">
          <Link className="self-center" to="/leaderboard">
            Leaderboard
          </Link>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
