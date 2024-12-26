import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const expenses = useSelector((state: RootState) => state.expenses.items);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen Mensual</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text>{item.categoria}</Text>
            <Text>${item.monto}</Text>
          </View>
        )}
      />
      <Button title="Agregar Gasto" onPress={() => navigation.navigate('AddExpense')} />
      <Button title="Configuraciones" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HomeScreen;