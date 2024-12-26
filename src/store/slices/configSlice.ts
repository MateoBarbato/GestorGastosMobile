import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConfigState {
  autoSync: boolean; // Sincronización automática activada/desactivada
  lastSync: string | null; // Fecha y hora de la última sincronización
}

const initialState: ConfigState = {
  autoSync: true,
  lastSync: null,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    toggleAutoSync: (state) => {
      state.autoSync = !state.autoSync;
    },
    updateLastSync: (state, action: PayloadAction<string>) => {
      state.lastSync = action.payload;
    },
  },
});

export const { toggleAutoSync, updateLastSync } = configSlice.actions;
export default configSlice.reducer;