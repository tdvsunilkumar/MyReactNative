import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import * as c from '../constant';
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from "react-native";
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{

 
    const [isLoading, setisLoading] = useState(false);
    const [userinfo, setuserinfo]  = useState({});
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [keepLoggedIn, setkeepLoggedIn] = useState('no');
    const [userDynamicInfo, setuserDynamicInfo] = useState({});
    const [Test, setTest] = useState('');

   

    const showToast = (msg, type) => {
        Toast.show({
            type: type,
            text1: msg,
            position:"bottom",
            duration:500
          });
      }
    
    

    const checkUserIsLoggedOrNot = async() =>{
        try{
            const data = await AsyncStorage.getItem('loggedInStatus');
            const userInfo = await AsyncStorage.getItem('userInfo');
            if(data == 'yes'){
                setkeepLoggedIn('yes');
                fetchUserDetails();
                
            }
            const newData = JSON.parse(userInfo);
            if(newData.success == true){
                setuserinfo(newData);
                
            }
        }catch(e){

        }
    }  

    const fetchUserDetails = async () =>{
        const userInfo = await AsyncStorage.getItem('userInfo');
        const newUserInfo = JSON.parse(userInfo);
        console.log('i am asynced data',newUserInfo.data);
        let options = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + newUserInfo.data.access_token
          
    };
    try{
       // setisLoading(true);
        var config = {
            method: 'get',
            url: c.USER_DETAILS,
            data:{},
            headers: options
          };
         axios(config)
        .then(response => {
            //setisLoading(false);
            let userData = response.data;
           // console.log('i am result ',userData.data);
            if(userData.success == true){
                setuserDynamicInfo(userData.data);
            }else{
                showToast(userData.message,'error');

            }
        }).catch((err) => {
            setisLoading(false);
            if(err.request.status == 401){
                alert('401 error');
                //logout();
            }
        });
    }catch(e){
        console.log(e);
    }
    }

    useEffect(() => {
        checkUserIsLoggedOrNot();
        
        // if(typeof userinfo.data !== 'undefined'){
        //     alert();
        //     fetchUserDetails();
            
        // }
        
    },[])

    const logout = () =>{
        //alert('i am logout');
        let options = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userinfo.access_token
              
        };
        try{
            setisLoading(true);
            axios.post(c.LOGOUT,{},options)
            .then(response => {
                setisLoading(false);
                let userInfo = response.data;
                if(userInfo.success == true){
                    setkeepLoggedIn('no');
                    setisLoggedIn(false);
                    setuserinfo({});
                    setuserDynamicInfo({});
                    showToast(userInfo.message,'error');
                    AsyncStorage.clear();
                    //console.log(children);
                }else{
                    showToast(userInfo.message,'error');

                }
            });
        }catch(e){
            console.log(e);
        }
    }  

    const login = (username, password) => {
        setisLoading(true);
        try{
            let options = {

            };
            let data = {
                username: username,
                password: password,
                type: 2,
                device_type:c.PLATFORM,
                client_id:c.CLINET_ID,
                client_secret: c.CLIENT_SECRET,
                grant_type: c.GRANT_TYPE,
            };
            axios.post(c.LOGIN,data, options)
            .then(reponse => {
                setisLoading(false);
                let userInfo = reponse.data;
                if(userInfo.success == true){
                   // console.log('i am retreived data',userInfo);
                    showToast(userInfo.message,'success');
                    setisLoggedIn(true);
                    setkeepLoggedIn('yes');
                    setuserinfo(userInfo);
                    setTest('i am test thank you');
                    AsyncStorage.setItem('userInfo',JSON.stringify(userInfo));
                    AsyncStorage.setItem('loggedInStatus','yes');
                    
                    fetchUserDetails();
                }
                if(userInfo.success == false){
                    showToast(userInfo.message,'error');
                }
                
            });
        }catch(e){
            showToast(e,'error');

        }

    }
    const objToQueryString = (obj)=>{
        const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValuePairs.join('&');

    }

    const register = (data) =>{
        let newData = objToQueryString(data);
        setisLoading(true);
        try{
            var config = {
                method: 'post',
                url: c.REGISTER+'?'+newData,
                headers: { 
                  'Accept': 'application/json', 
                }
              };
             axios(config)
            .then(reponse => {
                setisLoading(false);
                let userInfo = reponse.data;
                console.log(userInfo);
                if(userInfo.success == true){
                    login(data.mobile, data.password);
                }
                if(userInfo.success == false){
                    showToast(userInfo.message,'error');
                }
                
            }).catch((err) => {
                alert(err.request.status);
                if(err.request.status == 401){
                    alert('401 error');
                    logout();
                }
            });
        }catch(e){
            setisLoading(false);
            showToast(e,'error');

        }

    }
    return(
        <AuthContext.Provider 
          value={{isLoading, 
            setisLoading,
            userinfo, 
            login, 
            showToast, 
            isLoggedIn, 
            logout, 
            keepLoggedIn, 
            userDynamicInfo,
            register}}>{ children}</AuthContext.Provider>
    );
}