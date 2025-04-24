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

export default function ClubScreen() {
  const route = useRoute();
  const { teamName } = route.params;
  const [activeTab, setActiveTab] = useState('resume');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');

  const BASE_URL = 'https://proov-scraper.onrender.com/scrape';

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          team: teamName,
          section: activeTab,
        }),
      });

      const text = await response.text();
      setData(text);
    } catch (err) {
      setData('❌ Erreur lors de la récupération.');
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
        {['resume', 'joueurs', 'matchs', 'calendrier'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text style={activeTab === tab ? styles.activeText : styles.text}>
              {tab === 'resume' && '📋 Résumé'}
              {tab === 'joueurs' && '👥 Joueurs'}
              {tab === 'matchs' && '⚽ Matchs'}
              {tab === 'calendrier' && '🗓️ Calendrier'}
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
