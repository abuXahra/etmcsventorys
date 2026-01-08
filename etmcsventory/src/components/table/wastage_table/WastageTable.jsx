
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaEnvelope, FaEye, FaFileInvoice, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ActionButton, Container, ActionButtons, SlideUpButton, TableWrapper, ActionText } from '../expense_table/Expense.style';
import Button from '../../clicks/button/Button';
import ButtonLoader from '../../clicks/button/button_loader/ButtonLoader';
import Overlay from '../../overlay/Overlay';
import { customStyles } from '../TableCustomStyle.style';
import ToastComponents from '../../toast_message/toast_component/ToastComponents';



// ✅ Local row component to isolate hover state
const ActionCell = ({ row, navigate, wastagePermission, handleGrabId }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ActionButtons>
      {wastagePermission.canView && (
        <ActionButton clr="green" onClick={() => navigate(`/purchase-invoice/${row.purchaseId}`)}>
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ position: 'relative' }}
          >
            <FaFileInvoice />
            {isHovered && <ActionText>Purchase Invoice</ActionText>}
          </div>
        </ActionButton>
      )}

      {wastagePermission.canDelete && (
        <ActionButton clr="red" onClick={() => handleGrabId(row._id, row.title, row.code)}>
          <FaTrash />
        </ActionButton>
      )}
    </ActionButtons>
  );
};




const WastageTable = ({data, onDeleteWastage, wastagePermission}) => {
  const token = localStorage.getItem('token');
    
  const navigate = useNavigate();
   // Hover state for invoice icon
  
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
     const [grabWastageTitle, setGrabWastageTitle] = useState('');
     const [isLoading, setIsLoading] = useState(false);
    
     const handleGrabId = (wastageId, title, wastageCode)=>{
                setShowDeleteCard(true);
                setGrabId(wastageId);
                setGrabWastageTitle(title); 
                setGrabCode(wastageCode) 
            }
  
  // Handle delete
                 const handleSaleDelete = async (wastageId) => {
                    setIsLoading(true);
                    try {
                      const response = await onDeleteWastage(wastageId); // call parent function
                  
                      if (response.success) {
                        toast.success('wastage item deleted successfully');
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
                         const [selectedWastages, setSelectedWastages] = useState([]);
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
                            await axios.delete(`${process.env.REACT_APP_URL}/api/wastage/bulk-delete`, {
                              data: { ids: selectedWastages.map((e) => e._id) },
                              headers: {Authorization: `Bearer ${token}`}
                            });
                            toast.success(`${selectedWastages.length} Wastage items deleted successfully`);
                        
                            // remove deleted from UI
                              const deletedIds = selectedWastages.map((e) => e._id);
                              const updatedList = data.filter(wastage => !deletedIds.includes(wastage._id));
                              setSelectedWastages([]);
                              onDeleteWastage(null, updatedList); // pass updated list to parent
                              setShowBulkDeleteCard(false);
                            } catch (err) {
                            console.error(err);
                            toast.error('Failed to delete selected wastage items');
                          } finally {
                            setIsDeleting(false);
                          }
                        };
    

 const columns = [
  {
  name: 'Date',
  sortable: true,
  selector: (row) => {
    const date = new Date(row.wastageDate);
    const parts = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).split(' ');
    parts[0] = parts[0].replace(/([A-Za-z]+)/, '$1.'); // Add period
    return parts.join(' ');
  },
},

          {
       name: 'Title',
       selector: (row) => row.title,
       sortable: true,
     },
          {
       name: 'Reason',
       selector: (row) => row.reason,
       sortable: true,
     },
     {
       name: 'Invoice No.',
       selector: (row) => row.invoiceNo,
       sortable: true,
      //  width: '8%',
     },

     {
       name: 'Quantity',
       selector: (row) => row.quantity,
       sortable: true,
     },
    //   {
    //    name: 'Unit Amount',
    //    selector: (row) => <div>
    //      <span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{row.unitCost.toLocaleString()}
    //    </div>  ,
    //    sortable: true,
    //    width: '13%',
    //  },
    // {
    //    name: 'Tax Amount',
    //    selector: (row) => <div>
    //      <span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{row.taxAmount.toLocaleString()}
    //    </div>  ,
    //    sortable: true,
    //    width: '13%',
    //  },
     {
       name: 'Amount',
       selector: (row) => <div>
         <span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{row.amount.toLocaleString()}
       </div>  ,
       sortable: true,
       width: '13%',
     },
     {
       name: 'Actions',
       cell: (row) => (
       <ActionCell
          row={row}
          navigate={navigate}
          wastagePermission={wastagePermission}
          handleGrabId={handleGrabId}
        />),
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
            paginationRowsPerPageOptions={[50, 100, 200, 500]} // Options in the dropdown
            responsive
            customStyles={customStyles}
            selectableRows={wastagePermission.canDelete} // 👈 only show checkboxes if delete permission is true
            onSelectedRowsChange={
                          wastagePermission.canDelete
                            ? ({ selectedRows }) => setSelectedWastages(selectedRows)
                            : undefined
                        }
            selectableRowHighlight={wastagePermission.canDelete}
        />
      </TableWrapper>

       {/* sliding button for delete bulk list */}
          {selectedWastages.length > 0 && (
          <SlideUpButton>
            {wastagePermission.canDelete &&
             <Button 
              btnColor={'red'} 
              btnOnClick={handleBulkDelete} 
              btnText= {isDeleting ? <ButtonLoader text="Deleting..." /> : `Delete Selected (${selectedWastages.length})`} 
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
                                        Are you sure You want to delete the Wastage item <b>{grabWastageTitle}</b> with the  code <strong>{grabCode}</strong>
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
          Are you sure you want to delete <b>{selectedWastages.length}</b> selected Wastage Items?
        </p>
      </Overlay>
    )}

    {/* Toast message user component */}
      <ToastComponents/>
    </Container>
  );
};

export default WastageTable;
