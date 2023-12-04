import { useEffect, useState } from "react"

const usePreviewImage = (selectedImage) => {
    const [preview, setPreview] = useState('')

    useEffect(()=>{
        const objectUrl = selectedImage && URL.createObjectURL(selectedImage)
    
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    },[selectedImage])

    return [preview, setPreview]
}

export default usePreviewImage