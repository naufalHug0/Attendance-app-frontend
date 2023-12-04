import React, { useEffect, useRef, useState } from 'react'
import { NavBrand, SkeletonLoader } from '../../molecules'
import { ReduxDispatcher, Time } from '../../../utils'
import { Button, DateSelect } from '../../atoms'
import { ALPHA_ICON, BUILDING_ICON, CALENDAR_ICON, CARD_CHECK_ICON, DOCUMENT_ICON, HOME_ICON, LOCATION_ICON, SHUFFLE_ICON, SIGNIN_ICON, TERMO_ICON } from '../../../assets'
import { useSelector } from 'react-redux'
import { useFetch } from '../../../hooks'
import { AttendanceService } from '../../../services'

const KaryawanPageTemplate = () => {
    const user = useSelector(state=>state.homeReducer.USER_DATA)
    const [selectedMonth,setSelectedMonth] = useState(Time.getYearMonthNow())

    const { loading: todayDataLoading } = useFetch(AttendanceService.getAbsensiToday({
        id: sessionStorage.getItem('e_id')
    }),res=>ReduxDispatcher.userAttendance(res.data))

    const { loading: monthDataLoading } = useFetch(AttendanceService.getAbsensiMonth({
        id: sessionStorage.getItem('e_id'),
        month: selectedMonth.split('-')[1],
        year: selectedMonth.split('-')[0]
    }),res=>ReduxDispatcher.userMonthAttendance(res.data))

    if (todayDataLoading||monthDataLoading) return <SkeletonLoader/>

    return (
        <>
        <NavBrand
        profile_image={user.profile_image}
        />
        <div className="md:px-8 px-5 mt-20 mb-10">
            <p className="mb-4">{Time.getTodayDate()}</p>
            <SectionList/>
            <Slider/>

            <p className='heading mt-8 mb-4'>Absensi</p>
            <div className="dropdowns">
            <DateSelect
            type='month'
            defaultValue={selectedMonth}
            getValue={val=>{
                sessionStorage.setItem('sel_mnth',val)
                setSelectedMonth(val)
            }}
            />
            </div>
            <StatusSection selectedMonth={selectedMonth}/>
        </div>
        </>
    )
}

const SliderContent = ({scrollPos}) => {
    const Location = ({location}) => <div className="flex gap-3 items-center"><LOCATION_ICON size={20}/><p className='text-slate-400 text-sm'>{location}</p></div>

    return (
        <div className='flex gap-20 py-3 px-1 transition relative ease-in-out duration-500' style={{transform: `translateX(calc(${scrollPos}))`}}>
        <div className="shadow-default rounded-md bg-white w-full h-52 sm:h-64 lg:h-80 flex-shrink-0 flex-grow-0 p-8 relative">
            <div className="flex gap-4 items-center mb-7">
                <div className="flex items-center justify-center w-12 aspect-square text-[#F05454] bg-[#F7E4E4] rounded-full">
                    <CARD_CHECK_ICON size={25}/>
                </div>
                <div>
                    <p className="font-semibold">Status saat ini</p>
                    <p className="text-slate-400 text-sm">WFO, WFA</p>
                </div>
            </div>
            <Location location='Data Center'/>
            <Button className='absolute bg-red-primary text-white bottom-8 right-8 left-8 cursor-pointer' text='Lihat detail'/>
        </div>
        <div className="shadow-default rounded-md bg-white w-full h-52 sm:h-64 lg:h-80 flex-shrink-0 flex-grow-0 p-8 relative">
            <div className="flex gap-4 items-center mb-7">
                <div className="flex items-center justify-center w-12 aspect-square text-[#F05454] bg-[#F7E4E4] rounded-full">
                    <CARD_CHECK_ICON size={25}/>
                </div>
                <div>
                    <p className="font-semibold">Cuti</p>
                    <p className="text-slate-400 text-sm">WFO, WFA</p>
                </div>
            </div>
        </div>
        </div>
    )
}

