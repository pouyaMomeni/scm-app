import color from "@utils/colors";
import { FC, useState } from "react";
import { StyleSheet, TextInput, TextInputProps ,} from "react-native";

interface Props extends TextInputProps {}


const FormInpute : FC<Props> = (prop) => {

    const [isFocused,setIsFocused] = useState(false)

    return(
        <TextInput 
        style={[styles.inpute,isFocused ? styles.borderActive : styles.borderDeActive]}
        placeholderTextColor={color.primary}
        {...prop}
        onFocus={() => {
            setIsFocused(true)
        }}
        onBlur={() => {
            setIsFocused(false)
        }}
        />
    )
}



const styles = StyleSheet.create({
    inpute : {
        width : '100%',
        borderRadius : 5,
        padding : 8,
        marginBottom : 20,
    },
    borderDeActive : {
        borderWidth : 1,
        borderColor : color.deActive
    },
    borderActive : {
        borderWidth : 1.1,
        borderColor : color.primary
    }
});

export default FormInpute;