
import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../components/page_title/PageTitle'
import ListHeader from '../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import { SupplierPageContent, SupplierPageWrapper } from './supplierPage.style'
import SupplierTable from '../../components/table/supplier_table/Supplier'
import axios from 'axios'
import { List } from 'react-content-loader'
import { UserContext } from '../../components/context/UserContext'



export default function SupplierPage() {
  const token = localStorage.getItem('token');
  
   
  const [supplier, setSupplier] = useState([]);
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

          // user Permission
          const {user, permissions} = useContext(UserContext);
          const supplierPermission = permissions?.find(p => p.module === "Supplier")
          const effectivePermission =
              user?.role === "admin"
                ? { canView: true, canAdd: true, canEdit: true, canDelete: true }
                : supplierPermission;

  


// fetch handler 
       useEffect(() => {
          const getSupplier = async () => { 
          setIsLoading(true)  
          try {
              const res = await axios.get(process.env.REACT_APP_URL + "/api/suppliers", {
                                                  headers: {
                                                    Authorization: `Bearer ${token}`
                                                  }
                                            })
              setSupplier(res.data)
              setAllSuppliers(res.data);
              setIsLoading(false)
              
              console.log(res.data)
          } catch (err) {
              console.log(err)
              setIsLoading(false)
              }
            }
            
          getSupplier();
          
        }, [])
    


 // handle  delete
              const deleteSupplier = async (supplierId,  updatedList = null) => {
                
                if (updatedList) {
                  setSupplier(updatedList);
                  return { success: true };
                }
                
                try {
                  await axios.delete(`${process.env.REACT_APP_URL}/api/suppliers/${supplierId}`, {
                                                      headers: {
                                                        Authorization: `Bearer ${token}`
                                                      }
                                                })
                  const updatedSupplier = supplier.filter(supplier => supplier._id !== supplierId);
                  setSupplier(updatedSupplier);
                  return { success: true };
                } catch (error) {
                  return { success: false, message: error.message };
                }
              };



                // handle search query
                const handleSearchQueryOnChange = (e) => {
                  let query = e.target.value;
                  //  if query is empty, reset to all record
                  if(query === ''){
                    setSupplier(allSuppliers);
                  }else{
                    // Filter records based on query
                    const filterRecords = allSuppliers.filter(item =>
                      item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
                    );
                    setSupplier(filterRecords)
                  }
                }
                    
  
  

  const navigate = useNavigate();
  return (
    <SupplierPageWrapper>
        <PageTitle title={'Supplier'}/>

        {/* content */}
         {isLoading? <List/> :
        <SupplierPageContent>
          <ListHeader 
            title={'Add Supplier'} 
            btnOnClick={()=>navigate('/add-supplier')}
            searQuery={'Name'}
            onChange={handleSearchQueryOnChange}
            type={'text'}
            dataLength={supplier.length}
            permission={effectivePermission.canAdd}
          />
          
          {/* Supplier Table */}
            <SupplierTable 
              data={supplier}
              onDeleteSup = {deleteSupplier}
              supplierPermission={effectivePermission}
              />
        </SupplierPageContent>
}
        
    </SupplierPageWrapper>
  )
}




