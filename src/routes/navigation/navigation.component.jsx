import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from "../../context/user.context";
import { useContext } from "react";
import { signOutUser } from "../../utils/firebase.utils";
import './navigation.styles.scss';

const Navigation = () => {
  const { setCurrentUser, currentUser } = useContext(UserContext);

  const signOutHandler = async() => {
    const res = await signOutUser();
    setCurrentUser(null);
  };

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo"/>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/">HOME</Link>
          <Link className="nav-link" to="/shop">SHOP</Link>
          { currentUser ? <span className="nav-link" onClick={signOutHandler}>SIGN OUT</span> : <Link className="nav-link" to="/auth">SIGN IN</Link> } 
        </div>
      </div>
      <Outlet/>
    </>
  )
}

export default Navigation;