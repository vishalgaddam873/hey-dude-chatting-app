import React, { useState, useEffect } from 'react';

import { View, Text, FlatList, StyleSheet } from 'react-native';

import firebase from '../config';
import UserItem from '../components/UserItem';

export default function HomeScreen({ route, navigation }) {
	const { currentUserId } = route.params;

	const [allUsers, setAllUsers] = useState([]);

	useEffect(() => {
		getAllUsers();
	}, []);

	const getAllUsers = async () => {
		let allUsers = await firebase.database().ref('users').get();
		allUsers = Object.values(allUsers.val());
		setAllUsers(allUsers);
	};

	const ItemSeparatorView = () => <View style={styles.itemSeparator} />;

	return (
		<View style={styles.container}>
			<View style={styles.upperContainer}>
				<Text style={styles.title}>Chats</Text>
			</View>
			<View style={styles.lowerContainer}>
				<FlatList
					data={Object.values(allUsers)}
					renderItem={({ item }) => (
						<UserItem
							fellowUser={item}
							currentUserId={currentUserId}
							navigation={navigation}
						/>
					)}
					keyExtractor={(item, index) => index.toString()}
					ItemSeparatorComponent={ItemSeparatorView}
				/>
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
		justifyContent: 'center',
	},
	title: {
		fontSize: 28,
		fontWeight: '700',
		paddingLeft: '3%',
		paddingTop: '10%',
		color: '#37474f',
	},
	lowerContainer: { flex: 85 },
	itemSeparator: {
		height: 1,
		width: '100%',
		backgroundColor: '#eceff1',
	},
});
