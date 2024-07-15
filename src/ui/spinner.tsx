import color from "@utils/colors";
import LottieView from 'lottie-react-native';
import { FC } from "react";
import { Modal, StyleSheet, View } from "react-native";

interface Props {
    visibile : boolean
}

const Spinner : FC<Props> = ({visibile})=> {
    if (!visibile) return null;
    return (
        <Modal animationType="fade" transparent>
            <View style={styles.container}>
                <LottieView style={{flex : 1,transform : [{scale : 0.5}]}}  source={require('../../assets/animation/lod.json')} autoPlay loop />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : color.backDrop
    }
})

export default Spinner;