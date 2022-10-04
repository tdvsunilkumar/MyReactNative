import React, { useEffect, useContext } from "react";
import { View, Text, Image } from "react-native";
import customSplashImage from '../../../assets/images/custom_splash_screen.png';
import { AuthContext } from "../../Context/AuthContext";

const CustomSplashScreen = ({navigation}) =>{
    const {userInfo , isLoggedIn, keepLoggedIn } = useContext(AuthContext);
    useEffect(()=>{
        alert('i am loading'+keepLoggedIn);
    });
    return(
        <View >
            
           <Image source={ customSplashImage } style={{ height:'100%', width:'100%'}}></Image>
        </View>
    );
}

export default CustomSplashScreen;