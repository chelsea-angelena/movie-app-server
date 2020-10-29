import React, { useState, useEffect, useContext } from 'react';
import {
	ImageBackground,
	SafeAreaView,
	Text,
	StyleSheet,
	FlatList,
} from 'react-native';
import * as db from '../../config/firebaseConfig';
import SavedItem from './SavedItem';
import { AuthContext } from '../Context/AuthContext';
let indexTitle = 'My Saved Movies';
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;

export default function MyList({ route, navigation }) {
	const [movieList, setMovieList] = useState([]);
	const [error, setError] = useState(null);
	const user = useContext(AuthContext);
	const userId = user.uid;

	const getSavedMovieList = async () => {
		try {
			let response = await db.getSavedMovies(userId);
			setMovieList(response);
		} catch (e) {
			setError(e, 'error');
		}
	};

	useEffect(() => {
		getSavedMovieList();
	}, []);
	if (!userId) {
		return <Text>Loading...</Text>;
	}
	return (
		<SafeAreaView style={styles.view}>
			<ImageBackground
				alt='theatre'
				style={{ resizeMode: 'cover', width: '100%', height: windowHeight }}
				source={{
					uri:
						'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
				}}
			>
				<Text style={styles.text}>{indexTitle}</Text>

				<FlatList
					data={movieList}
					keyExtractor={(movieList) => movieList.id}
					renderItem={({ item }) => {
						return <SavedItem item={item} userId={userId} />;
					}}
				/>
			</ImageBackground>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	view: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: windowHeight,
	},
	text: {
		color: 'white',
		fontSize: 32,
		alignSelf: 'center',
		fontWeight: 'bold',
		marginTop: 32,
	},
	image: {
		width: 300,
		height: 200,
	},
	wrap: {
		width: '100%',
	},
});
