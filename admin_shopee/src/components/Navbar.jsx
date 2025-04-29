import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { Button } from "antd";


const Navbar = () => {

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to='/'>
        <img src={assets.logo} className="w-28" alt="" />
      </Link>

      <div className="flex items-center gap-8">
        <div className="group relative">
          <Button shape='default' color="default" variant="solid" >Logout</Button>
        </div>
      </div>

    </div >
  );
};

export default Navbar;
