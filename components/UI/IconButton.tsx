import { Pressable, StyleSheet, View } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons';
import { GlobalStyles } from "../../constants/styles";

interface Props {
    icon: string,
    size: number,
    color: string,
    onPress: () => void
}

function IconButton(props: Props) {
    return (
        <Pressable onPress={props.onPress} style={(pressed) => pressed && styles.pressed} android_ripple={{color: GlobalStyles.colors.primary100}}>
            <View style={styles.buttonContainer}>
                <Icon name={props.icon} size={props.size} color={props.color}/>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({

    buttonContainer: {
        borderRadius: 24,
        padding: 6,
        margin: 8,
        marginVertical: 2
    },
    pressed: {
        opacity: 0.75,
    }

})

export default IconButton