
const Currency_Formatter =new Intl.NumberFormat(
    undefined , {
        currency:"USD", 
        style:"currency"
    }
)
const formatCurrency =(number)=>{

    return Currency_Formatter.format(number)
}
export default formatCurrency;