import { FlatList, Text, View } from "react-native"
import Expenses from "../../model/Expenses"
import ExpenseItem from "./ExpenseItem"

interface Props {
    expenses: Expenses[],
}

function ExpensesList(props: Props) {
    function RenderItemListExpenses(item: Expenses) {
        return <ExpenseItem data={item}></ExpenseItem>
    }
    
    return (
        <FlatList data={props.expenses} keyExtractor={(item) => item.id} renderItem={(data) => RenderItemListExpenses(data.item)}></FlatList>
    )
}

export default ExpensesList