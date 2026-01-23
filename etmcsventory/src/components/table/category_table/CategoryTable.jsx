
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { FaEdit, FaEnvelope, FaEye, FaFileInvoice, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ActionButton, ActionButtons, TableWrapper } from './categoryTable.style';
import { Container } from '@mui/material';
import { customStyles } from '../TableCustomStyle.style';
import catPiture from '../../../images/product_placeholder.jpg'
import { toast } from 'react-toastify';
import Overlay from '../../overlay/Overlay';
import ButtonLoader from '../../clicks/button/button_loader/ButtonLoader';
import ToastComponents from '../../toast_message/toast_component/ToastComponents';



const CategoryTable = ({data, onDeleteCat, categoryPermission}) => {
  
        const navigate = useNavigate();

        const [showDeleteCard, setShowDeleteCard] = useState(false);
        const [grabId, setGrabId] = useState('');
        const [grabCategoryName, setGrabCategoryName] = useState('');
        const [isLoading, setIsLoading] = useState(false);
  
        const handleGrabId = (categoryId, categoryName)=>{
          setShowDeleteCard(true);
          setGrabId(categoryId);
          setGrabCategoryName(categoryName);
      
      }
  

      const handleDelete = async (categoryId) => {
              setIsLoading(true);
              try {
                const response = await onDeleteCat(categoryId); // call parent function
            
                if (response.success) {
                  toast.success('Category deleted successfully');
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

    // {
    //   name: 'S/N',
    //   selector: (row, i) => i + 1,
    //   width: '100px',
    //   center: true,
    // },
     {
          name: 'Photo',
          selector: (row) => <img
          src={row.imgUrl ? process.env.REACT_APP_URL+'/images/'+ row.imgUrl : catPiture}
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
        name: 'Code',
        selector: (row) => row.code,
        sortable: true,
        width: '100px', // Set a different width
      },
    {
        name: 'Name',
        selector: (row) => row.title,
        sortable: true,
      },
    {
      name: 'Note',
      selector: (row) => row.note,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
       width: '10%',
    },
    {
      name: 'Products',
      selector: (row) => row.totalProducts,
       width: '10%',
    },
    {
      name: 'Actions',
       width: '20%',
      cell: (row) => (
        <ActionButtons>
        {categoryPermission?.canView &&  <ActionButton clr='green' onClick={() => navigate(`/category-detail/${row._id}`)}><FaEye/> View</ActionButton>}
          {categoryPermission?.canEdit && <ActionButton clr='blue' onClick={() => navigate(`/edit-category/${row._id}`)}><FaEdit/> Edit</ActionButton>}
          {categoryPermission?.canDelete && <ActionButton clr="red" onClick={() =>handleGrabId(row._id, row.title)}><FaTrash/> Delete</ActionButton>}
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

      {/* Delete Card */}
       {showDeleteCard &&
        <Overlay 
          contentWidth={'30%'}
          overlayButtonClick={()=>handleDelete(grabId)}
          closeOverlayOnClick={()=>setShowDeleteCard(false)}
          btnText1={isLoading ? <ButtonLoader text={'Deleting...'}/> : 'Yes'}
          >
            <p style={{margin: "40px", textAlign:"center", fontSize:"12px", lineHeight: "25px"}}>
              Are you sure You want to delete the Category <b>{grabCategoryName} </b> 
            </p>
        </Overlay>
                        }
                  
        {/* Toast message user component */}
        <ToastComponents/>
    </Container>
  );
};

export default CategoryTable;
