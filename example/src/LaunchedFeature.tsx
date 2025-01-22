import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useRoute, type RouteProp } from '@react-navigation/native';

// Define the route parameters type
type RootStackParamList = {
  LaunchedFeature: { value: string };
};

type LaunchedFeatureRouteProp = RouteProp<
  RootStackParamList,
  'LaunchedFeature'
>;

const LaunchedFeature: React.FC = () => {
  const route = useRoute<LaunchedFeatureRouteProp>();
  const { value } = route.params;

  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} value={value} editable={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  textInput: {
    width: '100%',
    height: 40,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default LaunchedFeature;
