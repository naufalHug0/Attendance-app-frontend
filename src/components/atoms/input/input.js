import React from 'react'

const Input = ({
    className,
    invalid,
    ...rest
}) => (<><input
className={`input ${className} ${invalid.isInvalid&&'input-invalid'}`}
{...rest}
/>
{invalid.isInvalid && <p className='text-xs mt-2 self-start text-red-500'>{invalid.message}</p>}
</>
)

export default Input