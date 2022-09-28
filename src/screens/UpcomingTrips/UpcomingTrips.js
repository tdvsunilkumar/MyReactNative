import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Spinner from "react-native-loading-spinner-overlay";
import Icon from "react-native-vector-icons/FontAwesome5";
import { AuthContext } from "../../Context/AuthContext";
import * as c from '../../constant';
import axios from "axios";
import Moment from 'react-moment';
import moment from 'moment';
const UpcomingTrips = ({navigation}) =>{

    const [upcomingTrips, setupcomingTrips] = useState({});

    const[isLoading, setisLoading]  = useState(false);

    const { userinfo, showToast, logout } = useContext(AuthContext);
    
    const [authToken, setauthToken] = useState('');

    const getUpcomingTrips = () =>{
        try{
            var config = {
                method: 'get',
                url: c.UPCOMING_TRIPS,
                headers: { 
                  'Accept': 'application/json', 
                  'Authorization':'Bearer '+userinfo.data.access_token
                }
              };
             axios(config)
            .then(response => {
                setisLoading(false);
                let trips = response.data;
                if(trips.success == true){
                    //console.log(trips);
                    setupcomingTrips(trips.data.user_request);
                    console.log('access token', userinfo.data.access_token);
                    console.log('Upcoming trips',upcomingTrips);
                }else{
                    showToast(fair.message,'error');
                }
            }).catch((err) => {
                if(err.request.status == 401){
                    logout();
                }
            });
        }catch(e){
            setisLoading(false);
            alert(e);
        }
     
    }

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            setisLoading(true);
            getUpcomingTrips();
          });
          return () => {
            unsubscribe();
          };
        
  return () => clearTimeout(timer);
        

    },[navigation]);


    return (
        <ScrollView>
            <Spinner visible={isLoading}></Spinner>
            { upcomingTrips.length > 0 ?
            <View style={{ padding:20}}> 
            { upcomingTrips.map((item) =>{
                return (
                    <TouchableOpacity key={item.id} style={ [styles.card, styles.shadowProp, { marginTop:10}]}>

                    <View style={{flexDirection:'row',}}>
                    <View style={{ flex:1, flexDirection:"row"}}>
                        <Text>{ item.service_type.name}</Text>
                        <Text style={{ left:10}}>{ moment(item.schedule_at).format("DD-MM-YYYY hh:mm A")}</Text>
                    </View>
                    <View>
                        <Text>${ item.estimated_fare}</Text>
                    </View>
                    </View>

                    <View style={{flexDirection:'row',}}>
                    <View style={{ flex:1, flexDirection:"row"}}>
                        <Text>Booking ID</Text>
                        <Text style={{ left:10}}>{ item.booking_id}</Text>
                    </View>
                    <View>
                        <Text>{item.payment_mode}</Text>
                    </View>
                    </View>

                    <View style={{ top:20}}>
                    <View style={{flexDirection:'row'}}>
                    <View style={{ flexBasis:40}}>
                        <Icon name="map-pin" color={'green'} size={20}/>
                    </View>
                    <View>
                        <Text>{item.s_address}</Text>
                    </View>
                    </View>

                    <View style={{flexDirection:'row',top:20}}>
                    <View style={{ flexBasis:40}}>
                        <Icon name="map-marker-alt" color={'red'} size={20}/>
                    </View>
                    <View>
                        <Text>{item.d_address}</Text>
                       
                    </View>
                    </View>
                    </View>
                    
                </TouchableOpacity> 
                );
            })}
             
                
                
            </View>
            :
                <View style={{ flex:1, justifyContent:"center", alignItems:"center"}}><Text>No Upcoming Trip Found</Text></View>
                  } 
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    heading: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 13,
    },
    card: {
        
      padding:10,
      backgroundColor: 'white',
      borderRadius: 8,
      width: '100%',
      height:150
    },
    shadowProp: {
      shadowColor: '#000000',
      shadowOffset: {width: 5, height: 4},
      shadowOpacity: 0.5,
      shadowRadius: 3,
      elevation:2
    },
  });

export default UpcomingTrips;