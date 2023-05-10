import { Text } from "react-native";
import { useContext } from "react";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { ExpenseContext } from "../store/expenses-context";

function AllExpenses(){
    const expensesCtx = useContext(ExpenseContext)
    return(
        <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" fallbackText="No expenese registed for the last 7 days"/>
    )
}

export default AllExpenses