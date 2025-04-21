import { Link, NavLink } from "react-router-dom";
import '../styles/navbar.css'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { assets } from "../assets/assets.js";
import { Badge, Button, Dropdown } from "antd";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext.jsx";

const Navbar = () => {
  const { getCartCount } = useContext(ShopContext);

  const items = [
    {
      label: <Link to='/profile'>
        My Profile
      </Link>,
      key: '1',
    },
    {
      label: (
        <Link to='/orders'>
          Orders
        </Link>
      ),
      key: '2',
    },
    {
      label: (
        <Link to='/logout'>
          Logout
        </Link>
      ),
      key: '3',
    },
  ];

  const menuProps = {
    items,
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to='/'>
        <img src={assets.logo} className="w-36" alt="" />
      </Link>
      <ul className="flex gap-10 text-sm text-gray-700">
        <NavLink className="flex flex-col items-center mx-4" to="/">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center mx-4" to="/collection">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center mx-4" to="/about">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center mx-4" to="/contact">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-8">
        <div className="group relative">
          <Dropdown menu={menuProps} placement="bottom" >
            {/* menu should not show up if user not logged in add that code and menu dropdown value selection should redirect to that pages */}
            <Link to='/login'>
              <Button shape='circle' icon={<PersonOutlinedIcon fontSize='medium' alt="" />} ></Button>
            </Link>
          </Dropdown>
        </div>
        <Link to='/cart' className="relative gap-5">
          <Badge size='small' count={getCartCount()} color='blue' showZero>
            <ShoppingBagOutlinedIcon fontSize="medium" className="w-5 min-w-5" shapeRendering='' >
            </ShoppingBagOutlinedIcon>
          </Badge>
        </Link>
      </div>

    </div >
  );
};

export default Navbar;
