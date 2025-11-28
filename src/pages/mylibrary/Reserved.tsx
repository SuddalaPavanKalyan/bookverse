import { CalendarDays, XCircle } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SmartTable, {
  type TableAction,
  type TableColumn,
} from "../../hooks/SmartTable";

type ReservedBook = {
  id: string;
  title: string;
  author: string;
  status: "Pending" | "Available" | "Expired";
  reservedDate: string;
};

const initialReserved: ReservedBook[] = [
  {
    id: "1",
    title: "The Pragmatic Programmer",
    author: "Andy Hunt & Dave Thomas",
    status: "Pending",
    reservedDate: "2025-07-01",
  },
  {
    id: "2",
    title: "Clean Code",
    author: "Robert C. Martin",
    status: "Available",
    reservedDate: "2025-06-25",
  },
  {
    id: "3",
    title: "Domain-Driven Design",
    author: "Eric Evans",
    status: "Expired",
    reservedDate: "2025-06-15",
  },
];

const Reserved: React.FC = () => {
  const [books, setBooks] = useState<ReservedBook[]>(initialReserved);
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query")?.toLowerCase() ?? "";

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(query)
  );

  const cancelReservation = (row: ReservedBook) => {
    setBooks((prev) => prev.filter((b) => b.id !== row.id));
  };

  // Define table columns dynamically
  const columns: TableColumn<ReservedBook>[] = [
    { header: "Title", field: "title" },

    { header: "Author", field: "author" },

    {
      header: "Reserved",
      render: (row) => (
        <div className="flex items-center gap-2 text-gray-700">
          <CalendarDays className="w-4 h-4 text-purple-700" />
          {row.reservedDate}
        </div>
      ),
    },

    {
      header: "Status",
      render: (row) => (
        <span
          className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide
          ${
            row.status === "Available"
              ? "bg-green-100 text-green-700"
              : row.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }
        `}
        >
          {row.status}
        </span>
      ),
    },
  ];

  // Action button only for non-expired items
  const actions: TableAction<ReservedBook>[] = [
    {
      label: "Cancel",
      icon: <XCircle className="w-4 h-4" />,
      color: "text-red-600 hover:text-red-800",
      onClick: cancelReservation,
    },
  ];

  return (
    <div className="w-full">
      {filteredBooks.length === 0 ? (
        <div className="text-gray-500 text-center py-10 font-medium">
          No reserved books found.
        </div>
      ) : (
        <SmartTable columns={columns} rows={filteredBooks} actions={actions} />
      )}
    </div>
  );
};

export default Reserved;
