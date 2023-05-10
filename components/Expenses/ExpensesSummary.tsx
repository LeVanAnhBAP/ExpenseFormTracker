import { StyleSheet, Text, View } from "react-native"
import Expenses from "../../model/Expenses"
import { GlobalStyles } from "../../constants/styles";

interface Props{
    priodName: string,
    expenses: Expenses[]
}

function ExpensesSummary(props: Props) {
    const expensesSum = props.expenses.reduce((sum, expense) => {
        return sum + expense.amount
    }, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.TextpriodName}>{props.priodName}</Text>
            <Text style={styles.TextExpensesSum}>${expensesSum.toFixed(2)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: GlobalStyles.colors.primary100,
        flexDirection: 'row',
        padding: 12,
        margin: 16,
        borderRadius: 8,
        justifyContent: 'space-between'
    },
    TextExpensesSum: {
        fontSize:18,
        fontWeight: 'bold',
        color: 'black'
    },
    TextpriodName: {
        fontSize:18,
        color: 'black'
    }
})

export default ExpensesSummary