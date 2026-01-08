import React, { useEffect, useState, useRef, useContext } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import ItemContainer from '../../../components/item_container/ItemContainer'
import CompanyLogo from '../../../images/product_placeholder.jpg' 
import { SiPantheon } from 'react-icons/si'
import { ProductItemList } from '../../../data/productItems'
import Button from '../../../components/clicks/button/Button'
import { FaEdit, FaPrint, FaVoicemail } from 'react-icons/fa'
import { FaDownload } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom'
import { ButtonsWrapper, ChargesWrapper, DateWrapper, InfoBillWrapper, InvoiceWrapper, LogoDateWrapper, LogoWrapper, NoteWrapper, TableStyled, TdStyled, ViewPurchaseContent, ViewPurchaseWrapper } from './viewPurchase.style'
import axios from 'axios'
import { List } from 'react-content-loader'
import { useReactToPrint } from 'react-to-print' // for printing
import jsPDF from 'jspdf'
import html2canvas from  'html2canvas'
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader'
import { PartialPaymentWrapper } from '../../sale/view/viewSale.style'
import { UserContext } from '../../../components/context/UserContext'

export default function ViewPurchase() {
const token = localStorage.getItem('token');
    
  const navigate = useNavigate();
  const {purchaseId} = useParams();
  const [supplierId, setSupplierId] = useState('')
  const [purchaseData, setPurchaseData] = useState('');
  const [purchaseReturnData, setPurchaseReturnData] = useState([]);
  const [supplierData, setSupplierData] = useState('');
  const [companyData, setCompanyData] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);

     // user permission:
       const {permissions, user} = useContext(UserContext);
       const purchasePermission = permissions?.find(p => p.module === "Customer")
 
             // Permission logic
       const isAdmin = user?.role === 'admin'
       const canEdit = isAdmin || purchasePermission?.canEdit
       const canDelete = isAdmin || purchasePermission?.canDelete
       const canView = isAdmin || purchasePermission?.canView
      

  // Fetch invoice detail
                useEffect(()=>{
                  const fetchInvoice = async() =>{
                    setIsLoading(true)
                      try {
                          const res = await axios.get(`${process.env.REACT_APP_URL}/api/purchase/${purchaseId}`, {
                                                              headers: {
                                                                Authorization: `Bearer ${token}`
                                                              }
                                                        })        
                          console.log('====== purchase data: \n', res.data, '==================')
                          setPurchaseData(res.data);
                          setSupplierId(res.data.supplier._id)
                          setIsLoading(false);
                      } catch (error) {
                          console.log(error);
                          setIsLoading(false);
                      }
                
                  }
                  fetchInvoice();               

    const fetchPurchaseReturn = async() =>{
                    // setIsLoading(true)
                      try {
                          const res = await axios.get(`${process.env.REACT_APP_URL}/api/purchaseReturn`, {
                                                              headers: {
                                                                Authorization: `Bearer ${token}`
                                                              }
                                                        })
                                  
                                                                     

                          const returnForThisPurchase = res.data.find(
                              (r) => r.purchase?._id === purchaseId || r.purchase?.id === purchaseId
                            );

                          if (returnForThisPurchase) {
                              console.log("All purchase returns:", res.data); // ✅ always logs  
                            setPurchaseReturnData(returnForThisPurchase);
                          }   
                                                    // setIsLoading(false);
                            } catch (error) {
                                console.log(error);
                                // setIsLoading(false);
                            }
                      
                        }

              fetchPurchaseReturn()
                 const fetchCompany = async() =>{
                    // setIsLoading(true)
                      try {
                          const res = await axios.get(`${process.env.REACT_APP_URL}/api/company`, {
                                                              headers: {
                                                                Authorization: `Bearer ${token}`
                                                              }
                                                        })
                          setCompanyData(res.data[0])
                          // setIsLoading(false);
                      } catch (error) {
                          console.log(error);
                          // setIsLoading(false);
                      }
                
                  }
                  fetchCompany();
                },[purchaseId])

         
               useEffect(()=>{
                 
                const fetchSupplier = async() =>{
                  // setIsLoading(true)
                    try {
                        const res = await axios.get(`${process.env.REACT_APP_URL}/api/suppliers/${supplierId}`, {
                                                            headers: {
                                                              Authorization: `Bearer ${token}`
                                                            }
                                                      })        
                        console.log('====== supplier data: \n', res.data, '==================')
                        setSupplierData(res.data);
                        console.log('supplier data; ', res.data)
                        // setIsLoading(false);
                    } catch (error) {
                        console.log(error);
                        // setIsLoading(false);
                    }
              
                }
                fetchSupplier();                  
                },[supplierId])


                
  // for printing
  const contentRef = useRef(null)
  const reactToPrintFn = useReactToPrint({contentRef})

    // for download pdf invoice
  const pdfRef = useRef(null)
  const downloadPDF = () => {
    const input = pdfRef.current;
    setIsBtnLoading(true)
    return html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth =  canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio );
      // pdf.save('invoice.pdf')
      pdf.save(`Purchase_${purchaseData?.code || 'invoice'}.pdf`);
      setIsBtnLoading(false);
    })
  }

    const handleBtnClick = (type) => {

    if (type === 'print') {
      return reactToPrintFn();
    }else if(type === 'pdf'){
      return downloadPDF();
    }

  }


  return (
    <ViewPurchaseWrapper>
    {/* Page title */}
    <PageTitle title={'Purchase'} subTitle={'/ View'}/>

    
       {/* content */}
    <>
      {isLoading?
          <List/> :
    <ViewPurchaseContent>
      {/* invoice wrapper */}
  
         <InvoiceWrapper ref={(el) => {
            contentRef.current = el;
            pdfRef.current = el;
          }}>
        {/* Logo AND dATE */}
        <LogoDateWrapper>
          {/* logo */}
            <LogoWrapper>
              <div>
                <img src={companyData? 
                  process.env.REACT_APP_URL+'/images/'+ companyData.companyLogo:
                  CompanyLogo} alt="" srcset="" />
              </div>
            </LogoWrapper>
            {/* date */}
            <DateWrapper>
              <h3>INVOICE</h3>
              <hr />
              <div>
                  <div>
                      <span><b>INVOICE NO.:</b></span>
                      <span>{purchaseData?.code}</span>                  
                  </div>
                  <div>
                      <span><b>DATE:</b></span>
                      <span>{new Date(purchaseData?.purchaseDate).toDateString()}</span>                  
                  </div>
                  <div>
                      <span><b>PURCHASE STATUS:</b></span>
                      <span>{purchaseData?.purchaseStatus}</span>                  
                  </div>
                  <div>
                      <span><b>PAYMENT STATUS:</b></span>
                      <span><div>{purchaseData?.paymentStatus}</div></span>                  
                  </div>
              </div>
             
            </DateWrapper>
        </LogoDateWrapper>

        <InfoBillWrapper>
          {/* our info */}
           <div>
              <h3>OUR INFORMATION</h3>
              <hr />
              <div>
                  <span><b>{companyData?.companyName?.toUpperCase()}</b></span>
                  <span>Address:{companyData?.address}</span>
                  <span>Phone: {companyData?.phoneNumber}</span>
                  <span>Email: {companyData?.companyEmail}</span>
              </div>
           </div>

           {/* supply info */}
           <div>
              <h3>BILLING TO</h3>
              <hr />
              <div>
                  <span><b>{supplierData?.name?.toUpperCase()}</b></span>
                  <span>Address: {supplierData?.address}</span>
                  <span>Phone: {supplierData?.phoneNumber}</span>
                  <span>Email: {supplierData?.email}</span>
              </div>
           </div>
        </InfoBillWrapper>
<br/>

      {/* /* table of items */}
                         <InfoBillWrapper>
                              {/* our info */}
                              <div>
                                  <h3>PURCHASE ITEMS</h3>
                                  <hr />
                              </div>
                      </InfoBillWrapper>
        {/* table of items */}
           <TableStyled>
                            <thead>
                                <TdStyled><b>#</b></TdStyled>
                                <TdStyled><b>Item Name</b></TdStyled>
                                <TdStyled><b>Quantity</b></TdStyled>
                                <TdStyled><b>Price</b></TdStyled>
                                <TdStyled><b>Tax(%)</b></TdStyled>
                                <TdStyled><b>Tax Amount </b></TdStyled>
                                <TdStyled><b>Unit Cost </b></TdStyled>
                                <TdStyled><b>Amount </b></TdStyled>
                            </thead>
                            <tbody>
                            {purchaseData.purchaseItems?.map((data, i)=>(
                                <tr key={i}>
                                    <TdStyled>{i+1}</TdStyled>
                                    <TdStyled>{data.title}</TdStyled>
                                    <TdStyled>{data.quantity}</TdStyled>
                                    <TdStyled>{data.price}</TdStyled>
                                    <TdStyled>{data.tax}%</TdStyled>
                                    <TdStyled>{data.taxAmount}</TdStyled>
                                    <TdStyled>{data.unitCost}</TdStyled>
                                    <TdStyled>{data.amount }</TdStyled>
                                </tr>
                            ))
                        }
                            </tbody>
                        </TableStyled>
       <br/>       
              {/* Total Charges */}
              <ChargesWrapper>
                <div>
                  <h3>Payment</h3>
                  <hr />
                  <TableStyled pd="0px">
                            <thead>
                                <TdStyled><b>Date</b></TdStyled>
                                <TdStyled><b>Amount </b></TdStyled>
                                <TdStyled><b>Payment Type</b></TdStyled>
                            </thead>
                            <tbody>
                                   <tr>
                                        <TdStyled>{new Date(purchaseData?.purchaseDate).toDateString()}</TdStyled>
                                        <TdStyled>{purchaseData?.purchaseAmount}</TdStyled>
                                        <TdStyled>{purchaseData?.paymentType}</TdStyled>
                                    </tr>
                            </tbody>
                        </TableStyled>
                </div>

                {/* Total Charges */}
                <div>

                <h3>Charges</h3>
                <hr />

                  {/* subtotal */}
                  <div>
                    <span><b>Sub Total</b></span>
                    <span><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{purchaseData?.subTotal}</span>
                  </div>
                        {/* Other Charges */}
                  <div>
                    <span><b>Other Charges</b></span>
                    <span><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{purchaseData?.otherCharges}</span>
                  </div>

                        {/* Disacount*/}
                  <div>
                    <span><b>Discount ({purchaseData?.discount})%</b></span>
                    <span><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{purchaseData?.discountValue}</span>
                  </div>
  

                        {/* Shipping*/}
                  <div>
                    <span><b>Shipping</b></span>
                    <span><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{purchaseData?.shipping}</span>
                  </div>

                    {/* Grand Total*/}
                  <div>
                    <span><b>Grand Total</b></span>
                    <span><b><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>
                    {purchaseData?.purchaseAmount?.toLocaleString('en-NG', { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    })}</b></span>
                  </div>
                </div>
              </ChargesWrapper>

                 {  purchaseData.paymentStatus === 'partial' && 
                                                                      
                                            <PartialPaymentWrapper>
                                                <h3>Advance payment</h3> <hr />
                                                   <div>                                   
                                                      <span>Amount Paid</span>
                                                      <span><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{purchaseData?.amountPaid.toLocaleString('en-NG', { 
                                                            minimumFractionDigits: 2, 
                                                            maximumFractionDigits: 2 
                                                          })}</span>
                                                    </div>
                                                                 
                                                   <div>
                                                      <span><b>Balance</b></span>
                                                      <span><b><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{purchaseData.dueBalance?.toLocaleString('en-NG', { 
                                                  minimumFractionDigits: 2, 
                                                  maximumFractionDigits: 2 
                                                })}</b></span>
                                                    </div>
                                                                      
                                            
                                      </PartialPaymentWrapper>
                                  }
              
              <br/>

              {/* Note */}
              <NoteWrapper>
                <span>Note: {purchaseData?.note}</span>
                <hr /> 
              </NoteWrapper>

 <br/>
     
    {  purchaseReturnData && purchaseReturnData.returnItems?.length > 0 && (
    <>          <br/>
                    <InfoBillWrapper>
                              {/* our info */}
                              <div>
                                  <h3>RETURN ITEMS</h3>
                                  <hr />
                              </div>
                      </InfoBillWrapper>
      
                          {/* /* table of items */}
                                <TableStyled>
                                  <thead>
                                      <TdStyled><b>#</b></TdStyled>
                                      <TdStyled><b>Item Name</b></TdStyled>
                                      <TdStyled><b>Quantity</b></TdStyled>
                                      <TdStyled><b>Price</b></TdStyled>
                                      <TdStyled><b>Tax(%)</b></TdStyled>
                                      <TdStyled><b>Tax Amount </b></TdStyled>
                                      <TdStyled><b>Unit Cost </b></TdStyled>
                                      <TdStyled><b>Amount </b></TdStyled>
                                  </thead>
                                  <tbody>
                                  {purchaseReturnData.returnItems?.map((data, i)=>(
                                      <tr key={i}>
                                          <TdStyled>{i+1}</TdStyled>
                                          <TdStyled>{data.title}</TdStyled>
                                          <TdStyled>{data.quantity}</TdStyled>
                                          <TdStyled>{data.price}</TdStyled>
                                          <TdStyled>{data.tax}%</TdStyled>
                                          <TdStyled>{data.taxAmount}</TdStyled>
                                          <TdStyled>{data.unitCost}</TdStyled>
                                          <TdStyled>{data.amount }</TdStyled>
                                      </tr>
                                  ))
                              }
                                  </tbody>
                              </TableStyled>  

                {/* Total Charges */}
                            <ChargesWrapper>
                              <div>
                                <h3>Payment</h3>
                                <hr />
                                <TableStyled pd="0px">
                                          <thead>
                                              <TdStyled><b>Return Date</b></TdStyled>
                                              <TdStyled><b>Refund Amount </b></TdStyled>
                                              <TdStyled><b>Payment Type</b></TdStyled>
                                          </thead>
                                          <tbody>
                                                 <tr>
                                                      <TdStyled>{new Date(purchaseReturnData?.returnDate).toDateString()}</TdStyled>
                                                      <TdStyled>{purchaseReturnData?.returnAmount}</TdStyled>
                                                      <TdStyled>{purchaseReturnData?.paymentType}</TdStyled>
                                                  </tr>
                                          </tbody>
                                      </TableStyled>
                              </div>
              
                             
                              {/* Total Charges */}
                              <div>
                              <h3>Charges</h3>
                              <hr />
                              <div>
                                  <span><b>Total Refund</b></span>
                                  <span><b><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>
                                  {purchaseReturnData?.returnAmount?.toLocaleString('en-NG', { 
                                    minimumFractionDigits: 2, 
                                    maximumFractionDigits: 2 
                                  })}</b></span>
                                </div>
                              </div>


                            </ChargesWrapper>
 <br/>
                <NoteWrapper>
                <b>Reason: </b> 
                <div>{purchaseReturnData?.reason}</div>
                <hr />
              </NoteWrapper>
               <br/>
</>)}
              
      </InvoiceWrapper>
  
  



    {/* Action buttons */}
      <ButtonsWrapper>

        {/* Edit */}
{canEdit && 
       <Button
          btnColor={'rgb(35, 139, 0)'}
          btnText={'Edit'}
          btnPd={'5px 10px'}
          btnFontSize={'12px'}
          btnLeftIcon={<FaEdit/>}
          btnBdRd={'2px'}
          btnOnClick={()=>navigate(`/edit-purchase/${purchaseData?._id}`)}
        />}

        {/* print */}
            <Button
              btnColor={'#0284c7'}
              btnText={'Print'}
              btnPd={'5px 10px'}
              btnFontSize={'12px'}
              btnLeftIcon={<FaPrint />}
              btnBdRd={'2px'}
              btnOnClick={()=>handleBtnClick('print')}
            />
        

        {/* download */}
        <Button
          btnColor={'#0284c7'}
          btnText={isBtnLoading? <ButtonLoader text={'Generating PDF'}/> : 'Download'}
          btnPd={'5px 10px'}
          btnFontSize={'12px'}
          btnLeftIcon={isBtnLoading? "" : <FaDownload/>}
          btnBdRd={'2px'}
          btnOnClick={()=>handleBtnClick('pdf')}
        />

        {/* <Button
          btnColor={'#0284c7'}
          btnText={'Email'}
          btnPd={'5px 10px'}
          btnFontSize={'12px'}
          btnLeftIcon={<FaVoicemail/>}
          btnBdRd={'2px'}
          btnOnClick={()=>{}}
        /> */}
      </ButtonsWrapper>
    </ViewPurchaseContent>
    }
          </>
</ViewPurchaseWrapper>
  )
}
