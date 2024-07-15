import { NavigationProp, useNavigation } from "@react-navigation/native";
import AppButton from "@ui/appButton";
import CustomeKeyboardAvoid from "@ui/customeKeyboardAvoid";
import FormDevider from "@ui/formDevider";
import FormInpute from "@ui/formInpute";
import FormNavigator from "@ui/formNavigator";
import WelcomeHeading from "@ui/welcomeHeading";
import color from "@utils/colors";
import { forgetPasswordSchema, yupValidation } from "@utils/validation";
import { FC, useState } from "react";
import {   StyleSheet, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import Client from "src/api/client";
import { runAxiosAsync } from "src/api/runAxiosAsynx";
import { AuthStackParamList } from "src/navigator/AuthNavigator";

interface Props {

}

const ForgetPassword : FC<Props> = (props) => {
    const [userInfo,setUserInfo] = useState({
        email : ''
    })
    const [busy,setBusy] = useState(false)
    const {navigate} =  useNavigation<NavigationProp<AuthStackParamList>>();
    const handleInpute = (name : string) => {
        return (text : string) => {
            setUserInfo({...userInfo,[name] : text})
        }
    }
    const handelSubmit = async () => {
        const {values,error} = await yupValidation(forgetPasswordSchema,userInfo);
        if (error) {
            showMessage({message : error , type : 'warning'})
        }
        setBusy(true);
        const res = await runAxiosAsync<{message : string}>(
            Client.post('/auth/forget-password',values)
        )
        if (res) {
            showMessage({message : res.message , type : 'success'});
        }
        setBusy(false);
    }
    return(
        <CustomeKeyboardAvoid>
            <View style={styles.innerContainer}>
                    <WelcomeHeading imageName="forgetPasswordImage"/>
                    <View style={styles.formContainer}>
                        <FormInpute 
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={handleInpute('email')}
                        />
                    </View>
                    <AppButton active={!busy} onPress={handelSubmit}  title="Request Link"/>
                    <FormDevider/>
                    <FormNavigator 
                    leftTitle="Sign in"
                    rightTitle="Sign up "
                    funcForLeftTitle={()=> navigate('signIn')}
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

export default ForgetPassword;
