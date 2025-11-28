import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
interface Props {
  label: string;
  search: string;
  handleSearch(value: string): void;
}

const SearchUI: React.FC<Props> = ({ label, search, handleSearch }) => {
  const navigate = useNavigate();
  return (
    <div className="md:mx-auto md:block md:max-w-lg relative">
      <input
        type="text"
        value={search}
        placeholder={label}
        onChange={(e) => handleSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate(`/books?query=${search}`);
          }
        }}
        className="w-full px-4 py-2 border-2 font-semibold text-gray-600 placeholder:text-gray-500 placeholder:font-semibold border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
      />
      <button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white h-8 w-8 rounded-full flex items-center justify-center hover:bg-blue-700">
        <Search className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SearchUI;
