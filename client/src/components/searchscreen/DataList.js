import React from 'react';
import { TouchableOpacity, View, Text, FlatList } from 'react-native';
import ListItem from './ListItem';
import { useNavigation } from '@react-navigation/native';

const DataList = ({ movies, loading, error }) => {
	const navigation = useNavigation();

	if (loading || !movies) {
		return <Text>Loading...</Text>;
	}
	if (error) {
		return <Text> Error...</Text>;
	}
	return (
		<View>
			<Text> List Page</Text>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={movies}
				keyExtractor={(movies) => movies.imdbID}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity
							onPress={() => navigation.navigate('Modal', { item })}
						>
							<ListItem
								navigation={navigation}
								item={item}
								id={item.imdbID}
								title={item.Title}
								year={item.Year}
								imageUri={item.Poster}
							/>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
};

export default DataList;
