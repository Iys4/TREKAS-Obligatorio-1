import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export const Header = ({ title, showBack, onBack }) => {
  return (
    <View style={styles.container}>
      {showBack && (
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>{'< VOLVER'}</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {showBack && <View style={styles.placeholder} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: SIZES.padding,
  },
  backButton: {
    position: 'absolute',
    left: SIZES.padding,
    height: '100%',
    justifyContent: 'center',
    paddingRight: 16,
  },
  backText: {
    ...FONTS.body1,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  title: {
    ...FONTS.h2,
  },
  placeholder: {
    width: 60,
  }
});