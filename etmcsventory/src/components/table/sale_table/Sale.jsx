

import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { ActionButton, ActionButtons, Container, TableWrapper, Title } from './sale.style';
import { FaEdit, FaEnvelope, FaFileInvoice, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { customStyles } from '../TableCustomStyle.style';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SlideUpButton } from '../expense_table/Expense.style';
import Button from '../../clicks/button/Button';
import ButtonLoader from '../../clicks/button/button_loader/ButtonLoader';
import Overlay from '../../overlay/Overlay';
import ToastComponents from '../../toast_message/toast_component/ToastComponents';


const SalesTable = ({data, onDeleteSale, salePermission}) => {
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
     const [grabSaleName, setGrabSaleName] = useState('');
     const [isLoading, setIsLoading] = useState(false);
    
     const handleGrabId = (saleId, saleName, saleCode)=>{
                setShowDeleteCard(true);
                setGrabId(saleId);
                setGrabSaleName(saleName); 
                setGrabCode(saleCode) 
            }
  
  // Handle delete
                 const handleSaleDelete = async (saleId) => {
                    setIsLoading(true);
                    try {
                      const response = await onDeleteSale(saleId); // call parent function
                  
                      if (response.success) {
                        toast.success('Sale deleted successfully');
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
                         const [selectedSale, setSelectedSale] = useState([]);
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
                          //   await axios.delete(`${process.env.REACT_APP_URL}/api/sale/bulk-delete`, {
                          //     data: { ids: selectedSale.map((e) => e._id) },
                          //     headers: {Authorization: `Bearer ${token}`}
                          //  });
                           await axios.delete(`${process.env.REACT_APP_URL}/api/sale/bulk-delete`, {
                            data: { ids: selectedSale.map(e => e._id) },
                              headers: { Authorization: `Bearer ${token}` }
                            }); 

                            toast.success(`${selectedSale.length} sales deleted successfully`);
                        
                            // remove deleted from UI
                              const deletedIds = selectedSale.map((e) => e._id);
                              const updatedList = data.filter(sale => !deletedIds.includes(sale._id));
                              setSelectedSale([]);
                              onDeleteSale(null, updatedList); // pass updated list to parent
                              setShowBulkDeleteCard(false);
                            } catch (err) {
                            console.error(err);
                            toast.error('Failed to delete selected sales');
                          } finally {
                            setIsDeleting(false);
                          }
                        };
    

 const columns = [
     {
       name: 'Date',
       width: '15%',
       selector: (row) => {
         const date = new Date(row.saleDate);
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
       width: '8%',
     },
     {
       name: 'Customer',
       selector: (row) => row.customer?.name,
       sortable: true,
     },
     {
       name: 'Status',
       selector: (row) => row.saleStatus,
       sortable: true,
       width: '13%',
     },
      {
       name: 'Grand Total',
       selector: (row) => <div>
         <span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{row.saleAmount.toLocaleString()}
       </div>  ,
       sortable: true,
       width: '13%',
     },
     {
       name: 'Payment Status',
       selector: (row) => row.paymentStatus,
       sortable: true,
       width: '13%',
     },
     {
       name: 'Actions',
       cell: (row) => (
         <ActionButtons>
          {salePermission.canView && <ActionButton clr='green' onClick={() => navigate(`/sale-invoice/${row._id}`)}><FaFileInvoice/></ActionButton>}
          {salePermission.canEdit && <ActionButton clr='blue' onClick={() => navigate(`/edit-sale/${row._id}`)}><FaEdit/></ActionButton>} 
          {salePermission.canDelete && <ActionButton clr="red" onClick={() => handleGrabId(row._id, row.customer.name, row.code)}><FaTrash/></ActionButton>}
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
            selectableRows={salePermission.canDelete} // 👈 only show checkboxes if delete permission is true
            onSelectedRowsChange={
                          salePermission.canDelete
                            ? ({ selectedRows }) => setSelectedSale(selectedRows)
                            : undefined
                        }
            selectableRowHighlight={salePermission.canDelete}
           
        />
      </TableWrapper>

       {/* sliding button for delete bulk list */}
          {selectedSale.length > 0 && (
          <SlideUpButton>
{salePermission.canDelete &&
            <Button 
              btnColor={'red'} 
              btnOnClick={handleBulkDelete} 
              btnText= {isDeleting ? <ButtonLoader text="Deleting..." /> : `Delete Selected (${selectedSale.length})`} 
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
                                        Are you sure You want to delete the sale items with the  code <strong>{grabCode}</strong> to the customer <b>{grabSaleName} </b> 
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
          Are you sure you want to delete <b>{selectedSale.length}</b> selected sales?
        </p>
      </Overlay>
    )}

    {/* Toast message user component */}
      <ToastComponents/>
    </Container>
  );
};

export default SalesTable;
