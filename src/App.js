import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import api from "./services/api";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
      console.log(response.data);
      console.log(repositories);
    });
  }, []);

  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`);

    const repositoriesUpdo = repositories.map((repo) => {
      if (repo.id === id) {
        return response.data;
      }
      return repo;
    });

    setRepositories(repositoriesUpdo);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={(repository) => repository.id}
          renderItem={({ item: repository }) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{repository.title}</Text>

              <View style={styles.techsContainer}>
                {repository.techs.map((tech) => (
                  <Text key={tech} style={styles.tech}>
                    {tech}
                  </Text>
                ))}
              </View>

              <View style={styles.likesContainer}>
                <Icon name="like1" size={18} color="#707079" />
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${repository.id}`}
                >
                  {repository.likes} curtida
                  {repository.likes > 1 ? "s" : ""}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => handleLikeRepository(repository.id)}
                testID={`like-button-${repository.id}`}
              >
                <View style={styles.likebutton}>
                  <Icon
                    name="like1"
                    size={20}
                    color="#fff"
                    style={styles.iconbutton}
                  />
                  <Text style={styles.buttonText}> CURTIR</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#463774",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  repository: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#565662",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
    borderRadius: 10,
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    marginLeft: 6,
    marginTop: 2,
    color: "#565662",
  },
  likebutton: {
    marginTop: 20,
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#7159c1",
    justifyContent: "center",
  },

  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    padding: 15,
    borderRadius: 10,
    justifyContent: "space-around",
  },

  iconbutton: {
    marginTop: 12,
  },
});
