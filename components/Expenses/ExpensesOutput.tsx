import { StyleSheet, Text, View } from "react-native"
import ExpensesSummary from "./ExpensesSummary"
import ExpensesList from "./ExpensesList"
import Expenses from "../../model/Expenses";
import { GlobalStyles } from "../../constants/styles";

interface Props {
    expensesPeriod: string,
    expenses: Expenses[],
    fallbackText: string,
}

function ExpensesOutput(props: Props) {
    let content = <Text style={styles.infoText}>{props.fallbackText}</Text>
    if (props.expenses.length > 0) {
        content = <ExpensesList expenses={props.expenses} />
    }

    return (
        <View style={styles.container}>
            <ExpensesSummary priodName={props.expensesPeriod} expenses={props.expenses} />
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32
    }
})

export default ExpensesOutput