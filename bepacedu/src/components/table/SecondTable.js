import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
  useSortBy,
  useRowSelect,
  useExpanded,
} from "react-table";

import { useEffect, useMemo } from "react";
import classes from "./secondTable.module.css";

import { CheckBox } from "./CheckBox";
import { useNavigate } from "react-router-dom";

const SecondTable = (props) => {
  const { Data, neededColumns } = props;
  const columns = useMemo(() => neededColumns, [neededColumns]);
  const data = useMemo(() => Data, [Data]);

  const navigate = useNavigate();

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {
      if (props.check)
        hooks.visibleColumns.push((columns) => [
          // Let's make a column for selection
          {
            id: "sn",
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div>
                <span {...getToggleAllPageRowsSelectedProps()}>SN</span>
              </div>
            ),
            Cell: ({ row }) => (
              <div>
                <span {...row.getToggleRowSelectedProps()}>
                  {+row.index + 1}
                </span>
              </div>
            ),
          },

          ...columns,
        ]);
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    canNextPage,
    canPreviousPage,
    gotoPage,
    page,
    prepareRow,
    pageOptions,
    nextPage,
    previousPage,
    pageCount,
    setPageSize,
    selectedFlatRows,
    state,
  } = tableInstance;

  const { pageIndex, pageSize } = state;

  const selectedRow = selectedFlatRows.map((row) => row.original);

  return (
    <>
      <table {...getTableProps()} className={classes.second}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  {props.filter && (
                    <div>
                      {" "}
                      {column.canFilter ? column.render("Filter") : null}{" "}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}> {cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {!props.hideFooter && (
        <div className={classes.pagination}>
          {!props.hideBtns && (
            <>
              <span className={classes.pages}>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
              </span>
              <span className={classes.pages}>
                | Go to Page{" "}
                <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                  className="pageNumber"
                  style={{ width: "50px" }}
                />
              </span>
            </>
          )}
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="paginationDropDown"
          >
            {[5, 10, 25, 50].map((pageSize) => {
              return (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize} per page
                </option>
              );
            })}
          </select>

          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className={classes.paginationButton}
          >
            First
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={classes.paginationButton}
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={classes.paginationButton}
          >
            Next
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className={classes.paginationButton}
          >
            Last
          </button>
        </div>
      )}
    </>
  );
};

export default SecondTable;
