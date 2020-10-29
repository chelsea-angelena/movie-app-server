import React from 'react';
import { Image } from 'react-native-elements';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as db from '../../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SavedItem = ({ item, userId }) => {
	const { id, Poster, Title } = item;
	const navigation = useNavigation();
	const deleteMovie = async () => {
		await db.deleteMovieItem(userId, id, navigation);
		navigation.navigate('MyList');
	};
	return (
		<View style={styles.view}>
			<Text style={styles.text}>{Title}</Text>
			<Image source={{ uri: Poster }} alt='' style={styles.image} />
			<TouchableOpacity onPress={deleteMovie}>
				<MaterialCommunityIcons
					name='trash-can-outline'
					size={24}
					color='white'
				/>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	view: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'black',
		width: 400,
		alignSelf: 'center',
		marginTop: 24,
		borderColor: 'white',
		borderWidth: 0.5,
		borderStyle: 'solid',
		padding: 16,
		textAlign: 'center',
	},
	text: {
		color: 'white',
		fontSize: 24,
		alignSelf: 'center',
		fontWeight: 'bold',
		paddingBottom: 16,
	},
	image: {
		width: 300,
		height: 200,
	},
	wrap: {
		width: '100%',
	},
});

export default SavedItem;
