
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { FaEdit, FaEnvelope, FaEye, FaFileInvoice, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ActionButton, ActionButtons, Container, TableWrapper } from './supplier.style';
import { customStyles } from '../TableCustomStyle.style';
import { toast } from 'react-toastify';
import axios from 'axios';
import { SlideUpButton } from '../expense_table/Expense.style';
import Button from '../../clicks/button/Button';
import ButtonLoader from '../../clicks/button/button_loader/ButtonLoader';
import Overlay from '../../overlay/Overlay';
import ToastComponents from '../../toast_message/toast_component/ToastComponents';


const SupplierTable = ({data, onDeleteSup, supplierPermission}) => {
  
  const navigate = useNavigate();

const token = localStorage.getItem('token');
    
    const [showDeleteCard, setShowDeleteCard] = useState(false);
    const [grabId, setGrabId] = useState('');
    const [grabSupplierName, setGrabSupplierName] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    
      const handleGrabId = (supplierId, supplierName)=>{
          setShowDeleteCard(true);
          setGrabId(supplierId);
          setGrabSupplierName(supplierName);
      
      }
  

const handleDelete = async (supplierId) => {
              setIsLoading(true);
              try {
                const response = await onDeleteSup(supplierId); // call parent function
            
                if (response.success) {
                  toast.success('Supplier deleted successfully');
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
            const [selectedSupplier, setSelectedSupplier] = useState([]);
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
                await axios.delete(`${process.env.REACT_APP_URL}/api/suppliers/bulk-delete`, {
              data: { ids: selectedSupplier.map((e) => e._id) },
              headers: {Authorization: `Bearer ${token}`}})

                toast.success(`${selectedSupplier.length} supplier deleted successfully`);
                              
                // remove deleted from UI
                const deletedIds = selectedSupplier.map((e) => e._id);
                const updatedList = data.filter(exp => !deletedIds.includes(exp._id));
                setSelectedSupplier([]);
                
                onDeleteSup(null, updatedList); // pass updated list to parent
                   setShowBulkDeleteCard(false);
                   setIsDeleting(false);
                } catch (err) {
                    console.error(err);
                    toast.error('Failed to delete selected customers');
                } finally {
                    setIsDeleting(false);
                  }
                };


  const columns = [
    {
        name: 'Code',
        selector: (row) => row.code,
        sortable: true,
        width: '100px', // Set a different width
      },
    {
        name: 'Supplier Name',
        selector: (row) => row.name,
        sortable: true,
      },
    {
      name: 'Phone No.',
      selector: (row) => row.phoneNumber,
      sortable: true,
      // width: '100px', // Set a different width
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    // {
    //   name: 'Tax No.',
    //   selector: (row) => row.taxNumber,
    //   sortable: true,     
    //   width: '80px', // Set a different width
    
    // },
    // {
    //     name: 'Address',
    //     selector: (row) => row.address,
    //     sortable: true,
    //   },
    {
      name: 'Actions',
      width: '100px',
      cell: (row) => (
        <ActionButtons>
          {supplierPermission.canView && <ActionButton clr='green' onClick={() => navigate(`/supplier-detail/${row._id}`)}><FaEye/></ActionButton>}
         {supplierPermission.canEdit && <ActionButton clr='blue' onClick={() => navigate(`/edit-supplier/${row._id}`)}><FaEdit/></ActionButton>}
         {supplierPermission.canDelete &&  <ActionButton clr="red" onClick={() => handleGrabId(row._id, row.name)}><FaTrash/></ActionButton>}
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
              selectableRows={supplierPermission.canDelete} // 👈 only show checkboxes if delete permission is true
              onSelectedRowsChange={
                          supplierPermission.canDelete
                            ? ({ selectedRows }) => setSelectedSupplier(selectedRows)
                            : undefined
                        }
              selectableRowHighlight={supplierPermission.canDelete}
         
            />
      </TableWrapper>


{/* sliding button for delete bulk list */}
          {selectedSupplier.length > 0 && (
          <SlideUpButton>
        {supplierPermission.canDelete &&
            <Button 
              btnColor={'red'} 
              btnOnClick={handleBulkDelete} 
              btnText= {isDeleting ? <ButtonLoader text="Deleting..." /> : `Delete Selected (${selectedSupplier.length})`} 
              disabled={isDeleting}>             
            </Button>}
          </SlideUpButton>
        )}


{/* modal to delete single items */}
             {showDeleteCard &&
              <Overlay 
                contentWidth={'30%'}
                overlayButtonClick={()=>handleDelete(grabId)}
                closeOverlayOnClick={()=>setShowDeleteCard(false)}
                btnText1={isLoading ? <ButtonLoader text={'Deleting...'}/> : 'Yes'}
                >
                  <p style={{margin: "40px", textAlign:"center", fontSize:"12px", lineHeight: "25px"}}>
                    Are you sure You want to delete the Supplier <b>{grabSupplierName} </b> 
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
                      Are you sure you want to delete <b>{selectedSupplier.length}</b> selected suppliers?
                    </p>
                  </Overlay>
                )}

                        
              {/* Toast message user component */}
              <ToastComponents/>
    </Container>
  );
};

export default SupplierTable;
