import React from 'react'

const Logo = ({
    className,
    color,
    ...rest
}) => <img 
{...rest}
src={
    color==='red'?"http://enkripa.test/storage/assets/Enkripa_Logo_red_text.png":
    'http://enkripa.test/storage/assets/Logo_Enkripa_White2.png'
} 
loading="lazy"
alt="logo" 
className={className}
/>

export default Logo