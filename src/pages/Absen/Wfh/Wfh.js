import React, { useMemo, useState } from 'react'
import { useFetch } from '../../../hooks'
import { AttendanceService } from '../../../services'
import { Api, Message } from '../../../utils'
import { MODAL_MESSAGE, MODAL_OPTIONS, VECTOR_DESC, VECTOR_TITLES } from '../../../constant'
import { AbsenPageTemplate, Button, SkeletonLoader } from '../../../components'
import { HOME_ICON } from '../../../assets'

const Wfh = () => {
    return (
        <AbsenPageTemplate
        title='WFH'
        desc="Work From Home"
        icon={<HOME_ICON size={90}/>}
        >
            <Content/>
        </AbsenPageTemplate>
    )
}

const Content = () => {
    const [pending,setPending] = useState(false)
    const [approved,setApproved] = useState(false)
    const [userHasAbsenLoading,setUserHasAbsenLoading] = useState(false)

    const title = useMemo(()=>{
        if (approved) return VECTOR_TITLES.WFH.APPROVED
        else {
            if (pending) return VECTOR_TITLES.WFH.PENDING
            else return VECTOR_TITLES.WFH.DEFAULT
        }
    },[approved, pending])

    const desc = useMemo(()=>pending ? VECTOR_DESC.WFH.PENDING : VECTOR_DESC.WFH.DEFAULT,[pending])

    const Vector = useMemo(()=>pending ? VectorClock : VectorSofa,[pending])

    useFetch(AttendanceService.getAbsensiToday(sessionStorage.getItem('e_id')),
    res=>{
        if (res.data.data)
        {
            const hasAbsen = res.data.data.data.filter(absen=>absen.status==='wfo'||absen.status==='wfa').length > 0
            const notHadir = res.data.data.data.filter(absen=>absen.status==='cuti'||absen.status==='sakit').length > 0

            if (hasAbsen||notHadir)
            {
                return Message.modal({
                    ...MODAL_MESSAGE.DENIED_TIDAK_HADIR,
                    body: notHadir ? MODAL_MESSAGE.DENIED_TIDAK_HADIR.body : MODAL_MESSAGE.DENIED_HADIR,
                    options: [
                        {
                            ...MODAL_OPTIONS.SETUJU,
                            url: '/'
                        }
                    ]
                })
            } 
        } 
    },err=>{ if (err.status!==500) setUserHasAbsenLoading(false) })

    const { loading: approvalLoading } = useFetch(AttendanceService.getWfh(sessionStorage.getItem('e_id')),
    res=>{
        if (res.data.data.length > 0) {
            const isApproved = res.data.data.filter(wfh=>wfh.is_approved).length>0
            const haventApproved = res.data.data[0].is_approved===null

            setApproved(isApproved)
            if (haventApproved) setPending(true)
            setLoading(false)
        }
    })

    const onSubmit = () => {
        const isOnPrecense = approved

        if (isOnPrecense) {
            Api.fetchData(AttendanceService.wfhOut(sessionStorage.getItem('e_id')),()=>{
                Message.modal({
                    ...MODAL_MESSAGE.KERJA_SELESAI,
                    options: [{
                        ...MODAL_OPTIONS.SELESAI,
                        url: '/'
                    }]
                })
                setApproved(false)
            },err=>{
                if (err.response.status === 403)
                {
                    Message.modal({
                        ...MODAL_MESSAGE.DENIED_WORKING_HOURS(err.response.data.data.work_time),
                        options: [
                            {
                                ...MODAL_OPTIONS.SETUJU,
                                url: '/'
                            }
                        ]
                    })
                }
            })
        }
        
        else {
            Api.fetchData(AttendanceService.postRequestWfh({id:sessionStorage.getItem('e_id')}),
            ()=>{
                Message.modal({
                    ...MODAL_MESSAGE.PENGAJUAN_SENT,
                    options: [
                        {
                            ...MODAL_OPTIONS.LANJUT,
                            action: Message.dismissModal
                        }
                    ]
                })
                setPending(true)
            })
        }
    }

    const ActionButton = () => {
        const buttonText = approved?'Selesai':'Ajukan'
        const buttonStyle = `self-end mt-3 w-full rounded-full ${approved?'danger':'success'}`

        if (!pending) return <Button
        text={buttonText}
        className={buttonStyle}
        onClick={onSubmit}
        />
    }

    if ( userHasAbsenLoading || approvalLoading ) return <SkeletonLoader className="vector-skeleton-wrapper" variant='VECTOR'/>

    return (
        <div className='vector-wrapper animate-opacity'>
            <div className="flex items-center justify-center flex-col">
                <img src={Vector} className='w-40 mb-4 min-[350px]:w-60'/>
                <p className='text-sm min-[350px]:text-base font-medium text-center'>{title}</p>
                <p className='text-[10px] text-center font-light text-slate-400'>
                {desc}
                </p>
            </div>
            <div className="justify-self-end w-full">
                <ActionButton/>
            </div>
        </div>
    )
}

export default Wfh