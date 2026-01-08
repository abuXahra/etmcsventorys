import React, {useState, useEffect, useContext} from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import { UserDetailContent, UserDetailData, UserDetailPicture, UserDetailWrapper, PictureWrapper } from './userDetail.style'
import { FaEdit, FaSignOutAlt, FaTrash } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import ItemContainer from '../../../components/item_container/ItemContainer'
import { AnyItemContainer, InnerWrapper } from '../../sale/Add/addSale.style'
import axios from 'axios'
import profilPiture from '../../../images/placeholder_image.png'
import Overlay from '../../../components/overlay/Overlay'

import { toast } from 'react-toastify'
import ToastComponents from '../../../components/toast_message/toast_component/ToastComponents'
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader'
import ContentLoader, {
  List, 
  BulletList,
  Facebook,
  Instagram
} from 'react-content-loader'
import { UserContext } from '../../../components/context/UserContext'


export default function UserDetail() {
const token = localStorage.getItem('token');
    
  const navigate = useNavigate();
  const [userData, setUserData] = useState('');
  const {userId} = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteCard, setShowDeleteCard] = useState(false);
  const [grabId, setGrabId] = useState('');
  const [grabUsername, setGrabUsername] = useState('');
  


    // user permission:
        const {permissions, user, setUser} = useContext(UserContext);
        const userPermission = permissions?.find(p => p.module === "User")
  
              // Permission logic
        const isAdmin = user?.role === 'admin'
        const canEdit = isAdmin || userPermission?.canEdit
  
  
  
        const handleLogout = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_URL + '/api/auth/logout', { withCredentials: true });
      setUser(null);
      localStorage.removeItem("user"); // ✅ Clear storage
      localStorage.removeItem("token"); // Clear token
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };        const canDelete = isAdmin || userPermission?.canDelete
      

  

// Fetch user detail function
useEffect(()=>{
  const fetchUser = async() =>{
    setIsLoading(true)
      try {
          const res = await axios.get(`${process.env.REACT_APP_URL}/api/users/${userId}`, {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });
          console.log(res.data);          
          setUserData(res.data);
          setIsLoading(false);
      } catch (error) {
          console.log(error);
          setIsLoading(false);
      }

  }
  fetchUser();
},[userId])


const handleGrabId = (userName)=>{
  setShowDeleteCard(true);
  setGrabUsername(userName);

}


  // handle user delete
        const deleteUser = async (userId) => {
          setIsLoading(true);
          try {
             
            await axios.delete(`${process.env.REACT_APP_URL}/api/users/${userId}`, {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });
           
              toast.success('User deleted successfully');
              setShowDeleteCard(false); // Close modal
              setIsLoading(false);
              navigate('/users')
          } catch (error) {
            return { success: false, message: error.message };
          }
        };
  


  return (
        <UserDetailWrapper>
          <PageTitle title={'User'} subTitle={' / View'}/>

          {/* content */}
          <>
        {isLoading?
        <List/> :
          <UserDetailContent>
            
            <UserDetailPicture>
              <ItemContainer title={'Profile Picture'}> 
                <PictureWrapper imgUrl={userData?.imgUrl ? `${process.env.REACT_APP_URL}/images/${userData?.imgUrl}` : profilPiture}>
                  {/* <img src={userData ? `${process.env.REACT_APP_URL}/images/${userData.imgUrl}` : profilPiture} alt="" srcset="" /> */}
                </PictureWrapper>
                
              </ItemContainer>
            </UserDetailPicture>
            
            <UserDetailData>
              <ItemContainer title={'User Detail'}> 
              <AnyItemContainer gap="60px">
              <InnerWrapper wd={'100%'}>
                          <span><b>Name</b></span>
                          <span>{userData?.username}</span>
                       </InnerWrapper>
              </AnyItemContainer>
              <AnyItemContainer gap="60px">
              <InnerWrapper wd={'100%'}>
                          <span><b>Phone Number</b></span>
                          <span>{userData?.phoneNumber}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="60px">
                  <InnerWrapper wd={'100%'}>
                          <span><b>Email</b></span>
                          <span>{userData?.email}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="60px">
                  <InnerWrapper wd={'100%'}>
                          <span><b>Tax Number</b></span>
                          <span>{userData?.taxNumber}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="60px">
                        <InnerWrapper wd={'100%'}>
                          <span><b>Address</b></span>
                          <span>{userData?.address}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="60px">
                        <InnerWrapper wd={'100%'}>
                          <span><b>Role</b></span>
                          <span>{userData?.role}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
              </ItemContainer>

                            <ItemContainer title={'Action'}> 
  {      canEdit &&                       
                                <AnyItemContainer gap="60px">
                                    <InnerWrapper wd={'100%'}>
                                          <span onClick={()=>navigate(`/users/${userData?._id}`)} style={{color: "green", cursor: "pointer"}}><b>Edit</b></span>
                                          <span onClick={()=>navigate(`/edit-user/${userData?._id}`)} style={{color: "green", cursor: "pointer"}}><FaEdit/></span>
                                    </InnerWrapper>
                              </AnyItemContainer>}
         {     canDelete &&                <AnyItemContainer gap="60px">
                                    <InnerWrapper wd={'100%'}>
                                          <span onClick={()=>handleGrabId(userData?.username)} style={{color: "red", cursor: "pointer"}}><b>Delete</b></span>
                                          <span onClick={()=>handleGrabId(userData?.username)} style={{color: "red", cursor: "pointer"}}><FaTrash/></span>
                                    </InnerWrapper>
                              </AnyItemContainer>}
                                                            <AnyItemContainer gap="60px">
                                    <InnerWrapper wd={'100%'}>
                                          <span onClick={()=>handleGrabId(handleLogout)} style={{color: "red", cursor: "pointer"}}><b>Logout</b></span>
                                          <span onClick={()=>handleGrabId(handleLogout)} style={{color: "red", cursor: "pointer"}}><FaSignOutAlt/></span>
                                    </InnerWrapper>
                              </AnyItemContainer>
                            </ItemContainer>
            </UserDetailData>
          </UserDetailContent> }
          </>
          {showDeleteCard &&
                  <Overlay 
                    contentWidth={'30%'}
                    overlayButtonClick={()=>deleteUser(userData?._id)}
                    closeOverlayOnClick={()=>setShowDeleteCard(false)}
                    btnText1={isLoading ? <ButtonLoader text={'Deleting...'}/> : 'Yes'}
                  >
                    <p style={{margin: "40px", textAlign:"center", fontSize:"12px", lineHeight: "25px"}}>
                            Are you sure You want to delete the user <b style={{textTransform:"capitalize"}}>{grabUsername} </b> 
                      </p>
              
                  </Overlay>
                }
          
                {/* Toast message user component */}
                <ToastComponents/>
      </UserDetailWrapper>
    )
}
