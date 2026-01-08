import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import ItemContainer from '../../../components/item_container/ItemContainer'
import Input from '../../../components/input/Input'
import SelectInput from '../../../components/input/selectInput/SelectInput'
import TextArea from '../../../components/input/textArea/TextArea'
import { ItemButtonWrapper } from '../../../components/item_container/itemContainer.style'
import Button from '../../../components/clicks/button/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { AnyItemContainer } from '../../sale/Add/addSale.style'
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader'
import { EditPaymentContent, EditPaymentWrapper } from '../../payment/edit/EditPayment.style'
import axios from 'axios'
import { UserContext } from '../../../components/context/UserContext'
import { List } from 'react-content-loader';

export default function EditPayment() {

    const token = localStorage.getItem('token');
    const {paymentId} = useParams();
    console.log('id:======= ',paymentId)
// Payment For
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



const paymentTypeItems =  [
    {
        title: 'select',
        value: ''
    },
    {
        title: 'Cash',
        value: 'Cash'
    },
    {
        title: 'Transfer',
        value: 'Transfer'
    },
    {
        title: 'Check-payment',
        value: 'Check-payment'
    },
]

    const navigate = useNavigate();
    const {user} = useContext(UserContext)

    const [isLoading, setIsLoading] = useState(false);
    const [isBtnLoading, setIsBtnLoading] = useState(false);
    
    // Date 2025-02-04 (year-month-day) 
      const [paymentDate, setPaymentDate] = useState('');
      const [dateError, setDateError] = useState(false);
   

    // Payment For
    const [paymentFor, setPaymentFor] = useState('');
    console.log('==========================\n', paymentForItems[1].value, '==========================\n');
    const [paymentForError, setPaymentForError] = useState(false);

    // Invoice No.
    const [invoiceNo, setInvoiceNo] = useState(null);
    const [invoiceNoError, setInvoiceNoError] = useState(false);

    // Due Amount
    const [dueBalance, setDueBalance] = useState(null);
    const [dueAmountError, setDueAmountError] = useState(false);

  
    // Payment Type
    const [paymentType, setPaymentType] = useState(null)
    const [paymentTypeError, setPaymentTypeError] = useState(false);


    // Payable amount
    const [payableAmount, setPayableAmount] = useState(null)
    const [payableAmountError, setPayableAmountError] = useState(false);


    // Note
    const [note, setNote] = useState('Full Payment')
       
    
    const handleChange = (type, e) =>{
        if(type === 'date'){
            setPaymentDate(e.target.value);
            setDateError(false);
        }else if(type === 'payment-for'){
            setPaymentFor(e.target.value);
            setInvoiceNo(e.target.value)
            setPaymentForError(false);
        }else if(type === 'due-amount'){
            setDueBalance(e.target.value);
            setDueAmountError(false);
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

useEffect(()=>{
const fetchPayment = async () => {

    setIsLoading(true);
    try {
        const res = await axios.get(`${process.env.REACT_APP_URL}/api/payment/${paymentId}`, {
                                            headers: {
                                              Authorization: `Bearer ${token}`
                                            }
                                      })
        const formattedPaymentDate = new Date(res.data.paymentDate).toISOString().split('T')[0];
        setPaymentDate(formattedPaymentDate);
        setPaymentFor(res.data.paymentFor)
        setInvoiceNo(res.data.invoiceNo)
        setDueBalance(res.data.dueBalance)
        setPaymentType(res.data.paymentType)
        setPayableAmount(res.data.payableAmount)
        setNote(res.data.note)
        
        setIsLoading(false);
    
    } catch (error) {
        console.log(error)
        setIsLoading(false);
    }
}

fetchPayment();
},[paymentId])

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
            setIsLoading(true)
                 
            try {

                const updatePayment = {
                    paymentDate,
                    paymentFor: paymentFor,
                    invoiceNo,
                    dueBalance: Number(dueBalance),
                    payableAmount: Number(payableAmount),
                    paymentType,
                    note,
                    useId: user?._id
                }

                const res = await axios.put(`${process.env.REACT_APP_URL}/api/payment/${paymentId}`, updatePayment, {
                                                    headers: {
                                                      Authorization: `Bearer ${token}`
                                                    }
                                              }) 
                console.log(res.data)
                navigate(`/payments`)
                
            } catch (error) {
              console.log(error)   
            }
        }
    }

  return (
    <EditPaymentWrapper>
    {/* Page title */}
        <PageTitle title={'Payment'} subTitle={'/ Edit'}/>
    <>
      {isLoading? <List/> :
        <EditPaymentContent>
            <form action="" onSubmit={submitHandler}>
                    <ItemContainer title={'Edit Payment'}>
                        <AnyItemContainer justifyContent={'space-between'}>
                            {/* date */}
                            <Input 
                                value={paymentDate} 
                                title={'Date'}
                                onChange={(e)=>handleChange('date', e)} 
                                error={dateError} 
                                type={'date'} 
                                label={'Date'} 
                            />

                            {/* Payment for */}
                            <Input 
                                // onChange={(e)=>handleChange('payment-for', e)} 
                                error={paymentForError} 
                                label={'Payment For'}
                                title={'Payment For'}
                                value={paymentFor}
                                readOnly 
                                inputBg='#c4c4c449' 
                                onChange={()=>{}}
                            />
                      
                        {/* Invoice Number */}
                            <Input 
                                value={invoiceNo} 
                                title={'Invoice No'}  
                                type={'text'} 
                                label={'Invoice No.'}
                                readOnly 
                                inputBg='#c4c4c449' 
                                onChange={()=>{}}
                            />     </AnyItemContainer>

                        <AnyItemContainer justifyContent={'space-between'}>
                            
                            {/* Due Amount */}
                            <Input 
                                value={dueBalance} 
                                title={'Due Amount (N)'}
                                // onChange={(e)=>handleChange('due-amount', e)}  
                                type={'text'} 
                                label={'Due Amount'} 
                                readOnly 
                                inputBg='#c4c4c449' 
                                onChange={()=>{}}
                            />

                             {/* Payment Type */}
                             <SelectInput 
                                onChange={(e)=>handleChange('payment-type', e)} 
                                error={paymentTypeError} 
                                options={paymentTypeItems} 
                                label={'Payment Type'}
                                title={'Payment Type'}
                                value={paymentType}
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
                            ></TextArea>                             
                            {/* profile picture */}
                        </AnyItemContainer>
                 

                        {/* button */}
                        <ItemButtonWrapper btnAlign={'space-between'}>
                            <div>
                            <Button
                                title={'Select Items'}
                                btnText={isLoading? <ButtonLoader text={'Adding...'}/> : 'Update Payment'}
                                btnFontSize={'12px'}
                                btnColor={'Green'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                />
                            </div>
                        </ItemButtonWrapper>
                    </ItemContainer>
                </form>
        </EditPaymentContent>}</>
    </EditPaymentWrapper>
  )
}

