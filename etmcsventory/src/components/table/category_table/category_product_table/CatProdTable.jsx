
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import {TableWrapper } from './catProdTable.style';
import { Container } from '@mui/material';
import { customStyles } from '../../TableCustomStyle.style';
import catPiture from '../../../../images/product_placeholder.jpg'




const CategoryTable = ({data, currencySymbol}) => {
  

  const columns = [
    {
      name: 'S/N',
      selector: (row, i) => i + 1,
      width: '16.6%',
      center: true,
    },
     {
          name: 'Photo',
          selector: (row) => <img
          src={row.imgUrl ? process.env.REACT_APP_URL+'/images/'+ row.imgUrl : catPiture}
          alt={row.username}
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '100%',
            objectFit: 'cover'
          }}
        />,
          // cell: (row) => <img src={`${process.env.REACT_APP_URL}/images/${row.imgUrl}` || pix} alt={row.name} style={{ width: '20px', borderRadius: '100%', height: '20px', objectFit: 'cover' }} />,
         width: '16.6%',
        },
    {
        name: 'Code',
        selector: (row) => row.code,
        sortable: true,
      // Set a different width
        width: '16.6%',
      },
    {
        name: 'Title',
        selector: (row) => row.title,
        sortable: true,
        // width: '16.6%',
      },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
      width: '16.6%',
    },
    {
      name: 'Price',
      selector: (row) =><div>
         <span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{row.price.toLocaleString()}
       </div>,
      sortable: true,        
      width: '16.6%', // Set a different width

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
          responsive
          customStyles={customStyles}
        />
      </TableWrapper>
    </Container>
  );
};

export default CategoryTable;
