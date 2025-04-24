import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { fetchClubData } from '../utils/api';

export default function Calendar({ teamName }) {
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const response = await fetchClubData(teamName, 'calendrier');
      setMatches(response?.data || []);
    } catch (err) {
      setError('❌ Erreur lors de la récupération des matchs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const renderMatch = ({ item }) => (
    <View style={styles.matchItem}>
      <Text style={styles.matchDate}>{item.date}</Text>
      <Text style={styles.matchTeams}>{item.homeTeam} vs {item.awayTeam}</Text>
      <Text style={styles.matchScore}>{item.score || 'À venir'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🗓️ Calendrier des Matchs</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#f00" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={matches}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderMatch}
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
  matchItem: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  matchDate: {
    color: '#fff',
    fontSize: 16,
  },
  matchTeams: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 5,
  },
  matchScore: {
    color: '#f00',
    fontSize: 14,
    marginTop: 5,
  },
  error: {
    color: '#f00',
    textAlign: 'center',
    marginTop: 20,
  },
});