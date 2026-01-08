
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { FaEdit, FaEnvelope, FaEye, FaFileInvoice, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ActionButton, ActionButtons, Container, TableWrapper } from './payment.style';
import { customStyles } from '../TableCustomStyle.style';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SlideUpButton } from '../expense_table/Expense.style';
import Button from '../../clicks/button/Button';
import ButtonLoader from '../../clicks/button/button_loader/ButtonLoader';
import Overlay from '../../overlay/Overlay';
import ToastComponents from '../../toast_message/toast_component/ToastComponents';


const PaymentTable = ({ data, onDeletePayment, paymentPermission, currencySymbol}) => {
const token = localStorage.getItem('token');
    
  const navigate = useNavigate();
  
   
     const [showDeleteCard, setShowDeleteCard] = useState(false);
     const [grabId, setGrabId] = useState('');
     const [grabCode, setGrabCode] = useState('');
     const [grabPaymentFor, setGrabPaymentFor] = useState('');
     const [isLoading, setIsLoading] = useState(false);
    
     const handleGrabId = (paymentId, grabPaymentFor)=>{
                setShowDeleteCard(true);
                setGrabId(paymentId);
                setGrabPaymentFor(grabPaymentFor); 
          }
  
  // Handle deletege
                 const handlePaymentDelete = async (paymentId) => {
                    setIsLoading(true);
                    try {
                      const response = await onDeletePayment(paymentId); // call parent function
                  
                      if (response.success) {
                        toast.success('Payment deleted successfully');
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
                         const [selectedPayment, setSelectedPayment] = useState([]);
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
                            await axios.delete(`${process.env.REACT_APP_URL}/api/payment/bulk-delete`, {
                              data: { ids: selectedPayment.map((e) => e._id) },
                              headers: {Authorization: `Bearer ${token}`}
                            });
                            toast.success(`${selectedPayment.length} purchases deleted successfully`);
                        
                            // remove deleted from UI
                              const deletedIds = selectedPayment.map((e) => e._id);
                              const updatedList = data.filter(purchase => !deletedIds.includes(purchase._id));
                              setSelectedPayment([]);
                              onDeletePayment(null, updatedList); // pass updated list to parent
                              setShowBulkDeleteCard(false);
                            } catch (err) {
                            console.error(err);
                            toast.error('Failed to delete selected purchases');
                          } finally {
                            setIsDeleting(false);
                          }
                        };
                  

  const columns = [
        {
      name: 'Date',
      width: '15%',
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
      name: 'Payment For',
      selector: (row) => row.paymentFor,
    },
    {
       name: 'Amount Paid',
       selector: (row) => <div>
         <span dangerouslySetInnerHTML={{ __html: currencySymbol }}></span>
         {row.payableAmount !== undefined && row.payableAmount !== null
        ? row.payableAmount.toLocaleString()
        : '0'}
       </div>  ,
       sortable: true,
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
      name: 'Note',
      selector: (row) => row.note,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <ActionButtons>
         {paymentPermission.canEdit && <ActionButton clr='blue' onClick={() => navigate(`/edit-payment/${row._id}`)}><FaEdit /></ActionButton>}
          {paymentPermission.canDelete && <ActionButton clr="red" onClick={() => handleGrabId(row._id, row.paymentFor)}><FaTrash/></ActionButton>}
        </ActionButtons>
      ),
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
                              selectableRows
                              onSelectedRowsChange={({ selectedRows }) => setSelectedPayment(selectedRows)}
                              selectableRowHighlight
                            />
        
      </TableWrapper>

      {/* sliding button for delete bulk list */}
                {selectedPayment.length > 0 && (
                <SlideUpButton>
                  <Button 
                    btnColor={'red'} 
                    btnOnClick={handleBulkDelete} 
                    btnText= {isDeleting ? <ButtonLoader text="Deleting..." /> : `Delete Selected (${selectedPayment.length})`} 
                    disabled={isDeleting}>             
                  </Button>
                </SlideUpButton>
              )}
      
          {/* modal to delete single items */}
                {showDeleteCard &&
                                    <Overlay 
                                      contentWidth={'30%'}
                                      overlayButtonClick={()=>handlePaymentDelete(grabId)}
                                      closeOverlayOnClick={()=>setShowDeleteCard(false)}
                                      btnText1={isLoading ? <ButtonLoader text={'Deleting...'}/> : 'Yes'}
                                    >
                                      <p style={{margin: "40px", textAlign:"center", fontSize:"12px", lineHeight: "25px"}}>
                                              Are you sure You want to delete the payment for this Invoice <br/><b>({grabPaymentFor}) </b> 
                                        </p>
                                    </Overlay>
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
                Are you sure you want to delete <b>{selectedPayment.length}</b> selected payment items?
              </p>
            </Overlay>
          )}
      
          {/* Toast message user component */}
            <ToastComponents/>
      
    </Container>
  );
};

export default PaymentTable;
