import React from 'react'

const Button = ({
    className,
    text,
    ...rest
}) => <button {...rest} className={`btn ${className}`}>{text}</button>

export default Button