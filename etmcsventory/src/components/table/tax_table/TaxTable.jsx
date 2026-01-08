
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { FaEdit, FaEnvelope, FaEye, FaFileInvoice, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { customStyles } from '../TableCustomStyle.style';
import { ActionButton, ActionButtons, Container, TableWrapper } from './taxTable.style';
import { toast } from 'react-toastify';
import Overlay from '../../overlay/Overlay';
import ButtonLoader from '../../clicks/button/button_loader/ButtonLoader';
import ToastComponents from '../../toast_message/toast_component/ToastComponents';


const TaxTable = ({ data, onDeleteTax, taxPermission }) => {

  const navigate = useNavigate();
  
  
      const [showDeleteCard, setShowDeleteCard] = useState(false);
      const [grabId, setGrabId] = useState('');
      const [grabTaxName, setGrabTaxName] = useState('');
      const [isLoading, setIsLoading] = useState(false);

      const handleGrabId = (taxId, taxName)=>{
        setShowDeleteCard(true);
        setGrabId(taxId);
        setGrabTaxName(taxName);
    
    }



      const handleUnitDelete = async (taxId) => {
        setIsLoading(true);
        try {
          const response = await onDeleteTax(taxId); // call parent function
      
          if (response.success) {
            toast.success('Tax deleted successfully');
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


  
  const columns = [
    {
      name: 'S/N',
      selector: (row, i) => i + 1,
      width: '100px',
      center: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
    },
    {
      name: 'Tax(%) For',
      selector: (row) => row.taxPercentage,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <ActionButtons>
          {taxPermission.canEdit && <ActionButton clr='blue' onClick={() => navigate(`/edit-tax/${row._id}`)}><FaEdit /></ActionButton>}
          {taxPermission.canView && <ActionButton clr="red" onClick={() => handleGrabId(row._id, row.name)}><FaTrash /></ActionButton>}
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
          responsive
          customStyles={customStyles}
        />
      </TableWrapper>
       {showDeleteCard &&
                    <Overlay 
                      contentWidth={'30%'}
                      overlayButtonClick={()=>handleUnitDelete(grabId)}
                      closeOverlayOnClick={()=>setShowDeleteCard(false)}
                      btnText1={isLoading ? <ButtonLoader text={'Deleting...'}/> : 'Yes'}
                    >
                      <p style={{margin: "40px", textAlign:"center", fontSize:"12px", lineHeight: "25px"}}>
                              Are you sure You want to delete the unit <b>{grabTaxName} </b> 
                        </p>
                    </Overlay>
                  }
            
                  {/* Toast message user component */}
                  <ToastComponents/>
    </Container>
  );
};

export default TaxTable;
