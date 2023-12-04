import React, { useEffect, useState } from 'react'
import { CALENDAR_ICON } from '../../../assets'
import { AbsenPageTemplate } from '../../../components'
import { useSelector } from 'react-redux'
import { useFetch } from '../../../hooks'
import { AttendanceService } from '../../../services'
import { Time } from '../../../utils'

const Cuti = () => {
    return (
    <AbsenPageTemplate
        title='Cuti'
        icon={<CALENDAR_ICON size={90}/>}
        >
            <Content/>
        </AbsenPageTemplate>
    )
}

const Content = () => {
    const { total_cuti } = useSelector(state=>state.homeReducer.USER_DATA)
    const [selectedType, setSelectedType] = useState('nikah')
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [desc, setDesc] = useState('')
    const [pending,setPending] = useState(false)
    const [approved,setApproved] = useState(false)
    const [errors,setErrors] = useState({})
    const [totalCuti,setTotalCuti] = useState(total_cuti)

    useEffect(() => {
        if (selectedType === 'tahunan'&&endDate)
        {
            const diff = calculateDateDifference(startDate,endDate)
            if (diff<=0||diff>total_cuti)
            {
                setTotalCuti(0)
                setErrors({
                    end:[diff<=0?'Masukkan tanggal yang valid':'Jumlah hari melebihi total cuti tahunan']
                })
            } else {
                setErrors({})
                setTotalCuti(total_cuti-diff)
            }
        }
    }, [])

    const { loading } = useFetch(AttendanceService.getCuti({ id: sessionStorage.getItem('e_id') }), 
    res => {
        if (res.data.length > 0) {
            if (res.data[0].is_approved && Time.isDateBeforeOrEqualToday(res.data[0].end)) setApproved(true)
            else if (res.data[0].is_approved===null) setPending(true)
        }
    })

    const getEndDate = () => {
        let date = new Date(new Date(startDate).getTime() + (86400000*(selectedType === 'melahirkan'?90:1))).toDateString()

        const month = new Date(date).getMonth()+1

        date = date.split(' ').reverse().splice(0,3)

        return `${date[0]}-0${month}-${date[1]}`
    }

}

export default Cuti