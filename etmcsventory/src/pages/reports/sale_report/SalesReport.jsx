




import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AddressWrapper, AnyItemContaineri, DateWrapper, Logo, LogoDateWrapper, LogoWrapper, ReportHeaderContent, ReportHeaderWrapper, SalesReportContent, SalesReportWrapper, SearchReportWrapper, SearchResultWrapper } from './salesReport.style'
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
import SaleReportTable from '../../../components/table/report_table/sale_report_table/SaleReportTable';
import CompanyLogo from '../../../images/product_placeholder.jpg'
import axios from 'axios';
import { DropdownItems, DropdownWrapper } from '../../purchase/add/addPurchase.style';
import { List } from 'react-content-loader'



export default function SalesReport() {

        //  const[saleReport, setSaleReport] = useState([]);
        const token = localStorage.getItem('token');
    
    
         const searchCustomerBy=[
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
    
    const [showDateRange, setShowDateRange] = useState(false);

    const [company, setCompany] = useState('')
    const [saleData, setSaleData] = useState([])

    const [customer, setCustomer] = useState('')
    const [customerNameError, setCustomerNameError] = useState();
    const [customerItems, setCustomerItems] = useState([])
    const [showCusDropdown, setShowCusDropdown] = useState(false);
    const [customerId, setCustomerId] = useState('');
    

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

    // fetch customer data
            const getCustomers = async () => { 
                //  setIsLoading(true)  
                 try {
            
                     const res = await axios.get(process.env.REACT_APP_URL + "/api/customers/", {
                                                         headers: {
                                                           Authorization: `Bearer ${token}`
                                                         }
                                                   })
               
                     setCustomerItems(res.data)
                    //  setIsLoading(false)
                     
                 } catch (err) {
                     console.log(err)
                    //  setIsLoading(false)
                     }
                   }
                   
                 getCustomers();

    
    const fetchSale = async () => {
        setIsLoading(true)  
        try {
            const res =await  axios.get(`${process.env.REACT_APP_URL}/api/sale`, {
                                                headers: {
                                                  Authorization: `Bearer ${token}`
                                                }
                                          })
            setSaleData(res.data)
              setIsLoading(false)
        } catch (error) {
            console.log(error)
              setIsLoading(false)
        }
    }

    fetchSale();
    },[])

    
