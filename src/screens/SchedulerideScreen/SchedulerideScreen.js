import react, { createRef, useContext, useEffect, useState, useRef } from 'react'
import {Button, View, Text, Image, StyleSheet, useWindowDimensions, Dimensions, TextInput, ScrollView } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown';
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
import { Polyline } from 'react-native-maps';
import React from 'react';
import  Modal  from 'react-native-modal';
import { Platform } from 'react-native';
import call from '../../../assets/images/fb-contact-icon.png'
import Spinner from 'react-native-loading-spinner-overlay/lib';
import reducer from 'react-native-basic-form/core/reducer';
import Moment from 'react-moment';
import moment from 'moment';
import { ToastAndroid } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker, {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';

const SchedulerideScreen = (props) =>{

    const { logout, showToast, userinfo } = useContext(AuthContext);
    
    const [date, setDate] = useState('09-10-2021');

    const phoneInput = useRef();

    const [specialAssistance, setspecialAssistance] = useState(false);
    
    const calenderIcon = <Icon name="calendar"  size={30} color="#900" style={{ top:17, left:140}} />;

    const clockIcon    = <Icon name="clock-o" onPress={ () =>{} } size={30} color="#900" style={{ top:17, left:140}} />;

    const [homeScreenData, sethomeScreenData] = useState({'payment_mode':c.DEFAULT_PAYMENT_MODE});

    const [showCalender, setshowCalender] = useState(false);

    const [showClock, setshowClock] = useState(false);

    const [isEmergency, setisEmergency] = useState(false);

    const minimumdate = isEmergency?new Date():new Date(new Date().getTime() + 72 * 60 * 60 * 1000);

    const [scheduledAtDate, setscheduledAtDate] = useState();

    const [scheduledAtTime, setscheduledAtTime] = useState();

    const [bookingFor, setbookingFor] = useState();

    const [authToken, setauthToken] = useState('');

    const [isLoading, setisLoading] = useState(false);

    const retreiveData = async() =>{
        try{
            const data = await AsyncStorage.getItem('userInfo');
            const newData = JSON.parse(data);
            if(newData.success == true){
                setauthToken(newData.data.access_token);
            }
        }catch(e){

        }
    } 

    useEffect(() =>{
        retreiveData();
        let dataToUpdate = props.route.params.data;
        sethomeScreenData(homeScreenData=>({
            ...homeScreenData,
            ...dataToUpdate
        }));
    },[]);

    const getDate = (event, selectedDate) => {
        let date = moment(selectedDate).format("YYYY-MM-DD");
        setscheduledAtDate(date);
        setshowCalender(false);
        let updatedValue = {"schedule_date":date};
                sethomeScreenData(homeScreenData => ({
                      ...homeScreenData,
                      ...updatedValue
                    }));
                   // console.log(homeScreenData);
        
      };
      const getTime = (event, selectedTime) => {
        let time = moment(selectedTime).format("H:mm");
        //alert(time);
        setscheduledAtTime(time);
        setshowClock(false);
        let updatedValue = {"schedule_time":time};
                sethomeScreenData(homeScreenData => ({
                      ...homeScreenData,
                      ...updatedValue
                    }));
                   // console.log(homeScreenData);
        
      };  

      const handleBookingFor = (text) =>{
        let updatedValue = {"booking_for":text};
        sethomeScreenData(homeScreenData => ({
              ...homeScreenData,
              ...updatedValue
            }));
      }

      const handlenoOfPass = (text) =>{
        let updatedValue = {"nofpassengers":text};
        sethomeScreenData(homeScreenData => ({
              ...homeScreenData,
              ...updatedValue
            }));
      }

      const sendRequestForScheduleRide = ()=>{
        //alert(scheduledAtDate);
        if(scheduledAtDate === undefined){
            showToast('Schedule date is required','error');
        }else if(scheduledAtTime === undefined){
            showToast('Schedule time is required','error');
        }else{
            setisLoading(true);
        try{
            var config = {
                method: 'post',
                url: c.SEND_REQUEST,
                data:homeScreenData,
                headers: { 
                  'Accept': 'application/json', 
                  'Authorization':'Bearer '+authToken
                }
              };
             axios(config)
            .then(response => {
                setisLoading(false);
                let rquestresponse = response.data;
                console.log(rquestresponse);
                if(rquestresponse.success == true){
                    props.navigation.navigate('Home', { 
                        //data:estimateFareFormData
                     });
                    showToast(rquestresponse.message,'success');
                }else{
                    showToast(rquestresponse.message,'error');
                }
            }).catch((err) => {
                setisLoading(false);
                console.log(err.request);
                if(err.request.status == 401){
                    logout();
                }
            });
        }catch(e){
            setisLoading(false);
            alert();
        }

        }
        
      }

    return(
        <ScrollView>
            <View style={ styles.container}>
            <Spinner visible={ isLoading }></Spinner>
            <View style = {styles.formgroup}>
            <View >
                <Text style={ styles.label }>Booking For</Text>
                <TextInput 
                onChangeText={(e)=>handleBookingFor(e)}
        style={ styles.input}
        underlineColorAndroid = "transparent"
        placeholderTextColor = "#9a73ef"
        autoCapitalize = "none"></TextInput>
            </View>

            <View style = {{marginTop:20}}>
                <Text style={ [styles.label] }>No. Of Passengers</Text>
                <TextInput 
                onChangeText={(e)=>handlenoOfPass(e)}
        style={ styles.input}
        underlineColorAndroid = "transparent"
        placeholderTextColor = "#9a73ef"
        autoCapitalize = "none"></TextInput>
            </View>

            <View style = {{marginTop:20}}>
                <Text style={ [styles.label] }>Phone Number</Text>
                <PhoneInput
                style = {styles.input}
                containerStyle = {{
                    borderRadius:10, 
                    height:50, 
                    width:350, 
                    borderWidth:1, 
                    borderColor:'#000000',
                    marginTop:10
                    }}
            ref={ phoneInput }
            defaultCode="IN"
            layout="first"
            onChangeText={(text) => {
                let updatedValue = {"mobile_no":text};
                sethomeScreenData(homeScreenData => ({
                      ...homeScreenData,
                      ...updatedValue
                    }));
                    //console.log(homeScreenData);
            }}
            onChangeFormattedText={(text) => {
              //setFormattedValue(text);
            }}
          />
            </View>

            <View style = {{marginTop:20,flexDirection:'row', justifyContent:'space-between' }}>
           
                <View style={{}}>
                    <Text style={ [styles.label] }>Date</Text>
                    <View style={{ flexDirection:'row',right:25}}>
                        {calenderIcon}
                    <TextInput 
                    value= {scheduledAtDate}
                    onFocus={()=>{setshowCalender(true)}}
        style={ styles.rowinput}
        underlineColorAndroid = "transparent"
        placeholderTextColor = "#9a73ef"
        autoCapitalize = "none"></TextInput>
        { showCalender ? <DateTimePicker 
        value={new Date(new Date().getTime() + 72 * 60 * 60 * 1000)} 
        minimumDate={minimumdate}
        mode={ 'date'} 
        onChange={ getDate}></DateTimePicker>:'' }
        
                    </View>
                </View>
                <View style={{}}>
                    
                    <Text style={ [styles.label] }>Time</Text>
                    <View style={{ flexDirection:'row',right:25}}>
                        {clockIcon}
                    <TextInput 
                    value={scheduledAtTime}
                    onFocus={()=>{setshowClock(true)}}
        style={ styles.rowinput}
        underlineColorAndroid = "transparent"
        placeholderTextColor = "#9a73ef"
        autoCapitalize = "none"></TextInput>
        { showClock ? <DateTimePicker 
        value={new Date()} 
        mode={ 'time'} 
        onChange={ getTime}></DateTimePicker>:'' }
                    </View>
                </View>
               
            </View>
            <View style = {{marginTop:30}}>
            <View style={{ flexDirection:'row'}}>
            <CheckBox
          value={isEmergency}
          onValueChange={(e)=>{
            setisEmergency(e);
            let updatedValue = {"emergency_ride":e};
            sethomeScreenData(homeScreenData => ({
                  ...homeScreenData,
                  ...updatedValue
                }));
                //console.log(homeScreenData);
          }}
          style={styles.checkbox}
        />
                <Text style={ [styles.label] }>Emergency Ride</Text>
            </View>
            </View>

            <View style = {{marginTop:30}}>
                <Text style={ [styles.label] }>Flight No.</Text>
                <TextInput 
                onChangeText={(e)=>{
                    let updatedValue = {"flight_no":e};
                sethomeScreenData(homeScreenData => ({
                      ...homeScreenData,
                      ...updatedValue
                    }));
                    //console.log(homeScreenData);
                }}
        style={ styles.input}
        underlineColorAndroid = "transparent"
        placeholderTextColor = "#9a73ef"
        autoCapitalize = "none"></TextInput>
            </View>

            <View style = {{marginTop:30}}>
                <Text style={ [styles.label] }>Remarks</Text>
                <TextInput 
                onChangeText={(e)=>{
                    let updatedValue = {"comment":e};
                sethomeScreenData(homeScreenData => ({
                      ...homeScreenData,
                      ...updatedValue
                    }));
                    //console.log(homeScreenData);
                }}
                multiline={true}
                numberOfLines={6}
        style={ styles.textarea}
        underlineColorAndroid = "transparent"
        placeholderTextColor = "#9a73ef"
        autoCapitalize = "none"></TextInput>
            </View>

            <View style = {{marginTop:30}}>
            <View style={{ flexDirection:'row'}}>
            <CheckBox
          value={specialAssistance}
          onValueChange={(e)=>{
            setspecialAssistance(e);
            let updatedValue = {"is_require_special_assistance":e};
            sethomeScreenData(homeScreenData => ({
                  ...homeScreenData,
                  ...updatedValue
                }));
                //console.log(homeScreenData);
          }}
          style={styles.checkbox}
        />
                <Text style={ [styles.label] }>Require special assistance</Text>
            </View>
            </View>

            <View style = {{marginTop:30}}>
            <View style={{ flexDirection:'row'}}>
            <CheckBox
            tintColor={{true:'yellow',false:'yellow'}}
          value={true}
          style={styles.checkbox}
        />
                <Text style={ [styles.label] }>I have read and agreed the terms and conditions</Text>
            </View>
            </View>

            <View style={{ alignItems:'center',marginTop:30,marginBottom:30}}>
                <Pressable style={{ 
                    backgroundColor:'#000000',
                    width:350,
                    height:45,
                    borderRadius:10,
                    alignItems:'center',
                    padding:8,
                    
                    }}
                    onPress={()=>sendRequestForScheduleRide()}>
                    <Text style={{color:'#ffffff',fontSize:20}}>Done</Text>
                    </Pressable>
                    </View>

            </View>
           
        </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container:{
        alignItems:'center'

    },
    formgroup:{
        marginTop:30
    },
    bookingfor:{
        top:10,
    },
    label:{
       fontSize:20
    },
    input:{
        top:10,
        borderRadius:10,
        width:350,
        height:50,
        borderWidth:1,
        borderColor:'#000000'
    },textarea:{
        top:10,
        borderRadius:10,
        width:350,
       
        borderWidth:1,
        borderColor:'#000000'
    },
    rowinput:{
        top:10,
        borderRadius:10,
        width:150,
        height:50,
        borderWidth:1,
        borderColor:'#000000'
    },
    checkbox:{
        color:'yellow'

    }
});

export default SchedulerideScreen;