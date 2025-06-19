import { useNavigation, useRouter } from 'expo-router';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useCRUD } from '@/src/hooks/useCrud'; // Importa o hook customizado para operações CRUD
import { useEffect } from 'react';

// Interface que define o formato do objeto Produto
interface Produto{
  id?: number;
  nome: string;
  preco: number;
  qtdStock: number;
  categoria: string;
}

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const navigation = useNavigation();

  function handleLogout() {
    logout();
    router.replace('/');
    //navigation.goBack();
  }

  function handleProdutos() {
    router.push('/components/produto');
  }

  function carregar() {
    getAll();
  }

  // Usa o hook useCRUD passando a entidade "users" e o tipo Cliente.
    // A URL base do hook será algo como: https://suaapi.com/users
    const { data, loading, error, getAll } =
      useCRUD<Produto>('produto');

  // Garante que o valor de `data` seja sempre um array
  const produtoData = Array.isArray(data) ? data : data ? [data] : [];

  // useEffect para buscar todos os produtos assim que o componente for montado
    useEffect(() => {
      getAll(); // Chama a função que faz uma requisição GET para a API
    }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{padding: 20, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.text}>Bem-vindo ao HardProd</Text>
      </View>
      
      <View style={styles.container}>
        <Button title="Produtos" onPress={handleProdutos} />
        <View style={styles.space} />
        <Button title="Carregar" onPress={carregar}/>
        <View style={styles.space} />
        <Button title="Sair" onPress={handleLogout} color="red" />
      </View>
    
      <View style={{ padding: 20, flex: 1}}>
        <Text style={{ marginTop: 20, fontWeight: 'bold' }}>
          Lista de Produtos:
        </Text>
        
            {/* Exibe um indicador de carregamento, mensagem de erro ou a lista */}
            {loading ? (
              <ActivityIndicator size="large" color="#196e52" />
            ) : error ? (
              <Text style={{ color: 'red' }}>Erro ao carregar produtos</Text>
            ) : (
              <FlatList
                data={produtoData} // Garante que seja um array
                renderItem={({ item }) => (
                  <View
                    style={styles.productItemRow}
                  >
                    <Text style={styles.productName}>
                      {item.nome}
                    </Text>
                    <Text style={styles.productPrice}>
                      R${item.preco}
                    </Text>
                    <Text style={styles.productDetail}>
                      {item.qtdStock}
                    </Text>
                    <Text style={styles.productDetail}>
                      {item.categoria}
                    </Text>
                  </View>
                )}
                keyExtractor={(item) =>
                  item.id?.toString() || Math.random().toString()
                }
              />
            )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  text: { fontSize: 20, marginBottom: 20, height: 100 },
  space: {
    width: 20,
    height: 20,
  },
  productItemRow: {
    flexDirection: 'row', // Isso faz com que os itens fiquem na mesma linha
    justifyContent: 'space-between', // Distribui os itens uniformemente na linha
    alignItems: 'center', // Centraliza os itens verticalmente
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 2, // Permite que o nome ocupe mais espaço
    marginRight: 5,
  },
  productPrice: {
    fontSize: 15,
    color: '#007bff',
    flex: 1,
    textAlign: 'right',
    marginRight: 5,
  },
  productDetail: {
    fontSize: 14,
    color: '#555',
    flex: 0.8, // Permite que os detalhes ocupem menos espaço
    textAlign: 'center',
    marginRight: 5,
  }
});
