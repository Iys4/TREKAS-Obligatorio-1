import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Header } from '../../components/layout/Header';
import { OrderCard } from '../../components/ui/OrderCard';
import { DRIVER_PROFILE } from '../../mockData';
import { COLORS, SIZES } from '../../constants/theme';

export const OrdersHistoryScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Mis Pedidos" showBack onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        {DRIVER_PROFILE.history.map(order => (
          <OrderCard 
            key={order.id} 
            order={order} 
            onPress={() => navigation.navigate('OrderDetail', { order })}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SIZES.padding }
});