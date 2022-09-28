import React, { useContext } from "react";
import { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import PhoneInput from 'react-native-phone-number-input';
import Spinner from "react-native-loading-spinner-overlay/lib";
import CheckBox from '@react-native-community/checkbox';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "../../Context/AuthContext";
import * as c from '../../constant';
import DeviceInfo from 'react-native-device-info';

const RegisterScreen = () =>{
    const { showToast, register } = useContext(AuthContext);
    const [isLoading, setisLoading] = useState(false);
    const [email, setemail] = useState('');
    const [first_name, setfirst_name] = useState('');
    const [last_name, setlast_name] = useState('');
    const [gender, setgender] = useState('male');
    const [phoneNumber, setphoneNumber] = useState('');
    const [pass,setpass]    = useState('');
    const [conPas, setconPas]  = useState('');

    const radio_props = [
        {label: 'Male', value: 'male' },
        {label: 'Female', value: 'female' },
        {label: 'Other', value: 'female' }
      ];

    const phoneInput = useRef();

    const sendRequestForRegister = () => {
        // if(email == ''){
        //     showToast('Email is required field','error');
        // }else if(first_name == ''){
        //     showToast('First Name is required field','error');
        // }else if(gender == ''){
        //     showToast('Gender is required field','error');
        // }else if(phoneNumber == ''){
        //     showToast('Phone Number is required field','error');
        // }else if(pass == ''){
        //     showToast('Password is required field','error');
        // }
        if(pass != conPas){
            showToast('Password do not match','error');
        }else{
            setisLoading(true);
            let dataToSave = {
                device_type:c.PLATFORM,
                device_token:c.DEVICE_TOKEN,
                device_id:c.DEVICE_ID,
                login_by:'manual',
                first_name:first_name,
                last_name:last_name,
                email:email,
                country_code:phoneInput.current.state.code,
                mobile:phoneNumber,
                password:pass,
                gender:gender
            };
            register(dataToSave);
            setisLoading(false);
        }
    }

    return (
        <ScrollView>
        <View style={ styles.container}>
            
            <Spinner visible={ isLoading }></Spinner>
            <View style = {styles.formgroup}>
            <View >
                <Text style={ styles.label }>Email</Text>
                <TextInput 
                placeholder="Name@example.com"
                onChangeText={ (e)=>{ setemail(e) } }
        style={ styles.input}
        underlineColorAndroid = "transparent"
        placeholderTextColor = "#BEBEBE"
        autoCapitalize = "none"></TextInput>
            </View>

            <View style = {{marginTop:20, flexDirection:"row",}}>
                <View style={{ paddingRight:50}}>
                <Text style={ [styles.label] }>Name</Text>
                <TextInput 
                placeholder="First Name"
                onChangeText={(e)=>{
                    setfirst_name(e)
                }}
        style={ styles.rowinput}
        underlineColorAndroid = "transparent"
        placeholderTextColor = "#BEBEBE"
        autoCapitalize = "none"></TextInput>
                </View>
                <View>
                <Text style={ [styles.label] }></Text>
                <TextInput 
                placeholder="Last Name"
                onChangeText={(e)=>{
                    setlast_name(e)
                }}
        style={ styles.rowinput}
        underlineColorAndroid = "transparent"
        placeholderTextColor = "#BEBEBE"
        autoCapitalize = "none"></TextInput>
                </View>
            </View>
            <View style={{  marginTop:30}}>
            <RadioForm
  radio_props={radio_props}
  initial={0}
  formHorizontal={true}
  labelHorizontal={true}
  buttonColor={'#000000'}
  buttonWrapStyle={{marginLeft: 50, marginRight:50}}
  buttonOuterSize={20}
  labelStyle={{fontSize: 20, color: '#000000', paddingLeft:20, paddingRight:30}}
  selectedButtonColor={'#EE6B0E'}
  animation={true}
  onPress={(value) => { setgender(value) }}
/>
            </View>

            <View style = {{marginTop:10}}>
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
                //alert(text);
                setphoneNumber(text)
            }}
            onChangeFormattedText={(text) => {
            }}
          />
            </View>

           

            <View style = {{marginTop:20}}>
                <Text style={ [styles.label] }>Password</Text>
                <TextInput 
                textContentType="password"
                secureTextEntry = {true}
                onChangeText={(e)=>{
                    setpass(e);
                }}
        style={ styles.input}
        underlineColorAndroid = "transparent"
        placeholderTextColor = "#9a73ef"
        autoCapitalize = "none"></TextInput>
            </View>

            <View style = {{marginTop:20}}>
                <Text style={ [styles.label] }>Confirm Password</Text>
                <TextInput 
                textContentType="password"
                secureTextEntry = {true}
                onChangeText={(e)=>{
                    
                    setconPas(e);
                }}
        style={ styles.input}
        underlineColorAndroid = "transparent"
        placeholderTextColor = "#9a73ef"
        autoCapitalize = "none"></TextInput>
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
                    onPress={()=>sendRequestForRegister()}>
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
        marginTop:10
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
        height:40,
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
        height:40,
        borderWidth:1,
        borderColor:'#000000'
    },
    checkbox:{
        color:'yellow'

    }
});
export default RegisterScreen;