import { useNavigate } from "react-router-dom";
import { ActionButton, ActionButtons, Container, TableWrapper } from "./purchase.style";
import { FaEdit, FaFileInvoice, FaTrash } from "react-icons/fa";
import DataTable from "react-data-table-component";
import { customStyles } from "../TableCustomStyle.style";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SlideUpButton } from "../expense_table/Expense.style";
import Button from "../../clicks/button/Button";
import ButtonLoader from "../../clicks/button/button_loader/ButtonLoader";
import Overlay from "../../overlay/Overlay";
import ToastComponents from "../../toast_message/toast_component/ToastComponents";




const PurchaseTable = ({data, onDeletePurchase, purchasePermission}) => {
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
   const [grabPurchaseName, setGrabPurchaseName] = useState('');
   const [isLoading, setIsLoading] = useState(false);
  
   const handleGrabId = (purchaseId, purchaseName, purchaseCode)=>{
              setShowDeleteCard(true);
              setGrabId(purchaseId);
              setGrabPurchaseName(purchaseName); 
              setGrabCode(purchaseCode) 
          }

// Handle delete
               const handlePurchaseDelete = async (purchaseId) => {
                  setIsLoading(true);
                  try {
                    const response = await onDeletePurchase(purchaseId); // call parent function
                
                    if (response.success) {
                      toast.success('Purchase deleted successfully');
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
                       const [selectedPurchase, setSelectedPurchase] = useState([]);
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
                          await axios.delete(`${process.env.REACT_APP_URL}/api/purchase/bulk-delete`, {
                            data: { ids: selectedPurchase.map((e) => e._id) },
                            headers: {Authorization: `Bearer ${token}`}
                          });
                          toast.success(`${selectedPurchase.length} purchases deleted successfully`);
                      
                          // remove deleted from UI
                            const deletedIds = selectedPurchase.map((e) => e._id);
                            const updatedList = data.filter(purchase => !deletedIds.includes(purchase._id));
                            setSelectedPurchase([]);
                            onDeletePurchase(null, updatedList); // pass updated list to parent
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
        const date = new Date(row.purchaseDate);
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
      name: 'Supplier',
      selector: (row) => row.supplier?.name,
      sortable: true,
      width: '20%',
    },
    {
      name: 'Status',
      selector: (row) => row.purchaseStatus,
      sortable: true,
      width: '13%',
    },
     {
      name: 'Grand Total',
      selector: (row) => <div>
        <span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{row.purchaseAmount.toLocaleString()}
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
        {purchasePermission.canView &&  <ActionButton clr='green' onClick={() => navigate(`/purchase-invoice/${row._id}`)}><FaFileInvoice/></ActionButton>}
          {purchasePermission.canEdit && <ActionButton clr='blue' onClick={() => navigate(`/edit-purchase/${row._id}`)}><FaEdit/></ActionButton>}
          {purchasePermission.canDelete && <ActionButton clr="red" onClick={() => handleGrabId(row._id, row.supplier.name, row.code)}><FaTrash/></ActionButton>}
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
                      selectableRows={purchasePermission.canDelete} // 👈 only show checkboxes if delete permission is true
                      onSelectedRowsChange={
                          purchasePermission.canDelete
                            ? ({ selectedRows }) => setSelectedPurchase(selectedRows)
                            : undefined
                        }
                        selectableRowHighlight={purchasePermission.canDelete}
                    />
      </TableWrapper>
       {/* sliding button for delete bulk list */}
          {selectedPurchase.length > 0 && (
          <SlideUpButton>
          {purchasePermission.canDelete &&  
          <Button 
              btnColor={'red'} 
              btnOnClick={handleBulkDelete} 
              btnText= {isDeleting ? <ButtonLoader text="Deleting..." /> : `Delete Selected (${selectedPurchase.length})`} 
              disabled={isDeleting}>             
            </Button>}
          </SlideUpButton>
        )}

    {/* modal to delete single items */}
          {showDeleteCard &&
                              <Overlay 
                                contentWidth={'30%'}
                                overlayButtonClick={()=>handlePurchaseDelete(grabId)}
                                closeOverlayOnClick={()=>setShowDeleteCard(false)}
                                btnText1={isLoading ? <ButtonLoader text={'Deleting...'}/> : 'Yes'}
                              >
                                <p style={{margin: "40px", textAlign:"center", fontSize:"12px", lineHeight: "25px"}}>
                                        Are you sure You want to delete the purchase items with the  code <strong>{grabCode}</strong> by the supplier <b>{grabPurchaseName} </b> 
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
          Are you sure you want to delete <b>{selectedPurchase.length}</b> selected purchases?
        </p>
      </Overlay>
    )}

    {/* Toast message user component */}
      <ToastComponents/>
    </Container>
  );
};

export default PurchaseTable;
