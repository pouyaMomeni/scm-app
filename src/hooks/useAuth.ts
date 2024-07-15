import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import Client from "src/api/client";
import { runAxiosAsync } from "src/api/runAxiosAsynx";
import { getAuthState, updateAuthState } from "src/store/reducers/auth";

export interface UserProfile {
    profile: {
      id: string;
      email: string;
      name: string;
      verify: boolean;
      avatar? : string
    };
    verifyTokenSchema: {
      access: string;
      refresh: string;
    };
}

// type UserInfo =  {
//     email : string;
//     password : string;
// }


const useAuth = () => {
    const dispatch = useDispatch();
    const authSelector = useSelector(getAuthState);

    const signIn = async (userInfo : any) => {
        dispatch(updateAuthState({profile : null , pending : true}));
        const res =  await runAxiosAsync<UserProfile>(
            Client.post('auth/sign-in',userInfo)
        );
        if (res) {
            await AsyncStorage.setItem('access-token',res.verifyTokenSchema.access);
            await AsyncStorage.setItem('refresh-token',res.verifyTokenSchema.refresh);
            dispatch(updateAuthState({profile : res.profile , pending : false}))
            showMessage({message : 'Welcome', type : 'success'})
        } else {
            dispatch(updateAuthState({profile : null , pending : false}))
        }
    }

    const logedIn = authSelector.profile ? true : false;

    return {signIn,authSelector,logedIn};
}


export default useAuth;