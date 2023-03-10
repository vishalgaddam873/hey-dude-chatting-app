import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import firebase from "../config";

const profileImages = [
	"https://cdn1.iconfinder.com/data/icons/kawai-animal-costum-avatar/64/avatar_animal_costume_-teaser_giraffe-512.png",
	"https://cdn1.iconfinder.com/data/icons/kawai-animal-costum-avatar/64/avatar_animal_costume_-sleepy_owl-512.png",
	"https://cdn1.iconfinder.com/data/icons/kawai-animal-costum-avatar/64/avatar_animal_costume_-crocodile-512.png",
	"https://cdn1.iconfinder.com/data/icons/kawai-animal-costum-avatar/64/avatar_animal_costume_-sleeper_cow-512.png",
	"https://cdn1.iconfinder.com/data/icons/kawai-animal-costum-avatar/64/avatar_animal_costume_-skeptical_panda-512.png",
	"https://cdn1.iconfinder.com/data/icons/kawai-animal-costum-avatar/64/avatar_animal_costume_-cunning_wolf-512.png",
	"https://cdn1.iconfinder.com/data/icons/kawai-animal-costum-avatar/64/avatar_animal_costume_-pinguin_shiver-512.png",
	"https://cdn1.iconfinder.com/data/icons/kawai-animal-costum-avatar/64/avatar_animal_costume_-ridiculous_dog-512.png",
	"https://cdn1.iconfinder.com/data/icons/kawai-animal-costum-avatar/64/avatar_animal_costume_-cool_monkey-512.png",
	"https://cdn1.iconfinder.com/data/icons/kawai-animal-costum-avatar/64/avatar_animal_costume_-dizzy_frog-512.png",
	"https://cdn1.iconfinder.com/data/icons/kawai-animal-costum-avatar/64/avatar_animal_costume_-lazy_elephant-512.png",
	"https://cdn1.iconfinder.com/data/icons/kawai-animal-costum-avatar/64/avatar_animal_costume_-angry_tiger-512.png",
	"https://cdn1.iconfinder.com/data/icons/kawai-animal-costum-avatar/64/avatar_animal_costume_-ridicule_rhino-512.png",
	"https://cdn1.iconfinder.com/data/icons/kawai-animal-costum-avatar/64/avatar_animal_costume_-teaser_rat-512.png",
];

export default function SignUpScreen() {
	// Declare state variables
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	const navigation = useNavigation();

	function handleSignUp() {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(function (data) {
				const uid = data.user.uid;

				let randomImageIndex = Math.floor(Math.random() * profileImages.length);

				firebase
					.database()
					.ref("users/" + uid)
					.set({
						name: name,
						email: email,
						uid: uid,
						connection: {},
						profileImage: profileImages[randomImageIndex],
					});

				navigation.navigate("BottomTabs", {
					currentUserId: uid,
				});
			})
			.catch(function (error) {
				setErrorMsg(error.message);
			});
	}

	return (
		<View style={styles.container}>
			<View style={styles.upperContainer}>
				<Image source={require("../signUp.jpg")} style={styles.appIcon} />
				<Text style={styles.title}>Create Account</Text>
			</View>
			<View style={styles.lowerContainer}>
				<Text style={styles.errorMsg}>{errorMsg}</Text>
				<TextInput
					onChangeText={(text) => setName(text)}
					placeholder={"Full Name"}
					placeholderTextColor={"#eceff1"}
					style={styles.input}
					value={name}
				/>
				<TextInput
					onChangeText={(text) => setEmail(text)}
					placeholder={"Email Address"}
					placeholderTextColor={"#eceff1"}
					style={styles.input}
					value={email}
				/>
				<TextInput
					onChangeText={(text) => setPassword(text)}
					placeholder={"Password"}
					placeholderTextColor={"#eceff1"}
					style={styles.input}
					secureTextEntry={true}
					value={password}
				/>

				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => handleSignUp()}>
						<Text style={styles.buttonText}>Sign up</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.newAccountTextContainer}
						onPress={() => navigation.navigate("SignIn")}>
						<Text style={styles.newAccountText}>
							Already have an account? Sign in
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	upperContainer: {
		flex: 0.25,
		justifyContent: "center",
		alignItems: "center",
	},
	appIcon: {
		width: 150,
		height: 150,
		resizeMode: "contain",
		alignSelf: "center",
	},
	title: {
		fontSize: 25,
		fontWeight: "600",
	},
	lowerContainer: {
		marginTop: 30,
		flex: 0.75,
		alignItems: "center",
	},
	errorMsg: {
		color: "#ff5252",
		textAlign: "center",
	},
	input: {
		width: 300,
		height: 60,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		borderRadius: 30,
		borderColor: "#57a1f8",
		color: "grey",
		placeholderTextColor: "#d1d0d0",
		shadowOffset: { width: 2, height: 1 },
		shadowColor: "#171717",
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	buttonContainer: {
		paddingTop: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		width: 130,
		height: 45,
		borderRadius: 30,
		backgroundColor: "#57a1f8",
		justifyContent: "center",
		alignItems: "center",
		shadowOffset: { width: 2, height: 4 },
		shadowColor: "#171717",
		shadowOpacity: 0.3,
		shadowRadius: 3,
	},
	buttonText: {
		fontSize: 20,
		color: "#eceff1",
		fontWeight: "500",
	},
	newAccountTextContainer: {
		width: 230,
		height: 40,
		justifyContent: "ceter",
		alignItems: "center",
		marginTop: 20,
	},
	newAccountText: {
		color: "grey",
		fontWeight: "350",
	},
});
