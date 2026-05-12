export const COLORS = {
  primary: '#E65100', // Naranja tostado
  primaryDark: '#EF6C00',
  background: '#F5F5F5', // Gris muy claro
  surface: '#FFFFFF', // Blanco
  textPrimary: '#212121',
  textSecondary: '#757575',
  error: '#D32F2F',
  success: '#388E3C',
  border: '#E0E0E0',
};

export const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 20,
  extraLarge: 24,
  padding: 24,
  radius: 8,
};

export const FONTS = {
  h1: { fontSize: SIZES.extraLarge, fontWeight: 'bold', color: COLORS.textPrimary },
  h2: { fontSize: SIZES.large, fontWeight: 'bold', color: COLORS.textPrimary },
  body1: { fontSize: SIZES.medium, color: COLORS.textPrimary },
  body2: { fontSize: SIZES.font, color: COLORS.textSecondary },
};
