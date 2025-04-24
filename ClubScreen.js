import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fetchClubData } from '../utils/api';
import { sendNotification } from '../utils/notification';

export default function ClubScreen() {
  const route = useRoute();
  const { teamName } = route.params;
  const [activeTab, setActiveTab] = useState('resume');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');

  const tabs = [
    { name: 'resume', label: '📋 Résumé' },
    { name: 'joueurs', label: '👥 Joueurs' },
    { name: 'matchs', label: '⚽ Matchs' },
    { name: 'calendrier', label: '🗓️ Calendrier' },
    { name: 'paris', label: '💰 Paris' },
    { name: 'live', label: '📡 Scores en Direct' }, // Nouvel onglet
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchClubData(teamName, activeTab);
      setData(response?.data || 'Aucune donnée disponible.');
      sendNotification('Données chargées', `Les données pour l'onglet ${activeTab} sont prêtes.`);
    } catch (err) {
      setData('❌ Erreur lors de la récupération des données.');
      sendNotification('Erreur', 'Impossible de récupérer les données.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            onPress={() => setActiveTab(tab.name)}
            style={[styles.tab, activeTab === tab.name && styles.activeTab]}
          >
            <Text style={activeTab === tab.name ? styles.activeText : styles.text}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>📊 {teamName}</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#f00" />
        ) : (
          <ScrollView style={styles.scrollView}>
            <Text style={styles.data}>{data}</Text>
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flex: 1, backgroundColor: '#111' },
  sidebar: { width: 100, backgroundColor: '#222', paddingTop: 20 },
  tab: { paddingVertical: 15, alignItems: 'center' },
  activeTab: { backgroundColor: '#f00' },
  text: { color: '#fff', fontSize: 14 },
  activeText: { color: '#fff', fontWeight: 'bold' },
  content: { flex: 1, padding: 20 },
  title: { color: '#fff', fontSize: 20, marginBottom: 10 },
  scrollView: { marginTop: 10 },
  data: { color: '#ccc', fontSize: 14, lineHeight: 22 },
});