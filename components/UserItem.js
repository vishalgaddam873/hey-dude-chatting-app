import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Avatar } from "@rneui/themed";

export default function UserItem({ fellowUser, currentUserId, navigation }) {
	const redirectToChatScreen = () => {
		navigation.navigate("Chat", {
			fellowUser: fellowUser,
			currentUserId: currentUserId,
		});
	};

	if (fellowUser.uid !== currentUserId) {
		return (
			<TouchableOpacity onPress={redirectToChatScreen}>
				<View style={styles.button}>
					<Avatar
						rounded
						source={{ uri: fellowUser.profileImage }}
						size={"large"}
						containerStyle={styles.avtarImage}
					/>
					<View style={styles.nameContainer}>
						<Text style={styles.name}>{fellowUser.name}</Text>
						<Text style={styles.lastMessageSent}>Tap here to chat</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
	},
	avtarImage: {
		margin: "3%",
	},
	nameContainer: {
		padding: "3%",
	},
	name: {
		fontSize: 20,
		fontWeight: "500",
		color: "#eceff1",
	},
	lastMessageSent: {
		fontSize: 13,
		fontWeight: "300",
		color: "#eceff1",
		paddingTop: "2%",
	},
});
