import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export const ProductCard = ({ product }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.desc} numberOfLines={2}>{product.description}</Text>
        <Text style={styles.price}>$${product.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding / 2,
    marginVertical: SIZES.base,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center'
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: SIZES.radius,
  },
  info: {
    flex: 1,
    marginLeft: SIZES.padding,
  },
  title: {
    ...FONTS.h2,
  },
  desc: {
    ...FONTS.body2,
    marginVertical: 4,
  },
  price: {
    ...FONTS.h2,
    color: COLORS.primary,
  }
});