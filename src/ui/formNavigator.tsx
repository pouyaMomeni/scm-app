import color from "@utils/colors";
import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
    leftTitle : string;
    rightTitle : string;
    funcForLeftTitle?() : void;
    funcForRightTitle?() : void;
}

const FormNavigator : FC<Props> = ({leftTitle,rightTitle,funcForLeftTitle,funcForRightTitle}) => {
    return(
        <View style={styles.container}>
            <Pressable onPress={funcForLeftTitle}>
                <Text style={styles.title}>{leftTitle}</Text>
            </Pressable>
            <Pressable onPress={funcForRightTitle}>
                <Text style={styles.title}>{rightTitle}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        width : '100%',
        flexDirection : 'row',
        justifyContent : "space-between",
        marginTop : 15
    },
    title : {
        color : color.primary
    }
})

export default FormNavigator;