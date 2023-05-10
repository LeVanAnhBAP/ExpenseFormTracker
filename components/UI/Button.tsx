import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native"
import { GlobalStyles } from "../../constants/styles"

interface Props {
    children: string,
    mode: string,
    style: StyleProp<ViewStyle>,
    onPress: () => void
}

function Button(props: Props) {
    return (
        <View style={props.style}>
            <Pressable onPress={props.onPress} style={({pressed}) => pressed && styles.pressed}>
                <View style={[styles.button, props.mode === 'flat' && styles.flat]}>
                    <Text style={[styles.buttonText, props.mode === 'flat' && styles.flatText]}>{props.children}</Text>
                </View>
            </Pressable>
        </View >
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary500
    },
    flat: {
        backgroundColor: 'transparent'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    flatText: {
        color: GlobalStyles.colors.primary200,

    },
    pressed: {
        opacity: 0.25,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 4
    }

})

export default Button