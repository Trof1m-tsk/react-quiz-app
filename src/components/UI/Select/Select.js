import React from 'react'
import classes from './Select.css'

const Select = props => {

    const selectId = `${props.label}-${Math.round(Math.random() * 10000)}`

    return(
        <div className={classes.Select}>
            <label htmlFor={selectId}>{props.label}</label>
            <select
                id={selectId}
                value={props.value}
                onChange={props.onChange}
            >
                { props.options.map((opt, index) => {
                    return (
                        <option
                            value={opt.value}
                            key={opt.value + index}
                        >
                            {opt.text}
                        </option>
                    )
                }) }
            </select>
        </div>
    )
}

export default Select