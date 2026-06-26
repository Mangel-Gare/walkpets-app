import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export const PaymentSummaryScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState<'bizum' | 'card' | null>(null);

  // Datos simulados del resumen del paseo
  const walkSummary = {
    duration: '45 min',
    distance: '3.2 km',
    walkerFee: 12.00,
    platformFee: 1.00,
  };
  const totalAmount = walkSummary.walkerFee + walkSummary.platformFee;

  const handlePayment = () => {
    if (!selectedMethod) {
      Alert.alert('Error', 'Selecciona un método de pago');
      return;
    }
    Alert.alert('¡Pago Completado!', 'El paseador ha recibido el 100% de su tarifa. ¡Gracias por usar WalkPets!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name="check-circle" size={48} color="#4ade80" />
        <Text style={styles.title}>¡Paseo Finalizado!</Text>
        <Text style={styles.subtitle}>Resumen de la actividad de Max y Luna</Text>
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.row}>
          <Text style={styles.label}>Tiempo Total</Text>
          <Text style={styles.value}>{walkSummary.duration}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Distancia</Text>
          <Text style={styles.value}>{walkSummary.distance}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>Tarifa Paseador (Íntegro)</Text>
          <Text style={styles.value}>{walkSummary.walkerFee.toFixed(2)} €</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Seguro y GPS (Tarifa Plataforma)</Text>
          <Text style={styles.value}>{walkSummary.platformFee.toFixed(2)} €</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.rowTotal}>
          <Text style={styles.totalLabel}>Total a Pagar</Text>
          <Text style={styles.totalValue}>{totalAmount.toFixed(2)} €</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Método de Pago</Text>
      <View style={styles.paymentMethods}>
        <TouchableOpacity 
          style={[styles.methodCard, selectedMethod === 'bizum' && styles.methodSelected]}
          onPress={() => setSelectedMethod('bizum')}
        >
          <MaterialIcons name="phone-android" size={24} color={selectedMethod === 'bizum' ? "#FFF" : "#A0A0A0"} />
          <Text style={[styles.methodText, selectedMethod === 'bizum' && styles.methodTextSelected]}>Bizum</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.methodCard, selectedMethod === 'card' && styles.methodSelected]}
          onPress={() => setSelectedMethod('card')}
        >
          <FontAwesome5 name="credit-card" size={24} color={selectedMethod === 'card' ? "#FFF" : "#A0A0A0"} />
          <Text style={[styles.methodText, selectedMethod === 'card' && styles.methodTextSelected]}>Tarjeta</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.payButton, !selectedMethod && styles.payButtonDisabled]}
        onPress={handlePayment}
      >
        <Text style={styles.payButtonText}>Confirmar y Pagar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 16,
  },
  subtitle: {
    color: '#A0A0A0',
    fontSize: 16,
    marginTop: 8,
  },
  summaryCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    color: '#A0A0A0',
    fontSize: 16,
  },
  value: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 12,
  },
  rowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  totalLabel: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    color: '#4ade80',
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  paymentMethods: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 40,
  },
  methodCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  methodSelected: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)', // Púrpura corporativo transparente
    borderColor: '#8b5cf6',
  },
  methodText: {
    color: '#A0A0A0',
    fontSize: 16,
    fontWeight: '600',
  },
  methodTextSelected: {
    color: '#FFF',
  },
  payButton: {
    backgroundColor: '#8b5cf6',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonDisabled: {
    backgroundColor: '#3b226e',
    opacity: 0.5,
  },
  payButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
