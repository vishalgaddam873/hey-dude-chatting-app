import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStackNavigator from "./components/AppStack";

export default function App() {
	return (
		<NavigationContainer>
			<AppStackNavigator />
		</NavigationContainer>
	);
}

// Color Palette : https://colorswall.com/palette/1358
// TextInput Color Palette : https://colorswall.com/palette/6
