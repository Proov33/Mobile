const BASE_URL = 'https://proov-scraper.onrender.com'; // Assurez-vous que cette URL est correcte et active

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
      console.error(`Erreur HTTP : ${response.status}`);
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data = await response.json();

    // Vérifiez si les données sont valides
    if (!data || Object.keys(data).length === 0) {
      throw new Error('Données reçues invalides ou vides.');
    }

    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error.message);
    // Retournez un objet d'erreur pour éviter que l'application ne plante
    return { error: true, message: error.message };
  }
}