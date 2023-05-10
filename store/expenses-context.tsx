// ExpenseContext.tsx
import { createContext, useReducer } from "react";
import Expenses from "../model/Expenses";

interface ExpenseContextType {
  expenses: Expenses[];
  addExpense: (expense: Expenses) => void;
  setExpenses: (expenses: Expenses[]) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (expense: Expenses) => void;
}

export const ExpenseContext = createContext<ExpenseContextType>({
  expenses: [],
  addExpense: (expense: Expenses) => { },
  setExpenses: (expense: Expenses[]) => { },
  deleteExpense: (id: string) => { },
  updateExpense: (expense: Expenses) => { },
});

type ActionType = "ADD_EXPENSE" | "DELETE_EXPENSE" | "UPDATE_EXPENSE" | "SET_EXPENSES";

interface IAction {
  type: ActionType;
  payload?: any;
}

function expenseReducer(state: Expenses[], action: IAction) {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [action.payload, ...state];
    case "SET_EXPENSES":
      const inverted = action.payload.reverse()
      return inverted;
    case "DELETE_EXPENSE":
      return state.filter((expense) => expense.id !== action.payload.id);
    case "UPDATE_EXPENSE":
      return state.map((expense) => {
        if (expense.id === action.payload.expense.id) {
          return { ...expense, ...action.payload.expense };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
}

function ExpenseContextProvider({ children }: { children: React.ReactNode }) {
  const [expensesState, dispatch] = useReducer(expenseReducer, []);

  const addExpense = (expense: Expenses) => {
    dispatch({ type: "ADD_EXPENSE", payload: expense });
  };

  const setExpenses = (expenses: Expenses[]) => {
    dispatch({ type: "SET_EXPENSES", payload: expenses });
  };

  const deleteExpense = (id: string) => {
    dispatch({ type: "DELETE_EXPENSE", payload: { id } });
  };

  const updateExpense = (expense: Expenses) => {
    dispatch({ type: "UPDATE_EXPENSE", payload: { expense } });
  };

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense
  }

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
}

export default ExpenseContextProvider;
