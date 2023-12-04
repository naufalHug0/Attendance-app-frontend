export default class Number {
    static formatNumberToReadable (num) { 
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
}