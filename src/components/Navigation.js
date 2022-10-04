import React, { useContext, useEffect, useState, useRef } from "react";
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppStack from "../AppStack/AppStack";
import AuthStack from "../AuthStack/AuthStack";
import { AuthContext } from "../Context/AuthContext";
import { AppState } from "react-native";


const Navigation = () => {
    const appState = useRef(AppState.currentState);
     const {userInfo , isLoggedIn, keepLoggedIn } = useContext(AuthContext);

    useEffect(()=>{
       console.log(appState);
    })
    return(
       
        <NavigationContainer>
            
            { keepLoggedIn == "yes" ? <AppStack /> : <AuthStack/>} 
        </NavigationContainer>
    )

}
export default Navigation;