import { Bookmark, BookOpen, Clock, FilePlus2 } from "lucide-react";

const dashboardStats = [
  {
    title: "Issued Books",
    value: 3,
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    title: "Reserved Books",
    value: 2,
    icon: <Bookmark className="w-6 h-6" />,
  },
  {
    title: "Requested Books",
    value: 1,
    icon: <FilePlus2 className="w-6 h-6" />,
  },
  {
    title: "Overdue Books",
    value: 1,
    icon: <Clock className="w-6 h-6" />,
  },
];

const LibraryDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4">
      {dashboardStats.map((stat, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between p-5 bg-gray-100 rounded-2xl cursor-pointer hover:bg-gray-200 transition-colors"
        >
          <div className="flex flex-col">
            <p className="text-base font-semibold text-gray-800">
              {stat.title}
            </p>
            <p className="text-sm text-gray-600">{stat.value}</p>
          </div>

          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-700 text-white">
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LibraryDashboard;
