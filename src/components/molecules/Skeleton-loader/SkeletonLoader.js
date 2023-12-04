import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonLoader = ({
    variant = 'HOME',
    className
}) => {
    
    const SkeletonComponent = ({variant}) => {
        switch (variant.toUpperCase()) {
            case 'NOTIFICATION':
                return <Notification/>
            case 'PAGE':
                return <Home/>
            case 'TABLE':
                return <Table/>
            case 'VECTOR':
                return <Vector/>
            case 'NAVBAR':
                return <Navbar/>
            default :
                return <Home Navbar={<Navbar/>}/>
        }
    }

    const getStyle = () => {
        switch (variant.toUpperCase()) {
            case 'NOTIFICATION':
                return ''
            case 'PAGE':
                return ''
            case 'TABLE':
                return ''
            case 'VECTOR':
                return ''
            default :
                return 'skeleton-home-container'
        }
    }

    return (
        <div className={`${getStyle()} ${className}`}>
            <SkeletonComponent variant={variant}/>
        </div>
    )
}

const Home = ({Navbar=null}) => (
    <>
    {Navbar}
    <div className="grid h-40 mt-6 grid-cols-[repeat(3,minmax(230px,1fr))] gap-3">
        {
            [...Array(3)].map(()=><Skeleton height='100%'/>)
        }
    </div>
    <div className="mt-10 h-80 sm:h-40 grid grid-cols sm:grid-cols-2 gap-4 sm:gap-5 w-full">
        {
            [...Array(2)].map(()=><Skeleton height='100%' className='w-full grow'/>)
        }
    </div>
    <div className="grid grid-rows-3 mt-8 gap-4">
        {
            [...Array(3)].map(()=><Skeleton height='200px' className='w-full'/>)
        }
    </div>
    </>
)

const Navbar = () => <div className="flex items-center justify-end">
<Skeleton width={50} height={50} circle={true}/>
</div>

const Vector = () => (
    <div className="flex justify-center items-center flex-col w-full h-full">
        <Skeleton width={200} height={200} circle={true} className='mb-7'/>
        <Skeleton width={300} height={10}/>
        <Skeleton width={250} height={10}/>
    </div>
)

const Table = () => (
    <div className='flex justify-center items-center h-screen flex-col'>
    <div className='py-5 border-b-slate-300 border-b-[1px] w-full grid grid-cols-[1fr_repeat(3,.5fr)] gap-5'>
        {
            [...Array(4)].map(()=><Skeleton width='100%' height={10}/>)
        }
    </div>
    {
        [...Array(5)].map(()=><div className='py-5 w-full grid grid-cols-[1fr_repeat(3,.5fr)] gap-5'>
        {
            [...Array(4)].map(()=><Skeleton width='100%'/>)
        }
        </div>)
    }
    </div>
)

const Notification = () => (
    <div className='flex justify-center items-center h-screen flex-col'>
    {
        [...Array(5)].map(()=><div className='py-5 w-full grid grid-cols-[max-content_1fr] gap-5 items-center'>
            <Skeleton width={80} className='aspect-square' circle={true}/>
            <div className="flex flex-col gap-2 w-full">
                <Skeleton width='100%'/>
                <Skeleton width='80%'/>
            </div>
        </div>)
    }
    </div>
)

export default SkeletonLoader