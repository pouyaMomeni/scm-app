import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import AppButton from "@ui/appButton";
import CustomeKeyboardAvoid from "@ui/customeKeyboardAvoid";
import FormDevider from "@ui/formDevider";
import FormInpute from "@ui/formInpute";
import FormNavigator from "@ui/formNavigator";
import WelcomeHeading from "@ui/welcomeHeading";
import color from "@utils/colors";
import {  signInSchema, yupValidation } from "@utils/validation";
import axios from "axios";
import { FC, useState } from "react";
import {   StyleSheet, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";
import Client from "src/api/client";
import { runAxiosAsync } from "src/api/runAxiosAsynx";
import useAuth from "src/hooks/useAuth";
import { AuthStackParamList } from "src/navigator/AuthNavigator";
import { updateAuthState } from "src/store/reducers/auth";

interface Props {

}


const SignIn : FC<Props> = (props) => {
    // useState
    const [userInfo,setUserInfo] = useState({
        email : '',
        password : '',
    });
    const {email,password} = userInfo;
    // custome HOOK for the SIGN IN
    const {signIn} = useAuth()
    // handeling Inpute
    const handleChange = (name : string) => {
        return (text : string) => {
            setUserInfo({...userInfo,[name] : text})
        }
    }
    //handleing submit Button
    const handelSubmit = async () => {
        const {values,error} = await yupValidation(signInSchema,userInfo);
        if (error) {
            showMessage({message : error , type : 'danger'})
        }

        if(values){
            signIn(values)
        }

    };
    //Rout
    const {navigate} =  useNavigation<NavigationProp<AuthStackParamList>>();
    return(
        <CustomeKeyboardAvoid>
            <View style={styles.innerContainer}>
                    <WelcomeHeading imageName="signInImage"/>
                    <View style={styles.formContainer}>
                        <FormInpute 
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={handleChange('email')}
                        />
                        <FormInpute 
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={handleChange('password')}
                        />
                    </View>
                    <AppButton  onPress={handelSubmit} title="Sign In"/>
                    <FormDevider/>
                    <FormNavigator 
                    leftTitle="Forget Password?"
                    rightTitle="Sign up "
                    funcForLeftTitle={()=> navigate('forgetPassword')}
                    funcForRightTitle={()=> navigate('signUp')}
                    />
                </View>
        </CustomeKeyboardAvoid>
    )
}

const styles = StyleSheet.create({
    innerContainer : {
        flex : 1
    },
    inpute : {
        width : '90%',
        borderRadius : 5,
        padding : 8,
        color : color.primary,
        marginBottom : 20,
        borderWidth : 1
    },
    formContainer : {
        marginTop : 30,
        alignItems : 'center'
    }
})

export default SignIn;
