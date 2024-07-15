import color from "@utils/colors";
import { images } from "@utils/images";
import { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface Props {
    imageName : string;
};
const Heading = "Online Marketplace for Used Goods";
const SubHeading = "Buy or sell Goods by trust. Chat directly by seller, insuring a seamless, authentic exprience";
const WelcomeHeading : FC<Props> = ({imageName}) => {
    return (
        <View style={styles.container}>
            <Image source={images[imageName]}
            style={styles.image}
            resizeMode="contain"
            resizeMethod="resize"
            />
            <Text style={styles.heading}>{Heading}</Text>
            <Text style={styles.subHeading}>{SubHeading}</Text>
         </View>
    )
};

const styles = StyleSheet.create({
    container : {
        alignItems : "center",
    },
    image : {
        width : 300,
        height : 220
    },
    heading : {
        fontWeight : '600',
        fontSize : 20,
        textAlign : 'center',
        letterSpacing : 0.7,
        marginBottom : 5,
        color : color.primary
    },
    subHeading : {
        fontSize : 14,
        textAlign : 'center',
        letterSpacing : 0.7,
        marginBottom : 5,
        color : color.primary
    }
});

export default WelcomeHeading;