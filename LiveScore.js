import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { fetchClubData } from '../utils/api';

export default function LiveScore({ teamName }) {
  const [loading, setLoading] = useState(false);
  const [liveScores, setLiveScores] = useState([]);
  const [error, setError] = useState('');

  const fetchLiveScores = async () => {
    setLoading(true);
    try {
      const response = await fetchClubData(teamName, 'live');
      setLiveScores(response?.data || []);
    } catch (err) {
      setError('❌ Erreur lors de la récupération des scores en direct.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveScores();
    const interval = setInterval(fetchLiveScores, 30000); // Mise à jour toutes les 30 secondes
    return () => clearInterval(interval); // Nettoyage de l'intervalle
  }, []);

  const renderScore = ({ item }) => (
    <View style={styles.scoreItem}>
      <Text style={styles.matchTeams}>{item.homeTeam} vs {item.awayTeam}</Text>
      <Text style={styles.matchScore}>{item.score}</Text>
      <Text style={styles.matchTime}>{item.time}′</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📡 Scores en Direct</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#f00" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={liveScores}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderScore}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#111',
  },
  header: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
  },
  scoreItem: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  matchTeams: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 5,
  },
  matchScore: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  matchTime: {
    color: '#f00',
    fontSize: 14,
  },
  error: {
    color: '#f00',
    textAlign: 'center',
    marginTop: 20,
  },
});