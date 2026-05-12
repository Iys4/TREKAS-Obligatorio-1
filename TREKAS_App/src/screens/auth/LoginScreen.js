import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { Input } from '../../components/ui/Input';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>TREKAS Delivery</Text>
        <Text style={styles.subtitle}>Ingreso Operarios</Text>
        
        <Input 
          label="Email" 
          value={email} 
          onChangeText={setEmail} 
          autoCapitalize="none"
          keyboardType="email-address"
        />
        
        <Input 
          label="Contraseña" 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
          error={error}
        />
        
        <View style={styles.spacer} />
        
        <PrimaryButton title="INGRESAR" onPress={handleLogin} />
        <PrimaryButton 
          title="REGISTRARSE" 
          outline 
          onPress={() => navigation.navigate('Register')} 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SIZES.padding,
    justifyContent: 'center',
  },
  title: {
    ...FONTS.h1,
    textAlign: 'center',
    color: COLORS.primary,
  },
  subtitle: {
    ...FONTS.body1,
    textAlign: 'center',
    marginBottom: SIZES.padding * 2,
  },
  spacer: {
    height: SIZES.padding,
  }
});