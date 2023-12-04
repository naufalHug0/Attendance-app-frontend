class Time {
    static calculateDateDifference (start,end) {
        let date_1 = new Date(end)
        let date_2 = new Date(start)
        let difference = date_1.getTime() - date_2.getTime()
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24))
        return TotalDays
    }

    static convertTimestampToLocal (timestamp) {
        let date = new Date(timestamp).toLocaleDateString().split('/')
    
        const time = new Date(timestamp).toLocaleTimeString()
        const clock = time.split(' ')
    
        date = `${new Date(timestamp).toLocaleString('default', { month: 'long' }).substring(0,3)} ${date[1]}, ${date[2]}`

        return `${date} at ${clock[0].split(':')[0]}:${clock[0].split(':')[1]} ${clock[1]}`
    }

    static formatWorkingHours (time) { 
        return `${parseInt(time.split(':')[0])===0?'':parseInt(time.split(':')[0]) + ' jam '}${parseInt(time.split(':')[1])===0&&parseInt(time.split(':')[0])>0?'':parseInt(time.split(':')[1])+' menit'}.`
    }

    static getDateFromTimestamp (date) {
        return date.split(' ')[0]
    }

    static getTimeFromTimestamp (timestamp) {
        return ((new Date(timestamp).getTime())>0)?timestamp.split(' ')[1].substring(0,5):timestamp
    }

    static getTodayDate () {
        const date = new Date().toDateString();
        return `${date.split(' ')[0]}, ${date.substring(4)}`
    }

    static isToday (date) {
        const inputDate = new Date(date);
        const todaysDate = new Date();
    
        return (inputDate.setHours(0,0,0,0) === todaysDate.setHours(0,0,0,0)) 
    }
    
    static isDateBeforeOrEqualToday (date) {
        const today = new Date(new Date().toDateString())
        const givenDate = new Date(date)
        return givenDate < today || isToday(givenDate)
    }

    static getYearMonthNow () {
        return new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2)
    }
}

export default Time