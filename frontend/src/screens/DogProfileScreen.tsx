import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { IconGrid } from '../components/IconGrid';

export const DogProfileScreen = () => {
  // Mock data que en producción vendría del JSONB de PostgreSQL
  const mockClauses = {
    bozal_obligatorio: true,
    correa_obligatoria: true,
    prohibido_dar_comida: true,
    golosinas_permitidas: true,
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop' }} 
          style={styles.dogImage} 
        />
        <View style={styles.nameBadge}>
          <Text style={styles.dogName}>Max</Text>
          <Text style={styles.dogBreed}>Golden Retriever</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Reglas del Paseo</Text>
        <IconGrid clauses={mockClauses} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  imageContainer: {
    position: 'relative',
    height: 350,
  },
  dogImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  nameBadge: {
    position: 'absolute',
    bottom: -20,
    left: 20,
    backgroundColor: '#1E1E1E',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  dogName: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  dogBreed: {
    color: '#A0A0A0',
    fontSize: 14,
    marginTop: 2,
  },
  content: {
    padding: 24,
    marginTop: 30,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  }
});
