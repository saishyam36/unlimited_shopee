import { Link, NavLink } from "react-router-dom";
import '../styles/navbar.css'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
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
      <img src={assets.logo} className="w-36" alt="" />
      <ul className="flex gap-5 text-sm text-gray-700">
        <NavLink className="flex flex-col items-center gap-1" href="/">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" href="/collection">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" href="/about">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" href="/contact">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-3">
        <SearchSharpIcon className="w-5 cursor-pointer" fontSize="medium" alt="" />
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