// search name dropdownd handler
const dropdownCustomerName = (customer) => {
    setShowCusDropdown(false)
    setCustomerId(customer._id)
    setCustomer(customer.name)    
}


    const onChangeHandler = (type, e)=>{
        if(type === 'customer-name'){
            setCustomer(e.target.value);
            setShowCusDropdown(e.target.value.trim().length > 0);
            setCustomerNameError(false);
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

        if(!customer){
            setCustomerNameError(true)
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
        if (isValid) {
    setIsGenerating(true);
    setIsLoading(true);

    const fetchSales = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_URL}/api/sale`, {
                                                headers: {
                                                  Authorization: `Bearer ${token}`
                                                }
                                          })
            let allSales = res.data;

            // Filter based on customer
            let filteredSales = allSales.filter(sale => sale.customer?._id === customerId);

            // If searching by selected dates, further filter
            if (searchBy === 'Selected-Dates') {
                const from = new Date(fromDate);
                const to = new Date(toDate);

                filteredSales = filteredSales.filter(sale => {
                    const saleDate = new Date(sale.saleDate);
                    return saleDate >= from && saleDate <= to;
                });
            }

            setSaleData(filteredSales);
            // ✅ Show the "All Reports" button when a filter has been applied
                setShowAllReportButton(true);
        } catch (err) {
            console.error(err);
        } finally {
            setIsGenerating(false);
            setIsLoading(false);
        }
    };

    fetchSales();
}

}

const refetchSale = async (e) => {
    e.preventDefault();
    setSearchBy('');
    setFromDate('');
    setToDate('');
    setCustomer('');
    setShowAllReportButton(false); // ✅ Hide the button after fetching all reports

    setIsGeneratingAll(true);
    setIsLoading(true);  
    try {
        const res = await axios.get(`${process.env.REACT_APP_URL}/api/sale`, {
                                            headers: {
                                              Authorization: `Bearer ${token}`
                                            }
                                      })
        setSaleData(res.data);
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
  const filteredSaleData = saleData.filter((sale) => {
    if (paymentStatusFilter === "all") return true;
    return sale.paymentStatus?.toLowerCase() === paymentStatusFilter.toLowerCase();
  });


            const paymentStatusItems = [
              { title: "All", value: "all" },
              { title: "Paid", value: "paid" },
              { title: "Partial", value: "partial" },
              { title: "Unpaid", value: "unpaid" },
            ]
  const navigate = useNavigate();       


  return (
    <SalesReportWrapper>
        <PageTitle title={'Sales Report'}/>

        {/* Search Report */}
       {customerItems.length > 0 && 
       <SearchReportWrapper>
            <form>
            <ItemContainer title={'Generate Report'}> 
                        
                        <AnyItemContainer>
                         <Input 
                                                        value={customer} 
                                                        title={'Customer Name'}
                                                        onChange={(e)=>onChangeHandler('customer-name', e)} 
                                                        error={customerNameError} 
                                                        type={'text'} 
                                                        label={'Customer Name'} 
                                                        placeholder={'search...'}
                                                        requiredSymbol={'*'}
                                                    />  
                                                   {showCusDropdown && (
                                                            <DropdownWrapper topPosition={'50px'} width={"33%"}>
                                                                {customerItems.filter(c =>
                                                                customer.length > 0 &&
                                                                c.name.toLowerCase().includes(customer.toLowerCase())
                                                                ).length > 0 ? (
                                                                customerItems
                                                                    .filter(c => 
                                                                    customer.length > 0 &&
                                                                    c.name.toLowerCase().includes(customer.toLowerCase())
                                                                    )
                                                                    .map((data, i) => (
                                                                    <DropdownItems key={i} onClick={() => dropdownCustomerName(data)}>
                                                                        {data.name}
                                                                    </DropdownItems>
                                                                    ))
                                                                ) : (
                                                                <DropdownItems>
                                                                    <div style={{width: "100%", display: "flex", flexDirection: "column", gap: "5px", padding: "20px", justifyContent: "center", alignItems: "center"}}>
                                                                        <span>No such customer </span>
                                                                        <a href="/add-customer">Please click here to add </a>
                                                                    </div>
                                                                
                                                                </DropdownItems>
                                                                )}
                                                            </DropdownWrapper>
                                                    )}
                         <SelectInput 
                            onChange={(e)=>onChangeHandler('search', e)} 
                            error={searchError} 
                            options={searchCustomerBy} 
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
                                btnOnClick={(e)=>refetchSale(e)}
                                />
                            }
                        </ItemButtonWrapper>
                    </ItemContainer>          
            </form>
        </SearchReportWrapper>}
       
        {/* content */}
        <SalesReportContent>
          <ListHeader 
            title={'print'} 
            btnOnClick={()=>{}}
            onChange={''}
            type={'text'}
            dataLength={saleData.length}
            icon={<FaPrint/>}
            inputDisplay={'none'}/>
          
   
           
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

        
           {  company &&  <AddressWrapper>
                                <h3>{company?.companyName?.toUpperCase()}</h3>
                                <span><b>Address:</b> {company?.address}</span>
                                <span><b>Phone:</b> {company?.phoneNumber}</span>
                                <span><b>Email:</b> {company?.companyEmail}</span>
                            </AddressWrapper>
                        }
                            </LogoWrapper>
                            {/* date */}
               {  customer &&  <DateWrapper>
                                <h3>SALES REPORT</h3>  
                                <span>Report for<b style={{textTransform: "capitalize"}}>{" "+customer}</b></span>                       
                               { searchBy === 'Selected-Dates' 
                               ? <span>{fromDate}<b> {fromDate && 'To'} </b>{toDate}</span>
                               : <span><b>{searchBy}</b></span> }                                  
                            </DateWrapper> 
        }
                </ReportHeaderContent>
        </ReportHeaderWrapper>
 

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
            <SaleReportTable data={filteredSaleData} currencySymbol={company?.currencySymbol}/>
          </div>
          }  
          </SalesReportContent>       
    </SalesReportWrapper>
  )
}







