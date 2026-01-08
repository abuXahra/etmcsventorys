
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { FaEdit, FaEnvelope, FaEye, FaFileInvoice, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { customStyles } from '../TableCustomStyle.style';
import userPicture from '../../../images/placeholder_image.png'
import { toast } from 'react-toastify';
import ToastComponents from '../../toast_message/toast_component/ToastComponents';
import ButtonLoader from '../../clicks/button/button_loader/ButtonLoader';
import Overlay from '../../overlay/Overlay';
import axios from 'axios';
import { ActionButton, ActionButtons, Container, SlideUpButton, TableWrapper } from '../expense_table/Expense.style';
import Button from '../../clicks/button/Button';


const AuditLogTable = ({data, onDeleteAudit, auditPer1mission}) => {
  const token = localStorage.getItem('token');
    
  const navigate = useNavigate();

  const [showDeleteCard, setShowDeleteCard] = useState(false);
  const [grabId, setGrabId] = useState('');
  const [grabAuditTitle, setGrabAuditTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  


 const handleGrabId = (auditId, auditTitle)=>{
          setShowDeleteCard(true);
          setGrabId(auditId);
          setGrabAuditTitle(auditTitle);
      
      }
  

      const handleDelete = async (auditId) => {
              setIsLoading(true);
              try {
                const response = await onDeleteAudit(auditId); // call parent function
            
                if (response.success) {
                  toast.success('Audit Log deleted successfully');
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
            const [selectedAuditLog, setSelectedAuditLog] = useState([]);
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
                data: { ids: selectedAuditLog.map((e) => e._id) },
                headers: {Authorization: `Bearer ${token}`}
            });
                toast.success(`${selectedAuditLog.length} Audited logs deleted successfully`);
                              
                // remove deleted from UI
                const deletedIds = selectedAuditLog.map((e) => e._id);
                const updatedList = data.filter(exp => !deletedIds.includes(exp._id));
                setSelectedAuditLog([]);
                
                onDeleteAudit(null, updatedList); // pass updated list to parent
                   setShowBulkDeleteCard(false);
                   setIsDeleting(false);
                } catch (err) {
                    console.error(err);
                    toast.error('Failed to delete selected audit logs');
                } finally {
                    setIsDeleting(false);
                  }
                };


                
  const columns = [

    {
       name: 'Date',
       width: '15%',
       selector: (row) => {
         const date = new Date(row.createdAt);
         return date.toLocaleDateString('en-US', {
           year: 'numeric',
           month: 'long',
           day: 'numeric',
         });
       },
     },
    {
        name: 'Action',
        selector: (row) => row.username,
        sortable: true,
        width: '100px', // Set a different width
      },
      
      {
        name: 'Module',
        selector: (row) => row.module,
        sortable: true,
        width: '100px', // Set a different width
      },
    {
        name: 'Action',
        selector: (row) => row.action,
        sortable: true,
        width: '100px', // Set a different width
      },
        
    {
      name: 'Description',
      selector: (row) => row.description,
      sortable: true,
    },
    
    {
      name: 'Actions',
      cell: (row) => (
        <ActionButtons>
        {/* {auditPermission?.canEdit &&   <ActionButton clr='green' onClick={() => navigate(`/edit-customer/${row._id}`)}><FaEdit/> Edit</ActionButton>}
           {auditPermission?.canView && <ActionButton clr="blue" onClick={() => navigate(`/customers/${row._id}`)}><FaEye/> View</ActionButton>}
          {auditPermission?.canDelete && <ActionButton clr="red" onClick={() =>  handleGrabId(row._id, row.name)}><FaTrash/> Delete</ActionButton>}*/}
           { <ActionButton clr="blue" onClick={() => navigate(`/customers/${row.documentId}`)}><FaEye/> View</ActionButton>}
          {  <ActionButton clr="red" onClick={() =>  handleGrabId(row._id, row.name)}><FaTrash/> Delete</ActionButton>}
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
              selectableRows// 👈 only show checkboxes if delete permission is true
              onSelectedRowsChange={({ selectedRows }) => setSelectedAuditLog(selectedRows)}
              selectableRowHighlight
            />
      </TableWrapper>

    {/* sliding button for delete bulk list */}
          {selectedAuditLog.length > 0 && (
          <SlideUpButton>

            <Button 
              btnColor={'red'} 
              btnOnClick={handleBulkDelete} 
              btnText= {isDeleting ? <ButtonLoader text="Deleting..." /> : `Delete Selected (${selectedAuditLog.length})`} 
              disabled={isDeleting}>             
            </Button>
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
                    <b>{grabAuditTitle} </b> <br/> Are you sure You want to delete the Audit Log
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
                      Are you sure you want to delete <b>{selectedAuditLog.length}</b> selected Audit Logs?
                    </p>
                  </Overlay>
                )}

                        
              {/* Toast message user component */}
              <ToastComponents/>
    </Container>
  );
};

export default AuditLogTable;





 