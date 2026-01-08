
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { FaEdit, FaEnvelope, FaEye, FaFileInvoice, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ActionButton, ActionButtons, Container, TableWrapper } from './customerTable.style';
import { customStyles } from '../TableCustomStyle.style';
import userPicture from '../../../images/placeholder_image.png'
import { toast } from 'react-toastify';
import ToastComponents from '../../toast_message/toast_component/ToastComponents';
import ButtonLoader from '../../clicks/button/button_loader/ButtonLoader';
import Overlay from '../../overlay/Overlay';
import axios from 'axios';
import { SlideUpButton } from '../expense_table/Expense.style';
import Button from '../../clicks/button/Button';


const CustomerTable = ({data, onDeleteCus, customerPermission}) => {
  const token = localStorage.getItem('token');
    
  const navigate = useNavigate();

  const [showDeleteCard, setShowDeleteCard] = useState(false);
  const [grabId, setGrabId] = useState('');
  const [grabCustomerName, setGrabCustomerName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  


 const handleGrabId = (customerId, customerName)=>{
          setShowDeleteCard(true);
          setGrabId(customerId);
          setGrabCustomerName(customerName);
      
      }
  

      const handleDelete = async (customerId) => {
              setIsLoading(true);
              try {
                const response = await onDeleteCus(customerId); // call parent function
            
                if (response.success) {
                  toast.success('Customer deleted successfully');
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
            const [selectedCustomer, setSelectedCustomer] = useState([]);
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
                await axios.delete(`${process.env.REACT_APP_URL}/api/customers/bulk-delete`, {
                data: { ids: selectedCustomer.map((e) => e._id) },
                headers: {Authorization: `Bearer ${token}`}
            });
                toast.success(`${selectedCustomer.length} customer deleted successfully`);
                              
                // remove deleted from UI
                const deletedIds = selectedCustomer.map((e) => e._id);
                const updatedList = data.filter(exp => !deletedIds.includes(exp._id));
                setSelectedCustomer([]);
                
                onDeleteCus(null, updatedList); // pass updated list to parent
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
      name: 'Customer Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
        name: 'Phone No.',
        selector: (row) => row.phoneNumber,
        sortable: true,
    },
    {
        name: 'Email',
        selector: (row) => row.email,
        sortable: true,
    },
    // {
    //     name: 'Tax Number',
    //     selector: (row) => row.taxNumber,
    //     sortable: true,
    // },
    // {
    //     name: 'Address',
    //     selector: (row) => row.address,
    //     sortable: true,
    // },
    {
      name: 'Actions',
      cell: (row) => (
        <ActionButtons>
        {customerPermission?.canEdit &&   <ActionButton clr='green' onClick={() => navigate(`/edit-customer/${row._id}`)}><FaEdit/> Edit</ActionButton>}
           {customerPermission?.canView && <ActionButton clr="blue" onClick={() => navigate(`/customers/${row._id}`)}><FaEye/> View</ActionButton>}
          {customerPermission?.canDelete && <ActionButton clr="red" onClick={() =>  handleGrabId(row._id, row.name)}><FaTrash/> Delete</ActionButton>}
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
              selectableRows={customerPermission.canDelete} // 👈 only show checkboxes if delete permission is true
                      onSelectedRowsChange={
                          customerPermission.canDelete
                            ? ({ selectedRows }) => setSelectedCustomer(selectedRows)
                            : undefined
                        }
                        selectableRowHighlight={customerPermission.canDelete}
            />
      </TableWrapper>

    {/* sliding button for delete bulk list */}
          {selectedCustomer.length > 0 && (
          <SlideUpButton>
{ customerPermission.canDelete &&
            <Button 
              btnColor={'red'} 
              btnOnClick={handleBulkDelete} 
              btnText= {isDeleting ? <ButtonLoader text="Deleting..." /> : `Delete Selected (${selectedCustomer.length})`} 
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
                    Are you sure You want to delete the Customer <b>{grabCustomerName} </b> 
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
                      Are you sure you want to delete <b>{selectedCustomer.length}</b> selected customers?
                    </p>
                  </Overlay>
                )}

                        
              {/* Toast message user component */}
              <ToastComponents/>
    </Container>
  );
};

export default CustomerTable;





        // <DataTable
        // //   title="Sales Table"
        //   columns={columns}
        //   data={data}
        //   pagination
        //   responsive
        //   customStyles={customStyles}
        // />