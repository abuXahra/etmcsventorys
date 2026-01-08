
import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../components/page_title/PageTitle'
import ListHeader from '../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import { UnitsPageContent, UnitsPageWrapper } from './unitsPage.style'
import UnitsTable from '../../components/table/units_table/UnitsTable'
import axios from 'axios'
import { List } from 'react-content-loader'
import { UserContext } from '../../components/context/UserContext'


export default function UnitsPage() {
  
  const token = localStorage.getItem('token');
    
   const[unitRecords, setUnitRecords] = useState([]);
   const [allUnitRecords, setAllUnitRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

          // user Permission
          const {user, permissions} = useContext(UserContext);
          const unitPermission = permissions?.find(p => p.module === "Unit")
          const effectivePermission =
              user?.role === "admin"
                ? { canView: true, canAdd: true, canEdit: true, canDelete: true }
                : unitPermission;    

    // fetch unit handler 
          useEffect(() => {
              const getUnits = async () => { // to keep user login when browser refresh
                setIsLoading(true)  
                try {
                      const res = await axios.get(process.env.REACT_APP_URL + "/api/units", {
                                                          headers: {
                                                            Authorization: `Bearer ${token}`
                                                          }
                                                    })
                     
                      setUnitRecords(res.data)
                      setAllUnitRecords(res.data);
                      setIsLoading(false)
    
                      console.log(res.data)
                  } catch (err) {
                      console.log(err)
                      setIsLoading(false)
                  }
          
              }
              getUnits()
          }, [])
    
// handle unit delete
const deleteUnit = async (unitId) => {
  try {
    await axios.delete(`${process.env.REACT_APP_URL}/api/units/${unitId}`, {
                                        headers: {
                                          Authorization: `Bearer ${token}`
                                        }
                                  })
    const updatedUnit = unitRecords.filter(unit => unit._id !== unitId);
    setUnitRecords(updatedUnit);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};


// handle search query
const handleChange = (e) => {
  let query = e.target.value;

  if (query === '') {
    // If query is empty, reset to all unit records
    setUnitRecords(allUnitRecords);
  } else {
    // Filter the unit records based on query
    const filteredRecords = allUnitRecords.filter(item =>
      item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
    setUnitRecords(filteredRecords);
  }
};


 
  const navigate = useNavigate();
  return (
    <UnitsPageWrapper>
        <PageTitle title={'Units'}/>

        {/* content */}
      {isLoading? <List/> :
        <UnitsPageContent>
          <ListHeader 
            title={'Add Units'} 
            btnOnClick={()=>navigate('/add-units')}
            searQuery={'Name'}
            onChange={handleChange}
            type={'text'}
            dataLength={unitRecords.length}
            permission={effectivePermission?.canAdd}
          />
          
          {/* Unit Table */}
            <UnitsTable 
              data={unitRecords} 
              onDeleteUnit={deleteUnit}
              unitPermission={effectivePermission}              
            />
        </UnitsPageContent>
}
    </UnitsPageWrapper>
  )
}




