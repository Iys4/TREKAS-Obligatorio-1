import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { Header } from '../../components/layout/Header';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { Input } from '../../components/ui/Input';
import { COLORS, SIZES } from '../../constants/theme';

const schema = Joi.object({
  name: Joi.string().required().messages({ 'string.empty': 'El nombre es requerido' }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({ 'string.email': 'Email inválido', 'string.empty': 'El email es requerido' }),
  password: Joi.string().min(6).required().messages({ 'string.min': 'Mínimo 6 caracteres', 'string.empty': 'La contraseña es requerida' })
});

export const RegisterScreen = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(schema)
  });

  const onSubmit = (data) => {
    console.log("Registrado:", data);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Registro" showBack onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input 
              label="Nombre Completo" 
              onBlur={onBlur} 
              onChangeText={onChange} 
              value={value} 
              error={errors.name?.message}
            />
          )}
        />
        
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input 
              label="Email" 
              onBlur={onBlur} 
              onChangeText={onChange} 
              value={value} 
              error={errors.email?.message}
              autoCapitalize="none"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input 
              label="Contraseña" 
              onBlur={onBlur} 
              onChangeText={onChange} 
              value={value} 
              error={errors.password?.message}
              secureTextEntry
            />
          )}
        />
        
        <View style={styles.spacer} />
        
        <PrimaryButton title="CREAR CUENTA" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SIZES.padding,
  },
  spacer: {
    height: SIZES.padding,
  }
});