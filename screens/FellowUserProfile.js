import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Icon } from '@rneui/themed';
import firebase from '../config';

export default function FellowUserProfileScreen({ route, navigation }) {
	const fellowUser = route.params.fellowUser;

	const [status, setStatus] = useState('Available');

	useEffect(() => {
		if (route.params.fellowUser.status) {
			setStatus(route.params.fellowUser.status);
		}
	}, [route.params.fellowUser]);

	return (
		<View style={styles.container}>
			<View style={styles.upperContainer}>
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => navigation.goBack()}>
					<Icon
						name={'arrow-back'}
						type={'material'}
						size={30}
						color={'black'}
					/>
				</TouchableOpacity>
				<Text style={styles.title}>Contact Info</Text>
			</View>
			<View style={styles.middleContainer}>
				<Avatar
					rounded
					source={{
						uri: fellowUser.profileImage,
					}}
					size='xlarge'
				/>
				<Text style={styles.name}>{fellowUser.name}</Text>
				<Text style={styles.username}>{fellowUser.email}</Text>
			</View>
			<View style={styles.lowerContainer}>
				<Text style={styles.aboutTitle}>About</Text>
				<View style={styles.aboutContainer}>
					<Text style={styles.aboutText}>{status}</Text>
				</View>
			</View>
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
		flexDirection: 'row',
		alignItems: 'center',
	},
	backButton: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '15%',
		height: 30,
		marginTop: '10%',
	},
	title: {
		fontSize: 20,
		fontWeight: '700',
		color: '#37474f',
		marginHorizontal: '23%',
		marginTop: '10%',
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
		backgroundColor: '#263238',
	},
	aboutText: {
		fontSize: 15,
		fontWeight: '700',
		color: '#eceff1',
		padding: '3%',
	},
});
