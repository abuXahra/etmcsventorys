import React, { useEffect, useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import ItemContainer from '../../../components/item_container/ItemContainer'
import Input from '../../../components/input/Input'
import SelectInput from '../../../components/input/selectInput/SelectInput'
import TextArea from '../../../components/input/textArea/TextArea'
import { ItemButtonWrapper } from '../../../components/item_container/itemContainer.style'
import Button from '../../../components/clicks/button/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { AnyItemContainer } from '../../sale/Add/addSale.style'
import { FaLocationDot } from 'react-icons/fa6'
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader'
import { AiFillPicture } from 'react-icons/ai'
import { EditTaxContent, EditTaxWrapper } from './editTax.style'
import axios from 'axios'
import { toast } from 'react-toastify'
import { List } from 'react-content-loader'

export default function EditTax() {

    const token = localStorage.getItem('token');
    
    const {taxId} = useParams();

// // Tax name items
// const taxNameItems =  [
//     {
//         title: 'select',
//         value: ''
//     },
//     {
//         title: 'None',
//         value: 0
//     },
//     {
//         title: 'TAX (5%)',
//         value: 5
//     },
//     {
//         title: 'Vat + Tax (7%)',
//         value: 7
//     },

// ]




// tax status items
const taxStatusItems =  [
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





// tax name
    const [taxName, setTaxName] = useState("TAX (5%)");
    const [taxNameError, setTaxNameError] = useState(false);

    // tax name
    const [taxValue, setTaxValue] = useState('');
    const [taxValueError, setTaxValueError] = useState(false);
        
// tax status
    const [taxStatus, setTaxStatus] = useState(taxStatusItems[1].value)
    const [taxStatusError, setTaxStatusError] = useState(false);
    

    const handleChange = (type, e) =>{
        if(type === 'taxName'){
            setTaxName(e.target.value);
            setTaxNameError(false);
        }else if(type === 'taxValue'){
            setTaxValue(e.target.value);
            setTaxValueError(false);
        }else if(type === 'taxStatus'){
            setTaxStatus(e.target.value);
            setTaxStatusError(false);
        }
    }


    
// fetch tax data
useEffect(()=>{
    const getUnit = async () =>{
        setIsLoading(true)
        try {
            const res = await axios.get(process.env.REACT_APP_URL+'/api/tax/'+ taxId, {
                                                headers: {
                                                  Authorization: `Bearer ${token}`
                                                }
                                          })
            console.log(res.data);
            setTaxName(res.data.name)
            setTaxValue(res.data.taxPercentage)
            setTaxStatus(res.data.status)
            setIsLoading(false)

        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }
    getUnit();
}, [taxId]);


    const submitHandler = async (e) => {
        e.preventDefault();
        let isValid = true;

        if(!taxName){
            setTaxNameError(true);
            isValid = false;
        }

        if(taxValue === ''){
            setTaxValueError(true);
            isValid = false;
        }

        if(!taxStatus){
            setTaxStatusError(true);
            isValid = false;
        }

        if(isValid){

            const updatedTax = {
                name: taxName,
                taxPercentage: parseInt(taxValue),
                status: taxStatus
            }

            setIsBtnLoading(true);

            try {
                
            const res = await axios.put(`${process.env.REACT_APP_URL}/api/tax/${taxId}`, updatedTax, {
                                                headers: {
                                                  Authorization: `Bearer ${token}`
                                                }
                                          })
                            console.log(res.data)
                            setIsBtnLoading(false);
                            
                            // toast success message
                             toast.success('Tax updated Successfully')
                            
                            navigate(`/tax`)
                        } catch (err) {
                            setIsBtnLoading(false);  
                            console.log(err);
                        }
            
                    }
    }

  return (
    <EditTaxWrapper>
    {/* Page title */}
        <PageTitle title={'Tax'} subTitle={' / Edit'}/>

        <>
        {isLoading? <List/> :
        <EditTaxContent>
            <form action="" onSubmit={submitHandler}>
                    <ItemContainer title={'Edit Tax'}>
                        <AnyItemContainer justifyContent={'space-between'}>
                            {/* Tax Name */}
                            <Input 
                                onChange={(e)=>handleChange('taxName', e)} 
                                error={taxNameError} 
                                label={'Tax Name'}
                                title={'Tax Name'}
                                value={taxName} 
                                type={'text'}   
                            />


                    {/* Tax Value */}
                       <Input 
                                onChange={(e)=>handleChange('taxValue', e)} 
                                error={taxValueError} 
                                value={taxValue}
                                label={'Tax Value'}
                                title={'Tax Value'} 
                                type={'text'}   
                            />

                             {/* Tax Status */}
                             <SelectInput 
                                onChange={(e)=>handleChange('taxStatus', e)} 
                                error={taxStatusError} 
                                options={taxStatusItems} 
                                label={'Tax Status'}
                                title={'Tax Status'}
                                value={taxStatus}
                                />
                      </AnyItemContainer>

                 

                        {/* button */}
                        <ItemButtonWrapper btnAlign={'space-between'}>
                            <div>
                            <Button
                                title={'Select Items'}
                                btnText={isBtnLoading? <ButtonLoader text={'Updating...'}/> : 'Update Tax'}
                                btnFontSize={'12px'}
                                btnColor={'Green'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                />
                            </div>
                        </ItemButtonWrapper>
                    </ItemContainer>
                </form>
        </EditTaxContent>}
</>
    </EditTaxWrapper>
  )
}

