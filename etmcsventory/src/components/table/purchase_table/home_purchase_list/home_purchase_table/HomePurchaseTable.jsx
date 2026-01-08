import React, { useEffect, useState } from 'react'
import { TableReusableHeader, TableReusableWrapper } from '../../../TableReusabComp/tableReusabComp.style';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { TableStyled, TdStyled } from '../../../../../pages/sale/Add/addSale.style';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TableWrapper } from '../../../expense_table/Expense.style';
import DataTable from 'react-data-table-component';


// const HomePurchaseTable = ({productData, header, tableHeaderData, isLoading}) => {


//      const navigate = useNavigate();
//      const token = localStorage.getItem('token');

//       // fetching currency from db
//       const [currencySymbol, setCurrencySymbol] =  useState('');
//         useEffect(()=>{
//             const fetchAllCompany = async() =>{
//                 try {
//                     const res = await axios.get(`${process.env.REACT_APP_URL}/api/company` , {
//                                     headers: {
//                                       Authorization: `Bearer ${token}`
//                                     }
//                               });
//                     setCurrencySymbol(res.data[0]?.currencySymbol)
//                 } catch (error) {
//                   console.log(error)
//                 }
//             }
//             fetchAllCompany();
//           },[]);
//   return (
//         <TableReusableWrapper>
//            <TableReusableWrapper>
//                           <TableReusableHeader>
//                               {header}
//                               <span onClick={()=>navigate('/sales')}>View Sales <FaLongArrowAltRight /></span>
//                           </TableReusableHeader>
//           {isLoading ? (
//                     <div style={{height: "250px", width: "100%", display: 'flex', justifyContent: "center", alignItems: "center" }}>
//                         <p>Loading</p>
//                     </div>
//                     ) : (  
//               <TableStyled>
//                   <thead>
                  
//                       <TdStyled><b>Date</b></TdStyled>
//                       {/* <TdStyled><b>Code</b></TdStyled> */}
//                       <TdStyled><b>Customer</b></TdStyled>
//                       {/* <TdStyled><b>Status</b></TdStyled> */}
//                       <TdStyled><b>Amount</b></TdStyled>
//                  </thead>
//                  <tbody>
//                   {productData.slice(0, 5).map((data, i)=>(
//                       <tr key={data?._id}>
//                               <TdStyled>{data.saleDate && new Date(data.saleDate).toLocaleDateString('en-US', {
//                                 year: 'numeric',
//                                 month: 'long',
//                                 day: 'numeric',
//                                 })}</TdStyled>
//                               {/* <TdStyled>{data?.code}</TdStyled> */}
//                               <TdStyled>{data.customer?.name}</TdStyled>
//                               {/* <TdStyled>{data?.saleStatus}</TdStyled> */}
//                               <TdStyled><span style={{color:  'black'}} dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{data?.saleAmount.toLocaleString()}</TdStyled>
//                       </tr>
//                                       ))
//                          }
//                   </tbody>
//               </TableStyled>
//             )}
//               </TableReusableWrapper> 
//         </TableReusableWrapper>
//   )
// }


// export default HomePurchaseTable;
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




const HomePurchaseTable = ({ data, currencySymbol }) => {
   
      
  const columns = [

     {
      name: 'Date',
      sortable: false,
      selector: (row) => {
        const date = new Date(row.saleDate);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      },
    },
  
    // {
    //   name: 'Code',
    //   selector: (row) => row.code,
    //   sortable: false,
    // },
    {
      name: 'Customer',
      selector: (row) => row.customer?.name,
      sortable: false,
      // width: '10%',
    },
    {
      name: 'Price',
      selector: (row) =><div>
         <span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{row.saleAmount.toLocaleString()}
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

export default HomePurchaseTable;
