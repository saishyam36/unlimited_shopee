import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { Button } from "antd";


const Navbar = ({setToken}) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    alert('Logout successful!');
    navigate('', { replace: true });
  }

  return (
    <div className="flex items-center justify-between py-2 font-medium">
      <img src={assets.logo} className="w-28" alt="" />
      <div className="flex items-center gap-4">
        <div className="group relative">
          <Button shape='default' color="default" variant="solid" onClick={handleLogout} >Logout</Button>
        </div>
      </div>

    </div >
  );
};

export default Navbar;
