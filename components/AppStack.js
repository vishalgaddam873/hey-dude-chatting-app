import { createStackNavigator } from "@react-navigation/stack";

import SignInScreen from "../screens/SignIn";
import SignUpScreen from "../screens/SignUp";
import BottomTabNavigator from "./BottomTabs";

const Stack = createStackNavigator();

export default function AppStackNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				gestureEnabled: false,
			}}>
			<Stack.Screen name='SignIn' component={SignInScreen} />
			<Stack.Screen name='SignUp' component={SignUpScreen} />
			<Stack.Screen name='BottomTabs' component={BottomTabNavigator} />
		</Stack.Navigator>
	);
}
