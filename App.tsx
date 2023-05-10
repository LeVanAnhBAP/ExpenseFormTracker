import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import ManageExpense from './screens/ManageExpenses';
import { GlobalStyles } from './constants/styles';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconButton from './components/UI/IconButton';
import ExpenseContextProvider from './store/expenses-context';
import { RootStackParamList } from './utils/types';


const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTabs = createBottomTabNavigator()

function ExpensesOverView() {
  function onPressHeaderRightHander() {

  }

  return <BottomTabs.Navigator screenOptions={({ navigation }) => ({
    headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
    headerTintColor: 'white',
    tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
    tabBarActiveTintColor: GlobalStyles.colors.accent500,
    headerRight: ({ tintColor }) => (<IconButton icon='add' size={24} color={'white'} onPress={() => navigation.navigate("ManageExpense")
    } />),
  })}>
    <BottomTabs.Screen name='RecentExpenses' component={RecentExpenses}
      options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({ color, size }) => <Icon name='rocket' size={size} color={color}></Icon>,
      }} />
    <BottomTabs.Screen name='AllExpenses' component={AllExpenses}
      options={{
        title: 'All Expenses',
        tabBarLabel: 'All Expenses',
        tabBarIcon: ({ color, size }) => <Icon name='calendar' size={size} color={color}></Icon>
      }} />
  </BottomTabs.Navigator>
}

const App = () => {
  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={GlobalStyles.colors.primary500} />
      <ExpenseContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: 'white'
          }}>
            <Stack.Screen name="ExpensesOverView" component={ExpensesOverView} options={{ headerShown: false }} />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{ title: 'Manage Expense', presentation: 'modal' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpenseContextProvider>

    </>
  );
};

export default App;