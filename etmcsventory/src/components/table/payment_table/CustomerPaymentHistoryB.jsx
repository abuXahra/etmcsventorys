
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ActionButton, ActionButtons, Container, TableWrapper } from './payment.style';
import { customStyles } from '../TableCustomStyle.style';
import axios from 'axios';


const CustomerPaymentHistoryTable = ({ data }) => {
const token = localStorage.getItem('token');
    
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
      selector: (row) => {
        const date = new Date(row.paymentDate);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      },
    },
       {
      name: 'Invoice No',
      selector: (row) => row.invoiceNo,
    },
    {
      name: 'Payment Type',
      selector: (row) => row.paymentType,
    },
   {
       name: 'Amount Paid',
       selector: (row) => <div>
         <span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{row.amountPaid.toLocaleString()}
       </div>  ,
       sortable: true,
     },
 
  ];

   return (
    <Container>
      <TableWrapper>
        <DataTable
            //   title="PAYMENT Table"
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

export default CustomerPaymentHistoryTable;