const Slider = () => {
    const [active,setActive] = useState([true,false])
    const [scrollPos,setScrollPos] = useState(0)
    const ref = useRef()
    return (
        <div className="w-full my-8">
            <div className={`relative overflow-scroll`} onScroll={e=>console.log(ref.current.getBoundingClientRect())} ref={ref}>
                <SliderContent scrollPos={scrollPos}/>
            </div>
            <div className="flex gap-2 justify-center mt-2">
                {
                    active.map((isActive,i)=>(
                        <span className={`rounded-full cursor-pointer ${isActive?'bg-red-primary h-2 w-7':'bg-slate-300 aspect-square w-2'} transition`} onClick={()=>{
                            setActive(active.map((item,index)=>item=i===index))
                            setScrollPos(`-${i*100}% - ${72*(i>0?1:0)}px`)
                        }
                        }></span>
                    ))
                }
            </div>
        </div>
    )
}

const SectionList = () => {
    return (
        <div className="overflow-scroll grid grid-cols-[repeat(5,minmax(200px,1fr))] gap-3">
            <SectionCard href='/wfo' title='WFO' icon={<BUILDING_ICON size={70}/>}/>
            <SectionCard href='/cuti' title='Cuti' icon={<CALENDAR_ICON size={70}/>}/>
            <SectionCard href='/sakit' title='Perizinan' icon={<DOCUMENT_ICON size={70}/>}/>
            <SectionCard href='/wfa' title='WFA' icon={<SHUFFLE_ICON size={70}/>}/>
            <SectionCard href='/wfh' title='WFH' icon={<HOME_ICON size={70}/>}/>
        </div>
    )
}

const StatusSection = ({selectedMonth}) => {
    const monthAttendance = useSelector(state=>state.homeReducer.USER_MONTH_ATTENDANCE);
    const [year,month] = selectedMonth.split('-')

    return (
        <div className="grid gap-4">
            <Card
                href={`/absensi/hadir?year=${year}&month=${month}`} 
                title={'Hadir'} 
                days={monthAttendance.hadir.count} 
                icon={<SIGNIN_ICON size={30} className="text-[#58DAD5]"/>}
                iconBgColor="bg-[#E4F7F6]"
            />
            <Card 
                href={`/absensi/cuti?year=${year}&month=${month}`} 
                title={'Cuti'} 
                days={monthAttendance.cuti.count} 
                icon={<CALENDAR_ICON size={30} className="text-[#9F88DA]"/>}
                iconBgColor="bg-[#EAE4F7]"
            />
            <Card 
                href={`/absensi/sakit?year=${year}&month=${month}`} 
                title={'Sakit'} 
                days={monthAttendance.sakit.count} 
                icon={<TERMO_ICON size={30} className="text-[#F05454]"/>}
                iconBgColor="bg-[#F7E4E4]"
            />
            <Card 
                href={`/absensi/tanpa-keterangan?year=${year}&month=${month}`} 
                title={'Tanpa Keterangan'} 
                days={monthAttendance.tanpa_keterangan.count} 
                icon={<ALPHA_ICON size={30} className="text-[#F05454]"/>}
                iconBgColor="bg-[#F7E4E4]"
            />
        </div>
    )
}

const SectionCard = ({
    icon,
    title,
    href,
    ...rest
}) => {
    return (
        <a {...rest} href={href} className="section-card flex px-3 py-4 min-h-[140px] justify-between">
            <div className="flex flex-col justify-between h-full">
                <p className='font-semibold text-xl'>{title}</p>
                <div className="open-btn text-[10px] max-w-[52px]">Open</div>
            </div>
            <div>{icon}</div>
        </a>
    )
}

const Card = ({
    icon,
    iconBgColor,
    title,
    days,
    href,
    ...rest
}) => {
    return (
        <a href={href} {...rest} className='shadow-default rounded-lg flex justify-between px-5 py-10'>
            <div className="grid grid-cols-[repeat(2,max-content)] gap-3 min-[350px]:gap-5 items-center">
            <div className={`flex rounded-full justify-center items-center w-16 aspect-square ${iconBgColor}`}>{icon}</div>
                <div>
                    <p className="font-semibold sm:heading">{title}</p>
                    <p className='text-slate-400 text-xs'>{days} Hari</p>
                </div>
            </div>
        </a>
    )
}

export default KaryawanPageTemplate