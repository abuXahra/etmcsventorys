import { useNavigate } from "react-router-dom";
import { ActionButton, ActionButtons, Container, TableWrapper } from "./permissionTable.style";
import { FaEdit, FaFileInvoice, FaTrash } from "react-icons/fa";
import DataTable from "react-data-table-component";
import { customStyles } from "../TableCustomStyle.style";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SlideUpButton } from "../expense_table/Expense.style";
import Button from "../../clicks/button/Button";
import ButtonLoader from "../../clicks/button/button_loader/ButtonLoader";
import Overlay from "../../overlay/Overlay";
import ToastComponents from "../../toast_message/toast_component/ToastComponents";



const PermissionTable = ({ data, userPermission, onDeletePermission, onPermissionsUpdated }) => {
  const token = localStorage.getItem('token');
   
  const navigate = useNavigate();
    
  const [permissionState, setPermissionState] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
       const [showDeleteCard, setShowDeleteCard] = useState(false);
       const [grabId, setGrabId] = useState('');
       const [grabModule, setGrabModule] = useState('');
       const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPermissionState(data);
  }, [data]);

  const handleCheckboxChange = (index, permissionType) => (e) => {
    const updated = [...permissionState];
    updated[index] = { ...updated[index], [permissionType]: e.target.checked };
    setPermissionState(updated);
  };

  const handleUpdatePermissions = async () => {
    setIsUpdating(true);
    try {
      await axios.put(
        `${process.env.REACT_APP_URL}/api/permission/update-all`,
        { permissions: permissionState },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Permissions updated successfully!");

      // 🔄 Refresh latest permission data from backend
      if (onPermissionsUpdated) {
        await onPermissionsUpdated();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update permissions");
    } finally {
      setIsUpdating(false);
    }
  };


       const handleGrabId = (permissionId, grabModule)=>{
                setShowDeleteCard(true);
                setGrabId(permissionId);
                setGrabModule(grabModule); 
          }


    // Handle deletege
                   const handlePermissionDelete = async (permissionId) => {
                      setIsLoading(true);
                      try {
                        const response = await onDeletePermission(permissionId); // call parent function
                    
                        if (response.success) {
                          toast.success('Permission deleted successfully');
                          setShowDeleteCard(false); // Close modal
                        } else {
                          toast.error('Error deleting message: ' + response.message);
                        }
                      } catch (error) {
                        console.error(error);
                        toast.error('Unexpected error occurred');
                      } finally {
                        setIsLoading(false);
                      }
                    };
              
    


  const columns = [
  { 
    name: "Module", 
    selector: (row) => row.title, 
    width: "20%" 
  },
    {
    name: "Role", 
    selector: (row) => row.role, 
    width: "10%" 
  },
  {
    name: "Visit Page",

    cell: (row, index) => (
      <input
        type="checkbox"
        checked={permissionState[index]?.visit || false}
        onChange={handleCheckboxChange(index, "visit")}
      />
    ),
  },
  {
    name: "Add",

    cell: (row, index) => {
      // ✅ Hide Add for Report and Permission
      if (["Report", "Permission"].includes(row.title)) return null;
      return (
        <input
          type="checkbox"
          checked={permissionState[index]?.add || false}
          onChange={handleCheckboxChange(index, "add")}
        />
      );
    },
  },
  {
    name: "Edit",

    cell: (row, index) => {
      // ✅ Hide Edit for Report and Permission
      if (["Report"].includes(row.title)) return null;
      return (
        <input
          type="checkbox"
          checked={permissionState[index]?.edit || false}
          onChange={handleCheckboxChange(index, "edit")}
        />
      );
    },
  },
  {
    name: "View",
  
    cell: (row, index) => {
      // ✅ Hide View for Report and Permission
      if (["Report"].includes(row.title)) return null;
      return (
        <input
          type="checkbox"
          checked={permissionState[index]?.view || false}
          onChange={handleCheckboxChange(index, "view")}
        />
      );
    },
  },
  {
    name: "Delete",

    cell: (row, index) => {
      // ✅ Hide Delete for Report and Permission
      if (["Report", "Permission"].includes(row.title)) return null;
      return (
        <input
          type="checkbox"
          checked={permissionState[index]?.delete || false}
          onChange={handleCheckboxChange(index, "delete")}
        />
      );
    },
  },
  {
        name: 'Actions',
        cell: (row) => (
          <ActionButtons>
           {userPermission.canEdit && <ActionButton clr='blue' onClick={() => navigate(`/edit-permission/${row._id}`)}><FaEdit /></ActionButton>}
            {userPermission.canDelete && <ActionButton clr="red" onClick={() => handleGrabId(row._id, row.title)}><FaTrash/></ActionButton>}
          </ActionButtons>
        ),
      },
];

  return (
    <Container>
      <TableWrapper>
        <DataTable
          columns={columns}
          data={permissionState}
          responsive
          customStyles={customStyles}
          pagination
          paginationPerPage={50} // Default rows per page
          paginationRowsPerPageOptions={[10, 25, 50, 100]} // Options in the dropdown
        />
      </TableWrapper>

      <div
        style={{
          paddingRight: "20px",
          paddingBottom: "20px",
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Button
          btnColor={"blue"}
          btnOnClick={handleUpdatePermissions}
          btnText={isUpdating ? <ButtonLoader text="Updating Permission" /> : "Update Permission"}
          disabled={isUpdating}
        />
      </div>

      
          {/* modal to delete single items */}
                {showDeleteCard &&
                  <Overlay 
                      contentWidth={'30%'}
                      overlayButtonClick={()=>handlePermissionDelete(grabId)}
                      closeOverlayOnClick={()=>setShowDeleteCard(false)}
                      btnText1={isLoading ? <ButtonLoader text={'Deleting...'}/> : 'Yes'}>
                      <p style={{margin: "40px", textAlign:"center", fontSize:"12px", lineHeight: "25px"}}>
                         <b>{grabModule}</b><br/> Are you sure You want to delete this module  
                      </p>
                   </Overlay>
                }
                  
      <ToastComponents />
    </Container>
  );
};
export default PermissionTable;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import DataTable from "react-data-table-component";
// import { ActionButton, ActionButtons, Container, TableWrapper } from "./permissionTable.style";
// import { customStyles } from "../TableCustomStyle.style";
// import Button from "../../clicks/button/Button";
// import ButtonLoader from "../../clicks/button/button_loader/ButtonLoader";
// import Overlay from "../../overlay/Overlay";
// import { toast } from "react-toastify";
// import axios from "axios";

// const PermissionTable = ({ data, userPermission, onDeletePermission, setIsLoading }) => {
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const [permissionState, setPermissionState] = useState(data);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [showDeleteCard, setShowDeleteCard] = useState(false);
//   const [grabId, setGrabId] = useState('');
//   const [grabModule, setGrabModule] = useState('');

//   useState(() => setPermissionState(data), [data]);

//   const handleCheckboxChange = (rowId, type) => (e) => {
//     const updated = permissionState.map(row => 
//       row._id === rowId ? { ...row, [type]: e.target.checked } : row
//     );
//     setPermissionState(updated);
//   };

//   const preparePayloadForBackend = () => {
//     const grouped = {};
//     permissionState.forEach(row => {
//       if (!grouped[row.moduleId]) grouped[row.moduleId] = { module: row.title, rolePermissions: {} };
//       grouped[row.moduleId].rolePermissions[row.role] = {
//         canVisit: row.visit,
//         canAdd: row.add,
//         canEdit: row.edit,
//         canView: row.view,
//         canDelete: row.delete
//       };
//     });
//     return Object.values(grouped);
//   };

//   const handleUpdatePermissions = async () => {
//     setIsUpdating(true);
//     try {
//       await axios.put(`${process.env.REACT_APP_URL}/api/permission/update-all`, 
//         { permissions: preparePayloadForBackend() },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Permissions updated successfully!");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to update permissions");
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const handleGrabId = (permissionId, grabModule) => {
//     setShowDeleteCard(true);
//     setGrabId(permissionId);
//     setGrabModule(grabModule);
//   };

//   const handlePermissionDelete = async (permissionId) => {
//     setIsLoading(true);
//     try {
//       const response = await onDeletePermission(permissionId);
//       if (response.success) toast.success('Permission deleted successfully');
//       else toast.error('Error deleting: ' + response.message);
//       setShowDeleteCard(false);
//     } catch (error) {
//       toast.error('Unexpected error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const columns = [
//     { name: "Module", selector: row => row.title, width: "20%" },
//     { name: "Role", selector: row => row.role, width: "10%" },
//     { name: "Visit", cell: row => <input type="checkbox" checked={row.visit || false} onChange={handleCheckboxChange(row._id, "visit")} /> },
//     { name: "Add", cell: row => <input type="checkbox" checked={row.add || false} onChange={handleCheckboxChange(row._id, "add")} /> },
//     { name: "Edit", cell: row => <input type="checkbox" checked={row.edit || false} onChange={handleCheckboxChange(row._id, "edit")} /> },
//     { name: "View", cell: row => <input type="checkbox" checked={row.view || false} onChange={handleCheckboxChange(row._id, "view")} /> },
//     { name: "Delete", cell: row => <input type="checkbox" checked={row.delete || false} onChange={handleCheckboxChange(row._id, "delete")} /> },
//     {
//       name: "Actions",
//       cell: row => (
//         <ActionButtons>
//           {userPermission?.canEdit && <ActionButton clr='blue' onClick={() => navigate(`/edit-permission/${row.moduleId}`)}><FaEdit /></ActionButton>}
//           {userPermission?.canDelete && <ActionButton clr="red" onClick={() => handleGrabId(row.moduleId, row.title)}><FaTrash/></ActionButton>}
//         </ActionButtons>
//       )
//     }
//   ];

//   return (
//     <Container>
//       <TableWrapper>
//         <DataTable
//           columns={columns}
//           data={permissionState}
//           responsive
//           customStyles={customStyles}
//           pagination
//           paginationPerPage={50}
//           paginationRowsPerPageOptions={[10, 25, 50, 100]}
//         />
//       </TableWrapper>

//       <div style={{ padding: "20px", display: "flex", justifyContent: "flex-end" }}>
//         <Button
//           btnColor={"blue"}
//           btnOnClick={handleUpdatePermissions}
//           btnText={isUpdating ? <ButtonLoader text="Updating Permission" /> : "Update Permission"}
//           disabled={isUpdating}
//         />
//       </div>

//       {showDeleteCard &&
//         <Overlay
//           contentWidth={'30%'}
//           overlayButtonClick={() => handlePermissionDelete(grabId)}
//           closeOverlayOnClick={() => setShowDeleteCard(false)}
//           btnText1={isUpdating ? <ButtonLoader text={'Deleting...'}/> : 'Yes'}
//         >
//           <p style={{ margin: "40px", textAlign: "center", fontSize: "12px", lineHeight: "25px" }}>
//             <b>{grabModule}</b><br/> Are you sure you want to delete this module?
//           </p>
//         </Overlay>
//       }
//     </Container>
//   );
// };

// export default PermissionTable;
