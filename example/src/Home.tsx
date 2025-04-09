import * as React from 'react';

import { StyleSheet, View, Button } from 'react-native';
import Superwall, { PaywallPresentationHandler } from '../../src';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  LaunchedFeature: { value: string };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const nonGated = () => {
    Superwall.shared.register({
      placement: 'non_gated',
      feature: () => {
        navigation.navigate('LaunchedFeature', {
          value: 'Non-gated feature launched',
        });
      },
    });
  };

  const pro = () => {
    Superwall.shared.register({
      placement: 'pro',
      feature: () => {
        navigation.navigate('LaunchedFeature', {
          value: 'Pro feature launched',
        });
      },
    });
  };

  const diamond = () => {
    Superwall.shared.register({
      placement: 'diamond',
      feature: () => {
        navigation.navigate('LaunchedFeature', {
          value: 'Diamond feature launched',
        });
      },
    });
  };

  const identify = () => {
    Superwall.shared.identify({ userId: 'abc' });
  };

  const reset = () => {
    Superwall.shared.reset();
  };

  return (
    <View style={styles.container}>
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
