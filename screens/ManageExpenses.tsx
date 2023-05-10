
import { StyleSheet, View } from "react-native";
import { ManageExpenseScreenNavigationProp, ManageExpenseScreenRouteProp } from "../utils/types";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";


type Props = {
    route: ManageExpenseScreenRouteProp;
    navigation: ManageExpenseScreenNavigationProp;
}

function ManageExpenses({ route, navigation }: Props) {
    return (
        <View style={styles.containerDelete}>
            <ExpenseForm route={route} navigation={navigation}></ExpenseForm>
        </View>
    )
}

const styles = StyleSheet.create({
    containerDelete: {
    },
})

export default ManageExpenses