import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "react-native-vector-icons";

import HomeScreen from "../screens/Home";
import ChatScreen from "../screens/Chat";
import ProfileScreen from "../screens/Profile";
import StoryScreen from "../screens/Story";
import TextStoryScreen from "../screens/TextStory";
import SnapStoryScreen from "../screens/SnapStory";
import FellowUserProfileScreen from "../screens/FellowUserProfile";

const Stack = createStackNavigator();

function StackNavigator(props) {
	const currentUserId = props.route.params.currentUserId;

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<Stack.Screen
				name='Home'
				component={HomeScreen}
				initialParams={{ currentUserId: currentUserId }}
			/>
			<Stack.Screen name='Chat' component={ChatScreen} />
			<Stack.Screen name='FellowProfile' component={FellowUserProfileScreen} />
		</Stack.Navigator>
	);
}

const StoryStack = createStackNavigator();

function StoryStackNavigator(props) {
	const currentUserId = props.route.params.currentUserId;

	return (
		<StoryStack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<StoryStack.Screen
				name='Story'
				component={StoryScreen}
				initialParams={{ currentUserId: currentUserId }}
			/>
			<StoryStack.Screen
				name='TextStory'
				component={TextStoryScreen}
				initialParams={{ currentUserId: currentUserId }}
			/>
			<StoryStack.Screen name='SnapStory' component={SnapStoryScreen} />
		</StoryStack.Navigator>
	);
}

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator({ route }) {
	const { currentUserId } = route.params;

	return (
		<Tab.Navigator>
			<Tab.Screen
				name='StackNavigator'
				component={StackNavigator}
				initialParams={{ currentUserId: currentUserId }}
				options={{
					headerShown: false,
					tabBarLabel: "Chatcs",
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name='chat' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name='StoryStackNavigator'
				component={StoryStackNavigator}
				initialParams={{ currentUserId: currentUserId }}
				options={{
					headerShown: false,
					tabBarLabel: "Stories",
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name='add' color={color} size={size} />
					),
				}}
			/>

			<Tab.Screen
				name='Profile'
				component={ProfileScreen}
				initialParams={{ currentUserId: currentUserId }}
				options={{
					headerShown: false,
					tabBarLabel: "Profile",
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name='account-circle' color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}
