import WelcomeHeading from "@ui/welcomeHeading";
import { FC } from "react";
import { Image, Platform, StatusBar, StyleSheet, Text, View } from "react-native";

interface Props {

}

const SignIn : FC<Props> = (props) => {
    return(
        <View style={styles.container}>
            <WelcomeHeading/>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        alignItems : "center",
        paddingTop : Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
})

export default SignIn;
