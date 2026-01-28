import React, { useState, useEffect, useContext } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import ItemContainer from '../../../components/item_container/ItemContainer'
import Input from '../../../components/input/Input'
import SelectInput from '../../../components/input/selectInput/SelectInput'
import TextArea from '../../../components/input/textArea/TextArea'
import { ItemButtonWrapper } from '../../../components/item_container/itemContainer.style'
import Button from '../../../components/clicks/button/Button'
import { useNavigate } from 'react-router-dom'
import { AnyItemContainer } from '../../sale/Add/addSale.style'
import { FaLocationDot } from 'react-icons/fa6'
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader'
import { AiFillPicture } from 'react-icons/ai'
import { AddPaymentContent, AddPaymentWrapper } from '../../payment/add/AddPayment.style'
import axios from 'axios'
import { DropdownItems, DropdownWrapper } from '../../purchase/add/addPurchase.style'
import { UserContext } from '../../../components/context/UserContext'
import { List } from 'react-content-loader'

export default function AddPayment() {

const token = localStorage.getItem('token');
    
// Payment for
const paymentForItems =  [
    {
        title: 'select',
        value: ''
    },
    {
        title: 'SA1001',
        value: 'SA1001'
    },
    {
        title: 'SA1002',
        value: 'SA1002'
    },
    {
        title: 'PCA1001',
        value: 'PCA1001'
    },
    {
        title: 'PCA1002',
        value: 'PCA1002'
    },
]
    // invoice number
const invoiceNoItems =  [
    {
        title: 'select',
        value: ''
    },
    {
        title: 'SA1001',
        value: 'SA1001'
    },
    {
        title: 'SA1002',
        value: 'SA1002'
    },
    {
        title: 'PCA1001',
        value: 'PCA1001'
    },
    {
        title: 'PCA1002',
        value: 'PCA1002'
    },
]

// payment items
const paymentTypeItems =  [
        {
        title: 'Select',
        value: ''
    },
   {
        title: 'ETMCS Deduction',
        value: 'ETMCS Deduction'
    },
  {
        title: 'Check',
        value: 'Check'
    },
    {
        title: 'Card',
        value: 'Card'
    },
    {
        title: 'Cash',
        value: 'Cash'
    },
    {
        title: 'Online',
        value: 'Online'
    },
    {
        title: 'Bank Transfer',
        value: 'Bank Transfer'
    },
    //   {
    //     title: 'N/A',
    //     value: 'N/A'
    // },
]



    const navigate = useNavigate();
    const {user} = useContext(UserContext)

    const [isLoading, setIsLoading] = useState(false);
    const [isBtnLoading, setIsBtnLoading] = useState(false);

    const [items, setItems] = useState([])

    const todayDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD (2025-02-29)

    // date
    const [paymentDate, setPaymentDate] = useState(todayDate);
    const [dateError, setDateError] = useState(false);

    // payment for
    const [paymentFor, setPaymentFor] = useState('');
    const [paymentForError, setPaymentForError] = useState(false);

    // Invoice No.
    const [invoiceNo, setInvoiceNo] = useState('');
    const [invoiceNoError, setInvoiceNoError] = useState(false);

    // due amount
    const [dueBalance, setDueBalance] = useState('');
    const [dueAmountError, setDueAmountError] = useState(false);
  
    // payment type
    const [paymentType, setPaymentType] = useState('')
    const [paymentTypeError, setPaymentTypeError] = useState(false);

    // payable amount
    const [payableAmount, setPayableAmount] = useState('')
    const [payableAmountError, setPayableAmountError] = useState(false);

    // note
    const [note, setNote] = useState('')
       



    const handleChange = (type, e) =>{
        if(type === 'date'){
            setPaymentDate(e.target.value);
            setDateError(false);
        }else if(type === 'payment-for'){
            setShowItemDropdown(true)
            setPaymentFor(e.target.value);
            setInvoiceNo(e.target.value)
            setPaymentForError(false);
        }else if(type === 'due-amount'){
            setDueBalance(e.target.value);
            setDueAmountError(false);
        }else if(type === 'invoice'){
            setInvoiceNo(e.target.value);
            setInvoiceNoError(false);
        }else if(type === 'payment-type'){
            setPaymentType(e.target.value);
            setPaymentTypeError(false);
        }else if(type === 'payable-amount'){
            setPayableAmount(e.target.value);
            setPayableAmountError(false);
        }else if(type === 'note'){
            setNote(e.target.value);
        }
    }

        // fetch expense data
        useEffect(() => {
        const getPurchase = async () => { 
            setIsLoading(true);
            try {
            const res = await axios.get(process.env.REACT_APP_URL + "/api/purchase/", {
                                                headers: {
                                                  Authorization: `Bearer ${token}`
                                                }
                                          })
            // merge purchase items directly instead of nesting arrays
            setItems(prev => [...prev, ...res.data]);  
            setIsLoading(false);
            } catch (err) {
            console.log(err);
            setIsLoading(false);
            }
        };

        const getSale = async () => { 
            setIsLoading(true);
            try {
            const res = await axios.get(process.env.REACT_APP_URL + "/api/sale/", {
                                                headers: {
                                                  Authorization: `Bearer ${token}`
                                                }
                                          })
            // merge sales items directly instead of nesting arrays
            setItems(prev => [...prev, ...res.data]);  
            setIsLoading(false);
            } catch (err) {
            console.log(err);
            setIsLoading(false);
            }
        };

        getPurchase();
        getSale();
        }, []);


    const [showItemDropdown, setShowItemDropdown] = useState(false);
    // search name dropdownd handler
        const dropdownItems = (item) => {
        setShowItemDropdown(false);
        setPaymentFor(item.code);
        setInvoiceNo(item.code);        // set invoiceNo same as code
        setDueBalance(item.dueBalance);   // from DB
        };

    
    console.log('======', items, '========');
    
    const submitHandler = async (e) => {
        e.preventDefault();
        let isValid = true;

        if(!paymentDate){
            setDateError(true);
            isValid = false;
        }

        if(!paymentFor){
            setPaymentForError(true);
            isValid = false;
        }

        if(!invoiceNo){
            setInvoiceNoError(true);
            isValid = false;
        }

        
        if(!dueBalance){
            setDueAmountError(true);
            isValid = false;
        }
             
        if(!paymentType){
            setPaymentTypeError(true);
            isValid = false;
        }
        if(!payableAmount){
            setPayableAmountError(true);
            isValid = false;
        }

        if(isValid){
            setIsBtnLoading(true)
            
            try {

                const newPayment = {
                    paymentDate,
                    paymentFor: paymentFor,
                    invoiceNo,
                    dueBalance: Number(dueBalance),
                    payableAmount: Number(payableAmount),
                    paymentType,
                    note,
                    useId: user?._id
                }

                const res = await axios.post(`${process.env.REACT_APP_URL}/api/payment/register`, newPayment, {
                                                    headers: {
                                                      Authorization: `Bearer ${token}`
                                                    }
                                              }) 
                console.log(res.data)
                navigate(`/payments`)
                
            } catch (error) {
              setIsBtnLoading(false);
              console.log(error)   
            }
        }
    }

  return (
    <AddPaymentWrapper>
    {/* Page title */}
        <PageTitle title={'Payment'} subTitle={'/ Add'}/>

    <>
    {isLoading? <List/> :
        <AddPaymentContent>
            <form action="" onSubmit={submitHandler}>
                    <ItemContainer title={'New Payment'}>
                        <AnyItemContainer justifyContent={'space-between'}>
                            {/* Payment for */}
                            {/* <SelectInput 
                                onChange={(e)=>handleChange('payment-for', e)} 
                                error={paymentForError} 
                                options={paymentForItems} 
                                label={'Payment For'}
                                title={'Payment For'}    
                            /> */}

 <Input 
                                value={paymentFor} 
                                title={'Payment For'}
                                onChange={(e)=>handleChange('payment-for', e)} 
                                error={paymentForError} 
                                type={'text'} 
                                label={'Payment For'} 
                                placeholder={'search...'}
                                requiredSymbol={'*'}
                            />  
                           {showItemDropdown && (
                                    <DropdownWrapper topPosition={'50px'} width={"32%"}>
                                        { items.filter(c =>
                                            paymentFor.length > 0 &&
                                            c.code.toLowerCase().includes(paymentFor.toLowerCase())
                                            ).length > 0 ? (
                                            items
                                                .filter(c => 
                                                paymentFor.length > 0 &&
                                                c.code.toLowerCase().includes(paymentFor.toLowerCase())
                                                )
                                                .map((data, i) => (
                                                <DropdownItems key={i} onClick={() => dropdownItems(data)}>
                                                    {data.code}
                                                </DropdownItems>
                                                ))
                                        ) : (
                                        <DropdownItems>
                                            <div style={{width: "100%", display: "flex", flexDirection: "column", gap: "5px", padding: "20px", justifyContent: "center", alignItems: "center"}}>
                                                <span>No Item Found </span>
                                            </div>
                                        
                                        </DropdownItems>
                                        )}
                                    </DropdownWrapper>
                            )}

                                                  {/* date */}
                            <Input 
                                value={paymentDate} 
                                title={'Date'}
                                onChange={(e)=>handleChange('date', e)} 
                                error={dateError} 
                                type={'date'} 
                                label={'Date'} 
                            />

                      {/* Invoice Number */}
                            <Input 
                                value={invoiceNo} 
                                title={'Invoice No.'}
                                onChange={()=>{}}  
                                type={'text'} 
                                error={invoiceNoError}
                                label={'Invoice No.'} 
                                readOnly 
                                inputBg='#c4c4c449'
                            />     
                    </AnyItemContainer>

                        <AnyItemContainer justifyContent={'space-between'}>
                            
                            {/* Due Amount */}
                            <Input 
                                value={dueBalance} 
                                title={'Due Amount (N)'}
                                onChange={()=>{}}  
                                type={'text'} 
                                label={'Due Amount'} 
                                readOnly 
                                inputBg='#c4c4c449'
                            />

                             {/* Payment Type */}
                             <SelectInput 
                                onChange={(e)=>handleChange('payment-type', e)} 
                                error={paymentTypeError} 
                                options={paymentTypeItems} 
                                label={'Payment Type'}
                                value={paymentType}
                                title={'Payment Type'}
                                />
                      

                           {/* Payable Amount ($) */}
                           <Input 
                                value={payableAmount} 
                                title={'Payable Amount'}
                                onChange={(e)=>handleChange('payable-amount', e)} 
                                error={payableAmountError} 
                                type={'text'} 
                                label={'Payable Amount'} 
                            />
      
                        </AnyItemContainer>
                       
                        <AnyItemContainer justifyContent={'space-between'}>
                        {/* note */}
                            <TextArea  
                                label={'Note'}
                                title={'Note'}
                                onChange={(e)=> handleChange('note', e)}
                                value={note}
                            ></TextArea>                             {/* profile picture */}
                        </AnyItemContainer>
                 

                        {/* button */}
                        <ItemButtonWrapper btnAlign={'space-between'}>
                            <div>
                            <Button
                                title={'Select Items'}
                                btnText={isBtnLoading? <ButtonLoader text={'Adding...'}/> : 'Add Payment'}
                                btnFontSize={'12px'}
                                btnColor={'Green'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                />
                            </div>
                        </ItemButtonWrapper>
                    </ItemContainer>
                </form>
        </AddPaymentContent>
         } </>
    </AddPaymentWrapper>
  )
}

