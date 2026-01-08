
import { FiSearch } from 'react-icons/fi'
import { InputError, InputIcon, InputLabel, InputStyle, InputWrapper } from './textArea.style'


export default function TextArea({Icon, iconColor, title, value, txtColor, error, bdColor, onChange, placeholder, requiredSymbol, InputWidth, type, maxLength, label, inputPadding}) {

  return (
                <InputWrapper InputWidth={InputWidth}>
                    <InputLabel htmlFor="name"><b>{label}</b><span>{requiredSymbol}</span></InputLabel>
                    <InputStyle
                        inputPadding={inputPadding} 
                        placeholder={placeholder} 
                        value={value}
                        onChange={onChange}
                        maxLength={maxLength}
                        bdColor={bdColor}
                        txtColor={txtColor}
                    >
                    </InputStyle>
                
                    <InputIcon iconColor={iconColor}>{Icon}</InputIcon>
                    {error? <InputError>{title} is required</InputError> : '' }
            </InputWrapper>
        )
    }
