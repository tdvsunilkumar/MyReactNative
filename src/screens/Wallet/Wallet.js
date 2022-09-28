import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AuthContext } from "../../Context/AuthContext";
import Icon  from "react-native-vector-icons/FontAwesome5";

const Wallet = ({navigation}) =>{

  const [expandedPayHis, setexpandedPayHis] = useState(false);

  const [expandedAddMoney, setexpandedAddMoney] = useState(false);

  const [inputValue, setinputValue] = useState('');

    
   const  toggleExpand=(txt)=>{
    if(txt == 0){
      setexpandedPayHis(!expandedPayHis);
    }else{
      setexpandedAddMoney(!expandedAddMoney);
    }
    
  }  

    const saveTextFieldInput = (txt) =>{
         setinputValue(txt);
    }

    const changeTextFieldValue = (txt) =>{
      setinputValue(txt);
      
    }

    const addMoneyToWallet = () => {
      navigation.navigate('WalletPayment', {
        amount: inputValue
      });
      
    }
    

  return (
      
    <View style={{ backgroundColor:'#EEEEEE', height:'100%'}}>
      <View style={{ backgroundColor:'#F9DD23', alignItems:"center", padding:50}}>
        <Text style={{ fontSize:20}}>Total Wallet </Text>
        <Text style={{ fontSize:25, fontWeight:"bold"}}>$ 200</Text>
      </View>
    <TouchableOpacity  onPress={()=>toggleExpand(0)}>
        <View style={styles.row}>
        <Text style={[styles.title]}>Transaction History</Text>
        <Icon name={expandedPayHis ? 'angle-down' : 'angle-right'} size={30} color='darkgray' />
        </View>
        {
        expandedPayHis &&
        <View style={{ backgroundColor:'white', paddingLeft:25, paddingRight:18,}}>
            <Text>sfdsdfsdf</Text>
        </View>
    }
    </TouchableOpacity>
  
    <TouchableOpacity  onPress={()=>toggleExpand(1)}>
        <View style={styles.row}>
        <Text style={[styles.title]}>Add Money</Text>
        <Icon name={expandedAddMoney ? 'angle-down' : 'angle-right'} size={30} color='darkgray' />
        </View>
        {
        expandedAddMoney &&
        <View style={{ backgroundColor:'white', paddingLeft:25, paddingRight:18, alignItems:"center"}}>
            <View style={{
              flexDirection:'row',
              padding:10,
              alignItems:"center"
            }}>
              <Text style={{ left:20}}>$</Text>
              <TextInput style={{ 
                borderColor:'#D5D5D5',
                borderWidth:2,
                borderRadius:10,
                width:100,
                height:40,
              }} 
              textAlign="center"
              value={ inputValue }
              onChangeText={(e)=>saveTextFieldInput(e)}
              keyboardType = "number-pad"
              underlineColorAndroid = "transparent"
              autoCapitalize = "none" />
              <TouchableOpacity style={ styles.selectMoney } onPress={ () => changeTextFieldValue('199') } >
              <Text >$199</Text>
            </TouchableOpacity >
            <TouchableOpacity style={ styles.selectMoney } onPress={ ()=> changeTextFieldValue('299') }>
              <Text>$299</Text>
            </TouchableOpacity >
            <TouchableOpacity style={ styles.selectMoney } onPress={ ()=> changeTextFieldValue('399') }>
              <Text>$399</Text>
            </TouchableOpacity>
            </View>
            <View style={{ marginTop:15, alignItems:"center", width:250, padding:10, backgroundColor:'#000000', borderRadius:10}}>
              <Pressable onPress={()=>addMoneyToWallet()}>
              <Text style={{ color:'#ffffff', fontSize:18}}>+ Add Money</Text>
              </Pressable>
            </View>
        </View>
    }
    </TouchableOpacity>
    
</View>
      
  );
}
const styles = StyleSheet.create({
  selectMoney:{
    marginLeft:10,
    alignItems:"center",
    borderRadius:10,
    borderWidth:2,
    width:70,
    padding:5,
    borderColor:'#D5D5D5'
  },
  container:{
      justifyContent: 'center',
      alignItems: 'center'
  },
  button:{
      width:'100%',
      height:54,
      alignItems:'center',
      paddingLeft:35,
      paddingRight:35,
      fontSize: 12,
  },
  title:{
      fontSize: 14,
      fontWeight:'bold',
      color: '#000000',
  },
  itemActive:{
      fontSize: 12,
      color: 'green',
  },
  itemInActive:{
      fontSize: 12,
      color: 'darkgray',
  },
  btnActive:{
      borderColor: 'green',
  },
  btnInActive:{
      borderColor: 'darkgray',
  },
  row:{
      marginTop:20,
      flexDirection: 'row',
      justifyContent:'space-between',
      height:56,
      paddingLeft:25,
      paddingRight:18,
      alignItems:'center',
      backgroundColor: 'white',
  },
  childRow:{
      flexDirection: 'row',
      justifyContent:'space-between',
      backgroundColor: 'gray',
  },
  parentHr:{
      height:1,
      color: 'white',
      width:'100%'
  },
  childHr:{
      height:1,
      backgroundColor: 'lightgray',
      width:'100%',
  },
  colorActive:{
      borderColor: 'green',
  },
  colorInActive:{
      borderColor: 'darkgray',
  }
  
});
export default Wallet;