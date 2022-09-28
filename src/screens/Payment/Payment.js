import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Image, Dimensions } from "react-native";
import ToggleSwitch from 'toggle-switch-react-native'
import cardimage from '../../../assets/images/debit-credit-card.png';
import  Icon  from "react-native-vector-icons/Entypo";
import { AuthContext } from "../../Context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay/lib";
import * as c from '../../constant';
import axios from "axios";
import { RefreshControl, ScrollView, TextInput } from "react-native-gesture-handler";
import { Platform } from "react-native";
import { StripeProvider, CardField, useStripe, createSetupIntentOnBackend, stripe } from '@stripe/stripe-react-native';
import Modal from "react-native-modal";
import qs from 'qs-native';
const Payment = ({navigation, amount}) =>{

  const { userinfo, showToast, logout } = useContext(AuthContext);
  const [isLoading, setisLoading] = useState(false);
  const [isSwitchOn, setisSwitchOn] = useState(false);
  const [cards, setcards] = useState({});
  const [refreshing, setrefreshing] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);
  const deviceWidth = Dimensions.get("window").width;
  const {width, height} = Dimensions.get('window');
  const [UserDetails, setUserDetails] = useState({});
  const { confirmSetupIntent, loading } = useStripe();
  const [cardNumber, setcardNumber] = useState('');
  const [expiryMonth, setexpiryMonth] = useState('');
  const [expiryYear, setexpiryYear] = useState();
  const [cvv, setcvv] = useState('');
  const deviceHeight =
        Platform.OS === "ios"
         ? Dimensions.get("window").height
          : require("react-native-extra-dimensions-android").get(
             "REAL_WINDOW_HEIGHT"
         );
  const { createPaymentMethod } = useStripe();   
  
  const getCustomerDetails = () =>{
    try{
      var config = {
          method: 'get',
          url: c.USER_DETAILS,
          headers: { 
            'Accept': 'application/json', 
            'Authorization':'Bearer '+userinfo.data.access_token
          }
        };
       axios(config)
      .then(response => {
          setrefreshing(false);
          setisLoading(false);
          let user = response.data;
          
          if(user.success == true){
            
              setUserDetails(user.data);
              //console.log('i am user details', UserDetails);
          }else{
              showToast(user.message,'error');
          }
      }).catch((err) => {
        setrefreshing(false);
          if(err.request.status == 401){
              logout();
          }
      });
  }catch(e){
    setrefreshing(false);
      setisLoading(false);
      alert(e);
  }
  }

  const addNewCard = (token) =>{
    try{
      var config = {
          method: 'post',
          url: c.ADD_NEW_CARD+'?stripe_token='+token,
          headers: { 
            'Accept': 'application/json', 
            'Authorization':'Bearer '+userinfo.data.access_token
          }
        };
       axios(config)
      .then(response => {
          setisLoading(false);
          let saveCardRes = response.data;
          //console.log('add new card response',saveCardRes);
          if(saveCardRes.success == true){
              showToast(saveCardRes.message,'success');
              setisModalVisible(false);
              getSavedCards();
          }else{
              showToast(saveCardRes.message,'error');
          }
      }).catch((err) => {
          if(typeof err.request !== 'undefined' && err.request.status == 401){
              logout();
          }
      });
  }catch(e){
      setisLoading(false);
      alert(e);
  }
  }
 
  const getSavedCards = () =>{
    try{
      var config = {
          method: 'get',
          url: c.CUSTOMER_CARDS,
          headers: { 
            'Accept': 'application/json', 
            'Authorization':'Bearer '+userinfo.data.access_token
          }
        };
       axios(config)
      .then(response => {
        setrefreshing(false);
          setisLoading(false);
          let cards = response.data;
          if(cards.success == true){
              
              setcards(cards.data);
              
          }else{
              showToast(cards.message,'error');
          }
      }).catch((err) => {
        setrefreshing(false);
          if(err.request.status == 401){
              logout();
          }
      });
  }catch(e){
    setrefreshing(false);
      setisLoading(false);
      alert(e);
  }
  }

  useEffect(()=>{
    if(typeof amount != 'undefined'){
      alert(amount);
    }
    
    getCustomerDetails();
    getSavedCards();
    

},[]);

