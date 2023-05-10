import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from "react-native"
import { GlobalStyles } from "../../constants/styles";

interface Props {
    label: string,
    textInputConfig: {
        keyboardType?: KeyboardTypeOptions;
        maxLength?: number;
        placeholder?: string;
        secureTextEntry?: boolean;
        onChangeText?: (text: string) => void;
        value?: string;
        multiline?: boolean;
    },
    style: any
}
function Input(props: Props) {
    const inputStyle = [styles.input]
    if(props.textInputConfig && props.textInputConfig.multiline) {
        inputStyle.push(styles.inputMultiline)
    }
    return (
        <View style={[styles.inputContainer, props.style]}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput style={inputStyle} {...props.textInputConfig}></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 16,
        marginVertical: 8
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 8,
        fontSize: 18,
        color: GlobalStyles.colors.primary700
    },
    inputMultiline:{
        minHeight: 100,
        textAlignVertical: 'top',
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 8,
        fontSize: 18,
        color: GlobalStyles.colors.primary700
    }
})

export default Input