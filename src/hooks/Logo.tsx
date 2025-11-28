import { useNavigate } from "react-router-dom";
import { CompanyLogo } from "./CompanyLogo";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/")}
      className="flex items-center cursor-pointer text-2xl font-extrabold text-blue-600 transition-colors"
    >
      <div className="hidden max-[800px]:hidden md:block">MyLib</div>

      <div className="block max-[800px]:block md:hidden w-12 h-12">
        <CompanyLogo />
      </div>
    </div>
  );
};

export default Logo;
