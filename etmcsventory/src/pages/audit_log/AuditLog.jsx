import axios from 'axios'
import React from 'react'
import PageTitle from '../../components/page_title/PageTitle'
import { List } from 'react-content-loader'
import { AuditLogContent, AuditLogWrapper } from './auditLog.style'
import { useEffect } from 'react'
import { useState } from 'react'
import { UserContext } from '../../components/context/UserContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import ListHeader from '../../components/page_title/list_header/ListHeader'
import AuditLogTable from '../../components/table/audit_log_table/AuditLogTable'

function AuditLog() {


      const [activityLog, setActivityLog] = useState([]);
      const [allActivityLog, setAllActivityLog] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
      const token = localStorage.getItem('token')


      // user Permission
        const {permissions, user} = useContext(UserContext);
        const auditLogPermission = permissions?.find(p => p.module === "Audit Log")
        // const effectivePermission =
        //             user?.role === "admin"
        //               ? { canView: true, canAdd: true, canEdit: true, canDelete: true }
        //               : auditLogPermission;
              


        const fetchLog = async() =>{
                          setIsLoading(true)
                            try {
                                const res = await axios.get(`${process.env.REACT_APP_URL}/api/activity`, {
                                                                    headers: {
                                                                      Authorization: `Bearer ${token}`
                                                                    }
                                                              })
                                setActivityLog(res.data.data)
                                setAllActivityLog(res.data.data);
                                setIsLoading(false)
              
                                console.log('=== ACTIVITY LOG===\N', res.data)
                                setIsLoading(false);
                            } catch (error) {
                                console.log(error);
                                setIsLoading(false);
                            }
                      
                        }

                            useEffect(()=>{
                              fetchLog();
                            }, []);

               // handle audit delete
              const deleteAudit = async (activityId,  updatedList = null) => {
                
                if (updatedList) {
                  setActivityLog(updatedList);
                  return { success: true };
                }
                
                try {
                  await axios.delete(`${process.env.REACT_APP_URL}/api/activity/${activityId}`, {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });
                  const updatedActivityLog = activityLog.filter(activityLog => activityLog._id !== activityId);
                  setActivityLog(updatedActivityLog);
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
                    setActivityLog(allActivityLog);
                  }else{
                    // Filter records based on query
                    const filterRecords = allActivityLog.filter(item =>
                      item.user.username.toLocaleLowerCase().includes(query.toLocaleLowerCase())
                    );
                    setActivityLog(filterRecords)
                  }
                }
      
const navigate = useNavigate();

  return (
    <AuditLogWrapper>
          <PageTitle title={'Audit Log'} subTitle={' / View'}/>

          {/* content */}
        <>
        {isLoading?
          <List/> :
          <AuditLogContent>
            <ListHeader 
                title={'Audit Log'} 
                btnOnClick={()=>navigate('/add-customer')}
                searQuery={'username'}
                onChange={handleSearchQueryOnChange}
                type={'text'}
                dataLength={activityLog.length}
                // permission={effectivePermission?.canAdd}
            />
            
            {/* Activity Table */}
            <AuditLogTable 
              data={activityLog} 
              onDeleteAudit={deleteAudit} 
            //   customerPermission={effectivePermission} 
            />
         </AuditLogContent>
          }
        </>
    </AuditLogWrapper>
  )
}

export default AuditLog