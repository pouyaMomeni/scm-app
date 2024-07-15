import { FC } from "react";
import SignIn from '@views/signIn';
import SignUp from '@views/singUp';
import ForgetPassword from '@views/forgetPassword';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@views/home";

interface Props {}
export type AppStackParamList = {
    home : undefined;
}

const AppNavigator : FC<Props>  = (props) => {
    
    const Stack = createNativeStackNavigator<AppStackParamList>();
    return(
        <Stack.Navigator initialRouteName='home' screenOptions={{headerShown : false}}>
            <Stack.Screen name='home' component={Home} />
        </Stack.Navigator>
    )
}


export default AppNavigator;