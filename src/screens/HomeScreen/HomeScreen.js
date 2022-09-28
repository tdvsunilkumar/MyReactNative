import react, { createRef, useContext, useEffect, useState, useRef } from 'react'
import {Button, View, Text, Image, StyleSheet, useWindowDimensions, Dimensions, TextInput, ScrollView } from 'react-native'
import { Pressable, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../Context/AuthContext';
import * as c from '../../constant';
import MapView from 'react-native-maps';
import AirportSelectList from '../../components/AirportSelectList/AirportSelectList';
import SelectLocation from '../../components/SelectLocation/SelectLocation';
import Geolocation from 'react-native-geolocation-service'
import { Permission, PERMISSION_TYPE } from '../../AppPermission';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import MapViewDirections from 'react-native-maps-directions';
import { Marker } from 'react-native-maps';
import React from 'react';
import  Modal  from 'react-native-modal';
import { Platform } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import Moment from 'react-moment';
import moment from 'moment';


const HomeScreen = ( {navigation} ) =>{
    const { logout, showToast, userinfo } = useContext(AuthContext);

    const  airports  = ['Chandigarh Airport', 'Amritsar Airport', 'Delhi Airport'];

    const origin = {latitude: 37.3318456, longitude: -122.0296002};
    
    const destination = {latitude: 37.771707, longitude: -122.4053769};

    const [ rideType, setrideType ] = useState(0);

    const [ rideSourceLoc , setrideSourceLoc] = useState('');

    const [ rideDestinationLoc , setrideDestinationLoc] = useState('');

    const [rideSourceLatLong, setrideSourceLatLong] = useState({});

    const [rideDestinationLatLong, setrideDestinationLatLong] = useState({});

    const [authToken, setauthToken] = useState('');

    const [isLoading, setisLoading] = useState(false);

    const [serviceType, setserviceType] = useState({});

    const[driverservices, setdriverservices] = useState([{}]);

    const [useDirection, setuseDirection] = useState(false);

    const {width, height} = Dimensions.get('window');

    const deviceWidth = Dimensions.get("window").width;

    const [estimatedFareData, setestimatedFareData] = useState({});

    const [estimateFareFormData, setestimateFareFormData] = useState({});

    const manualServices = [{value:1,text:'i am text'}];

    const mapref  = useRef();

    const deviceHeight =
        Platform.OS === "ios"
         ? Dimensions.get("window").height
          : require("react-native-extra-dimensions-android").get(
             "REAL_WINDOW_HEIGHT"
         );

    const [position, setposition] = useState({
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
      });
    
      const [isModalVisible, setModalVisible] = useState(false);

      const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };

      const retreiveData = async() =>{
        try{
            const data = await AsyncStorage.getItem('userInfo');
            const newData = JSON.parse(data);
            console.log('async saved data',newData);
            if(newData.success == true){
                setauthToken(newData.data.access_token);
            }
        }catch(e){

        }
    }  

    const selectRideType = (value, color) =>{
        setrideType(value);
        setRideTypeView();
    }

    const getCurrentLocation = () =>{
      
            Geolocation.getCurrentPosition(
                (position) => {
                    setposition({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    })
                },
                (error) => {
                  // See error code charts below.
                  console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
            
          
    }

    const getServiceList = (serviceId = null) =>{
        let options = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '
    };
    try{
        setisLoading(true);
        axios.get(c.SERVECE_LIST,{},options)
        .then(response => {
            setisLoading(false);
            let services = response.data;
            //alert();
            if(services.success == true){
                //console.log('i am services',services.data.service_list);
                setserviceType(services.data.service_list[0]);
                setdriverservices(services.data.service_list);
            console.log('i am state services ',driverservices);

            }else{
                showToast(services.message,'error');

            }
        });
    }catch(e){
        console.log(e);
    }


    }

    const slectAirport = (data) => {
        if(rideType == 0){
            setrideSourceLoc(data);
            setrideSourceLatLong({
                s_latitude:c.AIRPORT_LAT_LONG[data].lat,
                s_longitude:c.AIRPORT_LAT_LONG[data].lng
            });
        }else{
            setrideDestinationLoc(data);
            setrideDestinationLatLong({
                s_latitude:c.AIRPORT_LAT_LONG[data].lat,
                s_longitude:c.AIRPORT_LAT_LONG[data].lng
            });
        }

    }

    useEffect(() => {
        //navigation.navigate("Root");
        getServiceList();
        retreiveData();
         let res = Permission.checkPermission(PERMISSION_TYPE.location).then((res) => {
            
            if(res == 1){
               
                getCurrentLocation();
            }
         });
    },[])

    const selectLocation = (data, details) =>{
        setuseDirection(false);
        if(rideType == 0){
            setrideDestinationLatLong({
                s_latitude:details.geometry.location.lat,
                s_longitude:details.geometry.location.lng
            });
            setrideDestinationLoc(data.description);
        }else{
            setrideSourceLoc(data.description);
            setrideSourceLatLong({
                s_latitude:details.geometry.location.lat,
                s_longitude:details.geometry.location.lng
            });
        }
        

    }

    const objToQueryString = (obj)=>{
        const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValuePairs.join('&');

    }

    const callToEstimatedFareAPI = () =>{
        let todayDate = moment().format("Y-MM-DD");
        let data = {
            s_latitude:rideSourceLatLong.s_latitude,
            s_longitude:rideSourceLatLong.s_longitude,
            service_type:serviceType.id,
            service_required:c.DEFAULT_SERVICE_TYPE,
            d_latitude:rideDestinationLatLong.s_latitude,
            d_longitude:rideDestinationLatLong.s_longitude,
            leave:todayDate,
            return:todayDate,
            d_address:rideDestinationLoc,
            s_address:rideSourceLoc,
        };
        setestimateFareFormData(data);
        let newData = objToQueryString(data);
    try{
        var config = {
            method: 'get',
            url: c.ESTIMATED_FARE+'?'+newData,
            headers: { 
              'Accept': 'application/json', 
              'Authorization':'Bearer '+userinfo.data.access_token
            }
          };
         axios(config)
        .then(response => {
            setisLoading(false);
            let fair = response.data;
            if(fair.success == true){
                setestimatedFareData(fair.data);
                let dataToAppend = {
                    'estimated_fare':fair.data.estimated_fare,
                    'distance':fair.data.distance

                };
                setestimateFareFormData(estimateFareFormData=>({
                    ...estimateFareFormData,
                    ...dataToAppend
                }));
                setModalVisible(true);
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
        alert();
    }
    }

    const getEstimatedFare =() =>{
       
        setisLoading(true);
        if(rideSourceLoc == ''){
            showToast('Ride source is required','error');
            setisLoading(false);
        }else if(rideDestinationLoc == ''){
            showToast('Ride destination is required','error');
            setisLoading(false);
        }else{
            setisLoading(true);
            setuseDirection(true);
            callToEstimatedFareAPI();
            
        }

    }

    const setRideTypeView = () => {
        if (rideType == 0){
             return fromAirportToLocation();
        }else{
            return fromLocationToLocation();
        }

    }

    const fromAirportToLocation = () => {
        return(
            <View style = { styles.source}>
                <AirportSelectList rideType = {rideType} childFunction = { slectAirport }/>
                <SelectLocation rideType = {rideType} childFunction = { selectLocation } />
                </View>
        );
    }

    const fromLocationToLocation = () => {
        return(
            <View style = { styles.source}>
                <SelectLocation rideType = {rideType} childFunction = { selectLocation } />
                <AirportSelectList  rideType = {rideType} childFunction = { slectAirport }/>
                </View>

        );
    }

    const callToScheduleRide = () =>{
        /* Switch to schedule form screen */
        setModalVisible(false);
        //console.log(estimateFareFormData);
        navigation.navigate('ScheduleRide', { 
            data:estimateFareFormData
         });
        /* Switch to schedule form screen */
    }

    


    return(
        
    <View style={styles.container}>
        
        <Spinner visible={ isLoading }></Spinner>
             <MapView style={styles.map} 
             mapType = 'standard'
             ref={mapref}
               followsUserLocation = {true}
               region={ position }
                >
                     { useDirection == true ?
                    <Marker coordinate={{
                        latitude:rideSourceLatLong.s_latitude,
                        longitude:rideSourceLatLong.s_longitude
                    }} />:'' }
                    { useDirection == true ?
                    <Marker coordinate={{
                        latitude:rideDestinationLatLong.s_latitude,
                        longitude:rideDestinationLatLong.s_longitude
                    }} />:'' }
                 { useDirection == true ?
                 
                <MapViewDirections
                    // resetOnChange = {true}
                    strokeWidth={5}
                    strokeColor="red"
                    optimizeWaypoints={true}
                    origin={{
                        latitude:rideSourceLatLong.s_latitude,
                        longitude:rideSourceLatLong.s_longitude
                    }}
                    destination={{
                        latitude:rideDestinationLatLong.s_latitude,
                        longitude:rideDestinationLatLong.s_longitude
                    }}
                    onReady = {result =>{
                        console.log(result.coordinates);
                        if(result.coordinates != null){
                            mapref.current.fitToCoordinates(result.coordinates, {
                                edgePadding: {
                                  right: (width / 20),
                                  bottom: (height / 20),
                                  left: (width / 20),
                                  top: (height / 20),
                                }
                              });
                        }
                    }}
                    onError = { error => {
                        //console.log(error);
                    }}
                    apikey={ c.GOOGLE_PLACE_API }
  ></MapViewDirections>:''} 
             </MapView>
             
            <View style={ [styles.buttoncontainer,{width:'100%'}]}>
                <View style={ [styles.button, {alignItems:'flex-start'}] } key={'1'}>
                    {/* <Button color={ '#000000' }  onPress={ () =>selectRideType(0) } title='From Airport'/> */}
                    <Pressable 
                    key={ '4' }
                    onPress={ () =>selectRideType(0) }
                    style={{
                        backgroundColor:rideType == 0?'yellow':'#e1e1e1e1',
                        padding:7,
                        borderRadius:10,
                        width:150,
                        alignItems:'center',
                        left:25,

                    }}>
                        <Text style={{
                            color:'#000000'
                        }}>From Airport</Text>
                        </Pressable>
                    </View>
                <View style={ [styles.button, {alignItems:'flex-end'}] } key= { '2' }>
                    {/* <Button color={ '#000000' }  onPress={ () =>selectRideType(1) } title='To Airport'/> */}
                    <Pressable 
                    key={ '3' }
                    onPress={ () =>selectRideType(1) }
                    style={{
                        backgroundColor:rideType == 1?'yellow':'#e1e1e1e1',
                        padding:7,
                        borderRadius:10,
                        width:150,
                        alignItems:'center',
                        right:25


                    }}>
                        <Text style={{
                            color:'#000000'
                        }}>To Airport</Text>
                        </Pressable>
                    </View>
                </View>
                
                {setRideTypeView()}
                <View style = {styles.combuttonContainer}>
                    <Button onPress={() => getEstimatedFare() } color={ '#000000' }style={styles.combutton} title='Done' /> 
                    <Modal visible={ isModalVisible }
                    animationOut = 'bottom'
                    deviceWidth={ deviceWidth }
                    deviceHeight = { deviceHeight }
                    style = {{  alignItems:'center'}}
                    >
        <TouchableOpacity onPressOut={ () => {setModalVisible(false)} }>
        <View style={{ 
            width: (width),
            height: (height/2.5),
            top: (height/4),
            alignItems:'center',
            backgroundColor:'#ffffff',
            borderTopEndRadius:10
            }}>
           <View style = {styles.servicesContainer}>
        { driverservices.map((item) =>{
                    return(
                    <TouchableOpacity
                     key={ item } 
                     style = {{ alignItems: 'center'}}  
                     onPress = { () => {
                             setserviceType(item);
                             getEstimatedFare();
                     }}>
                     <Image source={{ uri:item.image}} style={
                         [styles.car,
                         {
                            borderColor:item.id == serviceType.id ? 'yellow' : '#000000'
                            }]
                             } />
                     <Text style={ {top:-30 }}>{ item.name}</Text>
                    </TouchableOpacity>
                    );
            })}
           </View>
           <View style = { styles.selectedservice}>
            <View style={ styles.selectedservicecol }><Text>Estimated Fare</Text></View>
            <View style={ styles.selectedservicecolimage }>
            <Image source={{ uri:serviceType.image}} style={ styles.selectedcar } />
               
            </View>
            <View style={ [styles.selectedservicecol,{right:-20}] }><Text>${estimatedFareData.estimated_fare}</Text></View>
           </View>
           
           <View style = {{
            top:15,
            flexDirection:'row',
            flexWrap: 'wrap',
            width:'100%'
            } }>
            <View style={ {
                flexBasis:'50%',
                top: 12,
                alignItems:'flex-start',
                
                
            } }>
                <Text style={{ left:20}}>Distance</Text></View>
            
            <View style={ {
                alignItems:'flex-end',
                flexBasis:'50%',
                top: 12,
              
            } }>
                <Text style={{ right:42,fontWeight:'800'}}>{estimatedFareData.distance}Km</Text>
                </View>
           </View>

           <View style = {{
            top:25,
            flexDirection:'row',
            flexWrap: 'wrap',
            width:'100%'
            } }>
            <View style={ {
                flexBasis:'50%',
                top: 12,
                alignItems:'flex-start',
                
                
            } }>
                <Text style={{ left:20}}>Time</Text></View>
            
            <View style={ {
                alignItems:'flex-end',
                flexBasis:'50%',
                top: 12,
              
            } }>
                <Text style={{ right:42,fontWeight:'800'}}>{estimatedFareData.time}</Text>
                </View>
           </View>

           <View style = {{
            top:35,
            flexDirection:'row',
            flexWrap: 'wrap',
            width:'100%'
            } }>
            <View style={ {
                flexBasis:'50%',
                top: 12,
                alignItems:'flex-start',
                
                
            } }>
                <Text style={{ left:20}}>Tax</Text></View>
            
            <View style={ {
                alignItems:'flex-end',
                flexBasis:'50%',
                top: 12,
              
            } }>
                <Text style={{ right:42,fontWeight:'800'}}>${estimatedFareData.tax_price}</Text>
                </View>
           </View>
           <View style= {{
                top:50,
              
            }}>
           <Pressable style={{
            backgroundColor:'#000000',
            padding:10,
            borderRadius:10,
            width:250,
            alignItems:'center'
           }}
           onPress={ () => {
            callToScheduleRide();
           }}>
            <Text style= {{
                color:'#ffffff'
            }}>Schedule Ride</Text>
            </Pressable>
            </View>
        </View>
        </TouchableOpacity>
      </Modal>
                    </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        position:'relative',
        alignItems : 'center'

    },
    selectedservice:{
        top:10,
        flexDirection:'row',
        height:50,
        backgroundColor:'#e1e1e1',
        width:'100%'
    },
    selectedservicecol:{
        marginHorizontal:20,
        top:12

    },
    selectedservicecolimage:{
        marginHorizontal:20,
       
        
    },
    buttoncontainer:{
        marginTop:10,
        position: 'absolute',
        flexDirection:'row',
        
    },
    servicesContainer:{
        flexDirection: 'row',
        textAlign:'center',
    },
    selectedcar:{
        top:-35,
        width:70,
        height:70,
        borderRadius:10,
        marginHorizontal:20,
        borderColor:'#000000',
        borderRadius: 400/2,
        backgroundColor:'#ffffff',
        borderStyle: 'solid black',
        borderWidth:1,
    },
    car:{
        top:-35,
        width:70,
        height:70,
        borderRadius:10,
        marginHorizontal:20,
        
        borderRadius: 400/2,
        backgroundColor:'#ffffff',
        borderStyle: 'solid black',
        borderWidth:1,
    },
    button:{
        flexBasis:'50%'
    },
    combuttonContainer:{
        position: 'absolute',
        top:510
    },
    source:{
         alignItems:'center',
         justifyContent: 'space-between',
         position:'absolute',
         top:50,
         flexDirection:'column'
    },
    combutton:{
        top:40,
        position: 'absolute',
        width:250,
        marginTop:200,
        
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }
});
    
    export default HomeScreen;