import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext.js';
import { NavigationContainer } from '@react-navigation/native';
import TabNav from './TabNav';
import AuthStack from './AuthStack';

export default function MainNav() {
	const user = useContext(AuthContext);
	return (
		<NavigationContainer>
			{!!user ? <TabNav /> : <AuthStack />}
		</NavigationContainer>
	);
}
