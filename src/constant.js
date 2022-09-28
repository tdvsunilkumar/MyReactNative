import React from "react";
import { Platform } from "react-native";
import DeviceInfo from 'react-native-device-info';

export const API_BASE_URL = 'https://oursafar.caretakerhome.in/public/api';
export const STRIPE_PUBLISHABLE_KEY = 'pk_test_51IYxO6E2ENgG86waL1YLggoV3fEH9eTaWlwy8ygDOXTUjKkGA6keCFILK6qQch629DRipAGBoGs2X85zup1Q7SEl00m9sIht3P';
export const PLATFORM = Platform.OS;
export const CLINET_ID = 18;
export const GRANT_TYPE = 'password';
export const DEVICE_ID = DeviceInfo.getDeviceId();
export const DEVICE_TOKEN = 'devicetokentest';
export const CLIENT_SECRET = 'i342UY66GO1cdaVEm3TiLwG4vNoIoLraTS8TdZns';
export const HOST = 'https://caretakerhome.in';
export const LOGIN = `${API_BASE_URL}/user/oauth/token`;
export const USER_TYPE = 'user';
export const DEFAULT_WALLET_PAYMENT_MODE = 'card';
export const LOGOUT = `${API_BASE_URL}/user/logout`;
export const REGISTER = `${API_BASE_URL}/user/signup`;
export const SERVECE_LIST = `${API_BASE_URL}/user/services`;
export const ESTIMATED_FARE = `${API_BASE_URL}/user/estimated/fare`;
export const SEND_REQUEST = `${API_BASE_URL}/user/send/request`;
export const UPCOMING_TRIPS = `${API_BASE_URL}/user/upcoming/trips`;
export const PAST_TRIPS = `${API_BASE_URL}/user/trips`;
export const USER_DETAILS = `${API_BASE_URL}/user/details`;
export const CUSTOMER_CARDS = `${API_BASE_URL}/user/card`;
export const ADD_NEW_CARD = `${API_BASE_URL}/user/card`;
export const DELETE_CARD = `${API_BASE_URL}/user/card/delete`;
export const ADD_MONEY_TO_WALLET = `${API_BASE_URL}/user/add/money`;
export const DEFAULT_PAYMENT_MODE = 'wallet';
export const LISTED_AIRPORTS = ['Chandigarh Airport', 'Amritsar Airport', 'Delhi Airport'];
export const GOOGLE_PLACE_API = 'AIzaSyAza7xJ2iaaq1FfUR_EUbfrzryLtsGJaZk';
export const DEFAULT_SERVICE_TYPE = 'outstation';
export const AIRPORT_LAT_LONG = {
    'Chandigarh Airport':{
        lat:30.6680,
        lng:76.7860
    },
    'Amritsar Airport':{
        lat:31.7056,
        lng:74.8069
    },
    'Delhi Airport':{
        lat:28.5562,
        lng:77.1000
    }
};