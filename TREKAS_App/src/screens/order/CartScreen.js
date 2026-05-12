import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Header } from '../../components/layout/Header';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { QuantitySelector } from '../../components/ui/QuantitySelector';
import { CartContext } from '../../context/CartContext';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export const CartScreen = ({ navigation }) => {
  const { cart, addItem, removeItem, total, selectedLocation } = useContext(CartContext);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Carrito" showBack onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        
        <Text style={styles.sectionTitle}>Local: {selectedLocation?.name}</Text>
        
        {cart.map(item => (
          <View key={item.product.id} style={styles.cartItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.product.name}</Text>
              <Text style={styles.itemTotal}>$${item.product.price * item.quantity}</Text>
            </View>
            <QuantitySelector 
              quantity={item.quantity} 
              onAdd={() => addItem(item.product, item.quantity + 1)}
              onRemove={() => {
                if (item.quantity === 1) removeItem(item.product.id);
                else addItem(item.product, item.quantity - 1);
              }}
            />
          </View>
        ))}

      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL:</Text>
          <Text style={styles.totalValue}>$${total}</Text>
        </View>
        <PrimaryButton 
          title="CONFIRMAR PEDIDO" 
          onPress={() => navigation.navigate('Confirmation')} 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SIZES.padding, paddingBottom: 150 },
  sectionTitle: { ...FONTS.h2, marginBottom: SIZES.padding },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  itemInfo: { flex: 1 },
  itemName: { ...FONTS.body1, fontWeight: 'bold' },
  itemTotal: { ...FONTS.body2, color: COLORS.primary, marginTop: 4 },
  footer: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.base,
  },
  totalLabel: { ...FONTS.h1 },
  totalValue: { ...FONTS.h1, color: COLORS.primary }
});