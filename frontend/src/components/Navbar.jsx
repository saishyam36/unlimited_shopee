import { Link, NavLink } from "react-router-dom";
import '../styles/navbar.css'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { assets } from "../assets/assets.js";
import { Badge, Button, Dropdown } from "antd";

const Navbar = () => {

  const items = [
    {
      label: 'My Profile',
      key: '1',
    },
    {
      label: 'Orders',
      key: '2',
    },
    {
      label: 'Logout',
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
      <ul className="flex gap-5 text-sm text-gray-700">
        <NavLink className="flex flex-col items-center gap-1" to="/">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to="/collection">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to="/about">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to="/contact">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-3">
        <div className="group relative">
          <Dropdown menu={menuProps} placement="bottom" >
            <Button shape='circle' icon={<PersonOutlinedIcon fontSize='medium' alt="" />} ></Button>
          </Dropdown>
        </div>
        <Link to='/cart' className="relative">
          <Badge size='small' count={99} color='blue'>
            <ShoppingBagOutlinedIcon fontSize="medium" className="w-5 min-w-5" shapeRendering='' >
            </ShoppingBagOutlinedIcon>
          </Badge>
        </Link>
      </div>

    </div >
  );
};

export default Navbar;
