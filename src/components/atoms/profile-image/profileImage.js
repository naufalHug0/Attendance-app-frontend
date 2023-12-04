import React from 'react'

const ProfileImage = ({
    size,
    className,
    url,
    ...rest
}) => <div className={`rounded-full bg-cover bg-center ${size} ${className} aspect-square`}
{...rest}
style={{ backgroundImage:`url(${url})` }}
></div>

export default ProfileImage