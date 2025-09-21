import {
  type ColumnDef,
  flexRender,
  type Table as TableDef,
} from "@tanstack/react-table";
import {
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableStyled,
} from "./Table.styled";

export interface GroupTableProps<T> {
  columns?: Array<ColumnDef<T>>;
  table: TableDef<T>;
}

export const Table = <T,>({ table }: GroupTableProps<T>) => {
  return (
    <TableStyled>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </tbody>
    </TableStyled>
  );
};
