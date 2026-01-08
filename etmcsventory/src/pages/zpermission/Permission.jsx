
import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../components/page_title/PageTitle'
import ListHeader from '../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { List } from 'react-content-loader'
import { token } from '../../components/context/UserToken'
import PermissionTable from '../../components/table/permission_table/PermissionTable'
import { PermissionPageContent, PermissionPageWrapper } from './permission.style'
import { toast } from 'react-toastify'
import { UserContext } from '../../components/context/UserContext'



export default function PermissionPage() {

//   const permissionData = [
    
// {
// 	title: "Product",
// 	add: true,
// 	edit: true,
// 	view: true,
// 	delete: false,

// },
// {
// 	title: "Category",
// 	add: true,
// 	edit: true,
// 	view: true,
// 	delete: false,

// },
// {
// 	title: "Customer",
// 	add: true,
// 	edit: true,
// 	view: true,
// 	delete: true,

// },
// {
// 	title: "Sale",
// 	add: true,
// 	edit: false,
// 	view: true,
// 	delete: true,
// },

// {
// 	title: "Supplier",
// 	add: true,
// 	edit: true,
// 	view: true,
// 	delete: true,

// },
// {
// 	title: "Purchase",
// 	add: true,
// 	edit: false,
// 	view: true,
// 	delete: true,
// },
// {
// 	title: "Payment",
// 	add: true,
// 	edit: false,
// 	view: true,
// 	delete: true,
// },
// {
// 	title: "Expense",
// 	add: true,
// 	edit: true,
// 	view: true,
// 	delete: false,
// },
// {
// 	title: "Sale Return",
// 	add: true,
// 	edit: true,
// 	view: true,
// 	delete: false,
// },
// {
// 	title: "Purchase Return",
// 	add: true,
// 	edit: true,
// 	view: true,
// 	delete: false,
// },
// {
// 	title: "User",
// 	add: true,
// 	edit: true,
// 	view: true,
// 	delete: false,
// },
// {
// 	title: "Company",
// 	add: false,
// 	edit: false,
// 	view: true,
// 	delete: false,
// },
// {
// 	title: "Tax",
// 	add: false,
// 	edit: false,
// 	view: true,
// 	delete: false,
// },
// {
// 	title: "Unit",
// 	add: false,
// 	edit: false,
// 	view: true,
// 	delete: false,
// },
// {
// 	title: "Generate/View Report",
// 	add: false,
// 	edit: false,
// 	view: false,
// 	delete: false,
	
// },
// {
// 	title: "Permission",
// 	add: false,
// 	edit: false,
// 	view: false,
// 	delete: false,
	
// },
//   ]

  const token = localStorage.getItem('token');
  const [permissionData, setPermissionData] = useState([]);
  const [allPermissionData, setAllPermissionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);



           // user Permission
           const {user, permissions} = useContext(UserContext);
           const userPermission = permissions?.find(p => p.module === "Permission")
           const effectivePermission =
               user?.role === "admin"
                 ? { canView: true, canAdd: true, canEdit: true, canDelete: true }
                 : userPermission;

  const getPermissions = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/api/permission`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(res.data)
      // Transform backend fields to frontend naming
      const formatted = res.data.map(p => ({
        _id: p._id,
        title: p.module,
        visit: p.canVisit,
        add: p.canAdd,
        edit: p.canEdit,
        view: p.canView,
        delete: p.canDelete,
      }));


        console.log('formatted data:============', formatted)
      setPermissionData(formatted);
      setAllPermissionData(formatted);
      setIsLoading(false)

    } catch (error) {
      toast.error("Failed to fetch permissions");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPermissions();
  }, []);


  // handle payment delete
            const deletePermission = async (permissionId,  updatedList = null) => {
              
              if (updatedList) {
                setPermissionData(updatedList);
                return { success: true };
              }
              
              try {
                await axios.delete(`${process.env.REACT_APP_URL}/api/permission/${permissionId}`, {
                                                    headers: {
                                                      Authorization: `Bearer ${token}`
                                                    }
                                              })
                const updatedPermission = permissionData.filter(permission => permission._id !== permissionId);
                setPermissionData(updatedPermission);
                return { success: true };
              } catch (error) {
                return { success: false, message: error.message };
              }
            };
  


            // handle search query
const handleSearchQueryOnChange = (e) => {
  const query = e.target.value.trim().toLowerCase();

  if (query === '') {
    setPermissionData(allPermissionData);
  } else {
    const filteredRecords = allPermissionData.filter(item => {
      const title = (item.title || '').toLowerCase();
      return (title.includes(query));
    });

    setPermissionData(filteredRecords);
  }
};

            
  const navigate = useNavigate();
  return (
    <PermissionPageWrapper>
        <PageTitle title={'Permission'}/>

      {/* content */}
        {isLoading? <List/> :
          <PermissionPageContent>
    
          <ListHeader 
                    title={'Permission'} 
                    btnOnClick={()=>navigate('/add-permission')}
                    searQuery={'Module Name'}
                    onChange={handleSearchQueryOnChange}
                    type={'text'}
                    dataLength={permissionData.length}
                    permission={effectivePermission?.canAdd}
                  /> 

  
          {/* Permission Table */}
            <PermissionTable 
                data={permissionData} 
                onDeletePermission={deletePermission} 
                setIsLoading={setIsLoading}
                userPermission={effectivePermission}
            />

        </PermissionPageContent>
}
 
    </PermissionPageWrapper>
  )
}




