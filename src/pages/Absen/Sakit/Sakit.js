import React, { useMemo } from 'react'
import { AbsenPageTemplate, Button, ImagePreview, SkeletonLoader, UploadFile } from '../../../components'
import { DOCUMENT_ICON, IMAGE_ICON } from '../../../assets'
import { useFetch, usePreviewImage } from '../../../hooks'
import { AttendanceService } from '../../../services'
import { Api, Message } from '../../../utils'
import { MODAL_MESSAGE, MODAL_OPTIONS, VECTOR_DESC, VECTOR_TITLES } from '../../../constant'

const Sakit = () => {
    return (
        <AbsenPageTemplate
        title='Perizinan'
        icon={<DOCUMENT_ICON size={90}/>}
        >
            <Content/>
        </AbsenPageTemplate>
    )
}

const Content = () => {
    const [selectedImage, setSelectedImage] = useState('')
    const [preview] = usePreviewImage(selectedImage)
    const [submitted, setSubmitted] = useState(false)
    const [imageSent, setImageSent] = useState(false)
    const [uploadedImage,setUploadedImage] = useState('')
    const [showImage,setShowImage] = useState(false)

    const vectorContent = useMemo(() => {
        if (submitted) return {
            title: VECTOR_TITLES.SAKIT.SENT,
            desc: VECTOR_DESC.SAKIT.SENT
        }

        return { title: VECTOR_TITLES.SAKIT.DEFAULT, desc: VECTOR_DESC.SAKIT.DEFAULT }
    }, [submitted])

    const onSubmit = () => {
        Message.dismissModal()

        const formData = new FormData()
        formData.append('id',sessionStorage.getItem('e_id'))
        
        Api.fetchData(AttendanceService.postRequestSakit(formData), () => {
            Message.modal({
                ...MODAL_MESSAGE.IZIN_SAKIT_SENT,
                options: [{ ...MODAL_OPTIONS.LANJUT, action: Message.dismissModal }]
            })
            setSubmitted(true)
        })
    }

    const uploadImageSakit = () => {
        const formData = new FormData()
        formData.append('id',sessionStorage.getItem('e_id'))
        formData.append('image',selectedImage)

        Api.fetchData(AttendanceService.uploadSuratSakit(formData), () => {
            Message.modal({
                ...MODAL_MESSAGE.SURAT_IZIN_SENT,
                options: [{ ...MODAL_OPTIONS.LANJUT, action: Message.dismissModal }]
            })
            setImageSent(true)
            setUploadedImage(preview)
        })
    }

    const checkUserHaventAbsen = res => {
        if (res.data?.data)
        {
            const hasAbsen = res.data.data.filter(absen=>absen.status==='wfo'||absen.status==='wfa'||absen.status==='wfh').length > 0

            if (hasAbsen)
            {
                return Message.modal({
                    ...MODAL_MESSAGE.DENIED_HADIR,
                    options: [{ ...MODAL_OPTIONS.SETUJU, url: '/' }]
                })
            }
            
            Api.fetchData(AttendanceService.getSakit(sessionStorage.getItem('e_id')), 
            res => {
                if (res.data)
                {
                    setSubmitted(true)
                    if (res.data.image!==null) {
                        setImageSent(true)
                        setUploadedImage(res.data.image)
                    }
                } 
            })
        }
    }

    const DetailSurat = () => (
        <>
        {showImage && <ImagePreview url={uploadedImage} show={setShowImage} />}
        <div className="flex w-full self-start mt-4 flex-col gap-1 px-2 sm:px-5">
            <div className="border-b-[1px] border-slate-300 py-4 w-full font-medium">
                Surat Sakit
            </div>
            <div
            onClick={() => setShowImage(true)} 
            className="cursor-pointer border-b-[1px] flex justify-between border-slate-300 py-5 w-full font-medium text-sm text-slate-400">
                <div className="flex gap-3 items-center">
                    <IMAGE_ICON size={16}/>
                    <p>Image.png</p>
                </div>
                <div className="btn px-8 bg-slate-200 text-slate-400">Lihat</div>
            </div>
        </div>
        </>
    )

    const Vector = () => (
        <div className="flex items-center justify-center flex-col animate-opacity">
        <img src={selectedImage ? preview : VectorSakit} className='w-40 mb-2 min-[350px]:w-52'/>
        { !selectedImage &&
        <>
            <p className='text-sm min-[350px]:text-base font-medium text-center'>{vectorContent.title}</p>
            <p className='text-[10px] text-center font-light text-slate-400'>{vectorContent.desc}</p>
        </>
        }
        </div>
    )

    const ActionButton = () => {
        if (submitted) return (
            <div className="btns-group">
                {
                    selectedImage && 
                    <Button
                        text='Kirim'
                        className='self-end mt-3 w-full rounded-md blue'
                        onClick={uploadImageSakit}
                    />
                }
                <UploadFile
                    text={selectedImage?'Ganti':'Upload Surat'}
                    className={`w-full block btn ${selectedImage?'rounded-md danger':'rounded-full blue'}`}
                    sizing='self-end mt-3 w-full'
                    getFile={val => setSelectedImage(val)}
                />
            </div>
        )
        return <Button
        text='Ajukan' 
        className='self-end mt-3 w-full rounded-full btn success'
        onClick={onSubmit}
        />
    }

    const { loading } = useFetch(AttendanceService.getAbsensiToday(), checkUserHaventAbsen)

    if (loading) return <SkeletonLoader variant='VECTOR' />

    return (
        <div className='vector-wrapper'>
        {
            imageSent?
            <DetailSurat />
            :
            <>
                <Vector />
                <div className="justify-self-end w-full">
                    <ActionButton />
                </div>
            </>
        }
        </div>
    )
}

export default Sakit