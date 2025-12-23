import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const DataTable = ({
  columns = [],
  data = [],
  isLoading = false,
  emptyMessage = "No data found.",
  className = '',
  searchable = false,
}) => {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    if (!searchable || !search.trim()) return Array.isArray(data) ? data : [];

    const lowerSearch = search.toLowerCase();

    return Array.isArray(data)
      ? data.filter(row =>
        columns.some(col => {
          const value = row[col.key];
          return (
            typeof value === "string" &&
            value.toLowerCase().includes(lowerSearch)
          );
        })
      )
      : [];
  }, [data, columns, search, searchable]);


  return (
    <div className={`flex flex-col rounded-md bg-white ${className}`}>

      {searchable && (
        <div className="p-2 bg-white sticky top-0 z-20 flex justify-end">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-60"
          />
        </div>
      )}

      <div className="relative flex-1 overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key}>{col.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {!isLoading &&
              filteredData.map((row, index) => (
                <TableRow key={row._id || index}>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {col.render
                        ? col.render(row, index)
                        : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {!isLoading && filteredData.length === 0 && (
          <p className="text-center text-muted-foreground py-4">
            {emptyMessage}
          </p>
        )}

        {isLoading && (
          <p className="text-center text-blue-500 py-4">Loading...</p>
        )}
      </div>
    </div>

  );
};

export default DataTable;