import { NavigationProp, useNavigation } from "@react-navigation/native";
import AppButton from "@ui/appButton";
import CustomeKeyboardAvoid from "@ui/customeKeyboardAvoid";
import FormDevider from "@ui/formDevider";
import FormInpute from "@ui/formInpute";
import FormNavigator from "@ui/formNavigator";
import WelcomeHeading from "@ui/welcomeHeading";
import color from "@utils/colors";
import { newUserSchema, yupValidation } from "@utils/validation";
import axios from "axios";
import { FC, useState } from "react";
import {   StyleSheet, View } from "react-native";
import { runAxiosAsync } from "src/api/runAxiosAsynx";
import { AuthStackParamList } from "src/navigator/AuthNavigator";
import * as yup from 'yup';
import { showMessage,hideMessage } from "react-native-flash-message";
import Client from "src/api/client";
import useAuth from "src/hooks/useAuth";

interface Props {

}


const SignUp : FC<Props> = (props) => {
    // useState
    const [userInfo,setUserInfo] = useState({
        name : '',
        email : '',
        password : ''
    })
    const [busy,setBusy] = useState(false);
    const {signIn} = useAuth()

    const {name , email , password} = userInfo ;
    // for handling value of the inpute
    const handleChange = (name : string) => {
        return (text : string) => {
            setUserInfo({...userInfo,[name] : text})
        }
    }
    //for handeling submit button
    const handelSubmit = async () => {
        const {values,error} = await yupValidation(newUserSchema,userInfo);
        
        if (error) {
            showMessage({message : error , type : 'warning'})
        }
            
        setBusy(true);
        const res = await runAxiosAsync<{message : string}>(Client.post('auth/sign-up',values));
        if (res?.message) {
            showMessage({message : res?.message , type : 'success'});
            signIn(values)
        }
        setBusy(false);
    }
    // Rout
    const {navigate} =  useNavigation<NavigationProp<AuthStackParamList>>();

    return(
        <CustomeKeyboardAvoid>
            <View style={styles.innerContainer}>
                    <WelcomeHeading imageName="signUpImage"/>
                    <View style={styles.formContainer}>
                        <FormInpute 
                        value={name}
                        placeholder="Name"
                        autoCapitalize="none"
                        onChangeText={handleChange('name')}
                        />
                        <FormInpute 
                        value={email}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={handleChange('email')}
                        />
                        <FormInpute 
                        value={password}
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={handleChange('password')}
                        />
                    </View>
                    <AppButton active={!busy} title="Sign up" onPress={handelSubmit}/>
                    <FormDevider/>
                    <FormNavigator 
                    leftTitle="Forget Password?"
                    rightTitle="Sign in"
                    funcForLeftTitle={()=> navigate('forgetPassword')}
                    funcForRightTitle={()=> navigate('signIn')}
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

export default SignUp;
