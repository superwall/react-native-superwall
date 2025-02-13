import * as React from 'react';

import { Platform, Linking, Text } from 'react-native';
import Superwall from '@superwall/react-native-superwall';
import { RCPurchaseController } from './RCPurchaseController';
import { MySuperwallDelegate } from './MySuperwallDelegate';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import LaunchedFeature from './LaunchedFeature';
import { useSuperwall } from '@superwall/react-native-superwall';
const Stack = createStackNavigator();

export default function App() {
  const result = useSuperwall({
    apiKey:
      Platform.OS === 'ios'
        ? 'pk_e361c8a9662281f4249f2fa11d1a63854615fa80e15e7a4d'
        : 'pk_d1f0959f70c761b1d55bb774a03e22b2b6ed290ce6561f85',
    completion: (superwall: Superwall) => {
      superwall.delegate = new MySuperwallDelegate();
    },
  });

  if (result.status === 'error') {
    return <Text>Error initializing Superwall</Text>;
  }

  if (result.status === 'loading') {
    return <Text>Loading...</Text>;
  }

  if (result.status === 'initialized') {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="LaunchedFeature"
            component={LaunchedFeature}
            options={{ title: 'Launched Feature' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
