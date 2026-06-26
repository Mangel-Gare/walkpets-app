import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export const LiveTrackingScreen = () => {
  const [elapsedTime, setElapsedTime] = useState(0);

  // Simulador de cronómetro del paseo
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <View style={styles.container}>
      {/* 
        El mapa interactivo se montaría aquí usando:
        import MapView, { Marker, Polyline } from 'react-native-maps'
      */}
      <View style={styles.mapMock}>
        <MaterialCommunityIcons name="map-marker-path" size={64} color="#8b5cf6" />
        <Text style={styles.mapMockText}>[Mapa GPS en Vivo - React Native Maps]</Text>
      </View>

      {/* Overlay Superior: Stats Flotantes */}
      <View style={styles.statsOverlay}>
        <View style={styles.statBox}>
          <FontAwesome5 name="clock" size={20} color="#4ade80" />
          <Text style={styles.statValue}>{formatTime(elapsedTime)}</Text>
          <Text style={styles.statLabel}>Minutos</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          <FontAwesome5 name="route" size={20} color="#3b82f6" />
          <Text style={styles.statValue}>1.2</Text>
          <Text style={styles.statLabel}>Kilómetros</Text>
        </View>
      </View>

      {/* Overlay Inferior: Panel de Control del Paseador */}
      <View style={styles.controlsOverlay}>
        <View style={styles.dogsInfo}>
          <Text style={styles.dogsWalking}>Paseando a Max y Luna (2/3)</Text>
          <Text style={styles.safetyStatus}>
            <FontAwesome5 name="shield-alt" size={12} color="#4ade80" /> Seguimiento Activo • Cobertura Legal
          </Text>
        </View>
        <TouchableOpacity style={styles.endButton}>
          <Text style={styles.endButtonText}>Finalizar Paseo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  mapMock: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapMockText: {
    color: '#666',
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  statsOverlay: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    backgroundColor: 'rgba(30, 30, 30, 0.95)',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  statBox: {
    alignItems: 'center',
    width: 100,
  },
  statValue: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    color: '#A0A0A0',
    fontSize: 12,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  divider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  controlsOverlay: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  dogsInfo: {
    backgroundColor: 'rgba(30, 30, 30, 0.95)',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  dogsWalking: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  safetyStatus: {
    color: '#4ade80',
    fontSize: 12,
    marginTop: 6,
    fontWeight: '600',
  },
  endButton: {
    backgroundColor: '#ef4444',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  endButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
