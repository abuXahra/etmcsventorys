
// import { useNavigate } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { Container, TableWrapper } from "../purchase_report_table/purchaseReportTable.style";
import DataTable from "react-data-table-component";
import { customStyles } from "../../TableCustomStyle.style";




const PurchasePaymentReportTable = ({ data, currencySymbol }) => {

   const payableAmount = data.reduce((sum, row) => sum + row.payableAmount, 0);



  const status = ""; // Placeholder for merged row status

const navigate = useNavigate();
        
  const columns = [
   {
  name: "Date",
  selector: (row) => {
    // Only format date if it exists and is valid
    if (!row.paymentDate) return ""; // <- this line prevents 'Invalid date'
    const date = new Date(row.paymentDate);
    return isNaN(date.getTime()) ? "" : date.toLocaleDateString();
  },
  sortable: true,
  width: '20%',
},

       {
      name: "payment For",
      selector: (row) => row.paymentFor,
      sortable: true,
      width: '20%',
    },
    {
      name: "Supplier Name",
      selector: (row) => row.supplier?.name,
      sortable: true,
        width: '20%',
    },
    {
      name: "Payment Type",
      selector: (row) => row.paymentType,
      sortable: true,
        width: '20%',
    },
    
    {
       name: 'Amount Paid',
       selector: (row) =>row.payableAmount,
       sortable: true,
       width: '20%',
     },
  ];


  // Total row with matching keys
  const mergedRow = {
    paymentDate: "",
    paymentFor: "",
    paymentType: <b>Total</b>,
    payableAmount:  <b><span dangerouslySetInnerHTML={{ __html: currencySymbol }} />{new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2 }).format(payableAmount)}</b>,
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

export default PurchasePaymentReportTable;

