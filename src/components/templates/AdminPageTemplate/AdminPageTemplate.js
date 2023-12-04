import React from 'react'
import { NavBrand } from '../../molecules'
import { Time } from '../../../utils'

const AdminPageTemplate = () => {
    return (
        <>
        <NavBrand
        isAdminPage={true}
        profile_image={''}
        />
        <div className="md:px-8 px-5 mt-20 mb-10">
            <p className="mb-4">{Time.getTodayDate()}</p>
            <div className="flex flex-col gap-5">
                <ActiveSection 
                data={Object.values(allAttendanceCount.active)}
                />

                <ListCard/>

                <ReportCard/>

                <NotificationList/>
            </div>
        </div>
        </>
    )
}

const ListCard = ({karyawans,attendanceCount}) => (
    <a href="/lists" className="section-card flex flex-col px-4 py-5 gap-10">
        <span>
            <div className="flex">
                {
                    karyawans.slice(0,3).map((e,i)=><ProfileImage
                    size='w-8 sm:w-10'
                    url={e.profile_image}
                    className={i>0&&'-ml-[5px]'}
                    />)
                }
            </div>
            <p className="heading mt-4">List Karyawan</p>
        </span>
        <span className='sm:w-1/2'>
            <div className="flex justify-between mb-2">
                <p className='font-semibold text-sm'>{attendanceCount.total} Hadir</p>
                <p className='text-sm'>{attendanceCount.percent}%</p>
            </div>
            <div className="w-full relative">
                <div className="rounded-full h-1 w-full bg-white opacity-40 absolute"></div>
                <div className="rounded-full h-1 bg-white transition-all animate-progress" style={{ 
                    width: `${attendanceCount.percent}%`
                }}></div>
            </div>
        </span>
    </a>
)

const ReportCard = () => (
    <a href="/report" className="section-card flex flex-col px-4 py-5 gap-10">
        <span>
            <DOCUMENT_ICON size={30}/>
            <p className="heading mt-4">Report Absensi</p>
        </span>
        <div className="open-btn w-max text-sm">Open</div>
    </a>
)

const NotificationList = ({notifications}) => (
    <>
    <p className="heading mt-10 mb-3">Notifications</p>
    {
        notifications.length>0?notifications.slice(0,3).map(item=><NotificationItem section='admin' 
        title={item.title} 
        is_read={item.is_read===1} 
        date={convertTimestampToLocal(item.created_at)} 
        id={item.id}
        />)
        :
        <div className="py-5 border-slate-300 border-t-[1px] border-b-[1px]">
            <p>Belum ada notifikasi</p>
        </div>
    }
    <a href="/notifications" className='mt-5 inline-block text-blue-notif'>View all notifications</a>
    </>
)

const ActiveSection = ({data}) => (
    data.length>0&&<div className='flex gap-3 overflow-x-scroll py-3 px-1'>
        {
            data.map(user=><div className="shadow-default h-[100px] flex-shrink-0 flex-grow-0 basis-[350px] bg-white rounded-md px-5 flex items-center justify-between">
                <div className="flex gap-3 items-center">
                <ProfileImage
                size='w-14'
                url={user.karyawans.profile_image}
                />
                <div>
                    <p className='font-bold text-sm'>{user.karyawans.nama}</p>
                    <p className='font-light text-slate-400 text-xs first-letter:capitalize'>{user.status}</p>
                </div>
                </div>
                <span className={`w-[14px] justify-self-end aspect-square rounded-full ${user.status==='cuti'||user.status==='sakit'?'bg-red-400':'bg-green-300'}`}></span>
            </div>)
        }
    </div>
)

export default AdminPageTemplate