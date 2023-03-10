import { useState } from 'react';
import {
	View,
	StyleSheet,
	KeyboardAvoidingView,
	TextInput,
	Platform,
} from 'react-native';

import { Icon } from '@rneui/themed';
import firebase from '../config';

const colors = [
	'#455a64',
	'#ff6961',
	'#ffb480',
	'#f8f38d',
	'#42d6a4',
	'#08cad1',
	'#59adf6',
	'#9d94ff',
	'#c780e8',
	'#9368c1',
	'#873861',
	'#ff92b7',
];

export default function TextStoryScreen({ navigation, route }) {
	const { currentUserId } = route.params;
	const [storyText, setStoryText] = useState('');
	const [colorIndex, setColorIndex] = useState(0);
	const [bgColor, setBgColor] = useState(colors[0]);

	sendStory = async () => {
		const storyRef = await firebase
			.database()
			.ref('users/' + currentUserId + '/stories/')
			.get();

		if (storyRef.val()) {
			const newStoryRef = firebase
				.database()
				.ref('users/' + currentUserId + '/stories/')
				.push({
					userId: currentUserId,
					storyType: 'text',
					text: storyText,
					timestamp: firebase.database.ServerValue.TIMESTAMP,
					backgroundColor: bgColor,
				})
				.then(() => {
					navigation.goBack();
				})
				.catch((error) => {
					console.error(error.message);
				});
		} else {
			const newStoryRef = firebase
				.database()
				.ref('users/' + currentUserId + '/stories/')
				.push();

			newStoryRef
				.set({
					userId: currentUserId,
					storyType: 'text',
					text: storyText,
					timestamp: firebase.database.ServerValue.TIMESTAMP,
					backgroundColor: bgColor,
				})
				.then(() => {
					navigation.goBack();
				})
				.catch((error) => {
					console.error(error.message);
				});
		}
	};

	changeBackgroundColor = () => {
		setColorIndex(colorIndex + 1);

		if (colorIndex > colors.length) {
			setColorIndex(0);
		}

		setBgColor(colors[colorIndex]);
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={[styles.container, { backgroundColor: bgColor }]}>
			<View style={styles.upperContainer}>
				<Icon
					type={'ionicon'}
					name={'close'}
					color={'white'}
					size={32}
					onPress={() => navigation.goBack()}
				/>
				<Icon
					type={'ionicon'}
					name={'ios-color-palette-sharp'}
					color={'white'}
					size={32}
					onPress={changeBackgroundColor}
				/>
			</View>
			<View style={styles.middleContainer}>
				<TextInput
					multiline={true}
					style={styles.input}
					textAlign={'center'}
					maxLength={700}
					placeholder={'Type a story'}
					autoFocus={true}
					placeholderTextColor={'#b0bec5'}
					onChangeText={(text) => setStoryText(text)}
					value={storyText}
				/>
			</View>
			<View style={styles.lowerContainer}>
				<Icon
					name={'send'}
					type={'material'}
					size={30}
					color={'white'}
					containerStyle={styles.sendButton}
					onPress={sendStory}
				/>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 100 },
	upperContainer: {
		flex: 20,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	middleContainer: {
		flex: 65,
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		width: '100%',
		height: '80%',
		fontSize: 40,
		padding: 12,
		fontWeight: '500',
		color: 'white',
		outline: 'none',
	},
	lowerContainer: {
		flex: 15,
		paddingHorizontal: 10,
		backgroundColor: 'black',
		justifyContent: 'center',
	},
	sendButton: {
		alignSelf: 'flex-end',
		backgroundColor: '#1976d2',
		borderRadius: 30,
		alignItems: 'center',
		padding: 10,
	},
});
