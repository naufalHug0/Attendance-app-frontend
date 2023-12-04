import React from 'react'

const Link = ({
    href,
    text,
    className,
    ...rest
}) => <a href={href} {...rest} className={className}>{text}</a>

export default Link