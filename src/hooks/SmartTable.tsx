import { type ReactNode } from "react";

export type TableColumn<T> = {
  header: string;
  field?: keyof T; // direct field
  render?: (row: T) => ReactNode; // custom render
  className?: string;
};

export type TableAction<T> = {
  label: string;
  color?: string;
  onClick: (row: T) => void;
  icon?: ReactNode;
};

const SmartTable = <T extends { id: string }>({
  columns,
  rows,
  actions = [],
}: {
  columns: TableColumn<T>[];
  rows: T[];
  actions?: TableAction<T>[];
}) => {
  return (
    <div className="overflow-x-auto border border-gray-200 rounded-md bg-white">
      <table className="min-w-full text-sm">
        {/* Header */}
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className={`py-3 px-4 text-left font-medium text-gray-700 ${col.className}`}
              >
                {col.header}
              </th>
            ))}

            {actions.length > 0 && (
              <th className="py-3 px-4 text-right font-medium text-gray-700">
                Actions
              </th>
            )}
          </tr>
        </thead>

        {/* Rows */}
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              {columns.map((col, i) => (
                <td key={i} className="py-3 px-4 text-gray-700">
                  {col.render ? col.render(row) : (row[col.field!] as any)}
                </td>
              ))}

              {actions.length > 0 && (
                <td className="py-3 px-4 flex gap-2 justify-end">
                  {actions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => action.onClick(row)}
                      className={`flex items-center gap-1 text-sm px-2 py-1 rounded-md transition 
                        ${action.color ?? "text-blue-600 hover:text-blue-800"}
                      `}
                    >
                      {action.icon} {action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* No Data */}
      {rows.length === 0 && (
        <div className="text-center py-6 text-gray-500 text-sm">
          No data found.
        </div>
      )}
    </div>
  );
};

export default SmartTable;
