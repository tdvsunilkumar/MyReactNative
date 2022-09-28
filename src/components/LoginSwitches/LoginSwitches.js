import react, {Component, useState} from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity, TextInput} from 'react-native'
import mail from '../../../assets/images/mail-icon.png'
import call from '../../../assets/images/fb-contact-icon.png'
import LoginForm from '../LoginForm';

const LoginSwitches = () => {

    const [callFrom, setCallFrom ] = useState('call');

    const loadMailCustomCom = (text) => {
        setCallFrom(text);
        

    }
    return (
            <View >
                <View style={ styles.root }>
                <TouchableOpacity 
                onPress={() => loadMailCustomCom('email') }>
                <Image 
                source={mail} 
                style={[styles.mailstyle,{ }]}
                resizeMode = "contain">
                </Image>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => loadMailCustomCom('call') } >
                <Image 
                source={call} 
                style={styles.mailstyle}>
                </Image>
                </TouchableOpacity>
                </View>
                <LoginForm label = { callFrom }/>
            </View>
    );

}

const styles = StyleSheet.create({
    root:{
        top:-120,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    mailstyle:{
        margin:5,
        height:30,
        width:30,
        opacity:1
    }
})

export default LoginSwitches