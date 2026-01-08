// import React, {useState, useEffect} from 'react'
// import PageTitle from '../../../components/page_title/PageTitle'
// import { FaEdit, FaTrash } from 'react-icons/fa'
// import { useNavigate, useParams } from 'react-router-dom'
// import ItemContainer from '../../../components/item_container/ItemContainer'
// import { AnyItemContainer, InnerWrapper } from '../../admin/sale/Add/addSale.style'
// import axios from 'axios'
// import profilPiture from '../../../images/placeholder_image.png'
// import Overlay from '../../../components/overlay/Overlay'
// import { toast } from 'react-toastify'
// import ToastComponents from '../../../components/toast_message/toast_component/ToastComponents'
// import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader'
import ContentLoader, {
  List, 
  BulletList,
  Facebook,
  Instagram
} from 'react-content-loader'
import { CompanyDetailContent, CompanyDetailData, CompanyDetailPicture, CompanyDetailWrapper, PictureWrapper } from './CompanyDetail.style'
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PageTitle from '../../../components/page_title/PageTitle';
import ItemContainer from '../../../components/item_container/ItemContainer';
import { AnyItemContainer, InnerWrapper } from '../../sale/Add/addSale.style';
import Overlay from '../../../components/overlay/Overlay';
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader';
import ToastComponents from '../../../components/toast_message/toast_component/ToastComponents';
import { FaEdit, FaLongArrowAltRight, FaPlus, FaTrash } from 'react-icons/fa';
import companyLogosHolder from '../../../images/placeholder_image.png'
import Button from '../../../components/clicks/button/Button';
import Markdown from 'markdown-to-jsx';
import { UserContext } from '../../../components/context/UserContext';





export default function CompanyDetail() {

  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState('');
  const {companyId} = useParams();
  const companyIds = companyData?._id || companyId;
  // const companyIds = '';
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteCard, setShowDeleteCard] = useState(false);
  const [grabId, setGrabId] = useState('');
  const [grabCompanyname, setGrabCompanyname] = useState('');
  const token = localStorage.getItem('token');

        const {permissions, user} = useContext(UserContext);
        const companyPermission = permissions?.find(p => p.module === "Company")

            // Permission logic
      const isAdmin = user?.role === 'admin'
      const canEdit = isAdmin || companyPermission?.canEdit
      const canDelete = isAdmin || companyPermission?.canDelete

  

// Fetch Company detail function
useEffect(()=>{
  
  const fetchAllCompany = async() =>{
    setIsLoading(true)
      try {
          const res = await axios.get(`${process.env.REACT_APP_URL}/api/company`, {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });

          console.log("===========", res.data[0], "===================");          
          setCompanyData(res.data[0]);
          setIsLoading(false);
      } catch (error) {
          console.log(error);
          setIsLoading(false);
      }

  }
  fetchAllCompany();
},[])


