import React from "react";
import {Button, View, Text, Image, StyleSheet, useWindowDimensions, Dimensions, TextInput } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown';
import * as c from '../../constant'

const AirportSelectList = (props) =>{
    const airports = c.LISTED_AIRPORTS;
    return(
        <SelectDropdown
                dropdownStyle = {{ borderRadius: 10}}
                dropdownIconPosition = "left"
                buttonStyle = {{ 
                    borderRadius: 15, 
                    height:40,
                    width:300, 
                    borderColor:'#000000',
                    borderStyle:"solid",
                    borderWidth:1,
                    top:props.rideType == 1? 5: 0
                }}
                defaultButtonText = { 'Choose Airport' }
                style = { styles.selectlist }
                data={airports}
                
                onSelect={(selectedItem, index) => {
                    props.childFunction(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                   return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                   return item
                }}/>
    );
}

const styles = StyleSheet.create({
    selectlist:{
        borderRadius:10,
        top:10,
        width:500,
        borderColor: '#000000',
        
      }
});

export default AirportSelectList;