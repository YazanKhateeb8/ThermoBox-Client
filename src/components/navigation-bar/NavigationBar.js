import "./navigation-bar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import SignUp from "../sign-up/SignUp";
import Modal from "../modal/Modal";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DEFAULT_USER_PICTURE , LOGO } from "../../Constants"; 
const NavBar = ({ user, onLogout, onAuthorization }) => {
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showMyAccountModal, setShowMyAccountModal] = useState(false);
  const [UpdatedUserPicture, setUpdatedUserPicture] = useState(null);

  const navigate = useNavigate();


  const onOpenMyAccount = () => {
    setShowMyAccountModal(true)
    setShowUserMenu(false)
    navigate(`/user-profile`)
  }

  const handleToggleNavMenu = () => setShowNavMenu((showNavMenu) => !showNavMenu);
  const handleToggleUserMenu = () => setShowUserMenu((showUserMenu) => !showUserMenu);




  const onLoginClick = () => setShowSignUpModal(true);
  const onCloseLoginModal = () => setShowSignUpModal(false);

  const onProfileClick = () => setShowMyAccountModal(true);
  const onCloseMyAccountModal = () => setShowMyAccountModal(false);

  return (
    <div id="navigation-bar-container">
      <div id="navigation-bar">
        <Modal show={showSignUpModal} onClose={onCloseLoginModal}>
          <SignUp
            onSubmitClick={() => setShowSignUpModal(false)}
            onAuthorization={onAuthorization}
          />
        </Modal>
       
      

        <div className="navigation-bar">
          <div className="menu nav-menu">
            <IconButton className="" size="large" onClick={handleToggleNavMenu}>
              <MenuIcon />
            </IconButton>
            {showNavMenu && (
              <div className="menu-items nav-menu-items">
                <Link
                  onClick={() => setShowNavMenu(false)}
                  className="menu-item"
                  to="/"
                >
                  Home
                </Link>

              </div>
            )}
          </div>

          <div
            className="app-logo-container"
            onClick={() => (window.location.href = "/")}
          >
            {/* <CubeLoader /> */}
            <img
              className="app-icon"
              src={LOGO}
            />
          </div>




          <div className="routes">
            <Link
              onClick={() => setShowNavMenu(false)}
              to="/"
            >
              <button className="btn">Home</button>
            </Link>
            <Link
              onClick={() => setShowNavMenu(false)}
              to="/products"
            >
              <button className="btn">Products</button>
            </Link>
            
            {user && <Link
              onClick={() => setShowNavMenu(false)}
              to="/cart"
            >
              <button className="btn">Cart</button>
            </Link>}

            {user && <Link
              onClick={() => setShowNavMenu(false)}
              to="/my-orders"
            >
              <button className="btn">My Orders</button>
            </Link>}
          </div>




          <div>
            {user ? (
              <div className="menu">
                <Tooltip title="Open User Menu">
                  <IconButton onClick={handleToggleUserMenu} sx={{ p: 0 }}>
                    <img className="profile-picture" src={UpdatedUserPicture || user.picture || DEFAULT_USER_PICTURE} alt="User Picture" />
                  </IconButton>
                </Tooltip>

                {showUserMenu &&
                  <div className="menu-items user-menu-items">
                    <div className="menu-item" onClick={onOpenMyAccount}>My Account</div>
                    <div className="menu-item" onClick={onLogout}>Logout</div>
                  </div>
                }
              </div>
            ) : (
              <button onClick={onLoginClick} className="btn">
                Log In
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
