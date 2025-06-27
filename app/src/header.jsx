
import MovieIcon from '@mui/icons-material/Movie';
import StorefrontIcon from '@mui/icons-material/Storefront';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  return (
    <header>
      <div className='left_holder'>
        <img src='https://www.codelogicx.com/assets/images/logo.svg' width={150} />
      </div>

      <div className='right_holder'>
        <ul className='menu_holder'>
          <li>
            <Link to="/" style={{ fontWeight: location.pathname === "/" ? "bold" : "normal" }}>
              <MovieIcon />
              Films
            </Link>
          </li>
          <li>
            <Link to="/stores" style={{ fontWeight: location.pathname === "/stores" ? "bold" : "normal" }}>
              <StorefrontIcon />
              Stores
            </Link>
          </li>
          <li>
            <Link to="/rental" style={{ fontWeight: location.pathname === "/rental" ? "bold" : "normal" }}>
              <VolunteerActivismIcon />
              Rental
            </Link>
          </li>
        </ul>
        <div className='user_profile_holder'>
          CX
        </div>
      </div>
    </header>
  );
}
