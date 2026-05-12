import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { ProductCard } from '../../components/ui/ProductCard';
import { PRODUCTS } from '../../mockData';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export const HomeScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>Hola, {user?.name}</Text>
        
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>[ MAPA - ZONA ASIGNADA ]</Text>
        </View>

        <Text style={styles.sectionTitle}>Catálogo</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catalog}>
          {PRODUCTS.map(p => (
            <View key={p.id} style={{ width: 280, marginRight: 16 }}>
              <ProductCard product={p} />
            </View>
          ))}
        </ScrollView>

        <View style={styles.actions}>
          <PrimaryButton 
            title="NUEVO PEDIDO" 
            onPress={() => navigation.navigate('NewOrder')} 
          />
          <PrimaryButton 
            title="MIS PEDIDOS" 
            outline 
            onPress={() => navigation.navigate('Orders')} 
          />
          <PrimaryButton 
            title="MI PERFIL" 
            outline 
            onPress={() => navigation.navigate('Profile')} 
          />
          <PrimaryButton 
            title="CERRAR SESIÓN" 
            outline 
            style={{ borderColor: COLORS.error }}
            onPress={logout} 
          />
        </View>
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
  greeting: {
    ...FONTS.h1,
    marginBottom: SIZES.padding,
  },
  mapPlaceholder: {
    height: 150,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding,
  },
  mapText: {
    ...FONTS.body1,
    color: COLORS.textSecondary,
    fontWeight: 'bold',
  },
  sectionTitle: {
    ...FONTS.h2,
    marginBottom: SIZES.base,
  },
  catalog: {
    marginBottom: SIZES.padding,
  },
  actions: {
    marginTop: SIZES.base,
  }
});