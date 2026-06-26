import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export const ContractAcceptanceScreen = () => {
  const [acceptedText, setAcceptedText] = useState('');
  const [photoTaken, setPhotoTaken] = useState(false);

  // Regla de Negocio Frontal: Bloqueo del botón si no hay foto y no pone exactamente "acepto"
  const isFormValid = photoTaken && acceptedText.trim().toLowerCase() === 'acepto';

  const handleTakePhoto = () => {
    // Aquí iría la integración real con expo-camera
    setPhotoTaken(true);
    Alert.alert('Cámara', 'Foto geolocalizada registrada correctamente.');
  };

  const handleSubmit = () => {
    if (!isFormValid) return;
    Alert.alert('Contrato Firmado', 'Responsabilidades eximidas. ¡Iniciando paseo seguro!');
    // Aquí se enviaría el payload al backend (las coordenadas, la foto S3 y el campo 'acepto')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firma de Recogida</Text>
      
      <View style={styles.card}>
        <Text style={styles.clauseTitle}>Descargo de Imponderables</Text>
        <Text style={styles.clauseText}>
          Al aceptar, el dueño asume cualquier imponderable médico repentino 
          (ej. torsión gástrica, ataques epilépticos) que pudiera sufrir el animal 
          durante el paseo, eximiendo al paseador de responsabilidad legal si no hay negligencia.
        </Text>
      </View>

      <View style={styles.photoSection}>
        <Text style={styles.label}>Prueba de Estado (Obligatoria)</Text>
        <TouchableOpacity 
          style={[styles.photoButton, photoTaken && styles.photoButtonSuccess]} 
          onPress={handleTakePhoto}
        >
          <FontAwesome5 name={photoTaken ? "check-circle" : "camera"} size={24} color="#FFF" />
          <Text style={styles.photoButtonText}>
            {photoTaken ? 'Foto registrada' : 'Tomar foto geolocalizada'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signatureSection}>
        <Text style={styles.label}>Escribe "acepto" para confirmar</Text>
        <TextInput
          style={styles.input}
          value={acceptedText}
          onChangeText={setAcceptedText}
          placeholder="Escribe acepto..."
          placeholderTextColor="#666"
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity 
        style={[styles.submitButton, !isFormValid && styles.submitButtonDisabled]} 
        onPress={handleSubmit}
        disabled={!isFormValid}
      >
        <Text style={styles.submitButtonText}>Firmar y Comenzar Paseo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 24,
  },
  clauseTitle: {
    color: '#f87171',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  clauseText: {
    color: '#A0A0A0',
    fontSize: 14,
    lineHeight: 22,
  },
  photoSection: {
    marginBottom: 24,
  },
  label: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  photoButtonSuccess: {
    backgroundColor: '#10b981',
  },
  photoButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  signatureSection: {
    marginBottom: 32,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 16,
    color: '#FFF',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#8b5cf6',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#3b226e',
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
