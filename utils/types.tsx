import { NavigationProp, RouteProp } from "@react-navigation/native";
import Expenses from "../model/Expenses";

export type RootStackParamList = {
  Home: undefined;
  ManageExpense: { id: string, item: Expenses };
  ExpensesOverView: {};
  // other screens
};

export type ManageExpenseScreenRouteProp = RouteProp<RootStackParamList, "ManageExpense">;
export type ManageExpenseScreenNavigationProp = NavigationProp<RootStackParamList,"ManageExpense">;

export type ExpensesOverViewScreenRouteProp = RouteProp<RootStackParamList, "ExpensesOverView">;
export type ExpensesOverViewScreenNavigationProp = NavigationProp<RootStackParamList,"ExpensesOverView">;