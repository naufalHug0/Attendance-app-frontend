import React from 'react'

const UploadFile = ({
    text,
    className,
    sizing,
    getFile,
    fileType='image/png, image/jpeg, image/jpg',
    ...rest
}) => (
    <div className={sizing}>
    <input {...rest} type="file" id="actual-btn" hidden onChange={e=>getFile(e.target.files[0])} accept={fileType}/>
    <label className={`cursor-pointer ${className}`} htmlFor="actual-btn">{text}</label>
    </div>
)


export default UploadFile