import react from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity} from 'react-native'
import LoginSwitches from '../../../src/components/LoginSwitches'
import logo from '../../../assets/images/Taxi-logo.png'
import LoginForm from '../../components/LoginForm'
import { Pressable } from 'react-native'
const SignInScreen = ({ navigation }) => {
	const { height}  =  useWindowDimensions()
	return(
		<View style={styles.root}>
         <Image 
           style={[styles.image,{height: height * 0.5 }]} 
           source={logo} 
           resizeMode = "contain"/>
		   <LoginSwitches height = { height }/>
		   <View style={{ top:-110, alignItems:'center'}}>
			<View style={{ flexDirection:'row'}}>
			<Text>Does't have an account? </Text>
			<TouchableOpacity onPress={()=>{
				navigation.navigate('Register');
			}}>
				<Text style={{ color:'#EF7A26' }}>SignUp</Text>
			</TouchableOpacity>
			</View> 
			<TouchableOpacity>
				<Text style={{ color:'#EF7A26', textDecorationLine:'underline' }}>Change Language</Text>
			</TouchableOpacity>
		</View>
		</View>
		)
}

export default SignInScreen

const styles = StyleSheet.create({
	root:{
		padding:20,
		alignItems:'center',
		
	},
	image:{
      height:100,
      width:'70%',
      maxWidth:300
	}
})