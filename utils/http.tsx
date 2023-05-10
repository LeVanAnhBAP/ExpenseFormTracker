import axios from "axios";
import Expenses from "../model/Expenses";

const BASE_URL = 'https://react-native-cource-283ea-default-rtdb.firebaseio.com'

export async function storeExpense(expenseData: Expenses) {
    const response = await axios.post(BASE_URL + '/expenses.json', expenseData)
    const id = response.data.name
    return id
}

export async function fetchExpense() {
    const response = await axios.get(BASE_URL + '/expenses.json')
    const expenses = []

    for (const key in response.data) {
        const expenseObj: Expenses = {
            id: response.data[key].id,
            description: response.data[key].description,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date.slice(0, 10)),
        }
        expenses.push(expenseObj)
    }
    return expenses
}

export async function updateExpense(id: string, expenseData: Expenses) {
    return await axios.put(BASE_URL + `/expenses/${id}.json`, expenseData)
}

export async function deleteExpense(id: string) {
    return await axios.delete(BASE_URL + `/expenses/${id}.json`)

}