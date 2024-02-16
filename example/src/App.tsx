import * as React from 'react';

import { StyleSheet, View, Text, Platform, Button } from 'react-native';
import Superwall from 'superwall-react-native';
import { RCPurchaseController } from './RCPurchaseController';

export default function App() {
  React.useEffect(() => {
    var apiKey =
      Platform.OS === 'ios'
        ? 'pk_5f6d9ae96b889bc2c36ca0f2368de2c4c3d5f6119aacd3d2'
        : 'pk_d1f0959f70c761b1d55bb774a03e22b2b6ed290ce6561f85';

    var purchaseController = new RCPurchaseController();
    Superwall.configure(apiKey, undefined, purchaseController);
    purchaseController.configureAndSyncSubscriptionStatus();
  }, []);

  // Function to call when the button is pressed
  const handlePress = () => {
    Superwall.shared.register('campaign_trigger');
  };

  return (
    <View style={styles.container}>
      <Button title="Register Event" onPress={handlePress} />
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
