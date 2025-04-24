import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites';

/**
 * Récupère les équipes favorites depuis le stockage local.
 * @returns {Array} - Liste des équipes favorites.
 */
export async function getFavorites() {
  try {
    const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Erreur lors de la récupération des favoris:', error);
    return [];
  }
}

/**
 * Ajoute une équipe aux favoris.
 * @param {string} team - Nom de l'équipe.
 */
export async function addFavorite(team) {
  try {
    const favorites = await getFavorites();
    if (!favorites.includes(team)) {
      favorites.push(team);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout aux favoris:', error);
  }
}