import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Header } from '../../components/layout/Header';
import { DRIVER_PROFILE } from '../../mockData';
import { OrderCard } from '../../components/ui/OrderCard';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Mi Perfil" showBack onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.name}>{DRIVER_PROFILE.name}</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{DRIVER_PROFILE.deliveriesCount}</Text>
            <Text style={styles.statLabel}>Envíos</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{DRIVER_PROFILE.hoursWorked}</Text>
            <Text style={styles.statLabel}>Horas</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Historial Reciente</Text>
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
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SIZES.padding,
  },
  name: {
    ...FONTS.h1,
    textAlign: 'center',
    marginBottom: SIZES.padding,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding * 2,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: SIZES.base,
  },
  statValue: {
    ...FONTS.h1,
    color: COLORS.primary,
  },
  statLabel: {
    ...FONTS.body2,
    fontWeight: 'bold',
    marginTop: 4,
  },
  sectionTitle: {
    ...FONTS.h2,
    marginBottom: SIZES.base,
  }
});