import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { ExpenseContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { fetchExpense } from "../utils/http";
import Expenses from "../model/Expenses";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function RecentExpenses() {

    const expensesCtx = useContext(ExpenseContext)

    const [isFetching, setIsFetching] = useState(true)
    const [fetchExpenses, setFetchExpenses] = useState<Expenses[]>([])

    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true)
            const expenses = await fetchExpense()
            setIsFetching(false)
            expensesCtx.setExpenses(expenses)
        }

        getExpenses()
    }, [])

    if(isFetching) {
        return <LoadingOverlay></LoadingOverlay>
    }

    const expensesRecent = expensesCtx.expenses.filter((expense) => {
        const today = new Date()
        const date7DaysAgo = getDateMinusDays(today, 7)
        return expense.date > date7DaysAgo
    })
    return (
        <ExpensesOutput expenses={expensesRecent} expensesPeriod="Last 7 days" fallbackText="No expenese registed for the last 7 days" />
    )
}

export default RecentExpenses