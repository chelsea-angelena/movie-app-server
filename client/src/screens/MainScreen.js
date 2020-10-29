import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import MySearchBar from './SearchBarTwo';


export default function MainScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.view}>
				<MySearchBar />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	view: {
		marginTop: 40,
	},
	container: {
		backgroundColor: 'black',
	},
});
