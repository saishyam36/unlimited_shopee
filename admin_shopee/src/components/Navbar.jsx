import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { Button } from "antd";


const Navbar = ({ setToken }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    alert('Logout successful!');
    navigate('', { replace: true });
  }

  return (
    <div className="flex items-center justify-between pt-2 font-medium">
      <img src={assets.logo} className="w-28" alt="" />
      {/* <NavLink to="/add">Add Products</NavLink> use this or admin tabs jsx
      <NavLink to="/list">List Products</NavLink>
      <NavLink to="/orders">Orders Management</NavLink> */}
      <div className="flex justify-center items-center gap-4">
        <div className="group relative">
          <Button shape='default' color="default" variant="solid" onClick={handleLogout} >Logout</Button>
        </div>
      </div>
    </div >
  );
};

export default Navbar;
