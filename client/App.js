import React from 'react';
import { Provider as MovieProvider } from './src/Context/MovieContext';
import { AuthProvider } from './src/Context/AuthContext';
import { ThemeProvider } from 'react-native-elements';
import { useColorScheme } from 'react-native-appearance';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import MainNav from './src/navigation/MainNav';


function App() {
	let [fontsLoaded] = useFonts({
		'Montserrat-Regular': require('./assets/Montserrat/Montserrat-Regular.ttf'),
	});
	let colorScheme = useColorScheme();

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<>
			<AuthProvider>
				<ThemeProvider useDark={colorScheme === 'dark'}>
					<MovieProvider>
						<MainNav />
					</MovieProvider>
				</ThemeProvider>
			</AuthProvider>
		</>
	);
}
export default App;
