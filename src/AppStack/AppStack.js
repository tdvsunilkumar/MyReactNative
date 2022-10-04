import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SchedulerideScreen from '../screens/SchedulerideScreen/SchedulerideScreen';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import Payment from '../screens/Payment';
import YourTrips from '../screens/YourTrips';
import Wallet from '../screens/Wallet';
import Settings from '../screens/Settings';
import NoticeBoard from '../screens/NoticeBoard/NoticeBoard';
import { View, Image, Text } from 'react-native';
import usericon from '../../assets/images/user.png'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Pressable } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import WalletPaymentScreen from '../screens/WalletPaymentScreen/WalletPaymentScreen';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeScreenStackNative({navigation}){
    return(
        <Stack.Navigator>
        <Stack.Screen
        name="Home"
        component={ HomeScreen }
        options={{ 
            title:'Ride',
            headerStyle: {
                backgroundColor: "yellow",
              },
              headerTintColor: "black",
              headerTitleStyle: {
                color: "black",
              },
            headerRight: () => (
                <Icon
                  name={'bars'}
                  size={24}
                  style={{ marginLeft: 10 }}
                  onPress={() =>
                    navigation.toggleDrawer()
                  }
                />
              ) }}>

        </Stack.Screen>
        <Stack.Screen
        name="ScheduleRide"
        component={ SchedulerideScreen }
        options={{ title:'Send Request' }}>
        </Stack.Screen>
    </Stack.Navigator>
    )

}


function TripScreenStackNative({navigation}){
    
    return(
        <Stack.Navigator >
        <Stack.Screen
        name="Trips"
        component={ YourTrips  }
        options={({navigation}) => ({
          headerRight: () => (
            <Icon
              name={'bars'}
              size={24}
              style={{ marginLeft: 10 }}
              onPress={() =>
                navigation.toggleDrawer()
              }
            />
          ),
            headerTitle: 'Your Trips',
            headerTitleAlign: 'right',
            headerStyle: {
              backgroundColor: "yellow",
              justifyContent:'center'
            },
            headerTintColor: "black",
            headerTitleStyle: {
              color: "black",
            },
           
          }
          )}>
        </Stack.Screen>
       
    </Stack.Navigator>
    )

}

function WalletScreenStackNative({navigation}){
    
    return(
        <Stack.Navigator>
        <Stack.Screen
        name="Wallet"
        component={ Wallet  }
        options={({navigation}) => ({
          
          headerTitleAlign: 'center',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 100,
            backgroundColor: "#F9DD23",
          },
          headerTintColor: "black",
          headerTitleStyle: {
            color: "black",
          },
          headerRight: () => (
              <Icon
                name={'bars'}
                size={24}
                style={{ marginLeft: 10 }}
                onPress={() =>
                  navigation.toggleDrawer()
                }
              />
            ),
          })}>
        </Stack.Screen>
        <Stack.Screen
        name="WalletPayment"
        component={ WalletPaymentScreen }
        options={{ title:'Payemnt' }}>
        </Stack.Screen>
       
    </Stack.Navigator>
    )

}

function PaymentScreenStackNative({navigation}){
    
  return(
      <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
      name="Payment"
      component={ Payment  }
      options={({navigation}) => ({
        headerShadowVisible: false,
          headerTitle: 'Payment',
          headerTitleAlign: 'center',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 100,
            backgroundColor: "#F9DD23",
          },
          headerTintColor: "black",
          headerTitleStyle: {
            color: "black",
          },
          headerRight: () => (
              <Icon
                name={'bars'}
                size={24}
                style={{ marginLeft: 10 }}
                onPress={() =>
                  navigation.toggleDrawer()
                }
              />
            ),
        })}>
      </Stack.Screen>
     
  </Stack.Navigator>
  )

}

function CustomDrawerContaent(props){
    const { logout, userDynamicInfo } = useContext(AuthContext);
    return(
        <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop:0}} >
            <View style={{ backgroundColor:'yellow', alignItems:'center',flex:1, height:150, padding:30}}>
             <View style={{ flex:1,flexDirection:'row'}}>
                <View>
                <Image 
                source={ (userDynamicInfo.picture == null || userDynamicInfo.picture == "") ? usericon : { uri:userDynamicInfo.picture} } 
                style={{ 
                    width:80, 
                    height:80,  
                    borderRadius:40, 
                    borderWidth:1,
                    borderColor:'#000000'
                    }} />

                </View>
                <View style={{ padding:20}}>
                  <Text>{ userDynamicInfo.first_name+" "+userDynamicInfo.last_name }</Text><Text>{userDynamicInfo.mobile}</Text>
                </View>
             </View>
            </View>
            <DrawerItemList {...props} ></DrawerItemList>
            <View style={{ left:32, marginTop:10}}>
                
                    <View style={{ flexDirection:'row'}}>
                        <Icon name='power-off'  size={23}></Icon>
                        <Pressable onPress={ () => logout()  }>
                        <Text style={{ marginLeft:15}}>Logout</Text>
                        </Pressable>
                    </View>
                
            </View>
            
        </DrawerContentScrollView>
    )

}
const AppStack = () =>{
    return(
        <Drawer.Navigator initialRouteName='Home'  drawerContent={(props) => <CustomDrawerContaent {...props} />}>
            <Drawer.Screen
                name="Home"
                component={ HomeScreenStackNative }
                options={{
                    drawerIcon: ()=>(
                        <Icon name='home' size={23} style={{ left:15}} />
                    )
                }}
                />
            <Drawer.Screen
                name="Payment"
                component={ PaymentScreenStackNative }
                options={{ title:'Payment',drawerIcon: ()=>(
                    <Icon name='money-bill' size={23} style={{ left:15}} />
                )}}
                />
            <Drawer.Screen
                name="Trips"
                component={ TripScreenStackNative }
                options={{ title:'Trips',drawerIcon: ()=>(
                    <Icon name='taxi' size={23} style={{ left:15}} />
                )}}
                />    
             <Drawer.Screen
                name="Wallet"
                component={ WalletScreenStackNative }
                options={{ title:'Wallet',drawerIcon: ()=>(
                    <Icon name='wallet' size={23} style={{ left:15}} />
                )}}
                />  
             <Drawer.Screen
                name="Settings"
                component={ Settings }
                options={{ title:'Settings',drawerIcon: ()=>(
                    <Icon name='cog' size={23} style={{ left:15}} />
                )}}
                />    
                <Drawer.Screen
                name="NoticeBoard"
                component={ NoticeBoard }
                options={{ title:'Notice Board',drawerIcon: ()=>(
                    <Icon name='clipboard' size={23} style={{ left:15}} />
                )}}
                />      
                  
                </Drawer.Navigator>
    );
}

export  default AppStack;