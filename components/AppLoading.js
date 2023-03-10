import { View, Image, StyleSheet } from 'react-native';

export default function AppLoadingScreen() {
	return (
		<View style={styles.container}>
			<Image
				source={require('../assets/icon-large.png')}
				style={styles.iconImage}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#455a64',
	},
	iconImage: {
		width: 200,
		height: 200,
		resizeMode: 'contain',
	},
});
