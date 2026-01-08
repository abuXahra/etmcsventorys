import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import ItemContainer from '../../../components/item_container/ItemContainer'
import Input from '../../../components/input/Input'
import TextArea from '../../../components/input/textArea/TextArea'
import { ItemButtonWrapper } from '../../../components/item_container/itemContainer.style'
import Button from '../../../components/clicks/button/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { AnyItemContainer } from '../../sale/Add/addSale.style'
import { FaLocationDot } from 'react-icons/fa6'
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader'
import { AiFillPicture } from 'react-icons/ai'
import { AddCategoryContent, AddCategoryWrapper, ImageWrapper, InputPicture, NameAndFileInput } from './editCategory.style'
import catPicture from '../../../images/product_placeholder.jpg'
import SelectInput from '../../../components/input/selectInput/SelectInput'
import axios from 'axios'
import { toast } from 'react-toastify'
import { UserContext } from '../../../components/context/UserContext'
import { List } from 'react-content-loader'

export default function EditCategory() {

    const navigate = useNavigate();
    const { categoryId } = useParams();
    const {user} = useContext(UserContext);
    

    const [isLoading, setIsLoading] = useState(false);
    const [isBtnLoading, setIsBtnLoading] = useState(false);
    const [showPicture, setShowPicture] = useState(true);
    const token = localStorage.getItem('token');


    const catStatusItems =  [
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


    // title
    const [title, setTitle] = useState('Necklace');
    const [titleError, setTitleError] = useState(false);


    const [file, setFile] = useState('');
    let [photo, setPhoto] = useState('');

    // cat status
        const [catStatus, setCatStatus] = useState('')
        const [catStatusError, setCatStatusError] = useState(false);
        
        
// note
    const [note, setNote] = useState('')
    const [noteError, setNoteError] = useState(false);

    const handleChange = (type, e) =>{
        if(type === 'title'){
            setTitle(e.target.value);
            setTitleError(false);
        }else if(type === 'note'){
            setNote(e.target.value);
            setNoteError(false);
        }else if(type === 'status'){
            setCatStatus(e.target.value);
            setCatStatusError(false);
        }else if(type === 'file'){
            setFile(e.target.files[0])
            setShowPicture(false);
        }
    }


    // fetch category
        useEffect(()=>{
            const fetchCategory = async() =>{
                setIsLoading(true)
                try {
                    const res = await axios.get(`${process.env.REACT_APP_URL}/api/category/${categoryId}`, {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });
                   
                    console.log(res.data);
                    setTitle(res.data.title)
                    setNote(res.data.note)
                    setCatStatus(res.data.status)
                    setFile(res.data.imgUrl)
                    setIsLoading(false);

                } catch (error) {
                    console.log(error)
                    setIsLoading(false);
                }
        
            }
            fetchCategory();
        },[categoryId])
    
    
       // update handler function
    const submitHandler = async (e) => {
            e.preventDefault();
            let isValid = true;
    
            if(!title){
                setTitleError(true);
                isValid = false;
            }
       
            if(!catStatus){
                setCatStatusError(true);
                isValid = false;
            }
            if(isValid){
                const updateCategory ={
                                title: title,
                                status: catStatus,
                                note: note,
                                userId: user._id,
                            }
                            
                            if (file) {
                                const data = new FormData()
                                const filename = file.name
                                data.append('img', filename)
                                data.append('file', file)
                                updateCategory.imgUrl = filename
                
                                // img upload
                                try {
                                    const imgUpload = await axios.post(`${process.env.REACT_APP_URL}/api/upload`, data)
                                    console.log(imgUpload.data)
                                } catch (err) {
                                    console.log(err)
                                }
                            }
                
                            setIsBtnLoading(true)
                            try {
                                    const res = await axios.put(`${process.env.REACT_APP_URL}/api/category/${categoryId}`, updateCategory, {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });
                                    console.log(res.data);
                                    setIsLoading(false);
                                   
                                    // toast success message
                                    toast.success('Category created Successfully')
                                    setIsBtnLoading(false)
                                    navigate(`/categories`)
                    
                                } catch (err) {
                                    setIsLoading(false);  
                    
                                    // If title already exists, show the error toast
                                if (err.response && err.response.data && err.response.data.message) {
                                    toast.error(err.response.data.message); // Show the title already exists message
                                } else {
                                    toast.error('An error occurred while registering');
                                }
                                }
                            }
            }
      
            //   navigate to category list
            const listHandler = (e) =>{
                e.preventDefault();
                navigate('/categories');
            }

  return (
    <AddCategoryWrapper>
    {/* Page title */}
        <PageTitle title={'Category'} subTitle={'/ Add'}/>

      <>
        {isLoading? <List/> :
        <AddCategoryContent>
            <form action="" onSubmit={submitHandler}>
                    <ItemContainer title={'New Category'}>
                        <AnyItemContainer justifyContent={'space-between'}>
                            {/* name */}
                            <Input 
                                value={title} 
                                title={'Title'}
                                onChange={(e)=>handleChange('title', e)} 
                                error={titleError} 
                                type={'text'} 
                                label={'Title'} 
                            />

                            {/* Status */}
                            <SelectInput 
                                onChange={(e)=>handleChange('status', e)} 
                                error={catStatusError} 
                                options={catStatusItems} 
                                value={catStatus}
                                label={'Category Status'}
                                title={'Category Status'}
                            />
                        </AnyItemContainer>
                       
                        <AnyItemContainer justifyContent={'space-between'}>
                            <TextArea  
                                label={'Note'}
                                title={'Note'}
                                onChange={(e)=> handleChange('note', e)}
                                value={note}
                                error={noteError}
                                Icon={<FaLocationDot/>}
                            ></TextArea>
                                                                                                                   {/* profile picture */}
                                                                                                                   <NameAndFileInput>
                            <label htmlFor="fileInput">
                            <span>Picture</span> 
                            {showPicture
                             ? (  <ImageWrapper bg={file ? `${process.env.REACT_APP_URL}/images/${file}` : catPicture}>
                                        {/* {file && <img src={URL.createObjectURL(file)} alt="" srcset="" />} */}
                                </ImageWrapper>) :      
                         (<>  { 
                            file ?     
                                (<ImageWrapper bg={URL.createObjectURL(file)}>
                                        {/* {file && <img src={URL.createObjectURL(file)} alt="" srcset="" />} */}
                                </ImageWrapper>) 
                                : <AiFillPicture />
                            }
                            </> 
                            )} 
                        </label>
                            <InputPicture onChange={(e)=>handleChange('file', e)} type="file" id="fileInput" />
                         </NameAndFileInput>
                        </AnyItemContainer>

                        <ItemButtonWrapper btnAlign={'flex-start'}>

                            <div>
                            <Button
                                title={'Select Items'}
                                btnText={isBtnLoading? <ButtonLoader text={'Updating...'}/> : 'Update'}
                                btnFontSize={'12px'}
                                btnColor={'Green'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                />
                            </div>
                            <div>
                                <Button
                                    title={'Select Items'}
                                    btnText={'View List'}
                                    btnFontSize={'12px'}
                                    btnColor={'#000045'}
                                    btnTxtClr={'white'}
                                    btnAlign={'flex-end'}
                                    btnOnClick={(e)=>listHandler(e)}
                                />
                            </div>
                        </ItemButtonWrapper>
                    </ItemContainer>
                </form>
        </AddCategoryContent>}
        </>
    </AddCategoryWrapper>
  )
}

