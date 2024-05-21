import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';

const TermsAndConditionsScreen = ({ navigation }) => {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [continueEnabled, setContinueEnabled] = useState(false);

  useEffect(() => {
    // Check if both checkboxes are checked to enable the Continue button
    setContinueEnabled(agreeTerms && agreePrivacy);
  }, [agreeTerms, agreePrivacy]);

  const handleContinue = () => {
    if (continueEnabled) {
      // User agreed to terms and conditions, navigate to the next screen
      navigation.navigate('About');
    } else {
      alert('Please agree to both the terms and conditions and privacy policy to continue.');
    }
  };

  const handleAgreeTerms = () => {
    setAgreeTerms(!agreeTerms);
  };

  const handleAgreePrivacy = () => {
    setAgreePrivacy(!agreePrivacy);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Terms and Conditions</Text>
      <Text style={styles.body}>
        By using this App, you agreed to accept all terms and conditions. You must not use this
        app if you disagree with any of the Standard Terms and Conditions.
      </Text>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[styles.checkbox, agreeTerms ? styles.checked : null]}
          onPress={handleAgreeTerms}
        >
          {agreeTerms && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>I agree to the terms and conditions</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[styles.checkbox, agreePrivacy ? styles.checked : null]}
          onPress={handleAgreePrivacy}
        >
          {agreePrivacy && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>I agree to the privacy policy</Text>
      </View>
      <TouchableOpacity
        style={[styles.button, continueEnabled ? null : styles.disabledButton]}
        onPress={handleContinue}
        disabled={!continueEnabled}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  body: {
    textAlign: 'center',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checked: {
    backgroundColor: 'black',
  },
  checkmark: {
    color: 'white',
  },
  checkboxLabel: {
    fontSize: 16,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TermsAndConditionsScreen;
