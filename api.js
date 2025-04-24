const BASE_URL = 'https://proov-scraper.onrender.com'; // Remplacez par votre URL backend

/**
 * Récupère les données pour une équipe donnée et un onglet spécifique.
 * @param {string} teamName - Le nom de l'équipe.
 * @param {string} tab - L'onglet sélectionné (ex: "resume", "joueurs").
 * @returns {Promise<Object>} - Les données récupérées.
 */
export async function fetchClubData(teamName, tab) {
  try {
    const response = await fetch(`${BASE_URL}/scrape`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ team: teamName, section: tab }),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error('Erreur lors de la récupération des données:', error.message);
  }
}