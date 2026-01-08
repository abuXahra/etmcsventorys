import React from 'react'
import { CheckboxInputStyle, CheckboxWrapper } from './checkbox.style'

function Checkbox({checked, onChange, title}) {
  return (
       <CheckboxWrapper>
            <CheckboxInputStyle
              type="checkbox"
              checked={checked}
              onChange={onChange}
              />
              <p>{title}</p>                            
        </CheckboxWrapper>
  )
}

export default Checkbox