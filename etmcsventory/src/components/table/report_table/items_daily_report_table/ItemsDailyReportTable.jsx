import React from "react";
import DataTable from "react-data-table-component";
import { customStyles } from "../../TableCustomStyle.style";
import { Container, TableWrapper } from "../sale_report_table/saleReportTable.style";

const ItemsDailyReportTable = ({ data, currencySymbol }) => {
  // TOTALS
  const totalQty = data.reduce((sum, row) => sum + (row.totalQuantitySold || 0), 0);
  const totalAmount = data.reduce((sum, row) => sum + (row.totalSalesAmount || 0), 0);

  // Columns
  const columns = [
    {
      name: "Date",
      width: "13%",
      sortable: true,
      selector: (row) => {
        if (row.isTotalRow) return ""; // total row
        const datesArray = Array.isArray(row.saleDates) ? row.saleDates : [row.saleDates];
        const formattedDates = datesArray
          .filter(d => d)
          .map(d => {
            const dateObj = new Date(d);
            if (isNaN(dateObj)) return "";
            const parts = dateObj.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }).split(" ");
            parts[0] = parts[0].replace(/([A-Za-z]+)/, "$1.");
            return parts.join(" ");
          })
          .join(", ");
        return formattedDates;
      },
    },
    // {
    //   name: "Code",
    //   selector: (row) => row.productCode,
    //   sortable: true,
    //   // width: "13%",
    // },
    {
      name: "Title",
      selector: (row) => row.productTitle,
      sortable: true,
      // width: "20%",
      cell: (row) => (row.isTotalRow ? <strong>Total</strong> : row.productTitle),
    },
    {
      name: "Invoice No.",
      selector: (row) => row.invoiceCode,
      sortable: true,
      // width: "13%",
    },
    {
      name: "Customer",
      selector: (row) => row.customerName,
      sortable: false,
      // width: "13%",
    },
    {
      name: "Sale Price",
      selector: (row) => row.salePrice,
      sortable: false,
    },
    {
      name: "Tax",
      selector: (row) => row.tax,
      sortable: false,
      width: "8%",
    },
    {
      name: "Quantity Sold",
      selector: (row) => row.totalQuantitySold,
      sortable: false,
      cell: (row) => (row.isTotalRow ? <strong>{totalQty.toLocaleString("en-NG")}</strong> : row.totalQuantitySold),
    },
    {
      name: "Total Amount",
      selector: (row) => row.totalSalesAmount,
      sortable: false,
      cell: (row) =>
        row.isTotalRow ? (
          <strong>
            <span dangerouslySetInnerHTML={{ __html: currencySymbol }} />
            {totalAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
          </strong>
        ) : row.totalSalesAmount !== undefined ? (
          <>
            <span dangerouslySetInnerHTML={{ __html: currencySymbol }} />
            {row.totalSalesAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
          </>
        ) : (
          ""
        ),
    },
  ];

  // MERGED TOTAL ROW
  const mergedRow = {
    isTotalRow: true,           // flag for total row
    saleDates: "",
    productCode: "",
    productTitle: "Total",
    invoiceCode: "",
    customerName: "",
    salePrice:"",
    tax:"",
    totalQuantitySold: totalQty,
    totalSalesAmount: totalAmount,
  };

  const combinedData = [...data, mergedRow];

  return (
    <Container>
      <TableWrapper>
        <DataTable
          columns={columns}
          data={combinedData}
          responsive
          pagination
          paginationPerPage={50}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          customStyles={customStyles}
          highlightOnHover
        />
      </TableWrapper>
    </Container>
  );
};

export default ItemsDailyReportTable;
