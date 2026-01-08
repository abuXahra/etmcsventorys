
import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../components/page_title/PageTitle'
import ListHeader from '../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import ProductTable from '../../components/table/product_table/Product'
// import ProductImage from '../../images/necklace.jpeg'
import PaymentTable from '../../components/table/payment_table/Payment'
import { ExpensePageContent, ExpensePageWrapper } from './expensePage.style'
import ExpensesTable from '../../components/table/expense_table/Expense'
import axios from 'axios'
import { List } from 'react-content-loader'
import { UserContext } from '../../components/context/UserContext'



export default function ExpensePage() {
  
  const token = localStorage.getItem('token');
    
        const[expenseRecords, setExpenseRecords] = useState([]);
        const [allExpenseRecords, setAllExpenseRecords] = useState([]);
        const [isLoading, setIsLoading] = useState(false);
        
          // user Permission
          const {user, permissions} = useContext(UserContext);
          const expensePermission = permissions?.find(p => p.module === "Expense")
          const effectivePermission =
              user?.role === "admin"
                ? { canView: true, canAdd: true, canEdit: true, canDelete: true }
                : expensePermission;

  

         // fetch expense handler 
                          useEffect(() => {
                              const getExpense = async () => { 
                                setIsLoading(true)  
                                try {
                                      const res = await axios.get(process.env.REACT_APP_URL + "/api/expense/", {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });
                                     
                                      setExpenseRecords(res.data)
                                      setAllExpenseRecords(res.data);
                                      setIsLoading(false)
                    
                                      console.log(res.data)
                                  } catch (err) {
                                      console.log(err)
                                      setIsLoading(false)
                                  }
                          
                              }
                              getExpense();
                          }, [])

           // handle expense delete
          const deleteExpense = async (expenseId,  updatedList = null) => {
            
            if (updatedList) {
              setExpenseRecords(updatedList);
              return { success: true };
            }
            
            try {
              await axios.delete(`${process.env.REACT_APP_URL}/api/expense/${expenseId}`, {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });
              const updatedExpense = expenseRecords.filter(expense => expense._id !== expenseId);
              setExpenseRecords(updatedExpense);
              return { success: true };
            } catch (error) {
              return { success: false, message: error.message };
            }
          };
        

            // handle search query
            const handleSearchQueryOnChange = (e) => {
              let query = e.target.value;
              //  if query is empty, reset to all tax record
              if(query === ''){
                setExpenseRecords(allExpenseRecords);
              }else{
                // Filter th tax records based on query
                const filterRecords = allExpenseRecords.filter(item =>
                  item.expenseFor.toLocaleLowerCase().includes(query.toLocaleLowerCase())
                );
                setExpenseRecords(filterRecords)
              }
            }
  


  const navigate = useNavigate();
  return (
    <ExpensePageWrapper>
        <PageTitle title={'Expenses'}/>

        {/* content */}
        {isLoading? <List/> :
        <ExpensePageContent>
          <ListHeader 
            title={'Add Expense'} 
            btnOnClick={()=>navigate('/add-expense')}
            searQuery={'payment for'}
            onChange={handleSearchQueryOnChange}
            type={'text'}
            dataLength={expenseRecords.length}
            permission={effectivePermission?.canAdd}
          />
          
          {/* Expense Table */}
            <ExpensesTable 
                data={expenseRecords} 
                onDeleteExpense={deleteExpense} 
                setIsLoading={setIsLoading}
                expensePermission={effectivePermission}
            />
        </ExpensePageContent>
}
    </ExpensePageWrapper>
  )
}




