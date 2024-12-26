import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Expense {
  id: string; // Puede ser un UUID
  fecha: string;
  monto: number;
  categoria: string;
  descripcion?: string;
  estadoSync: 'pendiente' | 'sincronizado';
}

interface ExpensesState {
  items: Expense[];
}

const initialState: ExpensesState = {
  items: [],
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.items.push(action.payload);
    },
    updateExpense: (state, action: PayloadAction<Expense>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeExpense: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    markAsSynced: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.items[index].estadoSync = 'sincronizado';
      }
    },
  },
});

export const { addExpense, updateExpense, removeExpense, markAsSynced } = expensesSlice.actions;
export default expensesSlice.reducer;