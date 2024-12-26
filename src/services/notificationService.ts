import PushNotification from 'react-native-push-notification';

export const configureNotifications = () => {
  PushNotification.configure({
    onNotification: function (notification: any) {
      console.log('Notificación recibida:', notification);
    },
    popInitialNotification: true,
    requestPermissions: true,
  });

  PushNotification.createChannel(
    {
      channelId: 'expenses-reminders', // ID único para el canal
      channelName: 'Recordatorios de gastos',
      channelDescription: 'Notificaciones para registrar gastos diarios',
    },
    (created: boolean) => console.log(`Canal creado: ${created}`),
  );
};

export const scheduleDailyNotification = () => {
  PushNotification.localNotificationSchedule({
    channelId: 'expenses-reminders',
    title: 'Recordatorio',
    message: 'No olvides registrar tus gastos hoy 📋',
    date: new Date(Date.now() + 10 * 1000), // 10 segundos para prueba
    repeatType: 'day', // Repetir diariamente
  });
};