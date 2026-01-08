
import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../components/page_title/PageTitle'
import { SalePageContent, SalePageWrapper } from './salePage.style'
import ListHeader from '../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import SalesTable from '../../components/table/sale_table/Sale'
import axios from 'axios'
import { List } from 'react-content-loader'
import { UserContext } from '../../components/context/UserContext'



export default function SalePage() {
  const token = localStorage.getItem('token');
    
  
     const[saleRecords, setSaleRecords] = useState([]);
     const [allSaleRecords, setAllSaleRecords] = useState([]);
     const [isLoading, setIsLoading] = useState(false);
  
               // user Permission
               const {user, permissions} = useContext(UserContext);
               const salePermission = permissions?.find(p => p.module === "Sale")
               const effectivePermission =
                   user?.role === "admin"
                     ? { canView: true, canAdd: true, canEdit: true, canDelete: true }
                     : salePermission;
     
       
     // fetch expense handler 
                          useEffect(() => {
                              const getSale = async () => { 
                                setIsLoading(true)  
                                try {
                                      const res = await axios.get(process.env.REACT_APP_URL + "/api/sale/", {
                                                                          headers: {
                                                                            Authorization: `Bearer ${token}`
                                                                          }
                                                                    })
                                     
                                      setSaleRecords(res.data)
                                      setAllSaleRecords(res.data);
                                      setIsLoading(false)
                    
                                      console.log(res.data)
                                  } catch (err) {
                                      console.log(err)
                                      setIsLoading(false)
                                  }
                          
                              }
                              getSale();
                          }, [])



           // handle sale delete
          const deleteSale = async (saleId,  updatedList = null) => {
            
            if (updatedList) {
              setSaleRecords(updatedList);
              return { success: true };
            }
            
            try {
              await axios.delete(`${process.env.REACT_APP_URL}/api/sale/${saleId}`, {
                                                  headers: {
                                                    Authorization: `Bearer ${token}`
                                                  }
                                            })
              const updatedSale = saleRecords.filter(sale => sale._id !== saleId);
              setSaleRecords(updatedSale);
              return { success: true };
            } catch (error) {
              return { success: false, message: error.message };
            }
          };

// handle search query
            const handleSearchQueryOnChange = (e) => {
              let query = e.target.value.trim().toLowerCase();
              //  if query is empty, reset to all record
              if(query === ''){
                setSaleRecords(allSaleRecords);
              }else{
                // Filter records based on query
                const filterRecords = allSaleRecords.filter(item =>
                  item.customer?.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())||
                  item.code?.toLowerCase().includes(query)
                );
                setSaleRecords(filterRecords)
              }
            }


  const navigate = useNavigate();
  return (
    <SalePageWrapper>
        <PageTitle title={'Sale'}/>

        {/* content */}
      {isLoading? <List/> :
        <SalePageContent>
          <ListHeader 
            title={'Sale'} 
            btnOnClick={()=>navigate('/add-sale')}
            searQuery={'Customer or code'}
            onChange={handleSearchQueryOnChange}
            type={'text'}
            dataLength={saleRecords.length}
            permission={effectivePermission.canAdd}
          />
          
          {/* Sales Table */}
            <SalesTable 
              data={saleRecords}
              onDeleteSale={deleteSale}
              setIsLoading={setIsLoading}
              salePermission={effectivePermission}
            />
        </SalePageContent>

      }
    </SalePageWrapper>
  )
}




