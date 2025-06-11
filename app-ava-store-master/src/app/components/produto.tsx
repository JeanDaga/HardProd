import { useCRUD } from '@/src/hooks/useCrud'; // Importa o hook customizado para operações CRUD
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Text,
  TextInput,
  View,
  StyleSheet
} from 'react-native';
import { api } from '../libs/axios';
import { useRouter, useNavigation } from 'expo-router';


// Interface que define o formato do objeto Produto
interface Produto{
  id?: number;
  nome: string;
  preco: number;
  qtdStock: number;
  categoria: string;
}

const Produtos = () => {
  const router = useRouter();
  const navigation = useNavigation();
  // Usa o hook useCRUD passando a entidade "users" e o tipo Cliente.
  // A URL base do hook será algo como: https://suaapi.com/users
  const { data, loading, error, create, getAll, remove } =
    useCRUD<Produto>('produto');

  // Estados para armazenar os dados do formulário
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [qtdStock, setQtdStock] = useState('');
  const [categoria, setCategoria] = useState('');

  // useEffect para buscar todos os produtos assim que o componente for montado
  useEffect(() => {
    getAll(); // Chama a função que faz uma requisição GET para a API
  }, []);

  const carregarTudo = async () => {
      getAll(); // Chama a função que faz uma requisição GET para a API
  };

  /*function verificarDados(){
    if((nome) == ''){
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
    }
  }*/

  // Função para cadastrar um novo produto
  const handleSubmit = async () => {
    const novoProduto = { nome, preco, qtdStock, categoria };
    //verificarDados();
    if((nome && preco && qtdStock && categoria) !== ''){
    try {
      await create({
        nome: novoProduto.nome,
        preco: Number(novoProduto.preco),
        qtdStock: Number(novoProduto.qtdStock),
        categoria: novoProduto.categoria,
      }); // Chama o método POST do hook
      setNome('');
      setPreco('');
      setQtdStock('');
      setCategoria('');
      Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
    } catch (err) {
      console.error('Erro ao cadastrar produto:', err);
      Alert.alert('Erro', 'Não foi possível cadastrar o produto.');
    }
    }else{
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
    }
    getAll();
  };

  // Função para excluir um produto
  const handleDelete = async (id: number) => {
    try {
      await remove(id); // Chama o método DELETE do hook
      Alert.alert('Sucesso', 'Produto deletado com sucesso!');
    } catch (err) {
      console.error('Erro ao excluir produto:', err);
      Alert.alert('Erro', 'Não foi possível deletar o produto.');
    }
    getAll();
  };

  const handleAlterar = (product: Produto) => {
    //router.push('/components/updateProduto');
    router.push({
      pathname: '/components/updateProduto',
      params: { id: product.id, nome: product.nome, preco: product.preco, qtdStock: product.qtdStock, categoria: product.categoria },
    });
  };

  // Garante que o valor de `data` seja sempre um array
  const produtoData = Array.isArray(data) ? data : data ? [data] : [];

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Cadastro de Produto
      </Text>

      {/* Campo de entrada para nome */}
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      {/* Campo de entrada para preço */}
      <TextInput
        value={preco}
        onChangeText={setPreco}
        placeholder="Preço"
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />

      {/* Campo de entrada para qtdStock */}
      <TextInput
        value={qtdStock}
        onChangeText={setQtdStock}
        placeholder="qtdStock"
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />

      {/* Campo de entrada para categoria */}
      <TextInput
        value={categoria}
        onChangeText={setCategoria}
        placeholder="Categoria"
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />

      {/* Botão para cadastrar */}
      <Button
        title={loading ? 'Cadastrando...' : 'Cadastrar'}
        onPress={handleSubmit}
        disabled={loading}
      />

      <Button title='carregar' onPress={carregarTudo} disabled={loading} />
      
        
      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>
        Lista de Clientes:
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
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10
              }}
            >
              <Text>
                {item.nome}
              </Text>
              <Text>
                R${item.preco}
              </Text>
              <Button title="Alterar" onPress={() => handleAlterar(item)} />
              <Button title="Excluir" onPress={() => handleDelete(item.id!)} />
            </View>
          )}
          keyExtractor={(item) =>
            item.id?.toString() || Math.random().toString()
          }
        />
      )}
    </View>
  );
};

export default Produtos;

const styles = StyleSheet.create({
  carregar: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  error: { color: 'red', marginBottom: 10 }
});