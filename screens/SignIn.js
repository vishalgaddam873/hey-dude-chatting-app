import React, { useEffect, useState } from 'react';
import {
	View,
	StyleSheet,
	Text,
	Image,
	TouchableOpacity,
	TextInput,
} from 'react-native';

import firebase from '../config';
import AppLoadingScreen from '../components/AppLoading';

export default function SignInScreen({ navigation }) {
	// Declare state variables
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	function handleSignIn() {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(function () {
				const usersRef = firebase.database().ref('users');
				usersRef
					.orderByChild('email')
					.equalTo(email)
					.once('value', (snapshot) => {
						snapshot.forEach((childSnapshot) => {
							const userData = childSnapshot.val();
							navigation.navigate('BottomTabs', {
								currentUserId: userData.uid,
							});
						});
					});
			})
			.catch(function (error) {
				setErrorMsg(error.message);
			});
	}

	useEffect(() => {
		firebase.auth().onAuthStateChanged(async (user) => {
			if (user) {
				navigation.navigate('BottomTabs', {
					currentUserId: user.uid,
				});
			} else {
				setIsLoading(false);
			}
		});
	});

	if (isLoading) {
		return <AppLoadingScreen />;
	}

	return (
		<View style={styles.container}>
			<View style={styles.upperContainer}>
				<Image source={require('../signUp.jpg')} style={styles.appIcon} />
				<Text style={styles.title}>Welcome Back!</Text>
			</View>
			<View style={styles.lowerContainer}>
				<View style={styles.inpiutContainer}>
					<Text style={styles.errorMsg}>{errorMsg}</Text>
					<TextInput
						style={styles.input}
						placeholder={'Email Address'}
						placeholderTextColor={'#eceff1'}
						onChangeText={(text) => setEmail(text)}
						value={email}
					/>
					<TextInput
						style={styles.input}
						secureTextEntry={true}
						placeholder={'Password'}
						placeholderTextColor={'#eceff1'}
						onChangeText={(text) => setPassword(text)}
						value={password}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button} onPress={handleSignIn}>
						<Text style={styles.buttonText}>Sign in</Text>
					</TouchableOpacity>
					<View style={styles.horizontalLine} />
					<TouchableOpacity
						style={styles.newAccountButton}
						onPress={() => navigation.navigate('SignUp')}>
						<Text style={styles.newAccountText}>
							Create your Hey Dude account
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
		backgroundColor: 'white',
	},
	upperContainer: {
		flex: 0.35,
		justifyContent: 'center',
		alignItems: 'center',
	},
	appIcon: {
		width: '70%',
		height: '80%',
		resizeMode: 'contain',
	},
	title: {
		fontSize: 25,
		fontWeight: '600',
	},
	lowerContainer: {
		marginTop: 7,
		flex: 0.65,
	},
	errorMsg: {
		color: '#ff5252',
		textAlign: 'center',
	},
	inpiutContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		width: 300,
		height: 60,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		borderRadius: 30,
		borderColor: '#57a1f8',
		color: 'grey',
		placeholderTextColor: '#d1d0d0',
		shadowOffset: { width: 2, height: 1 },
		shadowColor: '#171717',
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	buttonContainer: {
		paddingTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		width: 130,
		height: 45,
		borderRadius: 30,
		backgroundColor: '#57a1f8',
		justifyContent: 'center',
		alignItems: 'center',
		shadowOffset: { width: 2, height: 4 },
		shadowColor: '#171717',
		shadowOpacity: 0.3,
		shadowRadius: 3,
	},
	buttonText: {
		fontSize: 20,
		color: '#eceff1',
		fontWeight: '500',
	},
	newAccountButton: {
		width: 230,
		height: 40,
		justifyContent: 'ceter',
		alignItems: 'center',
		marginTop: 20,
	},
	newAccountText: {
		color: 'grey',
		fontWeight: '350',
	},
});
