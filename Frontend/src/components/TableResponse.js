import React from "react";

function TableResponse({ table }) {
  if (!table || table.length === 0) return null;

  return (
    <table className="w-full mt-3 border-collapse text-sm">
      <thead>
        <tr className="bg-gray-300 dark:bg-gray-700">
          {Object.keys(table[0]).map((key) => (
            <th key={key} className="border p-2">
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.map((row, i) => (
          <tr key={i}>
            {Object.values(row).map((v, j) => (
              <td key={j} className="border p-2">
                {v}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableResponse;