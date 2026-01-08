


import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { ActionButton, ActionButtons, Container, TableWrapper } from "../sale.style";
import { FaEdit, FaFileInvoice, FaTrash } from "react-icons/fa";
import DataTable from "react-data-table-component";
import { ActionButton, ActionButtons, Container, TableWrapper } from "../../sale_table/sale.style";
import { customStyles } from "../../TableCustomStyle.style";
// import { customStyles } from "../../TableCustomStyle.style";


const SupplierPurchaseTable = ({data}) => {
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

   // fetching currency from db
    const [currencySymbol, setCurrencySymbol] =  useState('');
      useEffect(()=>{
          const fetchAllCompany = async() =>{
              try {
                  const res = await axios.get(`${process.env.REACT_APP_URL}/api/company`, {
                                                      headers: {
                                                        Authorization: `Bearer ${token}`
                                                      }
                                                })
                  setCurrencySymbol(res.data[0].currencySymbol)
              } catch (error) {
                console.log(error)
              }
          }
          fetchAllCompany();
        },[]);
  
  
               

 const columns = [
     {
      name: 'Date',
      width: '15%',
      selector: (row) => {
        const date = new Date(row.purchaseDate);

        const formatted = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short', // <-- gives "Dec"
          day: 'numeric',
        });

        // Add period after the month (e.g., "Dec. 7, 2025")
        return formatted.replace(/^(\w+)\s/, '$1. ');
      },
    },

     {
       name: 'Code',
       selector: (row) => row.code,
       sortable: true,
       width: '9%',
     },
      {
       name: 'Total',
       selector: (row) => <div>
         <span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{row.purchaseAmount.toLocaleString()}
       </div>  ,
       sortable: true,
     },
     {
       name: 'Status',
       selector: (row) => row.paymentStatus,
       sortable: true,
     },
     {
       name: 'Paid',
       selector: (row) => <div>
         <span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{row.amountPaid.toLocaleString()}
       </div>  ,
       sortable: true,
     },
          {
       name: 'Outstanding',
       selector: (row) => <div>
         <span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{row.dueBalance.toLocaleString()}
       </div>  ,
       sortable: true,
     },
     {
       name: 'Actions',
       cell: (row) => (
         <ActionButtons>
             <ActionButton clr='green' onClick={() => navigate(`/purchase-invoice/${row._id}`)}><FaFileInvoice/>View Invoice</ActionButton>
         </ActionButtons>
       ),
     },
   ];
 

  return (
    <Container>
      {/* <Title>Sales Data</Title> */}
      <TableWrapper>
        <DataTable
        //   title="Sales Table"
            columns={columns}
            data={data}
            pagination
            paginationPerPage={50} // Default rows per page
            paginationRowsPerPageOptions={[10, 25, 50, 100]} // Options in the dropdown
            responsive
            customStyles={customStyles}
        />
      </TableWrapper>
    </Container>
  );
};

export default SupplierPurchaseTable;
