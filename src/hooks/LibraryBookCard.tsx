import { BookOpen, XCircle } from "lucide-react";

const LibraryBookTable = ({
  books,
  onCancel,
}: {
  books: any[];
  onCancel?: (id: string) => void;
}) => {
  return (
    <div className="overflow-x-auto bg-white border border-gray-200 rounded-2xl shadow-sm">
      <table className="min-w-full border-collapse text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">
              Title
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">
              Author
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">
              Reserved
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">
              Status
            </th>
            {onCancel && (
              <th className="py-3 px-4 text-right font-semibold text-gray-700">
                Action
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr
              key={book.id}
              className="border-t hover:bg-gray-50 transition-colors"
            >
              {/* Title */}
              <td className="py-3 px-4 text-gray-800 font-medium">
                {book.title}
              </td>

              {/* Author */}
              <td className="py-3 px-4 text-gray-600">{book.author}</td>

              {/* Reserved Date */}
              <td className="py-3 px-4 flex items-center gap-2 text-gray-600">
                <BookOpen className="w-4 h-4 text-[#4B0082]" />
                {book.reservedDate}
              </td>

              {/* Status */}
              <td className="py-3 px-4">
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide ${
                    book.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : book.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {book.status}
                </span>
              </td>

              {/* Action */}
              {onCancel && (
                <td className="py-3 px-4 text-right">
                  {book.status !== "Available" && (
                    <button
                      onClick={() => onCancel(book.id)}
                      className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 transition"
                    >
                      <XCircle className="w-4 h-4" />
                      Cancel
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {books.length === 0 && (
        <div className="text-center py-6 text-gray-500 text-sm">
          No books found.
        </div>
      )}
    </div>
  );
};

export default LibraryBookTable;
