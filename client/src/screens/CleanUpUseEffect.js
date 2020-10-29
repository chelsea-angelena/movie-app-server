useEffect(() => {

	const cleanUp = db.collection('photos')
		.doc(id)
		.onSnapshot(
			(doc) => {
				setLoading(false);
				setPhotos(doc);
			},
			(err) => {
				setError(err);
			}
		);
	return () => cleanUp(); //Unsubscribe
}, []);
