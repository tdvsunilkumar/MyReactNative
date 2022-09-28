import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import UpcomingTrips from "../UpcomingTrips/UpcomingTrips";
import PastTrips from "../PastTrips/PastTrips";

const Tab = createMaterialTopTabNavigator();


const YourTrips = ({navigation}) =>{
    return (
        <Tab.Navigator 
        
        tabBarOptions={{
        
        activeTintColor:'#000000',
        tabStyle:{
            backgroundColor:'yellow'
        }
       }}
        >
      <Tab.Screen 
            name="UpcomingTrips" 
            component={ UpcomingTrips } 
            options={{ title:'Upcoming Trips'}}
            ></Tab.Screen>
            <Tab.Screen name="PastTrips" component={ PastTrips }>
                </Tab.Screen>  
        </Tab.Navigator>
        
    )
}

export default YourTrips;