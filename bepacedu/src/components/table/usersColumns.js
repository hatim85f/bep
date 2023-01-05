import MobileFilter from "./MobileFilter";
import NameFilter from "./NameFilter";
import StatusFilter from "./StatusFilter";

export const usersColums = [
  {
    Header: "User Details",
    Footer: "User Details",
    columns: [
      {
        Header: "Name",
        Footer: "Name",
        accessor: "name",
        Filter: NameFilter,
      },

      {
        Header: "Mobile",
        Footer: "Mobile",
        accessor: "phone",
        Filter: MobileFilter,
      },
      {
        Header: "WhatsApp",
        Footer: "WhatsApp",
        accessor: "whatsAppNum",
        Filter: MobileFilter,
      },
      {
        Header: "Location",
        Footer: "Location",
        accessor: "country",
        disableFilters: true,
      },
    ],
  },

  {
    Header: "Source",
    Footer: "Source",
    accessor: "source",
    disableFilters: true,
  },

  {
    Header: "Status",
    Footer: "Status",
    accessor: "status",
    Filter: StatusFilter,
  },
];
