
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { FaEdit, FaEnvelope, FaEye, FaFileInvoice, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ActionButton, ActionButtons, Container, TableWrapper } from './topSellingProduct.style';
import { toast } from 'react-toastify';
import axios from 'axios';
import prodPlaceHolder from '../../../../images/product_placeholder.jpg'
import { SlideUpButton } from '../../expense_table/Expense.style';
import Button from '../../../clicks/button/Button';
import ButtonLoader from '../../../clicks/button/button_loader/ButtonLoader';
import Overlay from '../../../overlay/Overlay';
import ToastComponents from '../../../toast_message/toast_component/ToastComponents';

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




const TopSellingProduct = ({ data, currencySymbol }) => {
   
      
  const columns = [

     {
              name: 'Photo',
              selector: (row) => <img
              src={row.imgUrl ? process.env.REACT_APP_URL+'/images/'+ row.imgUrl : prodPlaceHolder}
              alt={row.title}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '10%',
                objectFit: 'cover'
              }}
            />,
              // cell: (row) => <img src={`${process.env.REACT_APP_URL}/images/${row.imgUrl}` || pix} alt={row.name} style={{ width: '20px', borderRadius: '10%', height: '20px', objectFit: 'cover' }} />,
              // width: '10%',
            },

     {
      name: 'Code',
      selector: (row) => row.code,
      sortable: false,
              // width: '10%',
    },
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
      name: 'Sale Quantity',
      selector: (row) => row.saleQuantity,
      sortable: false,
      // width: '10%', // Set a different width
    },
    {
      name: 'Unit',
      selector: (row) => row.unit?.title,
      sortable: false,
      // width: '10%',
    },
    {
      name: 'Price',
      selector: (row) =><div>
         <span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{row.price.toLocaleString()}
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

export default TopSellingProduct;
