import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '../../components/layout/Header';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { LOCATIONS, PRODUCTS } from '../../mockData';
import { CartContext } from '../../context/CartContext';
import { QuantitySelector } from '../../components/ui/QuantitySelector';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export const NewOrderScreen = ({ navigation }) => {
  const { selectedLocation, setSelectedLocation, cart, addItem } = useContext(CartContext);
  const [step, setStep] = useState(1); // 1: Location, 2: Products

  const handleNext = () => {
    if (step === 1 && selectedLocation) {
      setStep(2);
    } else if (step === 2 && cart.length > 0) {
      navigation.navigate('Cart');
    }
  };

  const getQuantity = (productId) => {
    const item = cart.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title={step === 1 ? "Seleccionar Local" : "Seleccionar Productos"} 
        showBack 
        onBack={() => {
          if (step === 2) setStep(1);
          else navigation.goBack();
        }} 
      />
      <ScrollView contentContainerStyle={styles.content}>
        
        {step === 1 && LOCATIONS.map(loc => (
          <TouchableOpacity 
            key={loc.id} 
            style={[styles.locationCard, selectedLocation?.id === loc.id && styles.selectedLocation]}
            onPress={() => setSelectedLocation(loc)}
          >
            <Text style={styles.locName}>{loc.name}</Text>
            <Text style={styles.locAddress}>{loc.address}</Text>
          </TouchableOpacity>
        ))}

        {step === 2 && PRODUCTS.map(prod => (
          <View key={prod.id} style={styles.productRow}>
            <View style={styles.prodInfo}>
              <Text style={styles.prodName}>{prod.name}</Text>
              <Text style={styles.prodPrice}>$${prod.price}</Text>
            </View>
            <QuantitySelector 
              quantity={getQuantity(prod.id)} 
              onAdd={() => addItem(prod, getQuantity(prod.id) + 1)}
              onRemove={() => getQuantity(prod.id) > 0 && addItem(prod, getQuantity(prod.id) - 1)}
            />
          </View>
        ))}

      </ScrollView>
      
      <View style={styles.footer}>
        <PrimaryButton 
          title="CONTINUAR" 
          onPress={handleNext} 
          disabled={step === 1 ? !selectedLocation : cart.length === 0}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SIZES.padding, paddingBottom: 100 },
  locationCard: {
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  selectedLocation: {
    borderColor: COLORS.primary,
    backgroundColor: '#FFF3E0',
  },
  locName: { ...FONTS.h2 },
  locAddress: { ...FONTS.body2, marginTop: 4 },
  productRow: {
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
  prodInfo: { flex: 1 },
  prodName: { ...FONTS.h2 },
  prodPrice: { ...FONTS.body1, color: COLORS.primary, marginTop: 4 },
  footer: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  }
});