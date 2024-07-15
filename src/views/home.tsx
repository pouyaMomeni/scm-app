import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {}

const Home : FC<Props> = () =>{
    return(
        <View>
            <Text>hi</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1
    }
})

export default Home;