
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import profileHolder from '../../images/placeholder_image.png'
import UserTable from '../../components/table/user_table/UserTable'
import { UserPageContent, UserPageWrapper } from './userPages.style'
import ListHeader from '../../components/page_title/list_header/ListHeader'
import PageTitle from '../../components/page_title/PageTitle'
import axios from 'axios'
import ContentLoader, {List } from 'react-content-loader'
import { UserContext } from '../../components/context/UserContext'



// import {DataTable} from 'react-data-table-component'


export default function UserPage() {

    const token = localStorage.getItem('token');

      const[userRecords, setUserRecords] = useState([]);
      const [allUserRecords, setAllUserRecords] = useState([]);
      const [isLoading, setIsLoading] = useState(false);

          // user Permission
          const {user, permissions} = useContext(UserContext);
          const userPermission = permissions?.find(p => p.module === "User")
          const effectivePermission =
              user?.role === "admin"
                ? { canView: true, canAdd: true, canEdit: true, canDelete: true }
                : userPermission;


// fetch users handler 
      useEffect(() => {
          const getUsers = async () => { // to keep user login when browser refresh
            setIsLoading(true)  
            try {
                  const res = await axios.get(process.env.REACT_APP_URL + "/api/users", {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });
                 
                  // Filter users based on their role
                  const filteredRecords = res.data.filter(user => user.role === 'user' || user.role === 'admin');
                 
                  setUserRecords(filteredRecords)
                  setAllUserRecords(filteredRecords);
                  setIsLoading(false)

                  console.log(res.data)
              } catch (err) {
                  console.log(err)
                  setIsLoading(false)
              }
      
          }
          getUsers()
      }, [])
  

// handle user delete
      const deleteUser = async (userId) => {
        try {
          await axios.delete(`${process.env.REACT_APP_URL}/api/users/${userId}`, {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });
          const updatedUsers = userRecords.filter(user => user._id !== userId);
          setUserRecords(updatedUsers);
          setAllUserRecords(updatedUsers); // Also update the backup
          return { success: true };
        } catch (error) {
          return { success: false, message: error.message };
        }
      };


// handle search query
  const handleChange = (e) => {
    let query = e.target.value;

    if (query === '') {
      // If query is empty, reset to all user records
      setUserRecords(allUserRecords);
    } else {
      // Filter the user records based on query
      const filteredRecords = allUserRecords.filter(item =>
        item.username.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      );
      setUserRecords(filteredRecords);
    }
  };



  const navigate = useNavigate();
  return (
    <UserPageWrapper>
        <PageTitle title={'Users'}/>

        {/* content */}
        {isLoading? <List/> :
        <UserPageContent>
          <ListHeader 
            title={'Add User'} 
            btnOnClick={()=>navigate('/add-user')}
            searQuery={'Name'}
            onChange={handleChange}
            type={'text'}
            dataLength={userRecords.length}
            permission={effectivePermission?.canAdd}
          />
          
          {/* User Table */}
            <UserTable 
              data={userRecords} 
              onDeleteUser={deleteUser}
              userPermission={effectivePermission}
            />
        </UserPageContent>
}
        
    </UserPageWrapper>
  )
}




