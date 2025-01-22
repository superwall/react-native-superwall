import * as React from 'react';

import { Platform, Linking } from 'react-native';
import Superwall from '@superwall/react-native-superwall';
import { RCPurchaseController } from './RCPurchaseController';
import { MySuperwallDelegate } from './MySuperwallDelegate';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import LaunchedFeature from './LaunchedFeature';
const Stack = createStackNavigator();

export default function App() {
  const delegate = new MySuperwallDelegate();

  React.useEffect(() => {
    const setupSuperwall = async () => {
      const apiKey =
        Platform.OS === 'ios'
          ? 'pk_e361c8a9662281f4249f2fa11d1a63854615fa80e15e7a4d'
          : 'pk_d1f0959f70c761b1d55bb774a03e22b2b6ed290ce6561f85';

      const purchaseController = new RCPurchaseController();
      Superwall.configure(apiKey, null, purchaseController);
      Superwall.shared.identify('abc');
      Superwall.shared.setDelegate(delegate);
      Superwall.shared.setUserAttributes({ test: "abc" });
      purchaseController.syncEntitlements();
    };

    setupSuperwall();

    // Get the initial URL if the app was launched from a link
    Linking.getInitialURL().then((url) => {
      if (url) {
        Superwall.shared.handleDeepLink(url);
      }
    });

    // Listen for URL events
    const linkingListener = Linking.addEventListener('url', (event) => {
      Superwall.shared.handleDeepLink(event.url);
    });

    // Clean up the event listener
    return () => {
      linkingListener.remove();
    };
  }, []);

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
