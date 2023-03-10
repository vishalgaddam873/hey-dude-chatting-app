import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Avatar, Icon } from '@rneui/themed';
import firebase from '../config';
import { ScrollView } from 'react-native-gesture-handler';
import StoryCard from '../components/StoryCard';

export default function StoryScreen({ route, navigation }) {
	const { currentUserId } = route.params;
	const [currentUser, setCurrentUserDetails] = useState({});
	const [otherUserStories, setOtherUserStories] = useState([]);
	const [currentUserStories, seCurrentUserStories] = useState([]);

	getStories = (currentUserId) => {
		firebase
			.database()
			.ref('users')
			.on('value', (snapshot) => {
				if (snapshot.exists) {
					const allUsers = Object.values(snapshot.val());
					let newStories = [];
					allUsers.forEach((user) => {
						if (user.stories) {
							if (user.uid === currentUserId) {
								seCurrentUserStories(Object.values(user.stories));
							} else {
								newStories.push(Object.values(user.stories));
							}
						}
					});

					setOtherUserStories(newStories);
				}
			});
	};

	getUserDetails = async (currentUserId) => {
		const userRef = await firebase
			.database()
			.ref('users/' + currentUserId)
			.get();
		const userDatails = userRef.val();
		setCurrentUserDetails(userDatails);
	};

	useEffect(() => {
		getUserDetails(currentUserId);
		getStories(currentUserId);
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.upperContainer}>
				<Text style={styles.title}>Story</Text>
			</View>
			<View style={styles.middleContainer}>
				<TouchableOpacity
					style={styles.myStoryButton}
					onPress={() => navigation.navigate('TextStory')}>
					<Avatar
						source={{ uri: currentUser.profileImage }}
						rounded
						size={'medium'}>
						<Avatar.Accessory size={15} type={'material'} name={'add'} />
					</Avatar>
					<View style={{ paddingLeft: 20 }}>
						<Text style={styles.myStoryTitle}>My Story</Text>
						<Text style={styles.myStorySubtitle}>Add to my story</Text>
					</View>
					<TouchableOpacity onPress={() => navigation.navigate('TextStory')}>
						<Icon
							type='material'
							name='edit'
							size={20}
							iconStyle={styles.iconStyle}
							containerStyle={{ marginLeft: 150, alignSelf: 'flex-end' }}
						/>
					</TouchableOpacity>
				</TouchableOpacity>
			</View>
			<View style={styles.lowerContainer}>
				<StoryCard stories={currentUserStories} />
				<ScrollView>
					{otherUserStories.map((stories) => (
						<StoryCard stories={stories} />
					))}
				</ScrollView>
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
	middleContainer: {
		flex: 15,
		justifyContent: 'center',
	},
	myStoryButton: {
		flexDirection: 'row',
		alignItems: 'center',

		padding: 10,
		backgroundColor: '#439c43',
	},
	myStoryTitle: { fontWeight: '600', fontSize: 15 },
	myStorySubtitle: { fontWeight: '400', fontSize: 12 },
	iconStyle: {
		backgroundColor: '#455a64',
		padding: 10,
		borderRadius: 24,
	},
	title: {
		fontSize: 28,
		fontWeight: '700',
		paddingLeft: '3%',
		paddingTop: '10%',
		color: '#37474f',
	},
	lowerContainer: { flex: 65 },
	itemSeparator: {
		height: 0.5,
		width: '100%',
		backgroundColor: '#eceff1',
	},
});