const deleteCustCard = (cardId) =>{
  setisLoading(true);
  try{
    var config = {
        method: 'delete',
        url: c.DELETE_CARD+'?card_id='+cardId,
        headers: { 
          'Accept': 'application/json', 
          'Authorization':'Bearer '+userinfo.data.access_token
        }
      };
     axios(config)
    .then(response => {

        setisLoading(false);
        let delCardRes = response.data;
        //console.log('add new card response',saveCardRes);
        if(delCardRes.success == true){
            showToast(delCardRes.message,'success');
            getSavedCards();
        }else{
            showToast(delCardRes.message,'error');
        }
    }).catch((err) => {
      setisLoading(false);
        if(typeof err.request !== 'undefined' && err.request.status == 401){
            logout();
        }
    });
}catch(e){
    setisLoading(false);
    alert(e);
}

}

const addMoneyToWalletCommonFunction = async (cardId) =>{
  //alert();
  let DataToSend = {
      user_type:c.USER_TYPE,
      amount:amount,
      payment_mode:c.DEFAULT_WALLET_PAYMENT_MODE,
      card_id:cardId
  };
  
  let options = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + userinfo.data.access_token
    
};
try{
 console.log(DataToSend);
  var config = {
      method: 'post',
      url: c.ADD_MONEY_TO_WALLET+'?'+newData,
      data:{},
      headers: options
    };
   axios(config)
  .then(response => {
      let userData = response.data;
      //console.log('i am result ',userData);
      if(userData.success == true){
          alert('Ready to move on payment screen');
          setuserDynamicInfo(userData.data);
      }else{
          showToast(userData.message,'error');

      }
  }).catch((err) => {
      setisLoading(false);
      showToast(err.message,'error');
      if(err.request.status == 401){
          alert('401 error');
          //logout();
      }
  });
}catch(e){
  console.log(e);
}
  
}  

