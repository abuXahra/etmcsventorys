
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
// import { ActionButton, ActionButtons, Container, TableWrapper, Title } from './saleReturnTable.style';
import { FaEdit, FaEnvelope, FaEye, FaFileInvoice, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { toast } from 'react-toastify';
import { ActionButton, ActionButtons, Container, TableWrapper } from './saleReturnTable.style';
import { customStyles } from '../../TableCustomStyle.style';
import Button from '../../../clicks/button/Button';
import ButtonLoader from '../../../clicks/button/button_loader/ButtonLoader';
import { SlideUpButton } from '../../expense_table/Expense.style';
import Overlay from '../../../overlay/Overlay';
import ToastComponents from '../../../toast_message/toast_component/ToastComponents';
// import { SlideUpButton } from '../../expense_table/Expense.style';
// import Button from '../../../clicks/button/Button';
// import ButtonLoader from '../../../clicks/button/button_loader/ButtonLoader';
// import Overlay from '../../../overlay/Overlay';
// import ToastComponents from '../../../toast_message/toast_component/ToastComponents';


const SaleReturnTable = ({data, onDeleteSale, saleReturnPermission}) => {
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
  
  
     const [showDeleteCard, setShowDeleteCard] = useState(false);
     const [grabId, setGrabId] = useState('');
     const [grabCode, setGrabCode] = useState('');
    //  const [grabSaleName, setGrabSaleName] = useState('');
     const [isLoading, setIsLoading] = useState(false);
    
     const handleGrabId = (returnId, saleName, saleCode)=>{
                setShowDeleteCard(true);
                setGrabId(returnId);
                // setGrabSaleName(saleName); 
                setGrabCode(saleCode) 
            }
  
  // Handle delete
                 const handleSaleDelete = async (returnId) => {
                    setIsLoading(true);
                    try {
                      const response = await onDeleteSale(returnId); // call parent function
                  
                      if (response.success) {
                        toast.success('Sale Return deleted successfully');
                        setShowDeleteCard(false); // Close modal
                      } else {
                        toast.error('Error deleting message: ' + response.message);
                      }
                    } catch (error) {
                      console.error(error);
                      toast.error('Unexpected error occurred');
                    } finally {
                      setIsLoading(false);
                    }
                  };
            
  
                  
                         // Handle bulk delete
                         const [selectedSaleReturn, setSelectedSaleReturn] = useState([]);
                         const [isDeleting, setIsDeleting] = useState(false);
                         const [showBulkDeleteCard, setShowBulkDeleteCard] = useState(false);
                         
                      //  to show bulk popup delete card
                         const handleBulkDelete = async () => {
                          setShowBulkDeleteCard(true);
                        };
                  
                        // to delete multiple selection
                        const confirmBulkDelete = async () => {
                          setIsDeleting(true);
                          try {
                            await axios.delete(`${process.env.REACT_APP_URL}/api/saleReturn/bulk-delete`, {
                              data: { ids: selectedSaleReturn.map((e) => e._id) },
                              headers: {Authorization: `Bearer ${token}`}
                            })
                            toast.success(`${selectedSaleReturn.length} sales Return deleted successfully`);
                        
                            // remove deleted from UI
                              const deletedIds = selectedSaleReturn.map((e) => e._id);
                              const updatedList = data.filter(saleReturn => !deletedIds.includes(saleReturn._id));
                              setSelectedSaleReturn([]);
                              onDeleteSale(null, updatedList); // pass updated list to parent
                              setShowBulkDeleteCard(false);
                            } catch (err) {
                            console.error(err);
                            toast.error('Failed to delete selected sale Returns');
                          } finally {
                            setIsDeleting(false);
                          }
                        };
    

 const columns = [
     {
       name: 'Return Date',
      //  width: '15%',
       selector: (row) => {
         const date = new Date(row.returnDate);
         return date.toLocaleDateString('en-US', {
           year: 'numeric',
           month: 'long',
           day: 'numeric',
         });
       },
     },
     {
       name: 'Code',
       selector: (row) => row.code,
       sortable: true,
      //  width: '8%',
     },
     {
       name: 'Customer',
       selector: (row) => row.customer?.name,
       sortable: true,
     },
    //  {
    //    name: 'Status',
    //    selector: (row) => row.saleStatus,
    //    sortable: true,
    //    width: '13%',
    //  },
      {
       name: 'Total Refund',
       selector: (row) => <div>
         <span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{row.returnAmount.toLocaleString()}
       </div>  ,
       sortable: true,
       width: '13%',
     },
     {
       name: 'Actions',
       cell: (row) => (
         <ActionButtons>
         {saleReturnPermission.canView &&  <ActionButton clr='green' onClick={() => navigate(`/sale-return/${row._id}`)}><FaEye/></ActionButton>}
            {saleReturnPermission.canView && <ActionButton clr='green' onClick={() => navigate(`/sale-invoice/${row.sale?._id}`)}><FaFileInvoice/></ActionButton>}
           {/* <ActionButton clr='blue' onClick={() => navigate(`/edit-return/${row._id}`)}><FaEdit/></ActionButton> */}
           {saleReturnPermission.canDelete && <ActionButton clr="red" onClick={() => handleGrabId(row._id, row.customer.name, row.code)}><FaTrash/></ActionButton>}
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
            selectableRows={saleReturnPermission.canDelete} // 👈 only show checkboxes if delete permission is true
            onSelectedRowsChange={
                          saleReturnPermission.canDelete
                            ? ({ selectedRows }) => setSelectedSaleReturn(selectedRows)
                            : undefined
                        }
            selectableRowHighlight={saleReturnPermission.canDelete}
        />
      </TableWrapper>

       {/* sliding button for delete bulk list */}
          {selectedSaleReturn.length > 0 && (
          <SlideUpButton>
         {saleReturnPermission.canDelete &&   
         <Button 
              btnColor={'red'} 
              btnOnClick={handleBulkDelete} 
              btnText= {isDeleting ? <ButtonLoader text="Deleting..." /> : `Delete Selected (${selectedSaleReturn.length})`} 
              disabled={isDeleting}>             
            </Button>}
          </SlideUpButton>
        )}

    {/* modal to delete single items */}
          {showDeleteCard &&
                              <Overlay 
                                contentWidth={'30%'}
                                overlayButtonClick={()=>handleSaleDelete(grabId)}
                                closeOverlayOnClick={()=>setShowDeleteCard(false)}
                                btnText1={isLoading ? <ButtonLoader text={'Deleting...'}/> : 'Yes'}
                              >
                                <p style={{margin: "40px", textAlign:"center", fontSize:"12px", lineHeight: "25px"}}>
                                        Are you sure You want to delete the Sale Return items with the  code <strong>{grabCode}</strong> from the customer <b>customerSaleName </b> 
                                  </p>                              </Overlay>
                            }
            
      {/* modal for bulk delete */}
      {showBulkDeleteCard && (
      <Overlay
        contentWidth="30%"
        overlayButtonClick={confirmBulkDelete}
        closeOverlayOnClick={() => setShowBulkDeleteCard(false)}
        btnText1={isDeleting ? <ButtonLoader text={'Deleting...'} /> : 'Yes'}
      >
        <p style={{ margin: "40px", textAlign: "center", fontSize: "12px", lineHeight: "25px" }}>
          Are you sure you want to delete <b>{selectedSaleReturn.length}</b> selected sale Returns?
        </p>
      </Overlay>
    )}

    {/* Toast message user component */}
      <ToastComponents/>
    </Container>
  );
};

export default SaleReturnTable;
