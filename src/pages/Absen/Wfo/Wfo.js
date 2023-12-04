import React, { useEffect, useMemo, useState } from 'react'
import { BUILDING_ICON, TICK_ICON, VectorLembur, VectorWork, VectorWorking } from '../../../assets'
import {AbsenPageTemplate, Button, SkeletonLoader} from '../../../components'
import { useDistance } from '../../../hooks'
import { AttendanceService } from '../../../services'
import { Api, Message } from '../../../utils'
import { MODAL_MESSAGE, MODAL_OPTIONS, VECTOR_DESC, VECTOR_TITLES } from '../../../constant'

const Wfo = () => {
    return (
        <AbsenPageTemplate
        title='WFO'
        desc="Work From Office"
        icon={<BUILDING_ICON size={90}/>}
        >
            <Content/>
        </AbsenPageTemplate>
    )
}

const Content = () => {
    const distance = useDistance()
    const [loading, setLoading] = useState(true)
    const [isAbsen,setIsAbsen] = useState(false)
    const [blocked, setBlocked] = useState(false)
    const [isLembur,setIsLembur] = useState(false)
    const [canLembur,setCanLembur] = useState(false)
    const [hasCheckout, setHasCheckout] = useState(false)
    const [absenActive, setAbsenActive] = useState(false)
    const [btn_anim_text, setBtnAnimationText] = useState(<TICK/>)

    useEffect(()=>{
        if (distance>50)
        {
            Message.modal({
                ...MODAL_MESSAGE.DENIED_TIDAK_DI_KANTOR(distance),
                options: [
                    {
                        ...MODAL_OPTIONS.SETUJU,
                        url: '/'
                    },
                    {
                        ...MODAL_OPTIONS.COBA_LAGI,
                        action: ()=>window.location.reload()
                    }
                ]
            })
        }

        checkHaventCheckout()

        if (hasCheckout)
        {
            checkUserHasAbsen()

            if (blocked)
            {
                Message.modal({
                    ...MODAL_MESSAGE.DENIED_SUDAH_SELESAI_ABSEN,
                    options: [
                        {
                            ...MODAL_OPTIONS.SETUJU,
                            url: `/`
                        }
                    ]
                })
            }
        }

    },[hasCheckout,distance])

    const Styles = {
        Vector_Wrapper: useMemo(()=>`flex items-center justify-center flex-col ${isAbsen?'animate-opacity':''}`,[isAbsen]),
        Vector_Image: useMemo(()=>`w-32 mb-2 min-[350px]:w-48 ${isLembur&&'sm:w-72 min-[350px]:w-52'}`,[isLembur]),
        Button: useMemo(()=>`self-end mt-3 w-full rounded-full h-[48px] ${isAbsen?'danger':'success'} ${absenActive?'animate-check fill-mode p-0':''}`,[absenActive, isAbsen])
    }

    const Vector = useMemo(()=>{
        if (isAbsen) {
            if (isLembur) return VectorLembur;
            else return VectorWorking
        } 
        return VectorWork
    }, [isAbsen, isLembur])

    const buttonText = useMemo(()=>{
        if (isAbsen) return 'Pulang'
        if (absenActive) return btn_anim_text
        else return 'Absen'
    },[isAbsen, absenActive, btn_anim_text])

    const title = useMemo(()=> isAbsen?VECTOR_TITLES.WFO.WORKING:VECTOR_TITLES.WFO.DEFAULT ,[isAbsen])

    const desc = useMemo(()=>{
        if (isAbsen) {
            if (isLembur) return VECTOR_DESC.WFO.LEMBUR
            else return VECTOR_DESC.WFO.WORKING
        }
        return VECTOR_DESC.WFO.DEFAULT
    },[isAbsen, isLembur])

    const ActionButton = () => {
        if (canLembur) return (
            <div className="btns-group w-full">
                <Button
                text='Lembur'
                className='self-end mt-3 w-full rounded-md blue'
                onClick={onLembur}
                />
                <Button
                text='Pulang'
                className='self-end mt-3 w-full rounded-md danger'
                onClick={onPulang}
                />
            </div>
        )
        else return <Button
        text={buttonText} 
        className={Styles.Button}
        onClick={isAbsen?onPulang:onAbsen}
        />
    }

    const checkHaventCheckout = () => {
        Api.fetchData(AttendanceService.checkHaventCheckout({id:sessionStorage.getItem('e_id')}),()=>setHasCheckout(true),
        err=>{
            if (err.response.status===403) Message.modal({
                ...MODAL_MESSAGE.DENIED_BELUM_CHECKOUT,
                options:[
                    {
                        ...MODAL_OPTIONS.KONFIRMASI,
                        url: `/confirm`
                    }
                ]
            })
        })
    }

    const checkUserHasAbsen = () => {
        Api.fetchData(AttendanceService.getAbsensiToday({id: sessionStorage.getItem('e_id')}),(res)=>handleSuccess(res))
    
        const handleSuccess = (res) => {
            if (res.data.data.data)
            {
                const hasAbsen = res.data.data.data.filter(absen=>absen.status==='sakit'||absen.status==='cuti').length > 0
                
                if (hasAbsen)
                {
                    return Message.modal({
                        ...MODAL_MESSAGE.DENIED_TIDAK_HADIR,
                        options:[
                            {
                                ...MODAL_OPTIONS.SETUJU,
                                url: '/'
                            },
                        ]
                    })
                }
    
                setIsLembur(res.data.data?.data?.filter(absensi=>absensi.status==='lembur').length>0)
    
                setCanLembur(res.data.data.duration.hours>=8&&!isLembur)
    
                let absensi = res.data.data?.data?.filter(absensi=>absensi.status==='wfo')
    
                if (absensi&&absensi.length>0)
                {
                    if (absensi[0].out === null) setIsAbsen(true)
                    else return setBlocked(true)
                }
            }
            setLoading(distance>50)
        }
    }

    const onLembur = () => {
        Api.fetchData(AttendanceService.lemburStart(sessionStorage.getItem('e_id')),
        ()=> {
            setIsLembur(true)
            setCanLembur(false)
            Message.modal({
                ...MODAL_MESSAGE.LEMBUR_START,
                options:[
                    {
                        ...MODAL_OPTIONS.LANJUT,
                        action: Message.dismissModal
                    }
                ]
            })
            setIsAbsen(true)
        })
        
    }

    const onAbsen = () => {
        AttendanceService.wfoIn(sessionStorage.getItem('e_id'),
        ()=> {
            setAbsenActive(true)
            setBtnAnimationText(<TICK/>)
            setTimeout(()=>{
                setBtnAnimationText(<p className='animate-opacity'>Pulang</p>)
                setTimeout(()=>setIsAbsen(true),1000)
            },1800)
        })
    }

    const onPulang = () => {
        if (isLembur)
        {
            AttendanceService.lemburEnd(sessionStorage.getItem('e_id'),
            ()=>{
                Message.modal({
                    ...MODAL_OPTIONS.KERJA_SELESAI,
                    options:[
                        {
                            ...MODAL_OPTIONS.SELESAI,
                            url: `/`
                        }
                    ]
                })
                setIsAbsen(false)
                setBlocked(true)
            })
        }
        
        AttendanceService.wfoOut(sessionStorage.getItem('e_id'),
        ()=>{
            
            Message.modal({
                ...MODAL_OPTIONS.KERJA_SELESAI,
                options:[
                    {
                        ...MODAL_OPTIONS.SELESAI,
                        url: `/`
                    }
                ]
            })

            setIsAbsen(false)
            setBlocked(true)

        },err=>{
            if (err.response.status === 403)
            {
                Message.modal({
                    ...MODAL_MESSAGE.DENIED_WORKING_HOURS(err.response.data.data.work_time),
                    options:[
                        {
                            ...MODAL_OPTIONS.SETUJU,
                            url: `/`
                        },
                        {
                            ...MODAL_OPTIONS.IZIN_PULANG,
                            url: `/confirm/pulang`
                        }
                    ]
                })
            }
        })
    }

    if (loading) return <SkeletonLoader className="vector-skeleton-wrapper" variant='VECTOR'/>

    return (
        <div className='vector-wrapper animate-opacity'>
            <div className={Styles.Vector_Wrapper}>
                <img src={Vector} className={Styles.Vector_Image} alt='Vector'
                />
                <p className='text-sm min-[350px]:text-base font-medium text-center'>{title}</p>
                <p className='text-[10px] text-center font-light text-slate-400'>{
                    desc
                }</p>
            </div>
            <div className="justify-self-end w-full flex justify-center">
                <ActionButton/>
            </div>
        </div>
    )
}

const TICK = ()=> <div className='flex justify-center items-center'><TICK_ICON size={20} className='transition duration-500 text-center animate-opacity'/></div>

export default Wfo