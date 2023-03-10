import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Modal } from 'react-native';
import { Avatar, Icon } from '@rneui/themed';
import firebase from '../config';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ProfileScreen({ route }) {
	const currentUserId = route.params.currentUserId;

	const [user, setUser] = useState({});
	const [status, setStatus] = useState('Available');
	const [statusEditEnabled, setSatusEditEnabled] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);

	useEffect(() => {
		getUserDetails();
	}, []);

	const getUserDetails = async () => {
		firebase
			.database()
			.ref('/users/' + currentUserId)
			.once('value', (snapshot) => {
				setUser(snapshot.val());
				if (snapshot.val().status) {
					setStatus(snapshot.val().status);
				}
			});
	};

	const handleStatusUpdate = () => {
		setSatusEditEnabled(!statusEditEnabled);
		if (statusEditEnabled) {
			firebase
				.database()
				.ref('users/' + currentUserId)
				.update({
					status: status,
				})
				.then(() => {
					setIsModalVisible(true);
				});
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.upperContainer}>
				<Text style={styles.title}>Profile</Text>
			</View>
			<View style={styles.middleContainer}>
				<Avatar
					rounded
					source={{
						uri: user.profileImage,
					}}
					size={'xlarge'}
				/>
				<Text style={styles.name}>{user.name}</Text>
				<Text style={styles.username}>{user.email}</Text>
			</View>
			<View style={styles.lowerContainer}>
				<Text style={styles.aboutTitle}>About</Text>
				<View style={styles.aboutContainer}>
					<TextInput
						value={status}
						onChangeText={(text) => setStatus(text)}
						style={styles.aboutText}
						editable={statusEditEnabled}
						autoFocus={statusEditEnabled}
					/>
					<Icon
						type={'material'}
						name={statusEditEnabled ? 'send' : 'edit'}
						color={'#eceff1'}
						containerStyle={styles.editButton}
						onPress={handleStatusUpdate}
					/>
				</View>
			</View>

			<Modal
				animationType={'fade'}
				transparent={true}
				background={'transparent'}
				visible={isModalVisible}>
				<View style={styles.modalSubContainer}></View>
				<View style={styles.modalContainer}>
					<Text style={styles.sucessMessage}>Status updted successfully!</Text>
					<TouchableOpacity onPress={() => setIsModalVisible(false)}>
						<Text style={styles.okText}>OK</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.modalSubContainer}></View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 100,
		backgroundColor: '#455a64',
	},
	upperContainer: {
		flex: 15,
		backgroundColor: '#439c43',
		justifyContent: 'center',
	},
	title: {
		fontSize: 28,
		fontWeight: '700',
		paddingLeft: '3%',
		paddingTop: '10%',
		color: '#37474f',
	},
	middleContainer: {
		flex: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},
	name: {
		fontSize: 35,
		fontWeight: '800',
		color: '#eceff1',
	},
	username: {
		color: '#eceff1',
	},
	lowerContainer: {
		flex: 55,
	},
	aboutTitle: {
		fontSize: 25,
		fontWeight: '800',
		padding: 5,
	},
	aboutContainer: {
		width: '100%',
		height: '10%',
		flexDirection: 'row',
		backgroundColor: '#263238',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	aboutText: {
		fontSize: 15,
		fontWeight: '700',
		color: '#eceff1',
		padding: '3%',
	},
	editButton: {
		marginRight: '4%',
	},
	modalContainer: {
		flex: 10,
		width: '80%',
		borderRadius: 20,
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#439c43',
	},
	sucessMessage: {
		fontSize: 18,
	},
	okText: {
		fontSize: 18,
		paddingTop: 30,
	},
	modalSubContainer: { flex: 20 },
});
