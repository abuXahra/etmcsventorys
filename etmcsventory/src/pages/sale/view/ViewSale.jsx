import React, { useContext, useEffect, useRef, useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import { ButtonsWrapper, ChargesWrapper, DateWrapper, InfoBillWrapper, InvoiceWrapper, LogoDateWrapper, LogoWrapper, NoteWrapper, PartialPaymentWrapper, TableStyled, TdStyled, ViewSalesContent, ViewSalesWrapper } from './viewSale.style'
import ItemContainer from '../../../components/item_container/ItemContainer'
import CompanyLogo from '../../../images/product_placeholder.jpg'  
import { SiPantheon } from 'react-icons/si'
import { ProductItemList } from '../../../data/productItems'
import Button from '../../../components/clicks/button/Button'
import { FaEdit, FaPrint } from 'react-icons/fa'
import { FaDownload } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useReactToPrint } from 'react-to-print'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { List } from 'react-content-loader'
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader'
import { UserContext } from '../../../components/context/UserContext'

export default function ViewSale() {
  
const token = localStorage.getItem('token');
    
  const navigate = useNavigate();
    const {saleId} = useParams();
    const [customerId, setCustomerId] = useState('')
    const [saleData, setSaleData] = useState('');
    const [saleReturnData, setSaleReturnData] = useState([]);
    const [customerData, setCustomerData] = useState('');
    const [companyData, setCompanyData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isBtnLoading, setIsBtnLoading] = useState(false);
  
    // user permission:
      const {permissions, user} = useContext(UserContext);
      const salePermission = permissions?.find(p => p.module === "Sale")

            // Permission logic
      const isAdmin = user?.role === 'admin'
      const canEdit = isAdmin || salePermission?.canEdit
     
    
// Fetch invoice detail


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

               
                 const fetchInvoice = async() =>{
                    setIsLoading(true)
                      try {
                          const res = await axios.get(`${process.env.REACT_APP_URL}/api/sale/${saleId}`, {
                                                              headers: {
                                                                Authorization: `Bearer ${token}`
                                                              }
                                                        })       
                          console.log('====== sale data: \n', res.data, '==================')
                          setSaleData(res.data);
                          setCustomerId(res.data.customer._id)
                          setIsLoading(false);
                      } catch (error) {
                          console.log(error);
                          setIsLoading(false);
                      }
                
                  }


                 const fetchSaleReturn = async() =>{
                    // setIsLoading(true)
                      try {
                          const res = await axios.get(`${process.env.REACT_APP_URL}/api/saleReturn`, {
                                                              headers: {
                                                                Authorization: `Bearer ${token}`
                                                              }
                                                        })
                                  
                      
                                                

                          const returnForThisSale = res.data.find(
                              (r) => r.sale?._id === saleId || r.sale?.id === saleId
                            );

                          if (returnForThisSale) {
                              console.log("All sale returns:", res.data); // ✅ always logs  
                            setSaleReturnData(returnForThisSale);
                          }   
                                                    // setIsLoading(false);
                            } catch (error) {
                                console.log(error);
                                // setIsLoading(false);
                            }
                      
                        }

                const fetchCustomer = async() =>{
                    try {
                        const res = await axios.get(`${process.env.REACT_APP_URL}/api/customers/${customerId}`, {
                                                            headers: {
                                                              Authorization: `Bearer ${token}`
                                                            }
                                                      })       
                        console.log('====== customer data: \n', res.data, '==================')
                        setCustomerData(res.data);
                        console.log('customer data; ', res.data)

                    } catch (error) {
                        console.log(error);
                        // setIsLoading(false);
                    }
              
                }


        useEffect(()=>{     
          // if (!customerId) return;
                  fetchCompany();
                  fetchInvoice();
                  fetchCustomer()
                  fetchSaleReturn();
                },[saleId, customerId])


                
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
       // 🔽 Use sale code in file name
      pdf.save(`Sale_${saleData?.code || 'invoice'}.pdf`);
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

  const TOTAL = saleData?.saleAmount - saleReturnData?.returnAmount;

  return (
    <ViewSalesWrapper>
    {/* Page title */}
    <PageTitle title={'Sale'} subTitle={'/ View'}/>

    {/* content */}
    <>
      {isLoading?
       <List/> :

    <ViewSalesContent>
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
                <img src={companyData ? 
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
                      <span>{saleData?.code}</span>                  
                  </div>
                  <div>
                      <span><b>DATE:</b></span>
                      <span>{new Date(saleData?.saleDate).toDateString()}</span>                                    
                  </div>
                  <div>
                      <span><b>SALES STATUS:</b></span>
                      <span>{saleData?.saleStatus}</span>                  
                  </div>
                  <div>
                      <span><b>Payment STATUS:</b></span>
                      <span><div>{saleData?.paymentStatus}</div></span>                  
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
                  <span>Address: {companyData?.address}</span>
                  <span>Phone: {companyData?.phoneNumber}</span>
                  <span>Email: {companyData?.companyEmail}</span>
              </div>
           </div>

           {/* customer info */}
             <div>
              <h3>BILLING TO</h3>
              <hr />
              <div>
                  <span><b>{customerData?.name?.toUpperCase()}</b></span>
                  {customerData?.name === 'Walk in customer'? "" :(<span>Address: {customerData?.address}</span>)}   
                  <span>Phone: {customerData?.name === 'Walk in customer'? saleData?.walkingCustomerNumber : customerData?.phoneNumber}</span>
                  <span>Email: {customerData?.name === 'Walk in customer'? saleData?.walkingCustomerEmail : customerData?.email}</span>
              </div>
           </div>
        </InfoBillWrapper>
<br/>
      {/* /* table of items */}
                         <InfoBillWrapper>
                              {/* our info */}
                              <div>
                                  <h3>SALE ITEMS</h3>
                                  <hr />
                              </div>
                      </InfoBillWrapper>
               
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
                                  {saleData.saleItems?.map((data, i)=>(
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
                                              <TdStyled><b>Date</b></TdStyled>
                                              <TdStyled><b>Amount </b></TdStyled>
                                              <TdStyled><b>Payment Type</b></TdStyled>
                                              {saleData?.paymentType === 'ETMCS Deduction' &&  
                                               ( <TdStyled><b>Months</b></TdStyled> )
                                              }
                                            {saleData?.paymentType === 'ETMCS Deduction' &&  
                                               ( <TdStyled><b>Starting</b></TdStyled> )
                                              }

                                            {saleData?.paymentType === 'ETMCS Deduction' &&  
                                               ( <TdStyled><b>Monthly Deduction</b></TdStyled> )
                                              }
                                          </thead>
                                          <tbody>
                                                 <tr>
                                                      <TdStyled>{new Date(saleData?.saleDate).toDateString()}</TdStyled>
                                                      <TdStyled>{saleData?.saleAmount}</TdStyled>
                                                      <TdStyled>{saleData?.paymentType}</TdStyled>
                                                       {saleData?.paymentType === 'ETMCS Deduction' &&  
                                                        ( <TdStyled>{saleData?.noOfMonth}</TdStyled> )
                                                        }
                                                      {saleData?.paymentType === 'ETMCS Deduction' &&  
                                                        ( <TdStyled>{new Date(saleData?.startMonth).toDateString()}</TdStyled> )
                                                        }

                                                      {saleData?.paymentType === 'ETMCS Deduction' &&  
                                                        ( <TdStyled>{saleData?.saleAmount / saleData?.noOfMonth}</TdStyled> )
                                                        }
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
                                  <span><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{saleData?.subTotal}</span>
                                </div>
                                      {/* Other Charges */}
                                <div>
                                  <span>Other Charges</span>
                                  <span><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{saleData?.otherCharges}</span>
                                </div>
              
                                      {/* Disacount*/}
                                <div>
                                  <span>Discount ({saleData?.discount})%</span>
                                  <span><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{saleData?.discountValue}</span>
                                </div>
                
              
                                      {/* Shipping*/}
                                <div>
                                  <span>Shipping</span>
                                  <span><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{saleData?.shipping}</span>
                                </div>
              
                                  {/* Grand Total*/}
                                <div>
                                  <span><b>{saleReturnData.returnItems?.length > 0 ? "Total": "Grand Total"}</b></span>
                                  <span><b><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>
                                  {saleData?.saleAmount?.toLocaleString('en-NG', { 
                                    minimumFractionDigits: 2, 
                                    maximumFractionDigits: 2 
                                  })}</b></span>
                                </div>
                              </div>

                            </ChargesWrapper>

                          {  saleData.paymentStatus === 'partial' && 
                                                        
                              <PartialPaymentWrapper>
                                  <h3>Advance payment</h3> <hr />
                                     <div>                                   
                                        <span>Amount Paid</span>
                                        <span><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{saleData?.amountPaid.toLocaleString('en-NG', { 
                                              minimumFractionDigits: 2, 
                                              maximumFractionDigits: 2 
                                            })}</span>
                                      </div>
                                                   
                                     <div>
                                        <span><b>Balance</b></span>
                                        <span><b><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{saleData.dueBalance?.toLocaleString('en-NG', { 
                                    minimumFractionDigits: 2, 
                                    maximumFractionDigits: 2 
                                  })}</b></span>
                                      </div>
                                                        
                              
                        </PartialPaymentWrapper>
                    }    

                           
                  {/* Note */}
                <br/>
                <NoteWrapper>
                  <b>Note: </b> 
                  <div>{saleData?.note}</div>
                  <hr />
                </NoteWrapper>
              
              <br/>
     
    {  saleReturnData && saleReturnData.returnItems?.length > 0 && (
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
                                  {saleReturnData.returnItems?.map((data, i)=>(
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
                                                      <TdStyled>{new Date(saleReturnData?.returnDate).toDateString()}</TdStyled>
                                                      <TdStyled>{saleReturnData?.returnAmount}</TdStyled>
                                                      <TdStyled>{saleReturnData?.paymentType}</TdStyled>
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
                                  {saleReturnData?.returnAmount?.toLocaleString('en-NG', { 
                                    minimumFractionDigits: 2, 
                                    maximumFractionDigits: 2 
                                  })}</b></span>
                                </div>
                              </div>


                            </ChargesWrapper>
 <br/>
                <NoteWrapper>
                <b>Reason: </b> 
                <div>{saleReturnData?.reason}</div>
                <hr />
              </NoteWrapper>
               <br/>

        <InfoBillWrapper clm={'row'} jstCont={'space-between'}>
          {/* our info */}
           <div>
              <h3> </h3>
              
              <div>
                  <span><b></b></span>
              </div>
           </div>

           {/* customer info */}
             <div>
              <h3>AMOUNT PAID</h3>
              <hr />
              <div>
                  <span><b>Grand Total:</b></span>
                 
                 
                  <span><b><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>
                  {TOTAL.toLocaleString('en-NG', { 
                                    minimumFractionDigits: 2, 
                                    maximumFractionDigits: 2 
                                  })}</b>
                                  </span>
              </div>
           </div>
        </InfoBillWrapper>
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
                  btnOnClick={()=>navigate(`/edit-sale/${saleData?._id}`)}
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
    </ViewSalesContent>
        }
          </>
</ViewSalesWrapper>
  )
}





