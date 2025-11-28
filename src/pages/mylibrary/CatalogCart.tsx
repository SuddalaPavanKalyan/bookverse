import axios from "axios";
import {
  AlertCircle,
  Book,
  Bookmark,
  Calendar,
  Check,
  Share2,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { catalogApi } from "../../apis/catalog";
import type { RootState } from "../../store/store";
import { Button } from "../../ui/button/Button";

type CartItem = {
  id: string;
  bookId: string;
  title: string;
  author: string;
  edition: string;
  image: string;
  available: boolean;
};

const safeArray = (value: any): CartItem[] => {
  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
    } catch {
      return [];
    }
  }

  if (value && Array.isArray(value.data)) return value.data;
  if (value && Array.isArray(value.items)) return value.items;

  return [];
};

const CatalogCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<Record<string, string>>(
    {}
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  // Fetch Cart Items
  useEffect(() => {
    catalogApi
      .get(`/cart?userId=${user?.college_id}`)
      .then((result) => {
        console.log("API CART RESULT =", result.data);
        const items = safeArray(result.data);
        setCartItems(items);
      })
      .catch((err) => {
        console.log("CART FETCH ERROR:", err);
        setCartItems([]); // avoid crash
      });
  }, []);

  const handleRemove = (id: string) => {
    catalogApi
      .delete(`/cart/${id}`)
      .then((result) => {
        if (result.status === 204) {
          setSelectedItems((prev) => {
            const updated = { ...prev };
            delete updated[id];
            return updated;
          });
          setCartItems((prev) => prev.filter((item) => item.id !== id));
        } else {
          alert("Failed to remove item");
        }
      })
      .catch((err) => {
        console.error("Failed to remove item", err);
        alert("Something went wrong while removing the item");
      });
  };

  const toggleSelect = (id: string, title: string) => {
    setSelectedItems((prev) => {
      const newItems = { ...prev };
      if (newItems[id]) {
        delete newItems[id];
      } else if (Object.keys(newItems).length < 3) {
        newItems[id] = title;
      } else {
        alert("You can only request up to 3 books at a time.");
      }
      return newItems;
    });
  };

  const handleCheckout = () => {
    const data = {
      college_id: user?.college_id,
      books: Object.keys(selectedItems),
    };

    axios
      .post(`http://localhost:8080/api/issues/request`, data)
      .then((result) => {
        if (result.status === 201) {
          alert("Success");
        }
      })
      .catch((err) => {
        console.error("Checkout Error:", err);
      });
  };

  const safeItems = Array.isArray(cartItems) ? cartItems : [];

  return (
    <div className="flex flex-col lg:flex-row gap-6 py-2 md:py-4">
      {safeItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 m-auto mt-10">
          <p className="text-lg font-semibold">Your cart is empty.</p>
          <button
            onClick={() => navigate("/explore", { replace: true })}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Browse Books
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 bg-white overflow-y-auto max-h-[calc(100vh-150px)] p-2 md:p-4 space-y-4">
            {safeItems.map((item) => (
              <div
                key={item.bookId}
                className="flex flex-row items-start sm:items-center gap-4 md:gap-6 p-2 md:p-4 border border-gray-200 rounded-2xl hover:shadow-md transition-all duration-300 ease-in-out"
              >
                {/* Checkbox */}
                <div className="relative mt-1.5">
                  <input
                    type="checkbox"
                    id={`checkbox-${item.bookId}`}
                    className="peer hidden"
                    checked={item.bookId in selectedItems}
                    onChange={() => toggleSelect(item.bookId, item.title)}
                  />
                  <label
                    htmlFor={`checkbox-${item.bookId}`}
                    className="h-5 w-5 inline-flex items-center justify-center border border-gray-400 rounded-md cursor-pointer transition duration-200 peer-checked:bg-blue-600 peer-checked:border-blue-600 peer-checked:text-white text-sm font-bold"
                  >
                    {item.bookId in selectedItems && "✓"}
                  </label>
                </div>

                {/* Book Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="hidden md:block w-24 sm:w-28 h-auto sm:h-32 object-cover rounded-lg"
                />

                {/* Book Info */}
                <div className="flex-1 flex flex-col space-y-1">
                  <h3 className="font-semibold text-base sm:text-lg text-gray-800">
                    {item.title}
                  </h3>

                  <p className="md:hidden text-sm text-gray-600 font-medium">
                    by {item.author} • Edition: {item.edition}
                  </p>

                  <div className="hidden md:flex flex-col text-sm text-gray-600 font-medium">
                    <p>by {item.author}</p>
                    <p>Edition: {item.edition}</p>
                  </div>

                  <p
                    className={`text-sm font-semibold ${
                      item.available ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.available ? "Available" : "Not available"}
                  </p>

                  {/* Action buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 text-red-600 hover:text-red-800"
                      onClick={() => handleRemove(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden md:block">Delete</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 text-gray-700 hover:text-[#4B0082]"
                    >
                      <Bookmark className="w-4 h-4" />
                      <span className="hidden md:block">Save</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 text-gray-700 hover:text-[#4B0082]"
                    >
                      <Share2 className="w-4 h-4" />
                      <span className="hidden md:block">Share</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4 h-fit">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">
              Cart Summary
            </h3>

            <p className="text-sm font-semibold text-gray-700">
              Selected ({Object.keys(selectedItems).length} of 3 allowed)
            </p>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full"
              onClick={handleCheckout}
              disabled={!Object.keys(selectedItems).length}
            >
              Proceed to Checkout
            </Button>

            <div className="mt-4 text-sm text-gray-500">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Book className="w-4 h-4 text-blue-600" />
                  Books are issued for 15 days unless specified otherwise.
                </li>
                <li className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Return on time to avoid overdue fines.
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  You can pick up books at the library counter.
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  You can only request up to 3 books at a time.
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CatalogCart;
