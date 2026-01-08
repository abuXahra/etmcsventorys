


import { FiSearch } from 'react-icons/fi'
import { InputError, InputIcon, InputLabel, InputStyle, InputWrapper } from './Input.style'

export default function Input({Icon, iconColor, title, value, inputBg, labelColor, txtColor, error, bdColor, onChange, placeholder, requiredSymbol, InputWidth, type, maxLength, label, inputPadding, inputDisplay}) {

  return (
                <InputWrapper InputWidth={InputWidth} inputDisplay={inputDisplay}>
                    <InputLabel labelColor={labelColor} htmlFor="name">{label}<span>{requiredSymbol}</span></InputLabel>
                    <InputStyle
                        inputPadding={inputPadding} 
                        type={type} 
                        placeholder={placeholder} 
                        value={value}
                        onChange={onChange}
                        maxLength={maxLength}
                        bdColor={bdColor}
                        txtColor={txtColor}
                        inputBg={inputBg}
                    />
                    <InputIcon iconColor={iconColor}>{Icon}</InputIcon>
                    {error? <InputError>{title} is required</InputError> : '' }
            </InputWrapper>
        )
    }




    
    