const handlePayPress = async ( number, month, year, cvv) => {
  if(number == ''){
    showToast('Card Number is required','error');
  }else if(month == ''){
    showToast('Expiry Month is required','error');
  }else if(year == ''){
    showToast('Expiry Year is required','error');
  }else if(cvv == ''){
    showToast('CVV is required','error');
  }else{
    setisLoading(true);
    var data = qs.stringify({
      'card[number]': number,
      'card[exp_month]': month,
      'card[exp_year]': year,
      'card[cvc]': cvv 
    });
    var config = {
      method: 'post',
      url: 'https://api.stripe.com/v1/tokens',
      headers: { 
        'Authorization': 'Bearer '+c.STRIPE_PUBLISHABLE_KEY, 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    axios(config)
    .then(function (response) {
      setisLoading(false);
      addNewCard(response.data.id);
      //console.log('yes i am in',response.data.id);
    })
    .catch(function (error) {
      setisLoading(false);
      if(error.request.status == 402){
        //console.log(error.response.data.error.code);
        showToast(error.response.data.error.message,'error');
      }else{
        showToast(error.message,'error');
      }
      
    });
  }
 
  };

    
const onRefresh = () =>{
  setrefreshing(true);
  getSavedCards();
  getCustomerDetails();
}
    return (
      <ScrollView style={{ padding:20}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={ onRefresh }></RefreshControl>
      }
      >
        <Spinner visible={isLoading}></Spinner>
         { typeof amount == 'undefined' ? <View>
          <View><Text style={{ fontSize:20, color:'#000000'}}>Wallet</Text></View>
          <View style={{ flexDirection:"row", marginTop:20, }}>
            <View style={{ flex:1}}>
              <Text style={{ color:'#rgb(155,154,154)'}}>Wallet Balance</Text>
              <Text style={{ fontWeight:'bold'}}>${ typeof UserDetails !== 'undefined' ? UserDetails.wallet_balance : 0.00 }</Text>
            </View>
            <View style={{ justifyContent:"flex-end" }}>
            <ToggleSwitch
            isOn={isSwitchOn}
            onColor="green"
            offColor="black"
            labelStyle={{ color: "black", fontWeight: "900" }}
            size="medium"
            onToggle={isOn => {
            setisSwitchOn(!isSwitchOn);
            }}
            />
            </View>
          </View>
        </View> : ''}

        <View>
          <View><Text style={{ fontSize:20, color:'#000000', marginTop:20}}>Saved Cards</Text></View>
          { cards.length > 0 ?
          <View>
          { cards.map((item)=>{
            return(
              <View key={ item.last_four } style={{ flexDirection:"row", marginTop:20 }}>
               <TouchableOpacity 
               style={{ flex:1}}
               disabled={ typeof amount !== 'undefined' ? false :true }
               onPress={() => { 
                if(typeof amount !== 'undefined'){
                  addMoneyToWalletCommonFunction(item.card_id);
                }
               }}>
            <View >
              <View style={{ flexDirection:"row"}}>
                <Image source={cardimage} style={{ width:35, height:35}} />
                <Text style={{ top:6, right:-10}}> <Icon name="dots-two-horizontal" /> <Icon name="dots-two-horizontal" /> {item.last_four}</Text>
              </View>
            </View>
            </TouchableOpacity>
           { typeof amount == 'undefined' ?  <View style={{ justifyContent:"flex-end", padding:8 }}>
            <TouchableOpacity onPress={()=>deleteCustCard(item.card_id)}><Text style={{ color:'#F18940'}}>Delete</Text></TouchableOpacity>
            </View> : ''}
          </View>
            );
          })}
          </View>
          : <View style={{ alignItems:"center", padding:20}}><Text style={{ color:'red'}}>No card Found</Text></View>}
        </View>

        <View style={{ top:20}}>
          <TouchableOpacity onPress={()=>{
            setisModalVisible(true);
          }}>
            <Text style={{ fontSize:20, color:'#F18940'}}><Icon name="add-to-list" size={23} color={'#F18940'}/>    Add new card</Text>
            </TouchableOpacity>
        </View>

        <View style={{ alignItems:"center", flexDirection:"row"}}>
            <Icon />
        </View>
        <Modal 
        visible={ isModalVisible }
        animationOut = 'bottom'
        deviceWidth={ deviceWidth }
        deviceHeight = { deviceHeight }
        style = {{  alignItems:'center'}}>
         
        <View style={{ 
            width: (width/1.1),
            height: (height/2.5),
            backgroundColor:'white',
            
            shadowColor: '#000000',
            shadowOffset: {width: 5, height: 4},
            shadowOpacity: 0.5,
            shadowRadius: 3,
            elevation:2,
            borderRadius:10,
            padding:20
            }}>
              <View style={{ alignItems:"center"}}><Text style={{ fontSize:20, color:'#F18940'}}>Input Card details</Text></View>
              <TouchableOpacity style={{
                position:"absolute",
                alignSelf:"flex-end"
              }}
                onPress={()=>{ setisModalVisible(!isModalVisible)}}><Icon  name="circle-with-cross" size={25}/></TouchableOpacity>
             <View style={{ marginTop:20}}>
              <TextInput 
              onChangeText={(e) => { setcardNumber(e) }}
             placeholder="Card Number"
             keyboardType="number-pad"
             style={{ borderWidth:2, borderColor:'#000000', borderRadius:10, width:'100%', height:50}} >

             </TextInput>
             </View>
             <View style={{ flexDirection:'row', marginTop:20}}>
              <View style={{ flexDirection:"row",justifyContent:"flex-start", flex:1}}>
                <View style={{ flex:1,justifyContent:"flex-start"}}><TextInput 
             placeholder="MM"
             onChangeText={(e) => { setexpiryMonth(e)}}
             maxLength={2}
             keyboardType="number-pad"
             style={{ borderWidth:2, borderColor:'#000000', borderRadius:10, width:75, height:50}} >

             </TextInput></View>
                <View style={{ right:30}}><TextInput 
             placeholder="YYYY"
             onChangeText={(e) => setexpiryYear(e)}
             keyboardType="number-pad"
             maxLength={2}
             style={{ borderWidth:2, borderColor:'#000000', borderRadius:10, width:75, height:50}} >

             </TextInput></View>
              </View>
              <View>
                <View><TextInput 
             placeholder="CVV"
             maxLength={3}
             onChangeText={(e) => setcvv(e)}
             keyboardType="number-pad"
             style={{ borderWidth:2, borderColor:'#000000', borderRadius:10, width:140, height:50}} >

             </TextInput></View>
              </View>
              
             </View>
             <View style={{ alignItems:"center", 
             marginTop:20, 
             }}>
              <View style={{ 
                backgroundColor:'#000000', 
                width:'100%', 
                alignItems:"center",
                padding:10,
                borderRadius:10}}>
                 <TouchableOpacity 
                 onPress={ ()=>handlePayPress(cardNumber, expiryMonth, expiryYear, cvv) }> 
                 <Text style={{ color:'#ffffff'}}>Save Your Card</Text></TouchableOpacity>
                 </View>
                 </View>
        </View>
        
        </Modal>
      </ScrollView>
    );
}


export default Payment;