import React, { createContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

export const ToastContext = createContext();

export const ToastMsg = ({children}) => {
    const showToast = (msg, type) => {
        Toast.show({
            type: type,
            text1: msg,
            position:"bottom"
          });
      }
   return (
     <ToastContext.Provider value={{showToast}}></ToastContext.Provider>
     
   )
}


