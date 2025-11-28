import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "../hooks/AddToCartButton";
import FavoriteButton from "../hooks/FavoriteButton";

interface BookCardProps {
  id: string;
  imageUrl: string;
  title: string;
  author: string;
  //   skills: string[];
  rating: number;
  reviews: number;
  level: string;
  pages: number;
}

const skills = [
  "Distributed Systems",
  "Scalability",
  "Microservices",
  "Data Modeling",
];

const BookCard: React.FC<BookCardProps> = ({
  id,
  imageUrl,
  title,
  author,
  rating,
  reviews,
  level,
  pages,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative bg-white border border-gray-200 rounded-2xl hover:shadow-2xl hover:border-gray-100 hover:scale-[1.015] hover:-translate-y-2 transition-all duration-300 ease-in-out p-3 pb-14 w-full max-w-sm cursor-pointer"
      onClick={() => {
        const formattedTitle = title
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "") // remove special characters
          .replace(/\s+/g, "-"); // replace spaces with hyphens
        navigate(`/books/${formattedTitle}`, {
          state: { id },
        });
      }}
    >
      <div className="bg-gray-50 rounded-xl mb-3">
        <img
          src={imageUrl}
          alt={title}
          //   className="w-full object-cover rounded-xl bg-white flex items-center justify-center"
          className="h-40 w-full object-contain border border-gray-200 rounded-xl bg-transparent"
        />
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2">
          {title}
        </h3>
        <p className="text-xs text-gray-500 font-semibold">{author}</p>
        <p className="text-xs text-blue-600 font-semibold">Dept: {`CSE`}</p>
      </div>

      <p className="text-xs text-gray-700 mt-2 leading-snug font-semibold">
        <span className="font-semibold text-sm text-gray-900">Topics:</span>{" "}
        {skills.slice(0, 4).join(", ")}
        {skills.length > 4 ? ",…" : ""}
      </p>

      <div className="flex items-center text-sm text-gray-600 space-x-3 mt-2">
        <div className="flex items-center text-blue-600 font-medium">
          <Star className="w-4 h-4 text-blue-600 fill-blue-600 mr-1" />
          <span className="font-semibold">{rating.toFixed(1)}</span>
        </div>
        <span className="text-gray-400">·</span>
        <span className="text-gray-500 font-semibold">{reviews} reviews</span>
      </div>

      <div className="mt-2 text-sm font-semibold text-gray-500">
        <span className="font-medium text-black">{level}</span> &middot;{" "}
        <span className="font-semibold text-xs">{pages} pages</span>
      </div>

      <div className="absolute mt-10 bottom-3 left-5 right-5 flex justify-between items-center text-sm font-semibold text-gray-500">
        <FavoriteButton id={id} />

        <AddToCartButton />
      </div>
    </div>
  );
};

export default BookCard;
