import { Alert } from 'react-native';

/**
 * Envoie une notification locale.
 * @param {string} title - Titre de la notification.
 * @param {string} message - Message de la notification.
 */
export function sendNotification(title, message) {
  Alert.alert(title, message);
}