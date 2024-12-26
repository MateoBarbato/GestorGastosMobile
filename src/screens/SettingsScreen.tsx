import React from 'react';
import { View, Text, Button, StyleSheet, Switch, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAutoSync } from '../store/slices/configSlice';
import { RootState } from '../store';
import { exportToExcel } from '../services/excelService';
import { scheduleDailyNotification } from '../services/notificationService';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const autoSync = useSelector((state: RootState) => state.config.autoSync);

  const expenses = useSelector((state: RootState) => state.expenses.items);

  const handleExport = async () => {
    try {
      const filePath = await exportToExcel(expenses);
      Alert.alert('Exportación exitosa', `Archivo guardado en: ${filePath}`);
    } catch (error) {
      Alert.alert('Error', 'No se pudo exportar a Excel.');
    }
  };

  const handleSetReminder = () => {
    scheduleDailyNotification();
    Alert.alert('¡Recordatorio diario configurado!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuraciones</Text>
      <View style={styles.settingItem}>
        <Text>Sincronización Automática</Text>
        <Switch
          value={autoSync}
          onValueChange={(value: boolean) => {dispatch(toggleAutoSync())}}
        />
      </View>
      <Button title="Exportar Datos" onPress={handleExport} />
      <Button title="Configurar recordatorio diario" onPress={handleSetReminder} />
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default SettingsScreen;