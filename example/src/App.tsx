import * as React from 'react';

import { StyleSheet, View, Platform, Button, Linking } from 'react-native';
import Superwall from '@superwall/react-native-superwall';
import { RCPurchaseController } from './RCPurchaseController';
import { MySuperwallDelegate } from './MySuperwallDelegate';
import { InterfaceStyle } from '@superwall/react-native-superwall';

export default function App() {
  const delegate = new MySuperwallDelegate();

  React.useEffect(() => {
    const setupSuperwall = async () => {
      const apiKey =
        Platform.OS === 'ios'
          ? 'pk_5f6d9ae96b889bc2c36ca0f2368de2c4c3d5f6119aacd3d2'
          : 'pk_d1f0959f70c761b1d55bb774a03e22b2b6ed290ce6561f85';

      const purchaseController = new RCPurchaseController();
      Superwall.configure(apiKey, null, purchaseController);
      Superwall.shared.identify('abc');
      Superwall.shared.setDelegate(delegate);
      Superwall.shared.setUserAttributes({ test: "abc" });
      purchaseController.syncSubscriptionStatus();
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

  const register = () => {
    Superwall.shared.register('flutter');
  };

  const identify = () => {
    Superwall.shared.identify('abc');
  };

  const reset = () => {
    Superwall.shared.reset();
  };

  return (
    <View style={styles.container}>
      <Button title="Register Event" onPress={register} />
      <Button title="Identify" onPress={identify} />
      <Button title="Reset" onPress={reset} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
