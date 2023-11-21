import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://swapi.dev/api/people/');
        setCharacters(response.data.results);
      } catch (error) {
        console.error('Erro ao buscar personagens:', error);
      }
    };

    fetchCharacters();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Icon name="user" size={20} color="#333" style={styles.icon} />
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Star Wars Characters</Text>
      <FlatList
        data={characters}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default App;
