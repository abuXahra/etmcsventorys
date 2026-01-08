import React, { useContext, useEffect, useRef, useState } from 'react'

import CompanyLogo from '../../../../images/product_placeholder.jpg'  
import { SiPantheon } from 'react-icons/si'
import { FaEdit, FaPrint } from 'react-icons/fa'
import { FaDownload } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useReactToPrint } from 'react-to-print'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { List } from 'react-content-loader'
import { ButtonsWrapper, ChargesWrapper, DateWrapper, InfoBillWrapper, InvoiceWrapper, LogoDateWrapper, LogoWrapper, NoteWrapper, PartialPaymentWrapper, SaleReturnViewContent, SaleReturnViewWrapper, TableStyled, TdStyled } from './saleReturnView.style'
import PageTitle from '../../../../components/page_title/PageTitle'
import Button from '../../../../components/clicks/button/Button'
import ButtonLoader from '../../../../components/clicks/button/button_loader/ButtonLoader'
import { UserContext } from '../../../../components/context/UserContext'

export default function SaleReturnView() {
  const token = localStorage.getItem('token');
    

  const navigate = useNavigate();
    const {returnId} = useParams();
    const [customerId, setCustomerId] = useState('')
    const [saleReturnData, setSaleReturnData] = useState('');
    const [customerData, setCustomerData] = useState('');
    const [companyData, setCompanyData] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [isBtnLoading, setIsBtnLoading] = useState(false);
  

    // user permission:
      const {permissions, user} = useContext(UserContext);
      const saleReturnPermission = permissions?.find(p => p.module === "Sale Return")

            // Permission logic
      const isAdmin = user?.role === 'admin'
      const canEdit = isAdmin || saleReturnPermission?.canEdit
      const canView = isAdmin || saleReturnPermission?.canView
        
// Fetch invoice detail
                useEffect(()=>{
                  const fetchInvoice = async() =>{
                    setIsLoading(true)
                      try {
                          const res = await axios.get(`${process.env.REACT_APP_URL}/api/saleReturn/${returnId}`, {
                                                              headers: {
                                                                Authorization: `Bearer ${token}`
                                                              }
                                                        })       
                          console.log('====== sale data: \n', res.data, '==================')
                          setSaleReturnData(res.data);
                          setCustomerId(res.data.customer._id)
                          setIsLoading(false);
                      } catch (error) {
                          console.log(error);
                          setIsLoading(false);
                      }
                  }
                  fetchInvoice();
                             

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
                },[returnId])

               

        useEffect(()=>{
                 
          // if (!customerId) return;

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
            fetchCustomer()
                },[customerId])

               
                
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
      pdf.save('invoice.pdf')
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
    <SaleReturnViewWrapper>
    {/* Page title */}
    <PageTitle title={'Sale Return'} subTitle={'/ View'}/>

    {/* content */}
    <>
      {isLoading?
       <List/> :

    <SaleReturnViewContent>
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
              <h3>SALE RETURN</h3>
              <hr />
              <div>
                  <div>
                      <span><b>RETURN NO.:</b></span>
                      <span>{saleReturnData?.code}</span>                  
                  </div>
                  <div>
                      <span><b>RETURN DATE:</b></span>
                      <span>{new Date(saleReturnData?.returnDate).toDateString()}</span>                                    
                  </div>
                  {/* <div>
                      <span><b>RETURN STATUS:</b></span>
                      <span>{saleReturnData?.saleStatus}</span>                  
                  </div> */}
                  {/* <div>
                      <span><b>PAYMENT STATUS:</b></span>
                      <span><div>{saleReturnData?.paymentStatus}</div></span>                  
                  </div> */}
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
              <h3>RETURN FROM</h3>
              <hr />
              <div>
                  <span><b>{customerData?.name?.toUpperCase()}</b></span>
                  <span>Address: {customerData?.address}</span>
                  <span>Phone: {customerData?.phoneNumber}</span>
                  <span>Email: {customerData?.email}</span>
              </div>
           </div>
        </InfoBillWrapper>
<br/>
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
              
                                  {/* Refund Total*/}
                                <div>
                                  <span><b>Refund Total</b></span>
                                  <span><b><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>
                                  {saleReturnData?.returnAmount?.toLocaleString('en-NG', { 
                                    minimumFractionDigits: 2, 
                                    maximumFractionDigits: 2 
                                  })}</b></span>
                                </div>
                              </div>

                            </ChargesWrapper>
<br/>
              {/* Note */}
              <NoteWrapper>
                <span>Refund Reason: {saleReturnData?.reason}</span>
                <hr />
              </NoteWrapper>
      </InvoiceWrapper>
  
    {/* Action buttons */}
      <ButtonsWrapper>

         {/* Edit */}
                {/* <Button
                  btnColor={'rgb(35, 139, 0)'}
                  btnText={'Edit'}
                  btnPd={'5px 10px'}
                  btnFontSize={'12px'}
                  btnLeftIcon={<FaEdit/>}
                  btnBdRd={'2px'}
                  btnOnClick={()=>navigate(`/edit-sale-return/${saleReturnData?._id}`)}
                /> */}
        
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

            <Button
                  btnColor={'#0284c7'}
                  btnText={'View Invoice'}
                  btnPd={'5px 10px'}
                  btnFontSize={'12px'}
                  btnLeftIcon={isBtnLoading? "" : <FaDownload/>}
                  btnBdRd={'2px'}
                  btnOnClick={()=>navigate(`/sale-invoice/${saleReturnData.sale?._id}`)}
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
    </SaleReturnViewContent>
        }
          </>
</SaleReturnViewWrapper>
  )
}
