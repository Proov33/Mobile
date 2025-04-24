import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { sendNotification } from '../utils/notification';
import { getFavorites, addFavorite } from '../utils/favorites';

const sports = [
  { name: 'Football', emoji: '⚽' },
  { name: 'Basketball', emoji: '🏀' },
  { name: 'Tennis', emoji: '🎾' },
  { name: 'Hockey', emoji: '🏒' },
];

const mockTeamSuggestions = [
  'Paris Saint-Germain',
  'Real Madrid',
  'Manchester United',
  'Bayern Munich',
  'Barcelona',
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [selectedSport, setSelectedSport] = useState('Football');
  const [team, setTeam] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [favorites, setFavorites] = useState(getFavorites());

  const handleSearch = () => {
    if (team.trim()) {
      sendNotification('Recherche en cours', `Recherche pour ${team}...`);
      navigation.navigate('Club', { teamName: team.trim(), sport: selectedSport });
    }
  };

  const handleInputChange = (text) => {
    setTeam(text);
    if (text.length > 1) {
      const suggestions = mockTeamSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredSuggestions(suggestions);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleAddFavorite = (teamName) => {
    addFavorite(teamName);
    setFavorites(getFavorites());
    sendNotification('Favori ajouté', `${teamName} a été ajouté à vos favoris.`);
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
        onChangeText={handleInputChange}
      />

      {filteredSuggestions.length > 0 && (
        <FlatList
          data={filteredSuggestions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setTeam(item);
                setFilteredSuggestions([]);
              }}
              style={styles.suggestionItem}
            >
              <Text style={styles.suggestionText}>{item}</Text>
              <TouchableOpacity
                onPress={() => handleAddFavorite(item)}
                style={styles.favoriteButton}
              >
                <Text style={styles.favoriteButtonText}>⭐</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          style={styles.suggestionsList}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Rechercher</Text>
      </TouchableOpacity>

      <Text style={styles.favoritesHeader}>Vos favoris :</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.favoriteItem}>{item}</Text>}
      />
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
  suggestionsList: {
    backgroundColor: '#222',
    borderRadius: 8,
    marginTop: 8,
    maxHeight: 150,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  suggestionText: {
    color: '#fff',
  },
  favoriteButton: {
    padding: 5,
  },
  favoriteButtonText: {
    color: '#ff0',
    fontSize: 20,
  },
  favoritesHeader: {
    color: '#fff',
    fontSize: 18,
    marginTop: 20,
  },
  favoriteItem: {
    color: '#ccc',
    fontSize: 16,
    marginVertical: 5,
  },
});