
import React from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Container, TableWrapper } from './stockReportTable.style';
import prodPlaceHolder from '../../../../images/product_placeholder.jpg'


const StockReportTable = ({ data, tbWidth, currencySymbol }) => {

  const navigate = useNavigate();


  const columns = [
    {
      name: 'S/N',
      selector: (row, i) => i+1,
      width: '5%',
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
               width: '7%',
             },  
       {
      name: 'Code',
      selector: (row) => row.code,
      sortable: true,
      width: '8%',
    },
  {
  name: 'Exp. Date',
  sortable: true,
  selector: (row) => {
    const date = new Date(row.expirationDate);
    const parts = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).split(' ');
    parts[0] = parts[0].replace(/([A-Za-z]+)/, '$1.'); // Add period
    return parts.join(' ');
  },
},
    {
      name: 'Title',
      selector: (row) => row.title,
      sortable: true,
      width: '20%',
    },
    {
      name: 'Category',
      selector: (row) => row.category?.title,
      sortable: true,
    },
    {
        name: 'Unit',
        selector: (row) => row.unit?.title,
        sortable: true,
        width: '8%',
      },
    {
        name: 'Tax(%)',
        selector: (row) => row.tax+"%",
        sortable: true,
        width: '8%',
      },
    {
      name: 'In Stock',
      selector: (row) => row.stockQuantity,
      sortable: true,
      width: '10%',
    },
    {
      name: 'Price',
      selector: (row) =>  <div>
         <span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{row.salePrice.toLocaleString()}
       </div>,
      sortable: true,
    },
  ];

  return (
    <Container tbWidth={tbWidth}>
      {/* <Title>Sales Data</Title> */}
      <TableWrapper>
        <DataTable
          //   title="Sales Table"
          columns={columns}
          data={data}
          responsive
          customStyles={{
            table: {
              style: {
                width: '100%', // Ensure the table takes up 100% of its container width
                tableLayout: 'auto',
                padding: "0px", // Allow columns to adjust their width based on content
                margin: "0px",
                border: '1px solid #cccccc47'
              },

            },
            head: {
              style: {
                fontWeight: 'bold',
                fontSize: '12px', // Adjust font size if needed
                textAlign: 'start', // Align text in the header cells
                height: "20px",
              }
            },
            headCells: {
              style: {
                whiteSpace: 'normal', // Allow multi-line headers if needed
                fontSize: "10px",
                wordWrap: 'break-word', // Ensure long text wraps within the cell
                fontWeight: 'bold',
                paddingBottom: "0px", // Set padding for header row to 0
                paddingLeft: "20px",    // Set padding for header row to 0
                paddingRight: "0px",   // Set padding for header row to 0
                paddingTop: "0px",    // Set padding for header row to 0
                backgroundColor: '#cccccc47',
                height: "20px",
              },
            },
            cells: {
              style: {
                paddingBottom: "2px",
                paddingLeft: "20px",
                paddingRight: "2px",
                paddingTop: "2px",// Reduce padding for cells
                wordWrap: 'break-word', // Ensure long text wraps within the cell
                whiteSpace: 'normal', // Allow text to wrap inside cells
              },
            },
            rows: {
              style: {
                fontSize: '10px', // Smaller font size for rows
                minHeight: "20px",
              },
            },
          }}
        />
      </TableWrapper>
    </Container>
  );
};

export default StockReportTable;
