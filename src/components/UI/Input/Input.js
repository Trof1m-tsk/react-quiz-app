import React from 'react'
import classes from './Input.css'

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = props => {
    const inputType = props.type || 'text';
    const clss = [classes.Input]
    const inputId = `${inputType}-${Math.round((Math.random() * 10000))}`

    
    if (isInvalid(props)) {
        clss.push(classes.invalid)
    }

    return (
        <div className={clss.join(' ')}>
            <label htmlFor={inputId}>{props.label}</label>
            <input
                id={inputId}
                type={inputType}
                value={props.value}
                onChange={props.onChange}
            />

            <span>
                { isInvalid(props)
                    ? props.errorMessage
                    : null
                }
            </span>
        </div>
    )
}

export default Input