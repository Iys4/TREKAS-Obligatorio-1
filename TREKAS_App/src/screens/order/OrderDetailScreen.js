import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Header } from '../../components/layout/Header';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export const OrderDetailScreen = ({ route, navigation }) => {
  const { order } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Header title={`Detalle ${order.id}`} showBack onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.label}>Local:</Text>
          <Text style={styles.value}>{order.location}</Text>
          
          <Text style={styles.label}>Fecha:</Text>
          <Text style={styles.value}>{order.date}</Text>
          
          <Text style={styles.label}>Estado:</Text>
          <Text style={styles.value}>{order.status}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.totalValue}>$${order.total}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SIZES.padding },
  card: {
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  label: { ...FONTS.body2, marginTop: SIZES.base },
  value: { ...FONTS.h2 },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SIZES.padding,
  },
  totalValue: { ...FONTS.h1, color: COLORS.primary }
});