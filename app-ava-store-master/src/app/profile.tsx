import { useNavigation, useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const navigation = useNavigation();

  function handleLogout() {
    logout();
    //router.replace('/');
    navigation.goBack();
  }

  function handleProdutos() {
    router.push('/components/produto');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo, {user?.email}</Text>

      <Button title="Produtos" onPress={handleProdutos} />

      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: { fontSize: 20, marginBottom: 20 }
});
