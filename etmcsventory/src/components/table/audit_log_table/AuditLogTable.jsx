
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
import { AnyItemContainer, InnerWrapper } from '../../../pages/sale/Add/addSale.style';
import { useEffect } from 'react';


const AuditLogTable = ({data, onDeleteAudit, auditPermission}) => {
  const token = localStorage.getItem('token');
    
  console.log('audit data: \n', data)

  const navigate = useNavigate();

  const [showDeleteCard, setShowDeleteCard] = useState(false);
  const [grabId, setGrabId] = useState('');
  const [grabAuditTitle, setGrabAuditTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDetailCard, setShowDetailCard] = useState(false);

  const [activity, setActivity] = useState('')
  const [module, setModule] = useState('')
  const [username, setUsername] = useState('')
  const [date, setDate] = useState('')
  const [docId, setDocId] = useState('')
  const [showView, setShowView] = useState(true);

 

  const handleActivityDetail = (_id, docId, userame, title, module, desc, date) =>{
    setShowDetailCard(true)
    setGrabId(_id)
    setDocId(docId)
    setUsername(userame)
    setModule(module)
    setActivity(desc)
    setDate(date)
    setGrabAuditTitle(title)
  }
  


 const handleGrabId = (auditId, auditTitle)=>{
          setShowDeleteCard(true);
          setGrabId(auditId);
          setGrabAuditTitle(auditTitle);
      
      }
  

    // const handleDelete = (auditId, auditTitle)=>{
    //       setShowDeleteCard(true);
    //       setGrabId(auditId);
    //       setGrabAuditTitle(auditTitle);
      
    //   }
  


      const handleDelete = async (auditId) => {
 
              setIsLoading(true);
              try {
                const response = await onDeleteAudit(auditId); // call parent function
            
                if (response.success) {
                  toast.success('Audit Log deleted successfully');
                  setShowDetailCard(false); // Close modal
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
                await axios.delete(`${process.env.REACT_APP_URL}/api/activity/bulk-delete`, {
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

          const auditDate = (auditDateItem) => {
            const date = new Date(auditDateItem);
            const parts = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            }).split(' ');
            parts[0] = parts[0].replace(/([A-Za-z]+)/, '$1.'); // Add period
            return parts.join(' ');
        }


        const auditTime = (time) => {
          const date = new Date(time);
          return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          });
        };

        const handleNavigate = (moduleName, documentId) => {
         
          if(moduleName === 'Category'){
            return  navigate(`/category-detail/${documentId}`)
          }else if(moduleName === 'Product'){
             return navigate(`/product-detail/${documentId}`)
          } else if(moduleName === 'Sale'){
            return navigate(`/sale-invoice/${documentId}`)
          } else if(moduleName === 'Customer'){
            return navigate(`/customers/${documentId}`)
          } else if(moduleName === 'Purchase'){
            return navigate(`/purchase-invoice/${documentId}`)
          } else if(moduleName === 'Supplier'){
            return navigate(`/supplier-detail/${documentId}`)
          } else if(moduleName === 'Payment'){
            return navigate(`/edit-payment/${documentId}`)
          } else if(moduleName === 'Expense'){
            return navigate(`/edit-expense/${documentId}`)
          } else if(moduleName === 'SaleReturn'){
            return navigate(`/sale-return/${documentId}`)
          }
           else if(moduleName === 'PurchaseReturn'){
            return navigate(`/purchase-return/${documentId}`)
          }
         else if(moduleName === 'Company'){
            return navigate(`/company-profile`)
          }
           else if(moduleName === 'Tax'){
            return navigate(`/edit-tax/${documentId}`)
          }
            else if(moduleName === 'Unit'){
            return navigate(`/edit-unit/${documentId}`)
          }

          else if(moduleName === 'User'){
            return navigate(`/edit-user/${documentId}`)
          }
          
        else if(moduleName === 'Wastage'){
            return navigate(`/wastage-detail/${documentId}`)
          }

       else if(moduleName === 'Permission'){
            return navigate(`/edit-permission/${documentId}`)
          }
      }

            
      
  const columns = [

    {
  name: 'Date',
  width: '12%',
  sortable: true,
  cell: (row) => {
    const date = new Date(row.createdAt);

    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span>{formattedDate}</span>
        <span style={{ fontSize: '10px', color: '#888' }}>
          {formattedTime}
        </span>
      </div>
    );
  },
},


     {
      name: 'Username',
      sortable: true,
      width: '20%',
      cell: (row) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>{row.username}</span>
          <span style={{ fontSize: '10px', color: '#888' }}>
            {row.user?.role || '—'}
          </span>
        </div>
      ),
    },
 
      {
        name: 'Module',
        selector: (row) => row.module,
        sortable: true,
        width: '10%', // Set a different width
      },
        
    {
      name: 'Activity',
      selector: (row) => row.description,
      sortable: true,
      // width: '30%',
       width: '40%',
    },
    
    {
      name: 'Actions',
      cell: (row) => (
        <ActionButtons>
        {/* {auditPermission?.canEdit &&   <ActionButton clr='green' onClick={() => navigate(`/edit-customer/${row._id}`)}><FaEdit/> Edit</ActionButton>}
           {auditPermission?.canView && <ActionButton clr="blue" onClick={() => navigate(`/customers/${row._id}`)}><FaEye/> View</ActionButton>}
          {auditPermission?.canDelete && <ActionButton clr="red" onClick={() =>  handleGrabId(row._id, row.name)}><FaTrash/> Delete</ActionButton>}*/}
            {/* {  <ActionButton clr="red" onClick={() =>  handleGrabId(row?._id, row.newData.title)}><FaTrash/> Delete</ActionButton>} */}
           {row.action !== 'DELETE' && <ActionButton clr="blue" onClick={() => handleActivityDetail(row._id, row.documentId, row.username, row.newData.title, row.module, row.description, row.createdAt)}><FaEye/> View</ActionButton>}

        </ActionButtons>
      ),
    },
  ];

  // () => navigate(`/customers/${row.documentId}`)}

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
              // selectableRows// 👈 only show checkboxes if delete permission is true
              // onSelectedRowsChange={({ selectedRows }) => setSelectedAuditLog(selectedRows)}
              // selectableRowHighlight
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


        {/* modal to view acivity detail*/}
             {showDetailCard &&
              <Overlay 
                contentWidth={'50%'}
                overlayButtonClick={()=>handleNavigate(module,docId)}
                closeOverlayOnClick={()=>setShowDetailCard(false)}
                alternatFunc={()=>handleDelete(grabId)}
                btnText1={'View Detail'}
                btnText2={isLoading ? <ButtonLoader text={'Deleting...'}/> : 'Delete Log'}
                >

                  <h3>Audit Detail</h3>
                  
  {/* docId */}
                <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Module</b></span>
                          <span>{module}</span>
                       </InnerWrapper>
                  </AnyItemContainer> 
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Username</b></span>
                          <span>{username}</span>
                       </InnerWrapper>
                  </AnyItemContainer> 

                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Title</b></span>
                          <span>{grabAuditTitle}</span>
                       </InnerWrapper>
                  </AnyItemContainer> 

                  
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Description</b></span>
                          <span>{activity}</span>
                       </InnerWrapper>
                  </AnyItemContainer>


                <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Date</b></span>
                          <span>{auditDate(date)}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Time</b></span>
                          <span>{ auditTime(date)}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
              </Overlay>
            }



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





 