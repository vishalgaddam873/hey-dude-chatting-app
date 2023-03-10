import { View, Text, StyleSheet } from "react-native";

export default function ChatMessage({ item, currentUserId }) {
	return (
		<View
			style={[
				{
					alignSelf: item.userId === currentUserId ? "flex-end" : "flex-start",
					backgroundColor:
						item.userId === currentUserId ? "#ADD8E6" : "#ededed",
				},
				styles.messageContainer,
			]}>
			<Text>{item.message}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	messageContainer: {
		padding: 10,
		margin: 10,
		borderRadius: 10,
		width: "70%",
	},
});
