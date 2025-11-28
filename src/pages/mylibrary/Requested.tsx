import { CalendarDays, XCircle } from "lucide-react";
import { useState } from "react";
import SmartTable, {
  type TableAction,
  type TableColumn,
} from "../../hooks/SmartTable";

type BookRequest = {
  id: string;
  title: string;
  author: string;
  requestedDate: string;
  status: "Pending" | "Approved" | "Rejected";
};

const initialRequests: BookRequest[] = [
  {
    id: "1",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    requestedDate: "2025-07-02",
    status: "Pending",
  },
  {
    id: "2",
    title: "Clean Code",
    author: "Robert C. Martin",
    requestedDate: "2025-06-25",
    status: "Approved",
  },
  {
    id: "3",
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    requestedDate: "2025-06-28",
    status: "Rejected",
  },
];

const Requested = () => {
  const [requests, setRequests] = useState(initialRequests);

  const cancelRequest = (row: BookRequest) => {
    setRequests((prev) => prev.filter((req) => req.id !== row.id));
  };

  const columns: TableColumn<BookRequest>[] = [
    { header: "Title", field: "title" },
    { header: "Author", field: "author" },
    {
      header: "Requested On",
      render: (row) => (
        <div className="flex items-center gap-2 text-gray-700">
          <CalendarDays className="w-4 h-4 text-purple-700" />
          {row.requestedDate}
        </div>
      ),
    },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`px-3 py-1.5 rounded-full text-xs font-semibold 
            ${
              row.status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : row.status === "Approved"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >
          {row.status}
        </span>
      ),
    },
  ];

  const actions: TableAction<BookRequest>[] = [
    {
      label: "Cancel",
      icon: <XCircle className="w-4 h-4" />,
      color: "text-red-600 hover:text-red-800",
      onClick: cancelRequest,
    },
  ];

  return <SmartTable columns={columns} rows={requests} actions={actions} />;
};

export default Requested;
