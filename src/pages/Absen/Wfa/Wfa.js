import React, { useMemo, useState } from 'react'
import { SHUFFLE_ICON, VectorClock, VectorWorking } from '../../../assets'
import { AbsenPageTemplate, Button, DateSelect, Input, SkeletonLoader, UploadFile } from '../../../components'
import { useFetch, usePreviewImage } from '../../../hooks'
import { AttendanceService } from '../../../services'
import { Api, Time } from '../../../utils'
import { Message } from '../../../utils'
import { MODAL_MESSAGE, MODAL_OPTIONS, VECTOR_DESC, VECTOR_TITLES } from '../../../constant'

const Wfa = () => {
    return (
        <AbsenPageTemplate
        title='WFA'
        desc="Work From Anywhere"
        icon={<SHUFFLE_ICON size={90}/>}
        >
            <Content/>
        </AbsenPageTemplate>
    )
}

const Content = () => {
    const [errors,setErrors] = useState({})
    const [loading,setLoading] = useState(true)
    const [pending,setPending] = useState(false)
    const [hasAbsen,setHasAbsen] = useState(false)
    const [approved,setApproved] = useState(false)
    const [selectedImage, setSelectedImage] = useState('')
    const [preview] = usePreviewImage(selectedImage)
    const [location, setLocation] = useState('')
    const [date, setDate] = useState()

    const InputForm = () => (
        <div className='flex flex-col py-4'>
            <div className="dropdown mt-4 mb-5">
                <p className='font-semibold text-sm mb-3'>Tanggal</p>
                <div className="flex gap-3">
                    <DateSelect
                    getValue={setDate}
                    title='Pilih Tanggal'
                    className={`placeholder:text-slate-300 ${errors.date&&'shadow-error'}`}
                    />
                </div>
                {errors.date && <p className='text-red-500 text-xs mt-2'>{errors.date[0]}</p>}
            </div>
            <label htmlFor="lokasi" className='mb-2 text-sm font-semibold'>Lokasi</label>
            
            <Input 
            id="lokasi" 
            onChange={e => setLocation(e.target.value)}
            className={`border-2 border-slate-300 px-3 py-2 rounded-md focus:border-blue-500 ${errors.location&&'border-red-500'}`} 
            />

            {errors.location && <p className='text-red-500 text-xs mt-2'>{errors.location[0]}</p>}
            {
                preview && <img src={preview} className='w-20 mt-4 mb-1 md:w-40'/>
            }
            <div className="btns-group">
                <UploadFile
                text={preview?'Ganti':'Upload Surat'}
                sizing='py-4 mt-3'
                className='btn rounded-md blue mb-3'
                getFile={val=>setSelectedImage(val)}
                />
            </div>
        </div>
    )

    const buttonText = useMemo(() => {
        if (approved) return 'Mulai'
        else if (hasAbsen) return 'Selesai'
        else return 'Ajukan'
    }, [approved, hasAbsen])

    const buttonEvent = useMemo(() => {
        if (approved) return onStart
        else if (hasAbsen) return onSelesai
        else return onSubmit
    }, [approved, hasAbsen])

    const ActionButton = () => {
        if (!pending) return <Button
        text={buttonText} 
        className={`self-end my-3 w-full rounded-full ${hasAbsen?'danger':'success'}`}
        onClick={buttonEvent}
        />
    }

    const Vector = useMemo(() => pending ? VectorClock : VectorWorking, [VectorClock])

    const title = useMemo(() => {
        if (hasAbsen) return VECTOR_TITLES.WFA.WORKING
        if (approved) return VECTOR_TITLES.WFA.IS_SCHEDULED_TODAY
        if (pending) return VECTOR_TITLES.WFA.PENDING
        return null
    }, [hasAbsen, approved, pending])

    const desc = useMemo(() => {
        if (hasAbsen) return VECTOR_DESC.WFA.WORKING
        if (approved) return VECTOR_DESC.WFA.IS_SCHEDULED_TODAY
        if (pending) return VECTOR_DESC.WFA.PENDING
        return null
    }, [hasAbsen, approved, pending])

    const onStart = () => {
        Api.fetchData(AttendanceService.wfaIn(),
        () => {
            setApproved(false)
            setHasAbsen(true)

            Message.modal({
                ...MODAL_MESSAGE.KERJA_STARTED,
                options: [
                    {
                        ...MODAL_OPTIONS.LANJUT,
                        action: Message.dismissModal
                    }
                ]
            })
        })
    }

    const onSubmit = () => {
        const formData = new FormData()
        formData.append('id',sessionStorage.getItem('e_id'))
        formData.append('image',selectedImage)
        formData.append('date',date)
        formData.append('location',location)

        Api.fetchData(AttendanceService.postRequestWfa(formData),() => {
            if (Time.isToday(form.date)) 
            {
                Message.modal({
                    ...MODAL_MESSAGE.WFA_STARTED,
                    options: [
                        {
                            ...MODAL_OPTIONS.LANJUT,
                            action: Message.dismissModal
                        }
                    ]
                })
                setHasAbsen(true)
            }
            else 
            {
                Message.modal({
                    ...MODAL_MESSAGE.PENGAJUAN_SENT,
                    options:[
                        {
                            ...MODAL_OPTIONS.LANJUT,
                            action: Message.dismissModal
                        },
                    ]
                })
                setPending(true)
            }
        }, err => {
            if (err.response.status ===422) setErrors(err.errors)
        })
    }

    const addLemburAttendance = () => {
        Api.fetchData(AttendanceService.lemburStart(sessionStorage.getItem('e_id')),() => {
            Message.modal({
                ...MODAL_MESSAGE.LEMBUR_START,
                options: [
                    {
                        ...MODAL_OPTIONS.LANJUT,
                        url: '/'
                    }
                ]
            })

            setHasAbsen(false)
            setApproved(false)
        })
    }

    const lembur = () => {
        Message.dismissModal()

        Api.fetchData(AttendanceService.wfaOut(sessionStorage.getItem('e_id'), true), addLemburAttendance)
    }

    const onPulang = (isWorkingHoursFulfilled) => {
        Message.dismissModal()

        Api.fetchData(AttendanceService.wfaOut(sessionStorage.getItem('e_id'), false), () => {
            Message.modal({
                title: isWorkingHoursFulfilled ? MODAL_MESSAGE.KERJA_SELESAI.title : MODAL_MESSAGE.LANJUR_KANTOR.title,
                body: isWorkingHoursFulfilled ? MODAL_MESSAGE.KERJA_SELESAI.body : MODAL_MESSAGE.LANJUR_KANTOR.body,
                options:[
                    {
                        ...MODAL_OPTIONS.SELESAI,
                        body: isWorkingHoursFulfilled ? MODAL_OPTIONS.SELESAI.body : MODAL_OPTIONS.LANJUT.body,
                        url: `/`
                    }
                ]
            })

            setHasAbsen(false)
            setApproved(false)
        })
    }

    const onSelesai = () => {
        Api.fetchData(AttendanceService.getWorkingHours(sessionStorage.getItem('e_id')), )
        getWorkingHours(sessionStorage.getItem('e_id'))
        .then(res=>{
            if (res.data.hours>=8) return dispatch(setModalMessage({
                title: 'Konfirmasi',
                body: 'Jam kerjamu sudah mencapai 8 jam. Apakah anda ingin melanjutkan pekerjaan di kantor?',
                options:[
                    {
                        type: 'blue',
                        body: 'Lanjut ke kantor',
                        action: lembur
                    },
                    {
                        type: 'danger',
                        body: 'Pulang',
                        action: () => onPulang(true)
                    },
                ]
            }))
            return onPulang(false)
        })
    }

    const checkApproval = () => {
        Api.fetchData(AttendanceService.getWFA(sessionStorage.getItem('e_id')),
        res => {
            if (res.data.data.length > 0) {
                const isWfaToday = Time.isToday(res.data.data[0].date)
                const haventApproved = res.data.data[0].is_approved===null

                if (res.data.data[0].is_approved && isWfaToday) setApproved(true)
                else if (haventApproved) setPending(true)
            }
        })
    }

    const checkUserHasAbsen = () => {
        Api.fetchData(AttendanceService.getAbsensiToday({
            id: sessionStorage.getItem('e_id'),
            status: 'wfa'
        }),
        res => {
            if (res.data.data.length>0) {
                const isPresent = res.data.data[0].out===null

                setHasAbsen(isPresent)
                setApproved(isPresent)
            } 
            setLoading(false)
        })
    }

    useFetch(AttendanceService.checkHaventCheckout({ id: sessionStorage.getItem('e_id') }),
    () => {
        checkApproval()
        checkUserHasAbsen()
    },
    err => {
        if (err.response.status===403) {
            Message.modal({
                ...MODAL_MESSAGE.DENIED_BELUM_CHECKOUT,
                options:[
                    {
                        ...MODAL_OPTIONS.KONFIRMASI,
                        url: `/confirm`
                    }
                ]
            })
        }
    })

    if (loading) return <SkeletonLoader variant='VECTOR' />

    return (
        <div className='vector-wrapper'>
            {
            title ?
            <div className="flex items-center justify-center flex-col">
                <img src={Vector} className='w-32 mb-2 min-[350px]:w-40'/>
                <p className='text-sm min-[350px]:text-base font-medium text-center'>{title}</p>
                <p className='text-[10px] text-center font-light text-slate-400'>
                    {desc}
                </p>
            </div>
            :
            <InputForm/> 
            }
            <div className="justify-self-end w-full">
                <ActionButton/>
            </div>
        </div>
    )
}

export default Wfa