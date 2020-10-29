import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import colors from '../../styles/colors';

const ListItem = ({ navigation, title, year, imageUri, id, item }) => {
	return (
		<Card
			wrapperStyle={{ color: colors.white }}
			containerStyle={{
				backgroundColor: colors.grey,
				width: 400,
				alignSelf: 'center',
			}}
			style={styles.card}
		>
			<Card.Title style={styles.title}>{title}</Card.Title>
			<Card.Title style={styles.subtitle}>{year}</Card.Title>
			<Card.Divider style={styles.divider} />

			<Card.Image
				resizeMode='contain'
				wrapperStyle={styles.wrapper}
				alt=''
				style={styles.image}
				source={{ uri: imageUri }}

			/>
		</Card>
	);
};

export default ListItem;

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: colors.grey,
	},
	card: {
		borderRadius: 15,
		marginBottom: 20,
		overflow: 'hidden',
		backgroundColor: colors.grey,
	},
	detailsContainer: {
		padding: 20,
	},
	image: {
		height: 400,
	},
	subtitle: {
		fontWeight: 'bold',
		color: colors.white,
	},
	title: {
		marginBottom: 7,
		color: colors.white,
	},
	divider: {
		marginTop: 8,
	},
});
