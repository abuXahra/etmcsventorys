

import React from "react";
import DataTable from "react-data-table-component";
import { customStyles } from "../../TableCustomStyle.style";
import { Container, TableWrapper } from "./purchaseReportTable.style";

const PurchaseReportTable = ({ data, currencySymbol }) => {
  console.log('symbol======= ',currencySymbol)
    // Calculate the total amounts and other sums as needed
    // const totalAmount = data.reduce((sum, row) => sum + row.totalAmount, 0);
    // const paidAmount = data.reduce((sum, row) => sum + row.paidAmount, 0);
  
    const totalAmount = data.reduce((sum, row) => sum + (row.purchaseAmount || 0), 0);
    const paidAmount = data.reduce((sum, row) => sum + (row.amountPaid || 0), 0);
  
    const status = ""; // Placeholder for merged row status
  
  
  //   payment status bg color:
  const getStatusBackgroundColor = (paymentStatus) => {
              switch (paymentStatus.toLowerCase()) {
                case "paid":
                  return "green"; // Greenish background for 'Paid'
                case "partial":
                  return "orange"; // Yellowish background for 'Pending'
                case "unpaid":
                  return "red"; // Red background for 'Failed'
                default:
                  return "#FFFFFF"; // Default white background if status is unknown
              }
            };
  
  
            
    const columns = [
     {
    name: "Date",
    selector: (row) => {
      // Only format date if it exists and is valid
      if (!row.purchaseDate) return ""; // <- this line prevents 'Invalid date'
      const date = new Date(row.purchaseDate);
      return isNaN(date.getTime()) ? "" : date.toLocaleDateString();
    },
    sortable: true,
    width: '13%',
  },
  
         {
        name: "Invoice No",
        selector: (row) => row.code,
        sortable: true,
        width: '13%',
      },
      {
        name: "Supplier",
        selector: (row) => row.supplier?.name,
        sortable: true,
        width: '20%',
      },
      {
        name: `Total Amount`,
        selector: (row) => row.purchaseAmount,
        sortable: true,
      },
      {
        name: "Paid Amount",
        selector: (row) => row.amountPaid,
        sortable: true,
      },
     {
        name: "Due Amount",
        selector: (row) => row.dueBalance,
        sortable: true,
      },
      { name: "Status",
                  selector: (row) => row.paymentStatus,
                    width: '10%',
                  sortable: true,
                  cell: (row) => (
                    <div
                      style={{
                        backgroundColor: getStatusBackgroundColor(row.paymentStatus),
                        padding: "5px 10px",
                        borderRadius: "5px",
                        textAlign: "center",
                        color: "white",
                        fontSize: "8px", 
                        width:" 50px",
                        marginBottom: "3px",
                        marginTop: "3px"
                      }}
                    >
                      {row.paymentStatus}
                    </div>
                  ),
                },
    ];
  
    // Merged row data (with total row)
    // const mergedRow = {
    //   // id: "total-row", // Unique ID for this merged row
    // //   code: "Total",  // This will span across the merged columns
    // //   date: "",       // Empty value for date
    // //   name: "",       // Empty value for customer name
    // //   totalAmount: totalAmount,  // Total amount
    // //   paidAmount: paidAmount,    // Paid amount
    // //   paymentStatus: "",     // The status (total)
    // // };
  
  const mergedRow = {
    code: <strong>Total</strong>,
    purchaseAmount: <strong><span dangerouslySetInnerHTML={{ __html: currencySymbol }} />{totalAmount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</strong>,
    amountPaid: <strong><span dangerouslySetInnerHTML={{ __html: currencySymbol }} />{paidAmount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</strong>,
    dueBalance: <strong><span dangerouslySetInnerHTML={{ __html: currencySymbol }} />{(totalAmount - paidAmount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</strong>,
    paymentStatus: "",
  };
  
  
    // Combine the data with the merged row
    const combinedData = [...data, mergedRow];
  
    return (
      <Container>
        <TableWrapper>
          <DataTable
            columns={columns}
            data={combinedData}
            responsive
             pagination
              paginationPerPage={50} // Default rows per page
              paginationRowsPerPageOptions={[10, 25, 50, 100]} // Options in the dropdown
            customStyles={customStyles}
            // Custom footer row for merged cells
            footer={{
              columns: [
                { name: "Invoice No.", colSpan: 3 },
                { name: "<b>Total</b>", colSpan: 3, align: "right" },
              ],
            }}
          />
        </TableWrapper>
      </Container>
    );
  };
  
  export default PurchaseReportTable;
  
  