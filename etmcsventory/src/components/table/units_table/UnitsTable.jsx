
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { FaEdit, FaEnvelope, FaEye, FaFileInvoice, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { customStyles } from '../TableCustomStyle.style';
import { ActionButton, ActionButtons, Container, TableWrapper } from './unitsTable.style';
import { toast } from 'react-toastify';
import Overlay from '../../overlay/Overlay';
import ButtonLoader from '../../clicks/button/button_loader/ButtonLoader';
import ToastComponents from '../../toast_message/toast_component/ToastComponents';




const UnitsTable = ({ data, onDeleteUnit, unitPermission }) => {

  const navigate = useNavigate();

    const [showDeleteCard, setShowDeleteCard] = useState(false);
    const [grabId, setGrabId] = useState('');
    const [grabUnitName, setGrabUnitName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    
  const handleGrabId = (unitId, unitName)=>{
    setShowDeleteCard(true);
    setGrabId(unitId);
    setGrabUnitName(unitName);

}


  const handleUnitDelete = async (unitId) => {
    setIsLoading(true);
    try {
      const response = await onDeleteUnit(unitId); // call parent function
  
      if (response.success) {
        toast.success('Unit deleted successfully');
        setShowDeleteCard(false); // Close modal
      } else {
        toast.error('Error deleting user: ' + response.message);
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
      selector: (row) => row.title,
    },
    {
      name: 'Note',
      selector: (row) => row.note,
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
         {unitPermission.canEdit && <ActionButton clr='blue' onClick={() => navigate(`/edit-units/${row._id}`)}><FaEdit /></ActionButton>}
          {unitPermission.canDelete &&<ActionButton clr="red" onClick={() => handleGrabId(row._id, row.title)}><FaTrash /></ActionButton>}
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
                        Are you sure You want to delete the unit <b>{grabUnitName} </b> 
                  </p>
              </Overlay>
            }
      
            {/* Toast message user component */}
            <ToastComponents/>
    </Container>
  );
};

export default UnitsTable;
