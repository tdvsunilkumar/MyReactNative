import react, {Component, useContext, useState} from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity, TextInput, ToastAndroid} from 'react-native'
import * as c from '../../constant';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import Toast  from 'react-native-toast-message';
import  Icon  from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay/lib';
const LoginForm = (props) => {
    const val = useContext(AuthContext);
    const { isLoading, login, showToast, setisLoading} = useContext(AuthContext);
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const getUsername = (text) => {
        setusername(text);

    }
    

    const getPassword = (text) => {
        setpassword(text);
    }

    const performLoginAction = (username, passw) => {
        setisLoading(true);
                if( username == ''){
                    showToast('Mobile/Email is required field','error');
                    setisLoading(false);
                }else if(passw == ''){
                    showToast('Password is required field','error');
                }else{
                    
                    login(username, passw);
                }
        
            }

    
    return (
        
        <View style= {styles.container}>
            <Spinner visible={ isLoading}></Spinner>
            { props.label == 'call'?
            <View style={{ flexDirection:'row'}}>
                <Icon style={{ left:20, top:25,position:'absolute'}} name="ios-phone-portrait-outline" size={20} />
        <TextInput 
        onChangeText = { (e) => getUsername(e) }
        keyboardType='number-pad'
        placeholder='Mobile Number'
        style={ styles.input}
        textAlign='center'
        underlineColorAndroid = "transparent"
        placeholderTextColor = "#939393"
        autoCapitalize = "none"></TextInput>
            </View>
        : <View>
            <Icon style={{ left:20, top:25,position:'absolute'}} name="mail" size={20} />
            <TextInput 
        onChangeText = { (e) => getUsername(e) }
        placeholder='Email Address'
        textAlign='center'
        style={ styles.input}
        underlineColorAndroid = "transparent"
        placeholderTextColor = "#939393"
        autoCapitalize = "none"></TextInput>
        </View> }
            <View>
            <Icon style={{ left:20, top:25,position:'absolute'}} name="md-lock-closed" size={20} />
            <TextInput 
            onChangeText={ (e) => getPassword(e) }
            placeholder='Password' 
            textAlign='center'
            style={ styles.input}
            underlineColorAndroid = "transparent"
            placeholderTextColor = "#939393"
            autoCapitalize = "none"></TextInput>
            </View>
            <TouchableOpacity
            onPress={ () => performLoginAction(username, password) }
            style = {styles.submitButton}>
                <Text style = {styles.submitButtonText} >Login</Text>
            </TouchableOpacity>
        </View>

)

}

const styles = StyleSheet.create({
    container: {
      top:-120,
    },
    input: {
       margin: 15,
       height: 40,
       borderColor: '#939393',
       borderWidth: 2,
       width: 300,
       borderRadius:10
    },
    submitButton: {
       backgroundColor: '#000000',
       padding: 10,
       margin: 15,
       height: 40,
       alignItems: 'center',
       borderRadius:20
    },
    submitButtonText:{
       color: 'white',
       fontSize:15,
       fontWeight:'bold'
    }
 })

export default LoginForm