import { FC, useEffect } from "react";
import { NavigationContainer,DefaultTheme  } from '@react-navigation/native';
import color from '@utils/colors';
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./appNavigator";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState, Profile, updateAuthState } from "src/store/reducers/auth";
import Client from "src/api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { runAxiosAsync } from "src/api/runAxiosAsynx";
import Spinner from "@ui/spinner";
import useAuth from "src/hooks/useAuth";


interface Props {}

const Navigator : FC<Props> = (props) => {
    
    const MyTheme = {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background : color.white
        },
    };


    const dispatch = useDispatch();
    const {authSelector,logedIn} = useAuth()

    // for geting token
    const fetchAuthToken = async () => {
        const token = await AsyncStorage.getItem('access-token');
        if (token) {
            dispatch(updateAuthState({pending : true , profile : null}));
            // calling the api
            const res = await runAxiosAsync<{profile : Profile}>(Client.get('/auth/profile',
                {
                    headers : {
                        Authorization : "Bearer " + token
                    }
                }
            ));
            // if there was a profile its save profile in redux
            if (res?.profile) {
                dispatch(updateAuthState({pending : false , profile : res.profile}));
            } else {
                dispatch(updateAuthState({pending : false , profile : null}));
            }
        }
    }

    useEffect(()=>{
        fetchAuthToken()
    },[])
    
    return(
        <NavigationContainer theme={MyTheme}>
            <Spinner visibile={authSelector.pending}/>
            {!logedIn ? <AuthNavigator/> : <AppNavigator/>}
        </NavigationContainer>
    )
}


export default Navigator;