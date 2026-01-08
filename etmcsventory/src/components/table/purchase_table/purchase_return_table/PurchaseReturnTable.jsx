
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaEnvelope, FaEye, FaFileInvoice, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ActionButton, ActionButtons, Container, TableWrapper } from './purchaseReturnTable.style';
import { SlideUpButton } from '../../expense_table/Expense.style';
import Button from '../../../clicks/button/Button';
import ButtonLoader from '../../../clicks/button/button_loader/ButtonLoader';
import { customStyles } from '../../TableCustomStyle.style';
import Overlay from '../../../overlay/Overlay';
import ToastComponents from '../../../toast_message/toast_component/ToastComponents';




const PurchaseReturnTable = ({data, onDeletePurchase, purchaseReturnPermission}) => {
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
     const [grabSupplierName, setGrabSupplierName] = useState('');
     const [isLoading, setIsLoading] = useState(false);
    
     const handleGrabId = (returnId, supplierName, purchaseCode)=>{
                setShowDeleteCard(true);
                setGrabId(returnId);
                setGrabSupplierName(supplierName); 
                setGrabCode(purchaseCode) 
            }
  
  // Handle delete
                 const handleSaleDelete = async (returnId) => {
                    setIsLoading(true);
                    try {
                      const response = await onDeletePurchase(returnId); // call parent function
                  
                      if (response.success) {
                        toast.success('Purchase Return deleted successfully');
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
                         const [selectedPurchaseReturn, setSelectedPurchaseReturn] = useState([]);
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
                            await axios.delete(`${process.env.REACT_APP_URL}/api/purchaseReturn/bulk-delete`, {
                              data: { ids: selectedPurchaseReturn.map((e) => e._id) },
                              headers: {Authorization: `Bearer ${token}`}
                            });
                            toast.success(`${selectedPurchaseReturn.length} purchase Return deleted successfully`);
                        
                            // remove deleted from UI
                              const deletedIds = selectedPurchaseReturn.map((e) => e._id);
                              const updatedList = data.filter(purchaseReturn => !deletedIds.includes(purchaseReturn._id));
                              setSelectedPurchaseReturn([]);
                              onDeletePurchase(null, updatedList); // pass updated list to parent
                              setShowBulkDeleteCard(false);
                            } catch (err) {
                            console.error(err);
                            toast.error('Failed to delete selected purchase Returns');
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
       name: 'Supplier',
       selector: (row) => row.supplier?.name,
       sortable: true,
     },
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
          {purchaseReturnPermission.canView &&  <ActionButton clr='green' onClick={() => navigate(`/purchase-return/${row._id}`)}><FaEye/></ActionButton>}
          {purchaseReturnPermission.canView &&  <ActionButton clr='green' onClick={() => navigate(`/purchase-invoice/${row.purchase?._id}`)}><FaFileInvoice/></ActionButton>}
           {/* <ActionButton clr='blue' onClick={() => navigate(`/edit-return/${row._id}`)}><FaEdit/></ActionButton> */}
           {purchaseReturnPermission.canDelete && <ActionButton clr="red" onClick={() => handleGrabId(row._id, row.supplier.name, row.code)}><FaTrash/></ActionButton>}
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
            selectableRows={purchaseReturnPermission.canDelete} // 👈 only show checkboxes if delete permission is true
            onSelectedRowsChange={
                          purchaseReturnPermission.canDelete
                            ? ({ selectedRows }) => setSelectedPurchaseReturn(selectedRows)
                            : undefined
                        }
            selectableRowHighlight={purchaseReturnPermission.canDelete}
        />
      </TableWrapper>

       {/* sliding button for delete bulk list */}
          {selectedPurchaseReturn.length > 0 && (
          <SlideUpButton>
            {purchaseReturnPermission.canDelete &&
             <Button 
              btnColor={'red'} 
              btnOnClick={handleBulkDelete} 
              btnText= {isDeleting ? <ButtonLoader text="Deleting..." /> : `Delete Selected (${selectedPurchaseReturn.length})`} 
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
                                        Are you sure You want to delete the Purchase Return items with the  code <strong>{grabCode}</strong> to the Supplier <b>{grabSupplierName} </b> 
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
          Are you sure you want to delete <b>{selectedPurchaseReturn.length}</b> selected Purchase Returns?
        </p>
      </Overlay>
    )}

    {/* Toast message user component */}
      <ToastComponents/>
    </Container>
  );
};

export default PurchaseReturnTable;
