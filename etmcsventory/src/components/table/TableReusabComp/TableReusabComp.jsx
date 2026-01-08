// import React, { useEffect, useState } from 'react'
// import { Paper, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
// import { TableReusableHeader, TableReusableWrapper } from './tableReusabComp.style'
// import { TableStyled, TdStyled } from '../../../pages/sale/Add/addSale.style'
// import { FaLongArrowAltRight } from 'react-icons/fa'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

import DataTable from "react-data-table-component";
import { Container, TableWrapper } from "../expense_table/Expense.style";
import { useEffect, useState } from "react";
import axios from "axios";

const customStyles={
    table: {
      style: {
        width: '100%', // Ensure the table takes up 100% of its container width
        tableLayout: 'auto',
        padding: "0px", // Allow columns to adjust their width based on content
        margin: "0px",
        border: "none",
      },

    },
    head: {
      style: {
        fontWeight: 'bold',
        fontSize: '12px', // Adjust font size if needed
        textAlign: 'center', // Align text in the header cells
        height: "40px",
      }
    },
    headCells: {
      style: {
        whiteSpace: 'normal', // Allow multi-line headers if needed
        fontSize: "12px",
        wordWrap: 'break-word', // Ensure long text wraps within the cell
        fontWeight: 'bold',
        paddingBottom: "4px", // Set padding for header row to 0
        paddingLeft: "20px",    // Set padding for header row to 0
        paddingRight: "0px",   // Set padding for header row to 0
        paddingTop: "4px",    // Set padding for header row to 0
        backgroundColor: 'white',
        height: "40px",
      },
    },
    cells: {
      style: {
        paddingBottom: "4px",
        paddingLeft: "20px",
        paddingRight: "2px",
        paddingTop: "4px",// Reduce padding for cells
        wordWrap: 'break-word', // Ensure long text wraps within the cell
        whiteSpace: 'normal', // Allow text to wrap inside cells
      },
    },
    rows: {
      style: {
        fontSize: '12px', // Smaller font size for rows
        minHeight: "30px",
      },
    },

    pagination: {
        style: {
          fontSize: '10px', // Adjust font size for pagination controls (including "Rows per page")
        },
      },
  }




const TabeReusabComp = ({ data }) => {
   
              // fetching currency from db
          const [currencySymbol, setCurrencySymbol] =  useState('');
            useEffect(()=>{
                const fetchAllCompany = async() =>{
                    try {
                        const res = await axios.get(`${process.env.REACT_APP_URL}/api/company`);
                        setCurrencySymbol(res.data[0]?.currencySymbol)
                    } catch (error) {
                      console.log(error)
                    }
                }
                fetchAllCompany();
              },[]);
    
      
  const columns = [
    {
      name: 'Title',
      selector: (row) => row.title,
      sortable: false,
    },
    {
      name: 'Category',
      selector: (row) => row.category?.title,
      sortable: false,
    // width: '10%', // Set a different width
    },
    {
      name: 'Price',
      selector: (row) => row.salePrice,
      sortable: false,
      // width: '10%', // Set a different width
    },
    {
      name: 'Quantity',
      selector: (row) => row.stockQuantity,
      sortable: false,
      // width: '10%',
    },
    {
      name: 'Amount',
      selector: (row) =><div>
         <span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{row.salePrice *  row.stockQuantity}
       </div>,
      sortable: false,        
      // width: '10%', // Set a different width

    },
    
  ];


  return (
    <Container>
      {/* <Title>Sales Data</Title> */}
      <TableWrapper tbWrPad={'0px'}>
        <DataTable
          //   title="Sales Table"
          columns={columns}
          data={data}
          responsive
          customStyles={customStyles}
        />
      </TableWrapper>
    </Container>
  );
};

export default TabeReusabComp;