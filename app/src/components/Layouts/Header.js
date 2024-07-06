import React from "react";
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { logout } from "../../actions/userActions";
export default function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { items: cartItems } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout);
  };

  return (
    <nav class="navbar row">
      <div class="col-12 col-md-3">
        <div class="navbar-brand">
          <Link to="/">
            <div class="col-12 col-md-3 mt-4 mt-md-0 text-center">
              <button class="btn" id="login_btn">
                Home
              </button>
            </div>
          </Link>
        </div>
      </div>

      <div class="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>

      <div class="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {isAuthenticated ? (
          <Dropdown className="d-inline">
            <Dropdown.Toggle
              variant="default text-white pr-5"
              id="dropdown-basic"
            >
              <span>Hello {user.name}!</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  navigate("/myprofile");
                }}
                className="tex-dark"
              >
                Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={logoutHandler} className="tex-danger">
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Link to="/login" class="btn" id="login_btn">
            Login
          </Link>
        )}
        <Link to="/cart">
          <span id="cart" class="ml-3">
            Cart
          </span>
        </Link>

        <span class="ml-1" id="cart_count">
          {cartItems.length}
        </span>
      </div>
    </nav>
  );
}
