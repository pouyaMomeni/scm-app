import color from "@utils/colors";
import { FC } from "react";
import { ColorValue, DimensionValue, StyleSheet, View } from "react-native";

interface Props {
    width? : DimensionValue;
    height? : DimensionValue;
    backgroundColor? : ColorValue;
}

const FormDevider : FC<Props> = ({
    width = '50%',
    height = 2,
    backgroundColor = color.deActive
}) => {
    return(
        <View style={[styles.container,{width,height,backgroundColor}]}/>
    );
}

const styles = StyleSheet.create({
    container : {
        marginTop : 30,
        alignSelf : 'center'
    }
})

export default FormDevider;