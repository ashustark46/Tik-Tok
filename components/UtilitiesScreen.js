import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UtilitiesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Utilities Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default UtilitiesScreen;

