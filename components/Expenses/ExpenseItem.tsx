import { Pressable, StyleSheet, Text, View } from "react-native"
import Expenses from "../../model/Expenses"
import { GlobalStyles } from "../../constants/styles"
import { getFormattedDate } from "../../utils/date"
import { useNavigation, useRoute } from "@react-navigation/native"
import { ManageExpenseScreenNavigationProp } from "../../utils/types"

type Props = {
    data: Expenses,
}

function ExpenseItem({ data }: Props) {

    const navigation = useNavigation<ManageExpenseScreenNavigationProp>();

    function expensePressHandler() {
        navigation.navigate('ManageExpense', {
            id: data.id,
            item: data
        })
    }
    return (
        <Pressable style={({pressed}) => pressed && styles.containerPress} onPress={expensePressHandler}>
            <View style={styles.containerView} >
                <View>
                    <Text style={styles.textDescription}>
                        {data.description}
                    </Text>
                    <Text style={styles.textDate}>
                        {getFormattedDate(data.date)}
                    </Text>
                </View>
                <View style={styles.viewMount}>
                    <Text style={styles.textMount}>${data.amount}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    containerView: {
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 8,
        backgroundColor: GlobalStyles.colors.primary200,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    containerPress: {
        opacity: 0.25
    },
    textDescription: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },

    textDate: {
        fontSize: 15,
        color: 'black'
    },

    viewMount: {
        fontSize: 15,
        color: 'black',
        height: 50,
        width: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        minWidth: 80
    },
    textMount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
})

export default ExpenseItem