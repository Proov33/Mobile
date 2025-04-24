import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const sports = [
  { name: 'Football', emoji: '⚽' },
  { name: 'Basketball', emoji: '🏀' },
  { name: 'Tennis', emoji: '🎾' },
  { name: 'Hockey', emoji: '🏒' },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [selectedSport, setSelectedSport] = useState('Football');
  const [team, setTeam] = useState('');

  const handleSearch = () => {
    if (team.trim()) {
      navigation.navigate('Club', { teamName: team.trim(), sport: selectedSport });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Proov App 🔥</Text>
      <Text style={styles.subheader}>Choisis ton sport</Text>

      <View style={styles.sportsContainer}>
        {sports.map((sport) => (
          <TouchableOpacity
            key={sport.name}
            style={[
              styles.sportButton,
              selectedSport === sport.name && styles.activeSportButton,
            ]}
            onPress={() => setSelectedSport(sport.name)}
          >
            <Text style={styles.sportText}>
              {sport.emoji} {sport.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Entrez une équipe"
        placeholderTextColor="#aaa"
        value={team}
        onChangeText={setTeam}
      />

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Rechercher</Text>
      </TouchableOpacity>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subheader: {
    color: '#ccc',
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
  sportsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  sportButton: {
    width: (screenWidth - 60) / 2,
    backgroundColor: '#222',
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginVertical: 6,
    borderRadius: 10,
    alignItems: 'center',
  },
  activeSportButton: {
    backgroundColor: '#e50914',
  },
  sportText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#e50914',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
