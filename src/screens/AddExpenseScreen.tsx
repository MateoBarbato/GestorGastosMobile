import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addExpense } from '../store/slices/expensesSlice';
import { v4 as uuidv4 } from 'uuid';

const AddExpenseScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleAddExpense = () => {
    if (!monto || !categoria) {
      Alert.alert('Por favor completa todos los campos.');
      return;
    }

    const newExpense = {
      id: uuidv4(),
      fecha: new Date().toISOString(),
      monto: parseFloat(monto),
      categoria,
      descripcion,
      estadoSync: 'pendiente' as const,
    };

    dispatch(addExpense(newExpense));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Gasto</Text>
      <TextInput
        style={styles.input}
        placeholder="Monto"
        keyboardType="numeric"
        value={monto}
        onChangeText={setMonto}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoría"
        value={categoria}
        onChangeText={setCategoria}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción (opcional)"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <Button title="Guardar" onPress={handleAddExpense} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});

export default AddExpenseScreen;