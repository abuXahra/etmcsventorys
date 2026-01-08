import React, { useEffect, useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import ItemContainer from '../../../components/item_container/ItemContainer'
import Input from '../../../components/input/Input'
import SelectInput from '../../../components/input/selectInput/SelectInput'
import { ItemButtonWrapper } from '../../../components/item_container/itemContainer.style'
import Button from '../../../components/clicks/button/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { AnyItemContainer } from '../../sale/Add/addSale.style'
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader'
import { EditUnitContent, EditUnitWrapper } from './editUnits.style'
import axios from 'axios'
import { List } from 'react-content-loader'
import { toast } from 'react-toastify'
import ToastComponents from '../../../components/toast_message/toast_component/ToastComponents'

export default function AddUnits() {

const {unitId} = useParams();
const token = localStorage.getItem('token');
    

// unit status item
const unitStatusItems =  [
    {
        title: 'select',
        value: ''
    },
    {
        title: 'ON',
        value: 'ON'
    },
    {
        title: 'OFF',
        value: 'OFF'
    },
]


    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isBtnLoading, setIsBtnLoading] = useState(false);


// unit name
const [unitName, setUnitName] = useState('');
const [unitNameError, setUnitNameError] = useState(false);


// unit note
    const [note, setNote] = useState('Unit of ' + unitName);
    const [noteError, setNoteError] = useState(false);


// unit status
    const [unitStatus, setUnitStatus] = useState('')
    const [unitStatusError, setUnitStatusError] = useState(false);
    

    const handleChange = (type, e) =>{
        if(type === 'unitName'){
            setUnitName(e.target.value);
            setNote('Unit of ' + e.target.value);
            setUnitNameError(false);
            setNoteError(false);
        }else if(type === 'status'){
            setUnitStatus(e.target.value);
            setUnitStatusError(false);
        }
    }



// fetch unit data

useEffect(()=>{
    const getUnit = async () =>{
        setIsLoading(true)
        try {
            const res = await axios.get(process.env.REACT_APP_URL+'/api/units/'+ unitId, {
                                                headers: {
                                                  Authorization: `Bearer ${token}`
                                                }
                                          })
            console.log(res.data);
            setUnitName(res.data.title)
            setNote(res.data.note)
            setUnitStatus(res.data.status)
            setIsLoading(false)

        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }
    getUnit();
}, [unitId]);



// submit handler
    const submitHandler = async (e) => {
        e.preventDefault();
        let isValid = true;

        if(!unitName){
            setUnitNameError(true);
            isValid = false;
        }

        if(!note){
            setNoteError(true);
            isValid = false;
        }
        
        if(!unitStatus){
            setUnitStatusError(true);
            isValid = false;
        }

        if(isValid){
           
            const updatedUnit = {
                title: unitName,
                note: note,
                status: unitStatus
            }

            setIsBtnLoading(true);
            try {
                const res = await axios.put(`${process.env.REACT_APP_URL}/api/units/${unitId}`, updatedUnit, {
                                                    headers: {
                                                      Authorization: `Bearer ${token}`
                                                    }
                                              })
                console.log(res.data)
                setIsBtnLoading(false);
                
                // toast success message
                 toast.success('Unit updated Successfully')
                
                navigate(`/units`)
            } catch (err) {
                setIsBtnLoading(false);  
                console.log(err);
            }

        }
    }

  return (
    <EditUnitWrapper>
    {/* Page title */}
        <PageTitle title={'Unit'} subTitle={' / Edit'}/>

        <>
        {isLoading? <List/> :
        <EditUnitContent>
            <form action="" onSubmit={submitHandler}>
                    <ItemContainer title={'Edit Unit'}>
                        <AnyItemContainer justifyContent={'space-between'}>
                            {/* Unit Name */}
                            <Input 
                                onChange={(e)=>handleChange('unitName', e)} 
                                error={unitNameError} 
                                value={unitName}
                                label={'Unit Name'}
                                title={'Unit Name'}    
                            />


                   
                            {/* Note */}
                            <Input 
                                value={note} 
                                title={'Note'}
                                onChange={(e)=>handleChange('note', e)}  
                                type={'text'} 
                                label={'Note'} 
                                error={noteError}
                            />

                             {/* Unit Status */}
                             <SelectInput 
                                onChange={(e)=>handleChange('status', e)} 
                                error={unitStatusError} 
                                options={unitStatusItems} 
                                label={'Unit Status'}
                                title={'Unit Status'}
                                value={unitStatus}
                                />
                      </AnyItemContainer>

                 

                        {/* button */}
                        <ItemButtonWrapper btnAlign={'space-between'}>
                            <div>
                            <Button
                                title={'Select Items'}
                                btnText={isBtnLoading? <ButtonLoader text={'Updating...'}/> : 'Update Unit'}
                                btnFontSize={'12px'}
                                btnColor={'Green'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                />
                            </div>
                        </ItemButtonWrapper>
                    </ItemContainer>
                </form>
        </EditUnitContent>
}</>
                  {/* Toast message user component */}
                  <ToastComponents/>
    </EditUnitWrapper>
  )
}

