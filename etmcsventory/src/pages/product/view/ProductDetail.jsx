import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import { ProductDetailContent, ProductDetailData, ProductDetailPicture, ProductDetailWrapper } from './ProductDetail.style'
import ItemContainer from '../../../components/item_container/ItemContainer'
import productPicture from '../../../images/product_placeholder.jpg'
import { AnyItemContainer, InnerWrapper } from '../../sale/Add/addSale.style'
import { FaEdit, FaList, FaTrash } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { PictureWrapper } from '../../user/detail/userDetail.style'
import axios from 'axios'
import { toast } from 'react-toastify'
import Overlay from '../../../components/overlay/Overlay'
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader'
import ToastComponents from '../../../components/toast_message/toast_component/ToastComponents'
import { List } from 'react-content-loader'
import { TopCard, TopCardContent, TopCardContentWrapper, TopCardIcon } from '../../home/Home.style'
import { TopCardItemList } from '../../../data/TopcardItems'
import { UserContext } from '../../../components/context/UserContext'
import ReactPlayer from "react-player";


export default function ProductDetail() {
  const token = localStorage.getItem('token');
    
    const navigate = useNavigate();
    const {productId} = useParams();
    const [prodData, setProdData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isBtnLoading, setIsBtnLoading] = useState(false);
    const [showDeleteCard, setShowDeleteCard] = useState(false);
    const [grabId, setGrabId] = useState('');
    const [grabTitle, setGrabTitle] = useState('');
    const [showProdImage, setShowProdImage] = useState(false);
    const [companyData, setCompanyData] = useState('')
    
    let totalProdSale = (prodData?.saleQuantity) * (prodData?.salePrice)
    let totalProdPurchase = (prodData?.purchaseQuantity) * (prodData?.purchasePrice)
    let netProfit = totalProdSale - totalProdPurchase;

    // user permission:
      const {permissions, user} = useContext(UserContext);
      const customerPermission = permissions?.find(p => p.module === "Product")

            // Permission logic
      const isAdmin = user?.role === 'admin'
      const canEdit = isAdmin || customerPermission?.canEdit
      const canDelete = isAdmin || customerPermission?.canDelete
    
    
    
      // Fetch product detail
              useEffect(()=>{
                const fetchProduct = async() =>{
                  setIsLoading(true)
                    try {
                        const res = await axios.get(`${process.env.REACT_APP_URL}/api/products/${productId}`,{
                            headers: {
                              Authorization: `Bearer ${token}`
                            }
                          } );        
                        console.log('====== product data: \n', res.data, '==================')
                        setProdData(res.data);
                        setIsLoading(false);
                    } catch (error) {
                        console.log(error);
                        setIsLoading(false);
                    }
              
                }
                fetchProduct();


                const fetchCompany = async() =>{
                                    // setIsLoading(true)
                                      try {
                                          const res = await axios.get(`${process.env.REACT_APP_URL}/api/company`, {
                                          headers: {
                                            Authorization: `Bearer ${token}`
                                          }
                                        } );
                                      setCompanyData(res.data[0])
                                          // setIsLoading(false);
                                      } catch (error) {
                                          console.log(error);
                                          // setIsLoading(false);
                                      }
                                
                                  }
                                  fetchCompany();
              },[productId])
    
          
               const handleGrabId = (title)=>{
              setShowDeleteCard(true);
              setGrabTitle(title);
            
            }
            
            
              // handle delete
                    const deleteProduct = async (productId) => {
                      setIsBtnLoading(true);
                      try {
                         
                        await axios.delete(`${process.env.REACT_APP_URL}/api/products/${productId}`, {
                              headers: {
                                Authorization: `Bearer ${token}`
                              }
                            } );
                          toast.success('Product deleted successfully');
                          setShowDeleteCard(false); // Close modal
                          setIsBtnLoading(false);
                          navigate('/products')
                      } catch (error) {
                        return { success: false, message: error.message };
                      }
                    };
              
      const imgSrc = prodData?.imgUrl
  ? `${process.env.REACT_APP_URL}/images/${encodeURIComponent(prodData.imgUrl)}`
  : productPicture;
     


function VideoPlayer({ url }) {
  // Detect platform
  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
  const isVimeo = url.includes("vimeo.com");
  const isGoogleDrive = url.includes("drive.google.com");
  const isMp4 = url.endsWith(".mp4");

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "640px",
        height: "360px",
        borderRadius: "20px",
        overflow: "hidden",
        margin: "0 auto",
        backgroundColor: "#000",
      }}
    >
      {isYouTube && (
        <iframe
          title="YouTube Video"
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${new URL(url).searchParams.get("v")}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: "20px" }}
        ></iframe>
      )}

      {isVimeo && (
        <iframe
          title="Vimeo Video"
          src={`https://player.vimeo.com/video/${url.split("/").pop()}`}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: "20px" }}
        ></iframe>
      )}

      {isGoogleDrive && (
        <iframe
          title="Google Drive Video"
          src={url.replace("/view", "/preview")}
          width="100%"
          height="100%"
          allow="autoplay"
          frameBorder="0"
          allowFullScreen
          style={{ borderRadius: "20px" }}
        ></iframe>
      )}

      {isMp4 && (
        <video
          width="100%"
          height="100%"
          controls
          style={{ objectFit: "cover", borderRadius: "20px" }}
        >
          <source src={url} type="video/mp4" />
        </video>
      )}
    </div>
  );
}




  return (
        <ProductDetailWrapper>
          <PageTitle title={'Product'} subTitle={' / View'}/>

          {/* content */}
         <>
         {isLoading?
          <List/> :
          <div style={{display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* <TopCardContent>
                    <TopCardContentWrapper>
                                  <TopCard bg={'green'}>
                                      <TopCardIcon>
                                      {item.icon}
                                      </TopCardIcon>
                                      <h2>{item.count}</h2>
                                      <p>{item.title}</p>
                                  </TopCard>
                    </TopCardContentWrapper>   
                  </TopCardContent> */}
          <ProductDetailContent>
            <ProductDetailData>
          <ItemContainer title={'Product Detail'}> 
              <AnyItemContainer gap="60px">
                    <InnerWrapper wd={'100%'}>
                          <span><b>Title</b></span>
                          <span>{prodData.title}</span>
                       </InnerWrapper>
              </AnyItemContainer>
              <AnyItemContainer gap="60px">
                    <InnerWrapper wd={'100%'}>
                          <span><b>Description</b></span>
                          <span>{prodData.description}</span>
                       </InnerWrapper>
              </AnyItemContainer>
                  <AnyItemContainer gap="60px"> 
                       <InnerWrapper wd={'100%'}>
                          <span><b>Code</b></span>
                          <span>{prodData?.code}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="20px"> 
                  <InnerWrapper wd={'100%'}>
                          <span><b>Category</b></span>
                          <span>{prodData.category?.title}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer>
                  <InnerWrapper wd={'100%'}>
                          <span><b>SKU</b></span>
                          <span>{prodData?.sku}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Unit</b></span>
                          <span>{prodData.unit?.title}</span>
                       </InnerWrapper>
                  </AnyItemContainer>    
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Status</b></span>
                          <span>{prodData?.status}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
              </ItemContainer>

              {/* Price section */}
              <ItemContainer title={'Price'}> 

                {/* <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Price</b></span>
                          <span><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{prodData?.price}</span>
                       </InnerWrapper>
                </AnyItemContainer> */}
                <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Tax</b></span>
                          <span>{prodData?.tax}%</span>
                       </InnerWrapper>
                  </AnyItemContainer> 
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Tax Type</b></span>
                          <span>{prodData?.taxType}</span>
                       </InnerWrapper>
                  </AnyItemContainer> 
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Purchase Price</b></span>
                          <span><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{prodData?.purchasePrice}</span>
                       </InnerWrapper>
                  </AnyItemContainer>  
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Profit Margin</b></span>
                          <span>{prodData?.profitMargin}%</span>
                       </InnerWrapper>
                  </AnyItemContainer>  
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Selling Price</b></span>
                          <span><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{prodData?.salePrice}</span>
                       </InnerWrapper>
                  </AnyItemContainer> 
                </ItemContainer>

            {/* Quantity section */}
              <ItemContainer title={'Quantity'}>
                {/* <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Alert Quantity</b></span>
                          <span>{prodData?.quantityAlert}</span>
                       </InnerWrapper>
                  </AnyItemContainer>  */}
                  
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>In stock</b></span>
                          <span>{prodData?.stockQuantity}</span>
                       </InnerWrapper>
                  </AnyItemContainer> 
                  {prodData?.wasteQuantity > 0 &&
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Wastage</b></span>
                          <span>{prodData?.wasteQuantity}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  }
                 <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Sold</b></span>
                          <span>{prodData?.saleQuantity}</span>
                       </InnerWrapper>
                  </AnyItemContainer>                 
                   <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Purchased</b></span>
                          <span>{prodData?.purchaseQuantity}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                </ItemContainer>
            </ProductDetailData>

            <ProductDetailPicture>
          <ItemContainer title={'Total Summary'}> 
         {     netProfit > 0 &&
             <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b style={{color:"green"}}>Profit</b></span>
                          <span><b style={{color:"green"}}><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{netProfit.toLocaleString('en-NG', { 
                                                  minimumFractionDigits: 2, 
                                                  maximumFractionDigits: 2 
                                                })}</b></span>
                       </InnerWrapper>
                  </AnyItemContainer> }             
              <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span>Sale</span>
                          <span><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{totalProdSale.toLocaleString('en-NG', { 
                                                  minimumFractionDigits: 2, 
                                                  maximumFractionDigits: 2 
                                                })}</span>
                       </InnerWrapper>
                  </AnyItemContainer> 
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span>Purchase</span>
                          <span><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{totalProdPurchase.toLocaleString('en-NG', { 
                                                  minimumFractionDigits: 2, 
                                                  maximumFractionDigits: 2 
                                                })}</span>
                       </InnerWrapper>
                  </AnyItemContainer>               
                    
                </ItemContainer>

                <ItemContainer title={'Product Picture'}> 
                  <PictureWrapper onClick={()=>setShowProdImage(true)} heights={'300px'} imgUrl={imgSrc}></PictureWrapper>          
              </ItemContainer>

{
            prodData.videoUrl && (<VideoPlayer url ={prodData.videoUrl}/>)
}




              <ItemContainer title={'Action'}> 
              <AnyItemContainer gap="60px">
                  <InnerWrapper wd={'100%'}>
                  <span onClick={()=>navigate(`/products`)} style={{color: "blue", cursor: "pointer"}}><b>List</b></span>
                  <span onClick={()=>navigate(`/products`)} style={{color: "blue", cursor: "pointer"}}><FaList/></span>
                  </InnerWrapper>
                </AnyItemContainer>
{  canEdit &&              <AnyItemContainer gap="60px">
                      <InnerWrapper wd={'100%'}>
                            <span onClick={()=>navigate(`/edit-product/${prodData?._id}`)} style={{color: "green", cursor: "pointer"}}><b>Edit</b></span>
                            <span onClick={()=>navigate(`/edit-product/${prodData?._id}`)} style={{color: "green", cursor: "pointer"}}><FaEdit/></span>
                      </InnerWrapper>
                </AnyItemContainer>}
{  canDelete && <AnyItemContainer gap="60px">
                      <InnerWrapper wd={'100%'}>
                            <span onClick={()=>handleGrabId(prodData?.title)} style={{color: "red", cursor: "pointer"}}><b>Delete</b></span>
                            <span onClick={()=>handleGrabId(prodData?.title)} style={{color: "red", cursor: "pointer"}}><FaTrash/></span>
                      </InnerWrapper>
                </AnyItemContainer>}
              </ItemContainer>
            </ProductDetailPicture>
          </ProductDetailContent> 
          </div>
          }
          </>


              {/* overlay popup */}
                        { showDeleteCard &&
                         <Overlay 
                         contentWidth={'30%'}
                         overlayButtonClick={()=>deleteProduct(prodData?._id)}
                         closeOverlayOnClick={()=>setShowDeleteCard(false)}
                         btnText1={isBtnLoading ? <ButtonLoader text={'Deleting...'}/> : 'Yes'}
                         >
                         <p style={{margin: "40px", textAlign:"center", fontSize:"12px", lineHeight: "25px"}}>
                            Are you sure You want to delete the Product <b style={{textTransform:"capitalize"}}>{grabTitle} </b> 
                         </p>
                         </Overlay>
                         }
                                  
                         {/* Toast message user component */}
                         <ToastComponents/>

                         {/* overlay Image popup */}
                        { showProdImage &&
                         <Overlay 
                         contentWidth={'fit-content'}
                         overlayButtonClick={()=>setShowProdImage(false)}
                         closeOverlayOnClick={()=>setShowProdImage(false)}
                         btnDisplayYes={'none'}
                         btnDisplayNo={'none'}
                         >
                          <img src={`${process.env.REACT_APP_URL}/images/${prodData?.imgUrl}`} alt="" srcset="" />
                         </Overlay>
                         }
                                  
          
      </ProductDetailWrapper>
  )
}



