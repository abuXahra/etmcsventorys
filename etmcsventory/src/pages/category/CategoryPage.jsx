
import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../components/page_title/PageTitle'
import ListHeader from '../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import ProductImage from '../../images/product_placeholder.jpg'
import CategoryTable from '../../components/table/category_table/CategoryTable'
import { CategoryPageContent, CategoryPageWrapper } from './categoryPage.style'
import axios from 'axios'
import { List } from 'react-content-loader'
import { UserContext } from '../../components/context/UserContext'


export default function CategoryPage() {
  
  

          const token = localStorage.getItem('token');
    
          const [category, setCategory] = useState([]);
          const [allCategory, setAllCategory] = useState([]);
          const [isLoading, setIsLoading] = useState(false);

          
          // user Permission
          const {user, permissions} = useContext(UserContext);
          const categoryPermission = permissions?.find(p => p.module === "Category")
          const effectivePermission =
              user?.role === "admin"
                ? { canView: true, canAdd: true, canEdit: true, canDelete: true }
                : categoryPermission;

    
  
           // fetch category handler 
                            useEffect(() => {
                                const getCategory = async () => { 
                                  setIsLoading(true)  
                                  try {
                                        const res = await axios.get(process.env.REACT_APP_URL + "/api/category/", {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });
                                        setCategory(res.data)
                                        setAllCategory(res.data);
                                        setIsLoading(false)
                      
                                        console.log(res.data)
                                    } catch (err) {
                                        console.log(err)
                                        setIsLoading(false)
                                    }
                            
                                }
                                getCategory();
                            }, [])
  
             // handle category delete
            const deleteCategory = async (categoryId,  updatedList = null) => {
              
              if (updatedList) {
                setCategory(updatedList);
                return { success: true };
              }
              
              try {
                await axios.delete(`${process.env.REACT_APP_URL}/api/category/${categoryId}`, {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });
                const updatedCategory = category.filter(category => category._id !== categoryId);
                setCategory(updatedCategory);
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
                  setCategory(allCategory);
                }else{
                  // Filter records based on query
                  const filterRecords = allCategory.filter(item =>
                    item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
                  );
                  setCategory(filterRecords)
                }
              }
    




  const navigate = useNavigate();
  return (
    <CategoryPageWrapper>
        <PageTitle title={'Categories'}/>

        {/* content */}
        {isLoading? <List/> :
        <CategoryPageContent>
          <ListHeader 
            title={'Add Category'} 
            btnOnClick={()=>navigate('/add-category')}
            searQuery={'Title'}
            onChange={handleSearchQueryOnChange}
            type={'text'}
            dataLength={category.length}
            permission={effectivePermission?.canAdd}
          />
          
          {/* Category Table */}
            <CategoryTable 
              data={category} 
              onDeleteCat={deleteCategory} 
              categoryPermission={effectivePermission}
            />
        </CategoryPageContent>

        }   
    </CategoryPageWrapper>
  )
}




