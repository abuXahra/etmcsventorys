// import React, { useState } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { EditPermissionContent, EditPermissionWrapper } from "./editPermission.style";
import PageTitle from "../../../components/page_title/PageTitle";
import { ItemsWrapper, SelectItemContent } from "../add/addPermission.style";
import ItemContainer from "../../../components/item_container/ItemContainer";
import { AnyItemContainer } from "../../purchase/add/addPurchase.style";
import Input from "../../../components/input/Input";
import Checkbox from "../../../components/input/checkbox/Checkbox";
import { ItemButtonWrapper } from "../../../components/item_container/itemContainer.style";
import Button from "../../../components/clicks/button/Button";
import ButtonLoader from "../../../components/clicks/button/button_loader/ButtonLoader";


export default function EditPermission() {
    const {permissionId} = useParams();
  const token = localStorage.getItem('token');

  const [module, setModule] = useState("");
  const [canVisit, setCanVisit] = useState(false);
  const [canView, setCanView] = useState(false);
  const [canAdd, setCanAdd] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const getPermissions = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/api/permission/${permissionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setModule(res.data.module)
      setCanVisit(res.data.canVisit)
      setCanView(res.data.canView)
      setCanAdd(res.data.canAdd)
      setCanEdit(res.data.canEdit)
      setCanDelete(res.data.canDelete)


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


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!module.trim()) {
      toast.error("Please enter a module name.");
      return;
    }

    try {
      setLoading(true);
      await axios.put(
        `${process.env.REACT_APP_URL}/api/permission/${permissionId}`,
        { module, canVisit, canView, canAdd, canEdit, canDelete },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Permission module updated successfully!");
      navigate("/permission"); // redirect back to list page
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update permission module");
    } finally {
      setLoading(false);
    }
  };

  return (
        <EditPermissionWrapper>
                    {/* Page title */}
                    <PageTitle title={'Permission'} subTitle={'/Edit'}/>
            <EditPermissionContent>
          
                  <ItemsWrapper>
          
                  {/* Search Invoice */}
                  <form onSubmit={handleSubmit}>
                  <SelectItemContent>
                   <ItemContainer title={'Module Name'}> 
                                 <AnyItemContainer flxDirection="column">
                                       <Input 
                                          value={module} 
                                          title={'Module Name'}
                                          onChange={(e) => setModule(e.target.value)} 
                                          type={'text'} 
                                          label={'Module Name'} 
                                          placeholder={'e.g. Product, Purchase, Category...'}
                                          requiredSymbol={'*'}
                                      />  
                                    
                                   
                                    <div style={{display:"flex", flexDirection:"column", gap: "5px"}}>
                                      <b>Permission</b>
                                     <div style={{ display: "flex", alignItems: "center", gap: "15px", marginTop: "10px" }}>
                                      <Checkbox
                                        checked={canVisit}
                                        onChange={(e) => setCanVisit(e.target.checked)}
                                        title={'Visit'}
                                      />
                                      <Checkbox
                                        checked={canView}
                                        onChange={(e) => setCanView(e.target.checked)}
                                        title={'View'}
                                      />
                                      <Checkbox
                                        checked={canAdd}
                                        onChange={(e) => setCanAdd(e.target.checked)}
                                        title={'Add'}
                                      />
                                      <Checkbox
                                        checked={canEdit}
                                        onChange={(e) => setCanEdit(e.target.checked)}
                                        title={'Edit'}
                                      />
                                      <Checkbox
                                        checked={canDelete}
                                        onChange={(e) => setCanDelete(e.target.checked)}
                                        title={'Delete'}
                                      />
                                        
                              
                                        </div>
                                    </div>
                                  <ItemButtonWrapper btnAlign={'flex-start'}>
                                      <Button
                                          btnText={loading ? <ButtonLoader text={'Updating...'} /> : 'Update'}
                                          btnFontSize={'12px'}
                                          btnColor={'green'}
                                          btnTxtClr={'white'}
                                          btnAlign={'flex-end'}   
                                          disabled={loading}                           
                                      />
                                  </ItemButtonWrapper>
                  

                                  </AnyItemContainer>  

                              </ItemContainer>  
                          </SelectItemContent>
                       </form>
                     </ItemsWrapper>
                </EditPermissionContent>
          </EditPermissionWrapper>          
  );
}
