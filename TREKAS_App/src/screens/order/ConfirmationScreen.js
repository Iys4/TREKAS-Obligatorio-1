import React, { useContext } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { Header } from '../../components/layout/Header';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { Input } from '../../components/ui/Input';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { COLORS, SIZES } from '../../constants/theme';

const schema = Joi.object({
  driverName: Joi.string().required().messages({ 'string.empty': 'El nombre del repartidor es requerido' }),
  companyName: Joi.string().required().messages({ 'string.empty': 'El nombre de la empresa es requerido' })
});

export const ConfirmationScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { clearCart } = useContext(CartContext);
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      driverName: user?.name || ''
    }
  });

  const onSubmit = (data) => {
    Alert.alert(
      "Pedido Confirmado",
      "El pedido ha sido registrado con éxito.",
      [{ text: "OK", onPress: () => {
        clearCart();
        navigation.navigate('Home');
      }}]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Confirmar Datos" showBack onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        
        <Controller
          control={control}
          name="driverName"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input 
              label="Nombre del Repartidor" 
              onBlur={onBlur} 
              onChangeText={onChange} 
              value={value} 
              error={errors.driverName?.message}
            />
          )}
        />
        
        <Controller
          control={control}
          name="companyName"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input 
              label="Nombre de Empresa" 
              onBlur={onBlur} 
              onChangeText={onChange} 
              value={value} 
              error={errors.companyName?.message}
            />
          )}
        />
        
        <View style={styles.spacer} />
        
        <PrimaryButton title="FINALIZAR PEDIDO" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SIZES.padding },
  spacer: { height: SIZES.padding }
});