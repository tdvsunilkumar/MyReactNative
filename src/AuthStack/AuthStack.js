import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import SignInScreen from '../screens/SignInScreen';
import { useContext, useEffect } from 'react';
import CustomSplashScreen from '../screens/SplashScreen/CustomSplashScreen';
import { AuthContext } from "../Context/AuthContext";
const Stack = createNativeStackNavigator();

const AuthStack = (props) =>{

    const {userInfo , isLoggedIn, keepLoggedIn } = useContext(AuthContext);  
    
    // useEffect(()=>{
    //     console.log('i am',props);
    // })

    return(
        <Stack.Navigator initialRouteName = "SplashScreen" >
            { keepLoggedIn == "yes" ?  <Stack.Screen 
           name="SplashScreen" 
           component={ CustomSplashScreen }
           options={{ headerShown:false}}></Stack.Screen>: <Stack.Screen
           name="Login"
           component={ SignInScreen}
           options={{ title:'Login', headerShown: false}}>
           </Stack.Screen>}
          
           
                <Stack.Screen
                name="Register"
                component={ RegisterScreen}
                options={{ title:'Register', headerShown: true}}>
                </Stack.Screen>        
                </Stack.Navigator>
    );
}

export default AuthStack;