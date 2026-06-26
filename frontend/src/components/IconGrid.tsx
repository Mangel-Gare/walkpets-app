import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

type Clauses = {
  bozal_obligatorio?: boolean;
  correa_obligatoria?: boolean;
  prohibido_dar_comida?: boolean;
  golosinas_permitidas?: boolean;
};

export const IconGrid = ({ clauses }: { clauses: Clauses }) => {
  return (
    <View style={styles.container}>
      {clauses.bozal_obligatorio && (
        <View style={styles.iconBox}>
          <FontAwesome5 name="dog" size={24} color="#4ade80" />
          <Text style={styles.label}>Bozal</Text>
        </View>
      )}
      {clauses.prohibido_dar_comida && (
        <View style={styles.iconBox}>
          <MaterialIcons name="no-meals" size={24} color="#f87171" />
          <Text style={styles.label}>No Comida</Text>
        </View>
      )}
      {clauses.golosinas_permitidas && (
        <View style={styles.iconBox}>
          <FontAwesome5 name="bone" size={24} color="#4ade80" />
          <Text style={styles.label}>Chuches OK</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'flex-start',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
  },
  iconBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  label: {
    color: '#e5e5e5',
    fontSize: 10,
    marginTop: 6,
    fontWeight: '600',
  },
});
