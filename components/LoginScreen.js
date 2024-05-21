// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (!userDataString) {
        Alert.alert('Error', 'No UserData Found, please SignUp first');
        return;
      }

      const StoreduserData = JSON.parse(userDataString);

      if (email == StoreduserData.email && password == StoreduserData.password) {
        navigation.replace('Home');
      } else {
        Alert.alert('Login Failed', 'Invalid emaol or password. please try again')
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to login . please try again later.')
    }
  };

  return (
    <ImageBackground source={require('../BackgroundImages/paper-bags-different-colors-blue-background-top-view.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.text}>Login</Text>
          <View style={styles.underline}></View>
        </View>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handleLogin} />
          <View style={styles.buttonGap}></View>
          <Button title="Sign Up First?" onPress={() => navigation.navigate('SignUp')} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  headerContainer: {
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '700',
  },
  underline: {
    width: 120,
    height: 6,
    backgroundColor: '#fff',
    borderRadius: 9,
    marginTop: 10,
  },
  inputs: {
    marginTop: 55,
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 50,
    backgroundColor: '#d0cdcd',
    borderRadius: 6,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 19,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGap: {
    width: 20,
  },
});

export default LoginScreen;
