import React, { useEffect, useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import ItemContainer from '../../../components/item_container/ItemContainer'
import Input from '../../../components/input/Input'
import SelectInput from '../../../components/input/selectInput/SelectInput'
import TextArea from '../../../components/input/textArea/TextArea'
import { ItemButtonWrapper } from '../../../components/item_container/itemContainer.style'
import Button from '../../../components/clicks/button/Button'
import { useNavigate } from 'react-router-dom'
import { AnyItemContainer, ItemListContent, TableStyled, TdStyled } from '../../sale/Add/addSale.style'
import { FaLocationDot } from 'react-icons/fa6'
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader'
import { AiFillPicture } from 'react-icons/ai'
import { AddExpenseContent, AddExpenseWrapper } from './addExpense.style'
import { FaTrash } from 'react-icons/fa'
import axios from 'axios';


export default function AddExpenses() {

// Payment for
const [itemList, setItemList] = useState([])

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const todayDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD (2025-02-29)

    // date
    const [date, setDate] = useState(todayDate);
    const [dateError, setDateError] = useState(false);

// payment for
    const [expenseFor, setExpenseFor] = useState('');
    const [expenseForError, setExpenseForError] = useState(false);


    // payable amount
    const [amount, setAmount] = useState('')
    const [amountError, setAmountError] = useState(false);

    // note
    const [note, setNote] = useState('')
    
    // Fetch expense initial
    const [expenseInitial, setExpenseInitial] = useState('')

    const token = localStorage.getItem('token');

    useEffect(()=>{
      const fetchAllCompany = async() =>{
        setIsLoading(true)
          try {
              const res = await axios.get(`${process.env.REACT_APP_URL}/api/company`, {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });
            
              
              const prefix = res.data[0].prefixes?.[0];

                
              if (prefix) {
                  setExpenseInitial(prefix.expense);
              }

              setIsLoading(false);
          } catch (error) {
              console.log(error);
              setIsLoading(false);
          }
    
      }
      fetchAllCompany();
    },[])
    
    
// handle input change
    const handleChange = (type, e) =>{
        if(type === 'date'){
            setDate(e.target.value);
            setDateError(false);
        }else if(type === 'expense'){
            setExpenseFor(e.target.value);
            setExpenseForError(false);
        }else if(type === 'amount'){
            setAmount(e.target.value);
            setAmountError(false);
        }else if(type === 'note'){
            setNote(e.target.value);
        }
    }

    // add item to itemList
    const addToList = (e)=>{

        e.preventDefault();
        let isValid = true;

        if(!date){
            setDateError(true);
            isValid = false;
        }

        if(!expenseFor){
            setExpenseForError(true);
            isValid = false;
        }

        if(!amount){
            setAmountError(true);
            isValid = false;
        }

        
        if(isValid){
        const newItem = {date, expenseFor, amount, note};
        setItemList((prevItems)=>[...prevItems, newItem]);
        }

        // clear form after adding
        setDate(todayDate);
        setExpenseFor('')
        setAmount('')
        setNote('')
    
    }


      // delete item from list
      const deleteItem = (index) => {
        const updatedList =  itemList.filter((_, i) => i !== index);
        setItemList(updatedList)
      }

     
    
      const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
      
        try {
            const newExpenses = itemList.map((item) => ({
                expenseDate: item.date,
                expenseFor: item.expenseFor,
                amount: parseFloat(item.amount),
                note: item.note
              }));
              
              const res =await axios.post(`${process.env.REACT_APP_URL}/api/expense/create`, {
                items: newExpenses,
                prefix: expenseInitial  // e.g., "EXP"
              },
              {
                headers: {
                 Authorization: `Bearer ${token}`
                 }
            });
            
      
          setIsLoading(false)
          console.log(res.data);
          navigate('/expenses');
        } catch (error) {
          console.error(error);
        } 
      };
      


  return (
    <AddExpenseWrapper>
    {/* Page title */}
        <PageTitle title={'Expense'} subTitle={'/ Add'}/>

        <AddExpenseContent>
            <form action="">
                    <ItemContainer title={'New Expense'}>
                        <AnyItemContainer justifyContent={'space-between'}>
                            {/* date */}
                            <Input 
                                value={date} 
                                title={'Date'}
                                onChange={(e)=>handleChange('date', e)} 
                                error={dateError} 
                                type={'date'} 
                                label={'Date'} 
                            />


                      
                      {/* Invoice Number */}
                            <Input 
                                value={expenseFor} 
                                title={'Expenses For'}
                                onChange={(e)=>handleChange('expense', e)}  
                                type={'text'} 
                                error={expenseForError}
                                label={'Expenses For'} 
                            />     
                        {/* Due Amount */}
                            <Input 
                                value={amount} 
                                title={'Amount'}
                                onChange={(e)=>handleChange('amount', e)}  
                                type={'text'} 
                                label={'Amount'} 
                                error={amountError}
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
                                btnText={'Add List'}
                                btnFontSize={'12px'}
                                btnColor={'grey'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                btnOnClick={addToList}
                            />
                            </div>
                        </ItemButtonWrapper>


                    </ItemContainer>
                </form>

                              {/* Expense */}
                          { itemList.length > 0 
                          ? ( <ItemListContent>
                                <ItemContainer title={'Expense List'}>
                                <TableStyled>
                                    <thead>
                                        <TdStyled><b>#</b></TdStyled>
                                        <TdStyled><b>Date</b></TdStyled>
                                        <TdStyled><b>For</b></TdStyled>
                                        <TdStyled><b>Amount</b></TdStyled>
                                        <TdStyled><b>Note</b></TdStyled>
                                        <TdStyled><b>Action</b></TdStyled>
                                    </thead>
                                    <tbody>
                                    {itemList.map((data, i)=>(
                                        <tr key={i}>
                                            <TdStyled>{i+1}</TdStyled>
                                            <TdStyled>{data.date}</TdStyled>
                                            <TdStyled>{data.expenseFor}</TdStyled>
                                            <TdStyled>{data.amount}</TdStyled>
                                            <TdStyled>{data.note}</TdStyled>
                                            <TdStyled><span onClick={()=>deleteItem(i)}><FaTrash/></span></TdStyled>
                                        </tr>
                                    ))
                                }
                                    </tbody>
                                </TableStyled>
                                <div>
                                   <Button
                                    title={'Select Items'}
                                    btnText={isLoading? <ButtonLoader text={'Adding...'}/> : 'Add Expense'}
                                    btnFontSize={'12px'}
                                    btnColor={'green'}
                                    btnTxtClr={'white'}
                                    btnAlign={'flex-end'}
                                    btnOnClick={submitHandler}
                                />
                                </div>
 
                                </ItemContainer>
                            </ItemListContent>
                                ):(<></>)}
                        
        </AddExpenseContent>
    </AddExpenseWrapper>
  )
}



