import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import { Platform } from 'react-native';

const PLATFORM_LOCATION_PERMISSIONS = {
    ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
}

const REQUEST_PERMISSION_TYPE = {
    location:PLATFORM_LOCATION_PERMISSIONS
}

const PERMISSION_TYPE = {
    location : 'location'
}

class AppPermission{
    checkPermission = async (type): Promise <boolean> =>{
        const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];

        if(!permissions){
            return true;
        }
        try{
            const result = await check(permissions)
            if(result === RESULTS.GRANTED) return true;
            return this.requestPermission(permissions);
        }catch(error){
            return false;

        }

    }
   requestPermission = async (permissions): Promise<boolean> => {
    try{
        const result = await request(permissions)
        return result === RESULTS.GRANTED
    }catch(error){
        return false;

    }
   } 

}

const Permission = new AppPermission;
export {Permission, PERMISSION_TYPE}