import { FC } from "react";
import SignIn from '@views/signIn';
import SignUp from '@views/singUp';
import ForgetPassword from '@views/forgetPassword';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

interface Props {}
export type AuthStackParamList = {
    signIn : undefined;
    signUp : undefined;
    forgetPassword : undefined;
}

const AuthNavigator : FC<Props>  = (props) => {
    
    const Stack = createNativeStackNavigator<AuthStackParamList>();
    return(
        <Stack.Navigator initialRouteName='signIn' screenOptions={{headerShown : false}}>
            <Stack.Screen name='signIn' component={SignIn} />
            <Stack.Screen name='signUp' component={SignUp} />
            <Stack.Screen name='forgetPassword' component={ForgetPassword} />
        </Stack.Navigator>
    )
}


export default AuthNavigator;