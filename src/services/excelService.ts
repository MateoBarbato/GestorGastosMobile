import XLSX from 'xlsx';
import RNFS from 'react-native-fs';

interface Expense {
  fecha: string;
  monto: number;
  categoria: string;
  descripcion?: string;
}

export const exportToExcel = async (expenses: Expense[]) => {
  try {
    // Crear hoja de trabajo
    const worksheet = XLSX.utils.json_to_sheet(expenses);

    // Crear libro de trabajo
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Gastos');

    // Convertir a archivo Excel
    const excelFile = XLSX.write(workbook, { type: 'binary', bookType: 'xlsx' });

    // Guardar archivo en el sistema de archivos
    const path = `${RNFS.DownloadDirectoryPath}/gastos.xlsx`;
    await RNFS.writeFile(path, excelFile, 'ascii');

    return path; // Ruta del archivo generado
  } catch (error) {
    console.error('Error al exportar a Excel:', error);
    throw error;
  }
};