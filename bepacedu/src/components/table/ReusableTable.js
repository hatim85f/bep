import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
  useSortBy,
  useRowSelect,
  useExpanded,
} from "react-table";

import { useMemo } from "react";
import "./ReusableTable.css";

import { CheckBox } from "./CheckBox";
import { useNavigate } from "react-router-dom";

const ReusableTable = (props) => {
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

          {
            id: "selection",
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div>
                <CheckBox {...getToggleAllPageRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div>
                <CheckBox {...row.getToggleRowSelectedProps()} />
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

  const edit = () => {
    navigate(props.route, { state: selectedRow });
  };

  const deleteFn = () => {
    props.delete(selectedRow);
  };

  return (
    <>
      <table {...getTableProps()}>
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
        <div className="pagination">
          {!props.hideBtns && (
            <>
              <button
                onClick={edit}
                disabled={selectedRow.length === 0}
                className="paginationButton"
              >
                Edit
              </button>
              <button
                className="delete paginationButton"
                onClick={deleteFn}
                disabled={selectedRow.length === 0}
              >
                Delete
              </button>
              <span className="pages">
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
              </span>
              <span className="pages">
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
            className="paginationButton"
          >
            First
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="paginationButton"
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="paginationButton"
          >
            Next
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="paginationButton"
          >
            Last
          </button>
        </div>
      )}
    </>
  );
};

export default ReusableTable;
