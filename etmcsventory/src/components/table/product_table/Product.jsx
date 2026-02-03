import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ActionButton, ActionButtons, Container, TableWrapper } from './Product.style';
import { customStyles } from '../TableCustomStyle.style';
import { toast } from 'react-toastify';
import axios from 'axios';
import prodPlaceHolder from '../../../images/product_placeholder.jpg';
import { SlideUpButton } from '../expense_table/Expense.style';
import Button from '../../clicks/button/Button';
import ButtonLoader from '../../clicks/button/button_loader/ButtonLoader';
import Overlay from '../../overlay/Overlay';
import ToastComponents from '../../toast_message/toast_component/ToastComponents';

const ProductTable = ({ data, onDeleteProd, currencySymbol, show = true, productPermission }) => {

  const navigate = useNavigate();

  const [showDeleteCard, setShowDeleteCard] = useState(false);
  const [grabId, setGrabId] = useState('');
  const [grabProductTitle, setGrabProductTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showBulkDeleteCard, setShowBulkDeleteCard] = useState(false);

  const token = localStorage.getItem('token');

  /* ===================== TOTAL CALCULATION ===================== */

  const purchaseTotal = data?.reduce(
    (sum, item) => sum + (item.purchasePrice || 0),
    0
  );

  const saleTotal = data?.reduce(
    (sum, item) => sum + (item.salePrice || 0),
    0
  );

  const tableData = [
    ...data,
    {
      _id: 'TOTAL_ROW',
      title: 'TOTAL',
      purchasePrice: purchaseTotal,
      salePrice: saleTotal,
      isTotal: true,
    },
  ];

  /* ===================== HANDLERS ===================== */

  const handleGrabId = (productId, productTitle) => {
    setShowDeleteCard(true);
    setGrabId(productId);
    setGrabProductTitle(productTitle);
  };

  const handleProductDelete = async (productId) => {
    setIsLoading(true);
    try {
      const response = await onDeleteProd(productId);
      if (response.success) {
        toast.success('Product deleted successfully');
        setShowDeleteCard(false);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkDelete = () => setShowBulkDeleteCard(true);

  const confirmBulkDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(
        `${process.env.REACT_APP_URL}/api/products/bulk-delete`,
        {
          data: { ids: selectedProduct.map((e) => e._id) },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(`${selectedProduct.length} products deleted successfully`);

      const deletedIds = selectedProduct.map((e) => e._id);
      const updatedList = data.filter((exp) => !deletedIds.includes(exp._id));
      setSelectedProduct([]);
      onDeleteProd(null, updatedList);
      setShowBulkDeleteCard(false);
    } catch (err) {
      toast.error('Failed to delete selected products');
    } finally {
      setIsDeleting(false);
    }
  };

  /* ===================== COLUMNS ===================== */

  const columns = [
    {
      name: 'Code',
      selector: (row) => row.code,
      width: '8%',
    },
    {
      name: 'Photo',
      selector: (row) =>
        row.isTotal ? null : (
          <img
            src={
              row.imgUrl
                ? `${process.env.REACT_APP_URL}/images/${row.imgUrl}`
                : prodPlaceHolder
            }
            alt={row.title}
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '10%',
              objectFit: 'cover',
            }}
          />
        ),
      width: '10%',
    },
    {
      name: 'Title',
      selector: (row) =>
        row.isTotal ? <strong>TOTAL</strong> : row.title,
    },
    {
      name: 'Category',
      selector: (row) => (row.isTotal ? '' : row.category?.title),
      width: '10%',
    },
    {
      name: 'In stock',
      selector: (row) => (row.isTotal ? '' : row.stockQuantity),
      width: '10%',
    },
    {
      name: 'Unit',
      selector: (row) => (row.isTotal ? '' : row.unit?.title),
      width: '9%',
    },
    {
      name: 'Purchase',
      selector: (row) => (
        <>
          <span dangerouslySetInnerHTML={{ __html: currencySymbol }} />
          {row.purchasePrice?.toLocaleString()}
        </>
      ),
    },
    {
      name: 'Sale',
      selector: (row) => (
        <>
          <span dangerouslySetInnerHTML={{ __html: currencySymbol }} />
          {row.salePrice?.toLocaleString()}
        </>
      ),
    },
    show && {
      name: 'Actions',
      width: '10%',
      cell: (row) =>
        row.isTotal ? null : (
          <ActionButtons>
            {productPermission.canView && (
              <ActionButton
                clr="green"
                onClick={() => navigate(`/product-detail/${row._id}`)}
              >
                <FaEye />
              </ActionButton>
            )}
            {productPermission.canEdit && (
              <ActionButton
                clr="blue"
                onClick={() => navigate(`/edit-product/${row._id}`)}
              >
                <FaEdit />
              </ActionButton>
            )}
            {productPermission.canDelete && (
              <ActionButton
                clr="red"
                onClick={() => handleGrabId(row._id, row.title)}
              >
                <FaTrash />
              </ActionButton>
            )}
          </ActionButtons>
        ),
    },
  ].filter(Boolean);

  /* ===================== RENDER ===================== */

  return (
    <Container>
      <TableWrapper>
        <DataTable
          columns={columns}
          data={tableData}
          pagination
          paginationPerPage={50}
          paginationRowsPerPageOptions={[10, 25, 50, 100, 500, 1000]}
          responsive
          customStyles={customStyles}
          selectableRows={productPermission.canDelete}
          selectableRowDisabled={(row) => row.isTotal}
          onSelectedRowsChange={({ selectedRows }) =>
            setSelectedProduct(selectedRows)
          }
        />
      </TableWrapper>

      {selectedProduct.length > 0 && productPermission.canDelete && (
        <SlideUpButton>
          <Button
            btnColor="red"
            btnOnClick={handleBulkDelete}
            btnText={
              isDeleting ? (
                <ButtonLoader text="Deleting..." />
              ) : (
                `Delete Selected (${selectedProduct.length})`
              )
            }
            disabled={isDeleting}
          />
        </SlideUpButton>
      )}

      {showDeleteCard && (
        <Overlay
          contentWidth="30%"
          overlayButtonClick={() => handleProductDelete(grabId)}
          closeOverlayOnClick={() => setShowDeleteCard(false)}
          btnText1={
            isLoading ? <ButtonLoader text="Deleting..." /> : 'Yes'
          }
        >
          <p style={{ margin: '40px', textAlign: 'center', fontSize: '12px' }}>
            Are you sure you want to delete <b>{grabProductTitle}</b>?
          </p>
        </Overlay>
      )}

      {showBulkDeleteCard && (
        <Overlay
          contentWidth="30%"
          overlayButtonClick={confirmBulkDelete}
          closeOverlayOnClick={() => setShowBulkDeleteCard(false)}
          btnText1={
            isDeleting ? <ButtonLoader text="Deleting..." /> : 'Yes'
          }
        >
          <p style={{ margin: '40px', textAlign: 'center', fontSize: '12px' }}>
            Are you sure you want to delete{' '}
            <b>{selectedProduct.length}</b> products?
          </p>
        </Overlay>
      )}

      <ToastComponents />
    </Container>
  );
};

export default ProductTable;



// import React, { useEffect, useState } from 'react';
// import DataTable from 'react-data-table-component';
// import styled from 'styled-components';
// import { FaEdit, FaEnvelope, FaEye, FaFileInvoice, FaTrash } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { ActionButton, ActionButtons, Container, TableWrapper } from './Product.style';
// import { customStyles } from '../TableCustomStyle.style';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import prodPlaceHolder from '../../../images/product_placeholder.jpg'
// import { SlideUpButton } from '../expense_table/Expense.style';
// import Button from '../../clicks/button/Button';
// import ButtonLoader from '../../clicks/button/button_loader/ButtonLoader';
// import Overlay from '../../overlay/Overlay';
// import ToastComponents from '../../toast_message/toast_component/ToastComponents';


// const ProductTable = ({ data, onDeleteProd, currencySymbol, show = true, productPermission }) => {

//   const navigate = useNavigate();

//       const [showDeleteCard, setShowDeleteCard] = useState(false);
//       const [grabId, setGrabId] = useState('');
//       const [grabProductTitle, setGrabProductTitle] = useState('');
//       const [isLoading, setIsLoading] = useState(false);
      
  


//     const handleGrabId = (productId, productTitle)=>{
//           setShowDeleteCard(true);
//           setGrabId(productId);
//           setGrabProductTitle(productTitle);
      
//       }
  

      
//       const handleProductDelete = async (productId) => {
//                     setIsLoading(true);
//                     try {
//                       const response = await onDeleteProd(productId); // call parent function
                  
//                       if (response.success) {
//                         toast.success('Product deleted successfully');
//                         setShowDeleteCard(false); // Close modal
//                       } else {
//                         toast.error('Error deleting message: ' + response.message);
//                       }
//                     } catch (error) {
//                       console.error(error);
//                       toast.error('Unexpected error occurred');
//                     } finally {
//                       setIsLoading(false);
//                     }
//                   };



                  
//               // Handle bulk delete
//             const [selectedProduct, setSelectedProduct] = useState([]);
//             const [isDeleting, setIsDeleting] = useState(false);
//             const [showBulkDeleteCard, setShowBulkDeleteCard] = useState(false);
//             const token = localStorage.getItem('token');
            
//         //  to show bulk popup delete card
//             const handleBulkDelete = async () => {
//               setShowBulkDeleteCard(true);
//             };
                        
//             // to delete multiple selection
//             const confirmBulkDelete = async () => {
//               setIsDeleting(true);
//               try {
//                 await axios.delete(`${process.env.REACT_APP_URL}/api/products/bulk-delete`, 
//                   {
//                     data: { ids: selectedProduct.map((e) => e._id) },
//                     headers: { Authorization: `Bearer ${token}`}
//                   }) 
                 
//                 toast.success(`${selectedProduct.length} products deleted successfully`);
                              
//                 // remove deleted from UI
//                 const deletedIds = selectedProduct.map((e) => e._id);
//                 const updatedList = data.filter(exp => !deletedIds.includes(exp._id));
//                 setSelectedProduct([]);
                
//                 onDeleteProd(null, updatedList); // pass updated list to parent
//                    setShowBulkDeleteCard(false);
//                    setIsDeleting(false);
//                 } catch (err) {
//                     console.error(err);
//                     toast.error('Failed to delete selected products');
//                 } finally {
//                     setIsDeleting(false);
//                   }
//                 };


//       const purchaseTotal = data?.reduce(
//         (sum, item) => sum + (item.purchasePrice || 0),
//         0
//       );

//       const saleTotal = data?.reduce(
//         (sum, item) => sum + (item.salePrice || 0),
//         0
//       );
      
//   const columns = [

//      {
//       name: 'Code',
//       selector: (row) => row.code,
//       sortable: true,
//               width: '10%',
//     },
//      {
//               name: 'Photo',
//               selector: (row) => <img
//               src={row.imgUrl ? process.env.REACT_APP_URL+'/images/'+ row.imgUrl : prodPlaceHolder}
//               alt={row.title}
//               style={{
//                 width: '20px',
//                 height: '20px',
//                 borderRadius: '10%',
//                 objectFit: 'cover'
//               }}
//             />,
//               // cell: (row) => <img src={`${process.env.REACT_APP_URL}/images/${row.imgUrl}` || pix} alt={row.name} style={{ width: '20px', borderRadius: '10%', height: '20px', objectFit: 'cover' }} />,
//               width: '10%',
//             },
//     {
//       name: 'Title',
//       selector: (row) => row.title,
//       sortable: true,
//     },
//     {
//       name: 'Category',
//       selector: (row) => row.category?.title,
//       sortable: true,
//                     width: '10%', // Set a different width
//     },
//     {
//       name: 'In stock',
//       selector: (row) => row.stockQuantity,
//       sortable: true,
//       width: '10%', // Set a different width
//     },
//     {
//       name: 'Unit',
//       selector: (row) => row.unit?.title,
//       sortable: true,
//       width: '10%',
//     },
//     // {
//     //   name: 'Purchase',
//     //   selector: (row) =><div>
//     //      <span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{row.purchasePrice.toLocaleString()}
//     //    </div>,
//     //   sortable: true,        
//     //   // width: '10%', // Set a different width

//     // },
//     {
//   name: (
//     <div style={{ textAlign: 'right' }}>
//       <div>Purchase</div>
//       <strong style={{ fontSize: '12px' }}>
//         <span dangerouslySetInnerHTML={{ __html: currencySymbol }} />
//         {purchaseTotal.toLocaleString()}
//       </strong>
//     </div>
//   ),
//   selector: (row) => (
//     <div>
//       <span dangerouslySetInnerHTML={{ __html: currencySymbol }} />
//       {row.purchasePrice.toLocaleString()}
//     </div>
//   ),
//   sortable: true,
// },
//  {
//   name: (
//     <div style={{ textAlign: 'right' }}>
//       <div>Sale</div>
//       <strong style={{ fontSize: '12px' }}>
//         <span dangerouslySetInnerHTML={{ __html: currencySymbol }} />
//         {saleTotal.toLocaleString()}
//       </strong>
//     </div>
//   ),
//   selector: (row) => (
//     <div>
//       <span dangerouslySetInnerHTML={{ __html: currencySymbol }} />
//       {row.salePrice.toLocaleString()}
//     </div>
//   ),
//   sortable: true,
// },
//     // {
//     //   name: 'Sale',
//     //   selector: (row) =><div>
//     //      <span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{row.salePrice.toLocaleString()}
//     //    </div>,
//     //   sortable: true,        
//     //   // width: '10%', // Set a different width

//     // },
//     show && {
//       name: 'Actions',
//       width: '10%',
//       cell: (row) => (
//         <ActionButtons>
//          {productPermission.canView && <ActionButton clr='green' onClick={() => navigate(`/product-detail/${row._id}`)}><FaEye /></ActionButton>}
//           {productPermission.canEdit && <ActionButton clr='blue' onClick={() => navigate(`/edit-product/${row._id}`)}><FaEdit /></ActionButton>}
//           {productPermission.canDelete && <ActionButton clr="red" onClick={() => handleGrabId(row._id, row.title)}><FaTrash /></ActionButton>}
//         </ActionButtons>
//       ),
//     },
//   ];


//   return (
//     <Container>
//       {/* <Title>Sales Data</Title> */}
//       <TableWrapper>
//         <DataTable
//           //   title="Sales Table"
//           columns={columns}
//           data={data}
//           pagination
//           paginationPerPage={50} // Default rows per page
//           paginationRowsPerPageOptions={[10, 25, 50, 100, 500, 1000]} // Options in the dropdown
//           responsive
//           customStyles={customStyles}
//           selectableRows={productPermission.canDelete} // 👈 only show checkboxes if delete permission is true
//                       onSelectedRowsChange={
//                           productPermission.canDelete
//                             ? ({ selectedRows }) => setSelectedProduct(selectedRows)
//                             : undefined
//                         }
//                         selectableRowHighlight={productPermission.canDelete}
              
//         />
//       </TableWrapper>

//        {/* sliding button for delete bulk list */}
//                 {selectedProduct.length > 0 && (
//                 <SlideUpButton>
// { productPermission.canDelete &&
//                   <Button 
//                     btnColor={'red'} 
//                     btnOnClick={handleBulkDelete} 
//                     btnText= {isDeleting ? <ButtonLoader text="Deleting..." /> : `Delete Selected (${selectedProduct.length})`} 
//                     disabled={isDeleting}>             
//                   </Button>}
//                 </SlideUpButton>
//               )}
      
//           {/* modal to delete single items */}
//                 {showDeleteCard &&
//                                     <Overlay 
//                                       contentWidth={'30%'}
//                                       overlayButtonClick={()=>handleProductDelete(grabId)}
//                                       closeOverlayOnClick={()=>setShowDeleteCard(false)}
//                                       btnText1={isLoading ? <ButtonLoader text={'Deleting...'}/> : 'Yes'}
//                                     >
//                                       <p style={{margin: "40px", textAlign:"center", fontSize:"12px", lineHeight: "25px"}}>
//                                               Are you sure You want to delete the product <b>{grabProductTitle} </b> 
//                                         </p>
//                                     </Overlay>
//                                   }
                  
//             {/* modal for bulk delete */}
//             {showBulkDeleteCard && (
//             <Overlay
//               contentWidth="30%"
//               overlayButtonClick={confirmBulkDelete}
//               closeOverlayOnClick={() => setShowBulkDeleteCard(false)}
//               btnText1={isDeleting ? <ButtonLoader text={'Deleting...'} /> : 'Yes'}
//             >
//               <p style={{ margin: "40px", textAlign: "center", fontSize: "12px", lineHeight: "25px" }}>
//                 Are you sure you want to delete <b>{selectedProduct.length}</b> selected products?
//               </p>
//             </Overlay>
//           )}
      
//           {/* Toast message user component */}
//             <ToastComponents/>
         
//     </Container>
//   );
// };

// export default ProductTable;
