import { CalendarDays, RotateCcw } from "lucide-react";
import { useState } from "react";
import SmartTable, {
  type TableAction,
  type TableColumn,
} from "../../hooks/SmartTable";

type BorrowedBook = {
  id: string;
  title: string;
  author: string;
  borrowedDate: string;
  dueDate: string;
  status: "Returned" | "Due" | "Overdue";
};

const initialData: BorrowedBook[] = [
  {
    id: "1",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    borrowedDate: "2025-06-01",
    dueDate: "2025-07-01",
    status: "Overdue",
  },
  {
    id: "2",
    title: "Clean Architecture",
    author: "Robert C. Martin",
    borrowedDate: "2025-06-15",
    dueDate: "2025-07-15",
    status: "Due",
  },
  {
    id: "3",
    title: "Refactoring",
    author: "Martin Fowler",
    borrowedDate: "2025-05-10",
    dueDate: "2025-06-10",
    status: "Returned",
  },
];

const Borrowed: React.FC = () => {
  const [books, setBooks] = useState<BorrowedBook[]>(initialData);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sorted = [...books].sort((a, b) => {
    return sortOrder === "asc"
      ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
  });

  const markAsReturned = (row: BorrowedBook) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === row.id ? { ...book, status: "Returned" } : book
      )
    );
  };

  /** -------------------------
   *  Define Dynamic Columns
   * -------------------------- */
  const columns: TableColumn<BorrowedBook>[] = [
    { header: "Title", field: "title" },
    { header: "Author", field: "author" },

    {
      header: "Borrowed On",
      render: (row) => (
        <div className="text-gray-700 flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-indigo-700" />
          {row.borrowedDate}
        </div>
      ),
    },

    {
      header: "Due Date",
      render: (row) => (
        <div className="text-gray-700 flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-red-600" />
          {row.dueDate}
        </div>
      ),
    },

    {
      header: "Status",
      render: (row) => (
        <span
          className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide
          ${
            row.status === "Returned"
              ? "bg-green-100 text-green-700"
              : row.status === "Overdue"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  /** -------------------------
   *  Define Dynamic Actions
   * -------------------------- */
  const actions: TableAction<BorrowedBook>[] = [
    {
      label: "Return",
      icon: <RotateCcw className="w-4 h-4" />,
      color: "text-indigo-600 hover:text-indigo-800",
      onClick: markAsReturned,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header with sorting */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          Borrowed Books
        </h2>

        <div className="flex items-center gap-2">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="border rounded-md font-medium px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">Due Soon</option>
            <option value="desc">Due Later</option>
          </select>
        </div>
      </div>

      {/* Smart Table */}
      <SmartTable columns={columns} rows={sorted} actions={actions} />
    </div>
  );
};

export default Borrowed;
