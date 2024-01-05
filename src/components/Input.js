import React from 'react'
import { CFormInput } from '@coreui/react'
const Input = (props) => {
    return (
        <div>
            <CFormInput
                type={props.type}
                id={props.id}
                label={props.label}
                placeholder={props.placeholder}
                text={props.validation}
                name={props.name}
                onChange={props.change}
                value={props.value}
            />
        </div>
    )
}

export default Input