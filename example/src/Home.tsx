import * as React from 'react';

import { StyleSheet, View, Button } from 'react-native';
import Superwall from '@superwall/react-native-superwall';
import { useNavigation } from '@react-navigation/native';
import { useSubscriptionStatus } from '@superwall/react-native-superwall';
import { useEntitlements } from '@superwall/react-native-superwall';
import { Text } from 'react-native';
import { useRegister } from '@superwall/react-native-superwall';
import { SubscriptionStatus } from 'superwall-react-native';
import { Entitlement } from '../../src/public/Entitlement';

const Home = () => {
  const navigation = useNavigation();

  const { subscriptionStatus, setSubscriptionStatus } = useSubscriptionStatus();
  const { entitlements, setEntitlements } = useEntitlements();

  const nonGated = useRegister('non_gated', () => {
    navigation.navigate('LaunchedFeature', {
      value: 'Non-gated feature launched',
    });
  });

  const pro = useRegister('pro', () => {
    navigation.navigate('LaunchedFeature', {
      value: 'Pro feature launched',
    });
  });

  const diamond = useRegister('diamond', () => {
    navigation.navigate('LaunchedFeature', {
      value: 'Diamond feature launched',
    });
  });

  const identify = () => {
    Superwall.shared.identify('abc');
  };

  const reset = () => {
    Superwall.shared.reset();
  };

  return (
    <View style={styles.container}>
      <Text>Subscription Status: {subscriptionStatus.status}</Text>
      <Text>Entitlements: {JSON.stringify(entitlements)}</Text>
      <Button
        title="Set Subscription Status to ACTIVE"
        onPress={() =>
          setSubscriptionStatus(
            SubscriptionStatus.Active([new Entitlement('pro')])
          )
        }
      />
      <Button
        title="Set Subscription Status to INACTIVE"
        onPress={() => setSubscriptionStatus({ status: 'INACTIVE' })}
      />
      <Button
        title="Set Entitlements to []"
        onPress={() => setEntitlements([])}
      />
      <Button
        title="Set Entitlements to [{ id: 'pro'}]"
        onPress={() => setEntitlements([{ id: 'pro' }])}
      />
      <Button title="Launch Non-Gated Feature" onPress={nonGated} />
      <Button title="Launch Pro Feature" onPress={pro} />
      <Button title="Launch Diamond Feature" onPress={diamond} />
      <Button title="Identify" onPress={identify} />
      <Button title="Reset" onPress={reset} />
    </View>
  );
};

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

export default Home;
