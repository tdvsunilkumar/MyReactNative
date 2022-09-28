import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppStack from "../AppStack/AppStack";
import AuthStack from "../AuthStack/AuthStack";
import { AuthContext } from "../Context/AuthContext";


const Navigation = () => {
    
     const {userInfo , isLoggedIn, keepLoggedIn } = useContext(AuthContext);
     

    const retreiveData = async() =>{
        try{
            const data = await AsyncStorage.getItem('loggedInStatus');
            if(data == 'yes'){
                setkeepLoggedIn('yes');
            }
            //console.log(data);
        }catch(e){

        }
    }

    useEffect(() => {
        //alert();
        //retreiveData();
   })
    return(
       
        <NavigationContainer>
            
            { keepLoggedIn == "yes" ? <AppStack /> : <AuthStack/>} 
        </NavigationContainer>
    )

}
export default Navigation;