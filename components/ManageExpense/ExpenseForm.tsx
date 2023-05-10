import { Alert, StyleSheet, Text, View } from "react-native"
import Input from "./Input"
import { useContext, useLayoutEffect, useState } from "react"
import Button from "../UI/Button"
import { GlobalStyles } from "../../constants/styles"
import { ManageExpenseScreenNavigationProp, ManageExpenseScreenRouteProp } from "../../utils/types"
import { ExpenseContext } from "../../store/expenses-context"
import IconButton from "../UI/IconButton"
import Expenses from "../../model/Expenses"
import { getFormattedDate } from "../../utils/date"
import { deleteExpense, storeExpense, updateExpense } from "../../utils/http"
import LoadingOverlay from "../UI/LoadingOverlay"

type Props = {
    route: ManageExpenseScreenRouteProp;
    navigation: ManageExpenseScreenNavigationProp;
}

function ExpenseForm({ route, navigation }: Props) {
    const defaultValue = route.params?.item;
    const [inputValue, setInputValue] = useState({
        amount: defaultValue ? defaultValue.amount.toString() : '',
        date: defaultValue ? getFormattedDate(defaultValue.date) : '',
        description: defaultValue ? defaultValue.description : ''
    })

    function inputChangeHandler(inputIndentifier: string, input: string) {
        setInputValue((curInputValue) => {
            return {
                ...curInputValue,
                [inputIndentifier]: input
            }
        })
    }

    const [isSubmitting, setIsSubmitting] = useState(false)


    const expenseCtx = useContext(ExpenseContext)

    const id = route.params?.id;
    const isEditing = Boolean(id)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing])

    async function deleteExpenseHandler() {
        expenseCtx.deleteExpense(id)
        setIsSubmitting(true)
        await deleteExpense(id)
        setIsSubmitting(false)
        navigation.goBack()
    }

    function onPressCancelHandler() {
        navigation.goBack()
    }

    async function submitHandler() {
        const expenseInput = new Expenses(id, inputValue.description, parseFloat(inputValue.amount), new Date(inputValue.date))

        const amountIsValid = !isNaN(expenseInput.amount) && expenseInput.amount > 0
        const dateIsValid = expenseInput.date.toString() === 'Invalid Date'
        const amountIsDescription = expenseInput.description.trim().length > 0

        if(!amountIsValid || dateIsValid || !amountIsDescription) {
            Alert.alert('Invalid Input', 'Please check you input values')
            return
        }
        setIsSubmitting(true)
        if (isEditing) {
            expenseCtx.updateExpense(expenseInput)
            await updateExpense(id, expenseInput)
        } else {
            const id = await storeExpense(expenseInput)
            expenseInput.id = id
            expenseCtx.addExpense(expenseInput)
        }
        setIsSubmitting(false)
        navigation.goBack()
    }

    if(isSubmitting) {
        return <LoadingOverlay/>
    }


    return (
        <View style={styles.form}>
            <View style={styles.containerTitle}>
                <Text style={styles.textTitle}>Your Expense</Text>
            </View>
            <View style={styles.containerInputAmountAndDate}>
                <Input style={styles.rowInput} label="Amount" textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: (input: string) => inputChangeHandler('amount', input),
                    value: inputValue['amount']
                }} />
                <Input style={styles.rowInput} label="Date" textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: (input: string) => inputChangeHandler('date', input),
                    value: inputValue.date
                }} />
            </View>
            <View style={styles.containerInputDescription}>
                <Input label="Description" textInputConfig={{
                    multiline: true,
                    onChangeText: (input: string) => inputChangeHandler('description', input),
                    value: inputValue.description
                }} />
            </View>
            <View style={styles.containerButtons}>
                <Button mode="flat" children="Cancel" onPress={onPressCancelHandler} style={styles.button} />
                <Button mode="noflat" children={isEditing ? 'Update' : 'Add'} onPress={submitHandler} style={styles.button} />
            </View>
            <View style={styles.containerIconDelete}>
                {
                    isEditing && (<IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler}></IconButton>)
                }
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 80
    },
    containerTitle: {
        width: '100%',
        alignItems: 'center',
    },
    textTitle: {
        fontSize: 28,
        color: 'black',
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerInputAmountAndDate: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerInputDescription: {
        width: '100%',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1
    },
    containerIconDelete: {
        alignItems: 'center'
    },
    containerButtons: {
        flexDirection: 'row',
        marginTop: 16,
        marginHorizontal: 16,
        borderBottomWidth: 2,
        paddingBottom: 16,
        borderBottomColor: GlobalStyles.colors.accent500,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    }
})

export default ExpenseForm