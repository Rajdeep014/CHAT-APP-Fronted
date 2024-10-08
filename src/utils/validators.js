import {isValidUsername} from '6pp'

export const  usernameValidator =(username)=>{
    if(!isValidUsername(username))
    return {isValid:false,errorMessage:"User is not defined"};
}