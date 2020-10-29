import createDataContext from './createDataContext';

const movieReducer = (state, action) => {
	switch (action.type) {
		case 'add_movie':
			return [
				...state,
				{
					title: action.payload.movie.title,
					id: action.payload.movie.id,
					imageUri: action.payload.movie.imageUri,
				},
			];

		case 'delete_movie':
			return state.filter((movie) => movie.id !== action.payload);
		default:
			return state;
	}
};

const addMovie = (dispatch) => {
	return async (movie, callback) => {
		dispatch({ type: 'add_movie', payload: { movie: movie } });
	};
};

const deleteMovie = (dispatch) => {
	return (id) => {
		dispatch({ type: 'delete_movie', payload: id });
	};
};

export const { Context, Provider } = createDataContext(
	movieReducer,
	{ addMovie, deleteMovie },
	[]
);
