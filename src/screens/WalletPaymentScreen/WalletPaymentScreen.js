import React, { useEffect, useState } from "react";
import Payment from "../Payment";

const WalletPaymentScreen = (props) =>{

    const [amount, setamount] = useState(0);

    useEffect(()=>{
       
    },[]);

    const goBackToPreviousScreen = (txt) =>{
        props.navigation.navigate({
            name: 'Wallet',
            params: { paymentAdded: true },
            merge: true,
          });
        
    }

    return(
        <Payment 
        amount={ props.route.params.amount } 
        customNavigation = { props.navigation }
        goBackToPreviousScreen = { goBackToPreviousScreen }/>
       );
}

export default WalletPaymentScreen;