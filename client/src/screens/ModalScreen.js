import React, { useState, useEffect, useContext } from 'react';
import {
	ImageBackground,
	Alert,
	StyleSheet,
	View,
	Text,
	ScrollView,
} from 'react-native';
import { Button, Card } from 'react-native-elements';
import { Dimensions } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';
import { AuthContext } from '../Context/AuthContext';
import * as db from '../../config/firebaseConfig';
import FormButton from '../screens/Auth/FormButton';
import MovieDetails from './MovieDetails';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import api from '../api/api';
export default function ModalScreen(props, { item, route }) {
	let id = props.route.params.item.imdbID;
	const user = useContext(AuthContext);
	const [movie, setmovie] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [button, setButton] = useState(true);
	const navigation = useNavigation();
	const userId = user.uid;

	const getmovie = async () => {
		try {
			let result = await api.get(`/api/${id}`);
			setmovie(result.data);
		} catch (e) {
			setError(e);
		}
		setLoading(false);
	};
	useEffect(() => {
		getmovie();
	}, []);

	if (!id) {
		return <Text>loading...</Text>;
	}
	if (!movie) {
		return <Text>loading...</Text>;
	}

	return (

			<MovieDetails
				error={error}
				loading={loading}
				userId={userId}
				imdbID={id}
				movie={movie}
				setButton={setButton}
				button={button}
				navigation={navigation}
			/>

	);
}
