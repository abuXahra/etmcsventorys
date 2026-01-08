
import React, { useId, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaEnvelope, FaEye, FaFileInvoice, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ActionButton, ActionButtons, Container, TableWrapper } from './usertable.style';
import { customStyles } from '../TableCustomStyle.style';
import Overlay from '../../overlay/Overlay';
import axios from 'axios';
import ButtonLoader from '../../clicks/button/button_loader/ButtonLoader';
import { ToastContainer, toast } from 'react-toastify';
import ToastComponents from '../../toast_message/toast_component/ToastComponents';
import userPicture from '../../../images/placeholder_image.png'


const UserTable = ({ data, onDeleteUser, userPermission }) => {

 

  const navigate = useNavigate();

  const [showDeleteCard, setShowDeleteCard] = useState(false);
  const [grabId, setGrabId] = useState('');
  const [grabUsername, setGrabUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleGrabId = (userId, userName)=>{
    setShowDeleteCard(true);
    setGrabId(userId);
    setGrabUsername(userName);

}



  const handleUserDelete = async (userId) => {
    setIsLoading(true);
    try {
      const response = await onDeleteUser(userId); // call parent function
  
      if (response.success) {
        toast.success('User deleted successfully');
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
      name: 'Photo',
      selector: (row) => <img
      src={row.imgUrl ? process.env.REACT_APP_URL+'/images/'+ row.imgUrl : userPicture}
      alt={row.username}
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '100%',
        objectFit: 'cover'
      }}
    />,
      // cell: (row) => <img src={`${process.env.REACT_APP_URL}/images/${row.imgUrl}` || pix} alt={row.name} style={{ width: '20px', borderRadius: '100%', height: '20px', objectFit: 'cover' }} />,
      width: '100px',
    },
    {
      name: 'Name',
      selector: (row) => row.username,
      sortable: true,
      width: '200px',
    },

    {
      name: 'Phone',
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
    {
      name: 'Role',
      selector: (row) => row.role,
      sortable: true,
      width: '100px',
    },
    {
      name: 'Address',
      selector: (row) => row.address,
      sortable: true,
      width: '200px',
    },
   {
      name: 'Actions',
      cell: (row) => (
        <ActionButtons>
         {userPermission.canView && <ActionButton clr='green' onClick={() => navigate(`/users/${row._id}`)}><FaEye /></ActionButton>}
         {userPermission.canEdit &&  <ActionButton clr='blue' onClick={() => navigate(`/edit-user/${row._id}`)}><FaEdit /></ActionButton>}
         {userPermission.canDelete &&  <ActionButton clr="red" onClick={() => handleGrabId(row._id, row.username)}><FaTrash /></ActionButton>}
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
          overlayButtonClick={()=>handleUserDelete(grabId)}
          closeOverlayOnClick={()=>setShowDeleteCard(false)}
          btnText1={isLoading ? <ButtonLoader text={'Deleting...'}/> : 'Yes'}
        >
          <p style={{margin: "40px", textAlign:"center", fontSize:"12px", lineHeight: "25px"}}>
                  Are you sure You want to delete the user <b>{grabUsername} </b> 
            </p>
    
        </Overlay>
      }

      {/* Toast message user component */}
      <ToastComponents/>
    </Container>
  );
};

export default UserTable;
