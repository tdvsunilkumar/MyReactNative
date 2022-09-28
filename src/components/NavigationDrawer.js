import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
const Drawer = createDrawerNavigator();

const NavigationDrwaer = () =>{
    return(
        <Drawer.Navigator>
             <Drawer.Screen
                name="Home"
                component={ HomeScreen}
                options={{ title:'Ride'}}>
                </Drawer.Screen>
        </Drawer.Navigator>
    );
}

export default NavigationDrwaer;