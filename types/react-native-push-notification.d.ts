declare module 'react-native-push-notification' {
  export interface ReceivedNotification {
    id: string;
    message: string;
    title?: string;
    [key: string]: any;
  }

  const PushNotification: any;
  export default PushNotification;
}