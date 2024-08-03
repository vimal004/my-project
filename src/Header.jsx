import { LoginSharp } from "@mui/icons-material";

const Header = () => {
  return (
    <div className="py-2 border border-black text-center flex justify-center items-center space-x-4">
      <img src="./src/assets/L.jpg" className="w-20" alt="Logo" />
      <h1 className="">Siddha Shivalayas Patient Management</h1>
      <LoginSharp />
    </div>
  );
};

export default Header;
