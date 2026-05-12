const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const files = {
  'mockData/index.js': `
export const PRODUCTS = [
  {
    id: 1,
    name: "TREKAS Tradicional",
    description: "Galletas tostadas clásicas, ideales para cualquier momento.",
    price: 120,
    packSize: 8,
    image: "https://via.placeholder.com/150/E65100/FFFFFF?text=TRADICIONAL"
  },
  {
    id: 2,
    name: "TREKAS Chía",
    description: "Con semillas de chía, fuente de omega 3 y fibra.",
    price: 135,
    packSize: 8,
    image: "https://via.placeholder.com/150/E65100/FFFFFF?text=CHIA"
  },
  {
    id: 3,
    name: "TREKAS Horneadas",
    description: "Elaboradas al horno, sin frituras, extra crujientes.",
    price: 130,
    packSize: 8,
    image: "https://via.placeholder.com/150/E65100/FFFFFF?text=HORNEADAS"
  }
];

export const LOCATIONS = [
  { id: 1, name: "Kiosco El Sol", address: "Av. Siempre Viva 123" },
  { id: 2, name: "Supermercado Día", address: "Calle Falsa 456" },
  { id: 3, name: "Minimarket Centro", address: "Plaza Principal s/n" }
];

export const DRIVER_PROFILE = {
  name: "Juan Pérez",
  hoursWorked: 32,
  deliveriesCount: 14,
  history: [
    { id: 'ORD-001', date: '2026-05-10', total: 4800, status: 'ENTREGADO', location: 'Kiosco El Sol' },
    { id: 'ORD-002', date: '2026-05-11', total: 6500, status: 'ENTREGADO', location: 'Supermercado Día' }
  ]
};

export const MOCK_CREDENTIALS = {
  email: "repartidor@trekas.com",
  password: "password123"
};
`,

  'context/AuthContext.js': `
import React, { createContext, useState } from 'react';
import { MOCK_CREDENTIALS } from '../mockData';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
          setUser({ email, name: 'Juan Pérez' });
          resolve();
        } else {
          reject(new Error('Credenciales inválidas'));
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
`,

  'context/CartContext.js': `
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const addItem = (product, quantity) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity } : item);
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeItem = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setSelectedLocation(null);
  };

  const total = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, total, selectedLocation, setSelectedLocation }}>
      {children}
    </CartContext.Provider>
  );
};
`,

  'components/ui/PrimaryButton.js': `
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export const PrimaryButton = ({ title, onPress, disabled, style, outline }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        outline && styles.outline,
        disabled && styles.disabled, 
        style
      ]} 
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[
        styles.text, 
        outline && styles.textOutline,
        disabled && styles.textDisabled
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    marginVertical: SIZES.base,
    width: '100%',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  disabled: {
    backgroundColor: COLORS.border,
  },
  text: {
    ...FONTS.h2,
    color: COLORS.surface,
  },
  textOutline: {
    color: COLORS.primary,
  },
  textDisabled: {
    color: COLORS.textSecondary,
  }
});
`,

  'components/ui/Input.js': `
import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export const Input = ({ label, error, ...props }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput 
        style={[styles.input, error && styles.inputError]} 
        placeholderTextColor={COLORS.textSecondary}
        {...props} 
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: SIZES.base,
  },
  label: {
    ...FONTS.body1,
    fontWeight: 'bold',
    marginBottom: SIZES.base / 2,
  },
  input: {
    height: 56,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    ...FONTS.body1,
    backgroundColor: COLORS.surface,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    ...FONTS.body2,
    color: COLORS.error,
    marginTop: SIZES.base / 2,
  }
});
`,

  'components/ui/QuantitySelector.js': `
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export const QuantitySelector = ({ quantity, onAdd, onRemove }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onRemove}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantity}>{quantity}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onAdd}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    ...FONTS.h1,
    color: COLORS.surface,
  },
  quantityContainer: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    ...FONTS.h1,
  }
});
`,

  'components/ui/ProductCard.js': `
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
        <Text style={styles.price}>$\${product.price}</Text>
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
`,

  'components/ui/OrderCard.js': `
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export const OrderCard = ({ order, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.id}>{order.id}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{order.status}</Text>
        </View>
      </View>
      <Text style={styles.location}>{order.location}</Text>
      <View style={styles.footer}>
        <Text style={styles.date}>{order.date}</Text>
        <Text style={styles.total}>$\${order.total}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginVertical: SIZES.base,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  id: {
    ...FONTS.h2,
  },
  badge: {
    backgroundColor: COLORS.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: COLORS.surface,
    fontSize: 12,
    fontWeight: 'bold',
  },
  location: {
    ...FONTS.body1,
    marginBottom: SIZES.base,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    ...FONTS.body2,
  },
  total: {
    ...FONTS.h2,
    color: COLORS.primary,
  }
});
`,

  'components/layout/Header.js': `
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
`,

  'screens/auth/LoginScreen.js': `
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { Input } from '../../components/ui/Input';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>TREKAS Delivery</Text>
        <Text style={styles.subtitle}>Ingreso Operarios</Text>
        
        <Input 
          label="Email" 
          value={email} 
          onChangeText={setEmail} 
          autoCapitalize="none"
          keyboardType="email-address"
        />
        
        <Input 
          label="Contraseña" 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
          error={error}
        />
        
        <View style={styles.spacer} />
        
        <PrimaryButton title="INGRESAR" onPress={handleLogin} />
        <PrimaryButton 
          title="REGISTRARSE" 
          outline 
          onPress={() => navigation.navigate('Register')} 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SIZES.padding,
    justifyContent: 'center',
  },
  title: {
    ...FONTS.h1,
    textAlign: 'center',
    color: COLORS.primary,
  },
  subtitle: {
    ...FONTS.body1,
    textAlign: 'center',
    marginBottom: SIZES.padding * 2,
  },
  spacer: {
    height: SIZES.padding,
  }
});
`,

  'screens/auth/RegisterScreen.js': `
import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { Header } from '../../components/layout/Header';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { Input } from '../../components/ui/Input';
import { COLORS, SIZES } from '../../constants/theme';

const schema = Joi.object({
  name: Joi.string().required().messages({ 'string.empty': 'El nombre es requerido' }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({ 'string.email': 'Email inválido', 'string.empty': 'El email es requerido' }),
  password: Joi.string().min(6).required().messages({ 'string.min': 'Mínimo 6 caracteres', 'string.empty': 'La contraseña es requerida' })
});

export const RegisterScreen = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(schema)
  });

  const onSubmit = (data) => {
    console.log("Registrado:", data);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Registro" showBack onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input 
              label="Nombre Completo" 
              onBlur={onBlur} 
              onChangeText={onChange} 
              value={value} 
              error={errors.name?.message}
            />
          )}
        />
        
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input 
              label="Email" 
              onBlur={onBlur} 
              onChangeText={onChange} 
              value={value} 
              error={errors.email?.message}
              autoCapitalize="none"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input 
              label="Contraseña" 
              onBlur={onBlur} 
              onChangeText={onChange} 
              value={value} 
              error={errors.password?.message}
              secureTextEntry
            />
          )}
        />
        
        <View style={styles.spacer} />
        
        <PrimaryButton title="CREAR CUENTA" onPress={handleSubmit(onSubmit)} />
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
  spacer: {
    height: SIZES.padding,
  }
});
`,

  'screens/main/HomeScreen.js': `
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
`,

  'screens/main/ProfileScreen.js': `
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
`,

  'screens/order/NewOrderScreen.js': `
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
              <Text style={styles.prodPrice}>$\${prod.price}</Text>
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
`,

  'screens/order/CartScreen.js': `
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
              <Text style={styles.itemTotal}>$\${item.product.price * item.quantity}</Text>
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
          <Text style={styles.totalValue}>$\${total}</Text>
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
`,

  'screens/order/ConfirmationScreen.js': `
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
`,

  'screens/order/OrdersHistoryScreen.js': `
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
`,

  'screens/order/OrderDetailScreen.js': `
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Header } from '../../components/layout/Header';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export const OrderDetailScreen = ({ route, navigation }) => {
  const { order } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Header title={\`Detalle \${order.id}\`} showBack onBack={() => navigation.goBack()} />
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
          <Text style={styles.totalValue}>$\${order.total}</Text>
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
`,

  'navigation/AuthNavigator.js': `
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};
`,

  'navigation/MainNavigator.js': `
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/main/HomeScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';
import { NewOrderScreen } from '../screens/order/NewOrderScreen';
import { CartScreen } from '../screens/order/CartScreen';
import { ConfirmationScreen } from '../screens/order/ConfirmationScreen';
import { OrdersHistoryScreen } from '../screens/order/OrdersHistoryScreen';
import { OrderDetailScreen } from '../screens/order/OrderDetailScreen';

const Stack = createNativeStackNavigator();

export const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="NewOrder" component={NewOrderScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
      <Stack.Screen name="Orders" component={OrdersHistoryScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
    </Stack.Navigator>
  );
};
`,

  'navigation/AppNavigator.js': `
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';

export const AppNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
`,
};

Object.entries(files).forEach(([filePath, content]) => {
  const fullPath = path.join(srcDir, filePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, content.trim());
});

const appJs = `
import React from 'react';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CartProvider>
          <AppNavigator />
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
`;
fs.writeFileSync(path.join(__dirname, 'App.js'), appJs.trim());
console.log('Setup complete!');
