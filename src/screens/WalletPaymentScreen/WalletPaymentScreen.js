import React, { useEffect, useState } from "react";
import Payment from "../Payment";

const WalletPaymentScreen = (props) =>{

    const [amount, setamount] = useState(0);

       
       return(
        <Payment amount={ props.route.params.amount }/>
       );
}

export default WalletPaymentScreen;