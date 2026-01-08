
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
import SaleReportTable from '../../../components/table/report_table/sale_report_table/SaleReportTable';
import CompanyLogo from '../../../images/product_placeholder.jpg'
import { AddressWrapper, DateWrapper, WastageReportContent, WastageReportWrapper, Logo, LogoWrapper, ReportHeaderContent, ReportHeaderWrapper, SearchReportWrapper } from './wastageReport.style';
import axios from 'axios';
import WastageReportTable from '../../../components/table/report_table/wastage_report_table/WastageReportTable';



export default function WastageReport() {
const token = localStorage.getItem('token');
    

    // today date
    const todayDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD (2025-02-29)

    const [name, setName] = useState('')
    const [nameError, setNameError] = useState(false)

    const [fromDate, setFromDate] = useState('')
    const [fromDateError, setFromDateError] = useState(false)

    const [toDate, setToDate] = useState('')
    const [toDateError, setToDateError] = useState(false)

    const [generateBy, setGenerateBy] = useState('')
    const [generateByError, setGenerateByError] = useState(false)
    const [showDateRange, setShowDateRange] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false)
    const [isGeneratingAll, setIsGeneratingAll] = useState(false)
    const [company, setCompany] = useState('')
      // show All Report Button
      const [showAllReportButton, setShowAllReportButton] = useState(false)
     
    

    const generateByItems=[
        {
            title: "Select",
            value: ""
        },
        {
            title: "All-Expenses",
            value: "All-Dates"
        },
        {
            title: "Selected-Dates",
            value: "Selected-Dates",
        },
    ]
     const[wastageRecords, setWastageRecords] = useState([]);
    
        const [isLoading, setIsLoading] = useState(false);
  
         // fetch expense handler 
                          useEffect(() => {
                              const getWastage = async () => { 
                                setIsLoading(true)  
                                try {
                                      const res = await axios.get(process.env.REACT_APP_URL + "/api/wastage/", {
                                                                          headers: {
                                                                            Authorization: `Bearer ${token}`
                                                                          }
                                                                    })
                                     
                                      setWastageRecords(res.data)
                                      setGenerateBy(generateByItems[1].value)
                                      setIsLoading(false)
                    
                                      console.log(res.data)
                                  } catch (err) {
                                      console.log(err)
                                      setIsLoading(false)
                                  }
                          
                              }
                              getWastage();
                          }, [])

    

    const onChangeHandler = (type, e)=>{
       if (type === 'generate') {
            setGenerateBy(e.target.value)
            setGenerateByError(false);

            e.target.value === "Selected-Dates" ? setShowDateRange(true) : setShowDateRange(false)

        }if (type === 'from-date') {
            setFromDate(e.target.value)
            setFromDateError(false);
        }else if (type === 'to-date') {
            setToDate(e.target.value)
            setToDateError(false);
        }
    }


    const submitHandler =async (e) => {
        e.preventDefault();

        let isValid = true;

        if(!generateBy){
            setGenerateBy(true)
        }

        if(generateBy === 'Selected-Dates'){
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
try {
        const res = await axios.get(`${process.env.REACT_APP_URL}/api/wastage`, {
                                            headers: {
                                              Authorization: `Bearer ${token}`
                                            }
                                      })
        const allWastages = res.data;

        if (generateBy === 'All-Dates') {
            setWastageRecords(allWastages);
            setShowAllReportButton(false); // No need to show 'All Reports' again
        } else if (generateBy === 'Selected-Dates') {
            const from = new Date(fromDate);
            const to = new Date(toDate);
            const filteredWastages = allWastages.filter(wastage => {
                const wastageDate = new Date(wastage.wastageDate);
                return wastageDate >= from && wastageDate <= to;
            });
            setWastageRecords(filteredWastages);
            setShowAllReportButton(true); // Show "All Reports" button to reset filter
        }

    } catch (err) {
        console.error(err);
    } finally {
        setIsGenerating(false);
        setIsLoading(false);
    }
       
}
    }



//   const[records, setRecords] = useState(data);
//   const handleChange = (e) => {
//     let query = e.target.value;  
//     const newRecords = data.filter(item => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
//     setRecords(newRecords);
//   }


  const navigate = useNavigate();

  return (
    <WastageReportWrapper>
        <PageTitle title={'Expense Report'}/>

        {/* Search Report */}
        <SearchReportWrapper>
            <form>
            <ItemContainer title={'Generate Report'}> 
                        
                        <AnyItemContainer>
                        
                        <SelectInput 
                                                    onChange={(e)=>onChangeHandler('generate', e)} 
                                                    error={generateByError} 
                                                    options={generateByItems} 
                                                    label={'Generate by'}
                                                    title={'Generate by'} 
                                                    value={generateBy} 
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
                                btnOnClick={(e)=>submitHandler(e)}
                                btnText={isGenerating? <ButtonLoader text={'Generating...'}/> : 'Generate'}
                                btnFontSize={'12px'}
                                btnColor={'Green'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                />
                    
                        </ItemButtonWrapper>
                    </ItemContainer>          
            </form>
        </SearchReportWrapper>

        {/* content */}
        <WastageReportContent>            
          <ListHeader 
            title={'print'} 
            btnOnClick={()=>{}}
            // onChange={handleChange}
            type={'text'}
            // dataLength={records.length}
            icon={<FaPrint/>}
            inputDisplay={'none'}
          />
          
          <ReportHeaderWrapper>
                <ReportHeaderContent>
                    {/* Logo */}
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
                            <DateWrapper>
                                <h3>WASTAGE REPORT</h3>  
                                <span>{name && `Report for ${name}`}</span>                       
                                <span>{fromDate}<b> To </b>{toDate}</span>                                   
                            </DateWrapper> 
        
                </ReportHeaderContent>
        </ReportHeaderWrapper>

          {/* Expense Report Table Result */}
           {wastageRecords.length === 0 
           ? (<div style={{color: "black", marginBottom: "50px", textAlign: "center"}}>No record found</div>)
           : <WastageReportTable data={wastageRecords}/>}
        </WastageReportContent>        
    </WastageReportWrapper>
  )
}





