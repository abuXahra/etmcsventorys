
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { FaEdit, FaEnvelope, FaEye, FaFileInvoice, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { customStyles } from '../../TableCustomStyle.style';
import { toast } from 'react-toastify';
import axios from 'axios';
import prodPlaceHolder from '../../../../images/product_placeholder.jpg'
import { SlideUpButton } from '../../expense_table/Expense.style';
import Button from '../../../clicks/button/Button';
import ButtonLoader from '../../../clicks/button/button_loader/ButtonLoader';
import Overlay from '../../../overlay/Overlay';
import ToastComponents from '../../../toast_message/toast_component/ToastComponents';
import { Container, TableWrapper } from '../Product.style';


const LowStockTable = ({ data, onDeleteProd, currencySymbol}) => {

  const navigate = useNavigate();

      const [showDeleteCard, setShowDeleteCard] = useState(false);
      const [grabId, setGrabId] = useState('');
      const [grabProductTitle, setGrabProductTitle] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      


      
  const columns = [

     {
      name: 'Code',
      selector: (row) => row.code,
      sortable: true,
            //   width: '10%',
    },
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
            //   width: '10%',
            },
    {
      name: 'Title',
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row) => row.category?.title,
      sortable: true,
                    // width: '10%', // Set a different width
    },
    {
      name: 'In stock',
      selector: (row) => row.stockQuantity,
      sortable: true,
    //   width: '10%', // Set a different width
    },
    {
      name: 'Unit',
      selector: (row) => row.unit?.title,
      sortable: true,
    //   width: '10%',
    },
    {
      name: 'Price',
      selector: (row) =><div>
         <span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{row.price.toLocaleString()}
       </div>,
      sortable: true,        
    //   width: '10%', // Set a different width

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
          selectableRowHighlight
        />
      </TableWrapper>
    
         
    </Container>
  );
};

export default LowStockTable;
