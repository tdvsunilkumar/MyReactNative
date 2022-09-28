import React, { useEffect, useRef } from "react";
import {Button, View, Text, Image, StyleSheet, useWindowDimensions, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown';
import * as c from '../../constant';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const SelectLocation = (props) =>{
    
    return(
    <GooglePlacesAutocomplete
            textInputProps={{
                placeholderTextColor: '#000000',
                textAlign:"center",
            }}
            fetchDetails = {true}
            onPress={ (data, details) => {
                props.childFunction(data,details)
            }}
            
            placeholder='Search Location'
            minLength={3}
            autoFocus={true}
            keyboardShouldPersistTaps = "handled"
             query={{
                key: c.GOOGLE_PLACE_API,
                language: 'en',
                components: 'country:in'
             }}
             nearbyPlacesAPI= 'GooglePlacesSearch'
             styles={ {textInputContainer:{
                backgroundColor: 'rgba(0,0,0,0)',
                borderTopWidth: 0,
                borderBottomWidth:0,
               
                width:'100%',
                
            },
            container:{
                flex:0
            },
            textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: 40,
                color: '#000000',
                fontSize: 16,
                borderWidth:1,
                zIndex:999,
                borderRadius:15,
                color:'#000000',
                top:props.rideType == 0? 10: 0,
              },
              predefinedPlacesDescription: {
                color: '#1faadb'
              },
              listView:{
                   top:50,
                   zIndex:999999,
                   position: 'absolute',
                   color: 'black',
                   backgroundColor:"white",
                   width:'100%',
                   borderRadius:10
              }} } 
            />

    
        
    );
}

const styles = StyleSheet.create({
    input:{
        borderRadius:10,
        margin: 15,
        height: 10,
        borderColor: '#000000',
        borderWidth: 1,
        width: 210,
        backgroundColor:'#ffffff'
       }
});
const styless = StyleSheet.create({
    
    
    });

export default SelectLocation;