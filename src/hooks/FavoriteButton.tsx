// import { Heart } from "lucide-react";
// import React from "react";

// interface FavoriteButtonProps {
//   onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
//   title?: string;
// }

// const FavoriteButton: React.FC<FavoriteButtonProps> = ({
//   onClick,
//   title = "Add to Favorites"
// }) => {
//   const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.stopPropagation();
//     if (onClick) {
//       onClick(e);
//     } else {
//       console.log("Favorite clicked!");
//     }
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className="text-blue-600 hover:text-red-800 transition-colors duration-200"
//       title={title}
//     >
//       <Heart className="w-5 h-5" />
//     </button>
//   );
// };

// export default FavoriteButton;

import { Heart } from "lucide-react";
import React from "react";

// You only need the `id` and optional title now
interface FavoriteButtonProps {
  id: string;
  title?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  id,
  title = "Add to Favorites",
}) => {
  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.stopPropagation();

    try {
      // 🛰️ Dummy backend simulation (replace this with real API call)
      console.log("📡 Sending favorite request for book ID:", id);

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Dummy success response
      console.log("✅ Book favorited successfully:", id);
      // You can add visual feedback here (toast, state, etc.)
    } catch (error) {
      console.error("❌ Error favoriting book:", error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-blue-600 hover:text-red-800 transition-colors duration-200"
      title={title}
    >
      <Heart className="w-5 h-5" />
    </button>
  );
};

export default FavoriteButton;
