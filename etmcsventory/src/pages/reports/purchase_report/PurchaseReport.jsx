




import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../../../components/page_title/PageTitle';
import ListHeader from '../../../components/page_title/list_header/ListHeader';
import { FaPrint } from 'react-icons/fa';
import { AnyItemContainer } from '../../sale/Add/addSale.style';
import SelectInput from '../../../components/input/selectInput/SelectInput';
import Input from '../../../components/input/Input';
import { ItemButtonWrapper } from '../../../components/item_container/itemContainer.style';
import Button from '../../../components/clicks/button/Button';
import ItemContainer from '../../../components/item_container/ItemContainer';
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader';
import CompanyLogo from '../../../images/product_placeholder.jpg'
import { AddressWrapper, DateWrapper, Logo, LogoWrapper, PurchaseReportContent, PurchaseReportWrapper, ReportHeaderContent, ReportHeaderWrapper, SearchReportWrapper } from './purchaseReport.style';
import PurchaseReportTable from '../../../components/table/report_table/purchase_report_table/PurchaseReportTable';
import axios from 'axios';
import { DropdownItems, DropdownWrapper } from '../../purchase/add/addPurchase.style';
import { List } from 'react-content-loader';



export default function PurchaseReport() {

          
    const token = localStorage.getItem('token');
    
    const searchSupplierBy=[
        {
            title: "Select",
            value: ""
        },
        {
            title: "All-Dates",
            value: "All-Dates"
        },
        {
            title: "Selected-Dates",
            value: "Selected-Dates",
        },
    ]

    
        const [isLoading, setIsLoading] = useState(false);
        const [isGenerating, setIsGenerating] = useState(false)
        const [isGeneratingAll, setIsGeneratingAll] = useState(false)
    

    // today date
    const todayDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD (2025-02-29)

    
    const [searchBy, setSearchBy] = useState('')
    const [searchError, setSearchError] = useState(false)


    const [fromDate, setFromDate] = useState('')
    const [fromDateError, setFromDateError] = useState(false)

    const [toDate, setToDate] = useState('')
    const [toDateError, setToDateError] = useState(false)
    
    const [showDateRange, setShowDateRange] = useState(false)

    
        const [company, setCompany] = useState('')
        const [purchaseData, setPurchaseData] = useState([])
    
        const [supplier, setSupplier] = useState('')
        const [supplierNameError, setSupplierNameError] = useState();
        const [supplierItems, setSupplierItems] = useState([])
        const [showSupDropdown, setShowSupDropdown] = useState(false);
        const [supplierId, setSupplierId] = useState('');
     
        // ✅ New: payment status filter
          const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");
        
          // show All Report Button
          const [showAllReportButton, setShowAllReportButton] = useState(false)
         
    
          
              useEffect(()=>{
                  const fetchCompany = async () =>{
                      try {
                          const res =await axios.get(`${process.env.REACT_APP_URL}/api/company`, {
                                                              headers: {
                                                                Authorization: `Bearer ${token}`
                                                              }
                                                        })
                          setCompany(res.data[0]);
                          console.log('company:\ln', res.data)
                      } catch (error) {
                          console.log(error)
                      }
                  }
                  fetchCompany()
          
              // fetch supplier data
                      const getSuppliers = async () => { 
                          //  setIsLoading(true)  
                           try {
                      
                               const res = await axios.get(process.env.REACT_APP_URL + "/api/suppliers", {
                                                                   headers: {
                                                                     Authorization: `Bearer ${token}`
                                                                   }
                                                             })
                         
                               setSupplierItems(res.data)
                              //  setIsLoading(false)
                               
                           } catch (err) {
                               console.log(err)
                              //  setIsLoading(false)
                               }
                             }
                             
                           getSuppliers();
          
              
              const fetchPurchase = async () => {
                  setIsLoading(true)  
                  try {
                      const res =await  axios.get(`${process.env.REACT_APP_URL}/api/purchase`, {
                                                          headers: {
                                                            Authorization: `Bearer ${token}`
                                                          }
                                                    })
                      setPurchaseData(res.data)
                        setIsLoading(false)
                  } catch (error) {
                      console.log(error)
                        setIsLoading(false)
                  }
              }
          
              fetchPurchase();
              },[])
          
              
          // search name dropdownd handler
          const dropdownSupplierName = (supplier) => {
              setShowSupDropdown(false)
              setSupplierId(supplier._id)
              setSupplier(supplier.name)    
          }
          




    const onChangeHandler = (type, e)=>{
        if (type === 'supplier-name') {
            setSupplier(e.target.value)
            setShowSupDropdown(e.target.value.trim().length > 0);
            setSupplierNameError(false);
        }else if (type === 'search') {
            setSearchBy(e.target.value)
            setSearchError(false);

            e.target.value === "Selected-Dates" ? setShowDateRange(true) : setShowDateRange(false)

        }else if (type === 'from-date') {
            setFromDate(e.target.value)
            setFromDateError(false);
        }else if (type === 'to-date') {
            setToDate(e.target.value)
            setToDateError(false);
        }
    }


    const submitHandler = (e) => {
        e.preventDefault();

        let isValid = true;

        if(!supplier){
            setSupplierNameError(true)
            isValid = false;
        }

        if(!searchBy){
            setSearchError(true)
            isValid = false;
        }


      if(searchBy === 'Selected-Dates'){
            if(!fromDate){
                setFromDateError(true)
                isValid = false;
            }

            if(!toDate){
                setToDateError(true)
                isValid = false;
            }
        }

        if(isValid){
          setIsGenerating(true);
              setIsLoading(true);
          
              const fetchPurchases = async () => {
                  try {
                      const res = await axios.get(`${process.env.REACT_APP_URL}/api/purchase`, {
                                                          headers: {
                                                            Authorization: `Bearer ${token}`
                                                          }
                                                    })
                      let allPurchase = res.data;
          
                      // Filter based on customer
                      let filteredPurchases = allPurchase.filter(purchase => purchase.supplier?._id === supplierId);
          
                      // If searching by selected dates, further filter
                      if (searchBy === 'Selected-Dates') {
                          const from = new Date(fromDate);
                          const to = new Date(toDate);
          
                          filteredPurchases = filteredPurchases.filter(purchase => {
                              const purchaseDate = new Date(purchase.purchaseDate);
                              return purchaseDate >= from && purchaseDate <= to;
                          });
                      }
          
                      setPurchaseData(filteredPurchases);
                      // ✅ Show the "All Reports" button when a filter has been applied
                          setShowAllReportButton(true);
                  } catch (err) {
                      console.error(err);
                  } finally {
                      setIsGenerating(false);
                      setIsLoading(false);
                  }
              };
          
              fetchPurchases();
          }
          
          }



          
          const refetchPurchase = async (e) => {
              e.preventDefault();
              setSearchBy('');
              setFromDate('');
              setToDate('');
              setSupplier('');
              setShowAllReportButton(false); // ✅ Hide the button after fetching all reports
          
              setIsGeneratingAll(true);
              setIsLoading(true);  
              try {
                  const res = await axios.get(`${process.env.REACT_APP_URL}/api/purchase`, {
                                                      headers: {
                                                        Authorization: `Bearer ${token}`
                                                      }
                                                })
                  setPurchaseData(res.data);
              } catch (error) {
                  console.log(error);
              } finally {
                  setIsLoading(false);
                  setIsGeneratingAll(false);
              }
          };
          
          
          




//   const[records, setRecords] = useState(data);
//   const handleChange = (e) => {
//     let query = e.target.value;  
//     const newRecords = data.filter(item => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
//     setRecords(newRecords);
//   }

      // ✅ Apply payment filter
  const filteredPurchaseData = purchaseData.filter((purchase) => {
    if (paymentStatusFilter === "all") return true;
    return purchase.paymentStatus?.toLowerCase() === paymentStatusFilter.toLowerCase();
  });


    const paymentStatusItems = [
              { title: "All", value: "all" },
              { title: "Paid", value: "paid" },
              { title: "Partial", value: "partial" },
              { title: "Unpaid", value: "unpaid" },]

  const navigate = useNavigate();

      



  return (
    <PurchaseReportWrapper>
        <PageTitle title={'Purchase Report'}/>

      {/* Search Report */}
{supplierItems.length > 0 && 
        <SearchReportWrapper>
 <form>
            <ItemContainer title={'Generate Report'}> 
                        
                        <AnyItemContainer>
                         <Input 
                                                        value={supplier} 
                                                        title={'Supplier Name'}
                                                        onChange={(e)=>onChangeHandler('supplier-name', e)} 
                                                        error={supplierNameError} 
                                                        type={'text'} 
                                                        label={'Supplier Name'} 
                                                        placeholder={'search...'}
                                                        requiredSymbol={'*'}
                                                    />

                                                   {showSupDropdown && (
                                                            <DropdownWrapper topPosition={'50px'} width={"33%"}>
                                                                {supplierItems.filter(c =>
                                                                supplier.length > 0 &&
                                                                c.name.toLowerCase().includes(supplier.toLowerCase())
                                                                ).length > 0 ? (
                                                                supplierItems
                                                                    .filter(c => 
                                                                    supplier.length > 0 &&
                                                                    c.name.toLowerCase().includes(supplier.toLowerCase())
                                                                    )
                                                                    .map((data, i) => (
                                                                    <DropdownItems key={i} onClick={() => dropdownSupplierName(data)}>
                                                                        {data.name}
                                                                    </DropdownItems>
                                                                    ))
                                                                ) : (
                                                                <DropdownItems>
                                                                    <div style={{width: "100%", display: "flex", flexDirection: "column", gap: "5px", padding: "20px", justifyContent: "center", alignItems: "center"}}>
                                                                        <span>No such supplier </span>
                                                                        <a href="/add-supplier">Please click here to add </a>
                                                                    </div>
                                                                
                                                                </DropdownItems>
                                                                )}
                                                            </DropdownWrapper>
                                                    )}
                         <SelectInput 
                            onChange={(e)=>onChangeHandler('search', e)} 
                            error={searchError} 
                            options={searchSupplierBy} 
                            label={'Search by'}
                            title={'Search by'} 
                            value={searchBy} 
                             requiredSymbol={'*'}  
                        />
                        
                    {
                       showDateRange && 
                       <Input 
                              value={fromDate} 
                              title={'From Date'}
                              onChange={(e)=>onChangeHandler('from-date', e)}  
                              type={'date'} 
                              error={fromDateError}
                              label={'From Date'} 
                               requiredSymbol={'*'}
                            />  }
                    
                    {
                      showDateRange &&   
                      <Input 
                              value={toDate} 
                              title={'To Date'}
                              onChange={(e)=>onChangeHandler('to-date', e)}  
                              type={'date'} 
                              error={toDateError}
                              label={'To Date'} 
                               requiredSymbol={'*'}
                            />  
       }
                        </AnyItemContainer>    
                            
                    
                            <ItemButtonWrapper btnAlign={'flex-start'}>
                            <Button
                                btnOnClick={submitHandler}
                                btnText={isGenerating? <ButtonLoader text={'Generating...'}/> : 'Generate'}
                                btnFontSize={'12px'}
                                btnColor={'Green'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                />

                          { showAllReportButton &&
                           <Button
                                btnText={isGeneratingAll? <ButtonLoader text={'Generating...'}/> : 'All Reports'}
                                btnFontSize={'12px'}
                                btnColor={'#0284c7'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                btnOnClick={(e)=>refetchPurchase(e)}
                                />
                            }
                        </ItemButtonWrapper>
                    </ItemContainer>          
            </form>
        </SearchReportWrapper>
}
        {/* content */}
        <PurchaseReportContent>  
          <ListHeader 
            title={'print'} 
            btnOnClick={()=>{}}
            onChange={''}
            type={'text'}
            dataLength={purchaseData.length}
            icon={<FaPrint/>}
            inputDisplay={'none'}
          />
          
          <ReportHeaderWrapper>
                <ReportHeaderContent>
                    {/* Logo */}
                            <LogoWrapper>
                                <Logo>
                                    <div>
                                        <img src={company ? 
                                        process.env.REACT_APP_URL+'/images/'+ company.companyLogo:
                                        CompanyLogo} alt="" srcset="" />
                                    </div>
                                </Logo>

{                company &&    <AddressWrapper>
                                <h3>{company?.companyName?.toUpperCase()}</h3>
                                <span><b>Address:</b> {company?.address}</span>
                                <span><b>Phone:</b> {company?.phoneNumber}</span>
                                <span><b>Email:</b> {company?.companyEmail}</span>
                            </AddressWrapper>}
                            </LogoWrapper>
                            {/* date */}
               {  supplier &&  <DateWrapper>
                                <h3>PURCHASE REPORT</h3>  
                                <span>Report for<b style={{textTransform: "capitalize"}}>{" "+supplier}</b></span>                       
                               { searchBy === 'Selected-Dates' 
                               ? <span>{fromDate}<b> {fromDate && 'To'} </b>{toDate}</span>
                               : <span><b>{searchBy}</b></span> }                                  
                            </DateWrapper> 
        }
                </ReportHeaderContent>
        </ReportHeaderWrapper>

          {/* Purchase Report Table Result */}
          {isLoading? 
                    <div style={{marginLeft: "50px", marginBottom:'50px'}}><List/></div>
                    :<div style={{position:'relative'}}> 
                              
                    {/* Sales Report Table Result */}
                                     <span style={{width: "20%", display: "flex", gap: "5px", alignItems:"center", position: "absolute", right: "20px", top:"-40px"}}>
                                    <SelectInput 
                                        label={'Sort by'}
                                        value={paymentStatusFilter}
                                        onChange={(e)=>setPaymentStatusFilter(e.target.value)}
                                        title={'Sort by'}
                                        options={paymentStatusItems}
                                      />
                              </span>
                      <PurchaseReportTable data={filteredPurchaseData} currencySymbol={company[0]?.currencySymbol}/>
                    </div>
                    }
        </PurchaseReportContent>        
    </PurchaseReportWrapper>
  )
}





