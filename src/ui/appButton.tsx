import color from "@utils/colors";
import { FC} from "react";
import { Pressable, StyleSheet, Text} from "react-native";

interface Props {
    title : string;
    active? : boolean;
    onPress?() : void;
}


const AppButton : FC<Props> = ({title,active=true,onPress}) => {

    return(
        <Pressable 
         onPress={active ? onPress : null}
         style={[styles.button,active ? styles.buttonActive : styles.buttonDeActive]}
         >
            <Text style={styles.title}>{title}</Text>
        </Pressable>
    )
}



const styles = StyleSheet.create({
    button : {
        padding : 10,
        borderRadius : 5,
        alignItems : 'center',
        width : "100%"
    },
    buttonActive : {
        backgroundColor : color.primary
    },
    buttonDeActive : {
        backgroundColor : color.deActive
    },
    title : {
        color : color.white,
        fontWeight : '700',
        letterSpacing : 0.7
    }
});

export default AppButton;