import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	ImageBackground,
	FlatList,
	KeyboardAvoidingView,
} from "react-native";

import firebase from "../config";

import { Icon, Avatar } from "@rneui/themed";
import ChatMessage from "../components/ChatMessage";

export default function ChatScreen({ route, navigation }) {
	const [flatListRef, setFlatListRef] = useState(null);
	const { fellowUser, currentUserId } = route.params;
	const [currentChatId, setCurrentChatId] = useState(null);
	const [message, setMessage] = useState("");
	const [allChats, setAllChats] = useState([]);

	useEffect(() => {
		getChatId(currentUserId, fellowUser.uid);
	}, []);

	const getChatId = async (currentUserId, fellowUserId) => {
		firebase
			.database()
			.ref("/users/" + currentUserId)
			.once("value", (snapshot) => {
				snapshot.val().connections
					? handleChatRoom(snapshot.val().connections[fellowUserId])
					: handleChatRoom(null);
			});
	};

	const handleChatRoom = (chatId) => {
		setCurrentChatId(chatId);
		getAllChats(chatId);
	};

	const getAllChats = (chatId) => {
		firebase
			.database()
			.ref("chats/" + chatId)
			.limitToLast(20)
			.orderByChild("timestamp")
			.on("value", (snapshot) => {
				if (snapshot.exists) {
					let data = [];
					snapshot.forEach((childSnapshot) => {
						data.push(childSnapshot.val());
					});
					setAllChats(data);
					setMessage("");
				}
			});
	};

	const sendMessage = async () => {
		if (!currentChatId) {
			const chatsRef = firebase.database().ref("chats");
			const newChatRef = chatsRef.push();

			const chatMessage = [
				{
					userId: currentUserId,
					message: message,
					timestamp: firebase.database.ServerValue.TIMESTAMP,
				},
			];
			newChatRef.set(chatMessage);

			const newChatId = newChatRef.key;
			setCurrentChatId(newChatId);

			const currentUserConnectionRef = firebase
				.database()
				.ref("users/" + currentUserId + "/connections");
			currentUserConnectionRef.update({
				[fellowUser.uid]: newChatId,
				
			});

			const userConnectionRef = firebase
				.database()
				.ref("users/" + fellowUser.uid + "/connections");
			userConnectionRef.update({
				[currentUserId]: newChatId,
			});

			getAllChats(newChatId);
		} else {
			const chatMessage = {
				userId: currentUserId,
				message: message,
				timestamp: firebase.database.ServerValue.TIMESTAMP,
			};

			let chatsRef = firebase.database().ref("chats/" + currentChatId);
			let chatsObj = await chatsRef.get();
			let chats = Object.values(chatsObj.val());

			chats.push(chatMessage);
			chatsRef.set(chats);
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}>
			<View style={styles.upperContainer}>
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => navigation.navigate("Home")}>
					<Icon
						name={"arrow-back"}
						type={"material"}
						size={30}
						color={"black"}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.profileButton}
					onPress={() =>
						navigation.navigate("FellowProfile", { fellowUser: fellowUser })
					}>
					<Avatar
						rounded
						source={{ uri: fellowUser.profileImage }}
						size={60}
						containerStyle={styles.avtarImage}
					/>
					<View style={{ marginTop: "10%" }}>
						<Text style={styles.name}>{fellowUser.name}</Text>
						<Text style={styles.subTitle}>Tap here to see user details</Text>
					</View>
				</TouchableOpacity>
			</View>
			<View style={styles.middleContainer}>
				<ImageBackground
					source={{
						uri: "https://wallpapers.com/images/hd/whatsapp-chat-doodle-patterns-jyd5uvep2fdwjl97.jpg",
					}}
					style={styles.chattingBackgroundImage}>
					{/* Dynamically update the chat here */}
					<FlatList
						ref={(ref) => {
							setFlatListRef(ref);
						}}
						onContentSizeChange={() =>
							flatListRef.scrollToEnd({ animated: true })
						}
						data={allChats}
						renderItem={({ item }) => (
							<ChatMessage item={item} currentUserId={currentUserId} />
						)}
						keyExtractor={(item, index) => index.toString()}
					/>
				</ImageBackground>
			</View>
			<View style={styles.lowerContainer}>
				<TextInput
					style={styles.input}
					onChangeText={setMessage}
					value={message}
				/>
				<Icon
					name={"send"}
					type={"material"}
					size={30}
					color={"#439c43"}
					containerStyle={styles.sendButton}
					onPress={message ? sendMessage : null}
				/>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		
	},
	upperContainer: {
		flex: 20,
		backgroundColor: "#439c43",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	backButton: {
		alignItems: "center",
		justifyContent: "center",
		width: "15%",
		height: 30,
		marginTop: "7%",
	},
	profileButton: {
		width: "85%",
		height: "100%",
		flexDirection: "row",
		alignItems: "center",
	},
	avtarImage: {
		marginTop: "10%",
		marginLeft: "4%",
	},
	name: {
		fontSize: 23,
		fontWeight: "700",
		color: "#37474f",
		marginLeft: "5%",
	},
	subTitle: {
		fontSize: 15,
		fontWeight: "400",
		color: "#37474f",
		marginLeft: "5%",
	},
	middleContainer: {
		flex: 67,
	},
	chattingBackgroundImage: {
		flex: 1,
	},
	lowerContainer: {
		flex: 13,
		backgroundColor: "#439c43",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	input: {
		width: "70%",
		height: 50,
		padding: 10,
		backgroundColor: "#37474f",
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		outline: "none",
		color: "#eceff1",
	},
	sendButton: {
		padding: 10,
		backgroundColor: "#37474f",
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		borderColor: "#439c43",
	},
});