const handleGrabId = (companyName)=>{
  setShowDeleteCard(true);
  setGrabCompanyname(companyName);

}


  // handle Company delete
        const deleteCompany = async (companyId) => {
          setIsLoading(true);
          try {
             
            await axios.delete(`${process.env.REACT_APP_URL}/api/company/${companyId}`, {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });

            
              toast.success('Company deleted successfully');
              setShowDeleteCard(false); // Close modal
              setIsLoading(false);
                // Reload the page
              navigate('/add-company')
            } catch (error) {
            return { success: false, message: error.message };
          }
        };
  
    


  return (<div> 
    {isLoading?
    <List/> :<>{ companyIds ?
        <CompanyDetailWrapper>
          <PageTitle title={'Company'} subTitle={' / View'}/>

          
          
          
          {/* content */}
       
          <CompanyDetailContent>
            
            <CompanyDetailPicture>
              <ItemContainer title={'Profile Picture'}> 
                <PictureWrapper imgUrl={companyData?.companyLogo ? `${process.env.REACT_APP_URL}/images/${companyData?.companyLogo}` : companyLogosHolder}></PictureWrapper>
              </ItemContainer>
            </CompanyDetailPicture>
            
            <CompanyDetailData>
              <ItemContainer title={'Company Detail'}> 
              <AnyItemContainer gap="60px">
              <InnerWrapper wd={'100%'}>
                          <span><b>Company Name</b></span>
                          <span>{companyData?.companyName}</span>
                       </InnerWrapper>
              </AnyItemContainer>
              <AnyItemContainer gap="60px">
                    <InnerWrapper wd={'100%'}>
                          <span><b>Tagline</b></span>
                          <span>{companyData?.tagLine}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="60px">
                    <InnerWrapper wd={'100%'}>
                          <span><b>Business Type</b></span>
                          <span>{companyData?.businessType}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="60px">
                    <InnerWrapper wd={'100%'}>
                          <span><b>Owner Name</b></span>
                          <span>{companyData?.ownersName}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
              <AnyItemContainer gap="60px">
                    <InnerWrapper wd={'100%'}>
                          <span><b>Mobile Number</b></span>
                          <span>{companyData?.mobileNumber}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="60px">
                    <InnerWrapper wd={'100%'}>
                          <span><b>Phone Number</b></span>
                          <span>{companyData?.phoneNumber}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="60px">
                  <InnerWrapper wd={'100%'}>
                          <span><b>Fax Number</b></span>
                          <span>{companyData?.faxNumber}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="60px">
                  <InnerWrapper wd={'100%'}>
                          <span><b>Tax Number</b></span>
                          <span>{companyData?.taxNumber}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="60px">
                  <InnerWrapper wd={'100%'}>
                          <span><b>Email</b></span>
                          <span>{companyData?.companyEmail}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="60px">
                  <InnerWrapper wd={'100%'}>
                          <span><b>Currency Code</b></span>
                          <span>{companyData?.currencyCode}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="60px">
                  <InnerWrapper wd={'100%'}>
                          <span><b>Currency Symbol</b></span>
                          <span dangerouslySetInnerHTML={{ __html: companyData?.currencySymbol }}/>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="60px">
                        <InnerWrapper wd={'100%'}>
                          <span><b>Address</b></span>
                          <span>{companyData?.address}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
              </ItemContainer>

                            {canEdit && <ItemContainer title={'Action'}> 
                             {canDelete && <AnyItemContainer gap="60px">
                                    <InnerWrapper wd={'100%'}>
                                          <span onClick={()=>handleGrabId(companyData?.Companyname)} style={{color: "red", cursor: "pointer"}}><b>Delete</b></span>
                                          <span onClick={()=>handleGrabId(companyData?.Companyname)} style={{color: "red", cursor: "pointer"}}><FaTrash/></span>
                                    </InnerWrapper>
                              </AnyItemContainer>}
                              {canEdit && <AnyItemContainer gap="60px">
                                    <InnerWrapper wd={'100%'}>
                                          <span onClick={()=>navigate(`/company/${companyData?._id}`)} style={{color: "green", cursor: "pointer"}}><b>Edit</b></span>
                                          <span onClick={()=>navigate(`/edit-company/${companyData?._id}`)} style={{color: "green", cursor: "pointer"}}><FaEdit/></span>
                                    </InnerWrapper>
                              </AnyItemContainer>}
                            </ItemContainer>}
            </CompanyDetailData>
          </CompanyDetailContent> 
          
          {showDeleteCard &&
                  <Overlay 
                    contentWidth={'30%'}
                    overlayButtonClick={()=>deleteCompany(companyData?._id)}
                    closeOverlayOnClick={()=>setShowDeleteCard(false)}
                    btnText1={isLoading ? <ButtonLoader text={'Deleting...'}/> : 'Yes'}
                  >
                    <p style={{margin: "40px", textAlign:"center", fontSize:"12px", lineHeight: "25px"}}>
                            Are you sure You want to delete the Company <b style={{textTransform:"capitalize"}}>{grabCompanyname} </b> 
                      </p>
              
                  </Overlay>
                }
          
                {/* Toast message Company component */}
                <ToastComponents/>
                
      </CompanyDetailWrapper >
      : 
      <CompanyDetailWrapper 
        justifyContent={'center'} 
          alignItem={'center'}
          containerHeight={'100vh'}
          >
            <h3>You have not added a company</h3>
            <p>Click the button below to add your company</p>
            <Button 
              btnColor={'green'}
              btnFontSize={'10px'}
              btnText={'Add Company here'}
              btnRightIcon={<FaLongArrowAltRight />}
              btnPd={'6px 12px'}
              btnOnClick={()=> navigate('/add-company')}
            />
      </CompanyDetailWrapper>
 } </>}</div>
    )
}