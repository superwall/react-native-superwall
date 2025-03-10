import Superwall, {
  LogLevel,
  LogScope,
  SuperwallOptions,
} from '@superwall/react-native-superwall';
import { StatusBar } from 'expo-status-bar';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const options = new SuperwallOptions();
  options.logging.level = LogLevel.Debug;
  options.logging.scopes = [LogScope.All];

  const apiKey =
    Platform.OS === 'ios'
      ? 'pk_5f6d9ae96b889bc2c36ca0f2368de2c4c3d5f6119aacd3d2'
      : 'pk_d1f0959f70c761b1d55bb774a03e22b2b6ed290ce6561f85';

  Superwall.configure({ apiKey, options });

  const register = () => {
    Superwall.shared.register({
      placement: 'campaign_trigger',
      feature: () => {
        console.log('feature triggered');
      },
    });
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
