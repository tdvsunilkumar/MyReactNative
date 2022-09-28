import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import SignInScreen from '../screens/SignInScreen';
const Stack = createNativeStackNavigator();
const AuthStack = () =>{
    return(
        <Stack.Navigator>
        <Stack.Screen
                name="Login"
                component={ SignInScreen}
                options={{ title:'Login', headerShown: false}}>
                </Stack.Screen>
                <Stack.Screen
                name="Register"
                component={ RegisterScreen}
                options={{ title:'Register', headerShown: true}}>
                </Stack.Screen>        
                </Stack.Navigator>
    );
}

export default AuthStack;