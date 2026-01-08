import React, { useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import ItemContainer from '../../../components/item_container/ItemContainer'
import Input from '../../../components/input/Input'
import SelectInput from '../../../components/input/selectInput/SelectInput'
import TextArea from '../../../components/input/textArea/TextArea'
import { ItemButtonWrapper } from '../../../components/item_container/itemContainer.style'
import Button from '../../../components/clicks/button/Button'
import { useNavigate } from 'react-router-dom'
import { AnyItemContainer } from '../../sale/Add/addSale.style'
import { FaLocationDot } from 'react-icons/fa6'
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader'
import { AiFillPicture } from 'react-icons/ai'
import { AddUnitContent, AddUnitWrapper } from './addUnits.style'
import axios from 'axios'
import ToastComponents from '../../../components/toast_message/toast_component/ToastComponents'
import { toast } from 'react-toastify'

export default function AddUnits() {

const token = localStorage.getItem('token');
    
// Unit items
const unitNameItems =  [
    {
        title: 'select',
        value: ''
    },
    {
        title: 'Piece',
        value: 'Piece'
    },
    {
        title: 'Carton',
        value: 'carton'
    },
    {
        title: 'Box',
        value: 'Box'
    },
    {
        title: 'Kg',
        value: 'Kg'
    },
    {
        title: 'Gram',
        value: 'Box'
    },

]

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


// unit name
const [unitName, setUnitName] = useState('');
const [unitNameError, setUnitNameError] = useState(false);


// unit note
    const [note, setNote] = useState('');
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
            setIsLoading(true)
            try {
                
                const newUnit = {
                    title: unitName,
                    note: note,
                    status: unitStatus, 
                }
                const res = await axios.post(process.env.REACT_APP_URL + '/api/units/create', newUnit, {
                                                    headers: {
                                                      Authorization: `Bearer ${token}`
                                                    }
                                              })
                console.log(res.data);
                navigate(`/units`)
                setIsLoading(false)
                toast.success('Unit successfully added');
            } catch (err) {
                console.log(err)
                setIsLoading(false)             
                               
                            if (err.response && err.response.data && err.response.data.message) {
                                toast.error(err.response.data.message);
                            } else {
                                toast.error('An error occurred while registering');
                            }
            }
        }

        setNote('')
        setUnitName('')
        setUnitStatus('')
    }

  return (
    <AddUnitWrapper>
    {/* Page title */}
        <PageTitle title={'Unit'} subTitle={' / Add'}/>

        <AddUnitContent>
            <form action="" onSubmit={submitHandler}>
                    <ItemContainer title={'New Unit'}>
                        <AnyItemContainer justifyContent={'space-between'}>
                            {/* Unit Name */}
                            <Input 
                                onChange={(e)=>handleChange('unitName', e)} 
                                error={unitNameError} 
                                label={'Unit Name'}
                                title={'Unit Name'}   
                                value={unitName} 
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
                                />
                      </AnyItemContainer>

                 

                        {/* button */}
                        <ItemButtonWrapper btnAlign={'space-between'}>
                            <div>
                            <Button
                                title={'Select Items'}
                                btnText={isLoading? <ButtonLoader text={'Adding...'}/> : 'Add Units'}
                                btnFontSize={'12px'}
                                btnColor={'Green'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                />
                            </div>
                        </ItemButtonWrapper>
                    </ItemContainer>
                </form>
        </AddUnitContent>
        {/* toast message */}
        <ToastComponents/>
    </AddUnitWrapper>
  )
}

