import { useCRUD } from '@/src/hooks/useCrud'; // Importa o hook customizado para operações CRUD
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  TextInput,
  View
} from 'react-native';

// Interface que define o formato do objeto Cliente
/*
interface Cliente {
  id?: number; // ID opcional (gerado pela API)
  nome: string;
  email: string;
}*/
interface Produto{
  id?: number;
  nome: string;
  preco: number;
  qtdStock: number;
  categoria: string;
}

const Clientes = () => {
  // Usa o hook useCRUD passando a entidade "users" e o tipo Cliente.
  // A URL base do hook será algo como: https://suaapi.com/users
  const { data, loading, error, create, getAll, remove } =
    //useCRUD<Cliente>('users');
    useCRUD<Produto>('produto');

  // Estados para armazenar os dados do formulário
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [qtdStock, setQtdStock] = useState('');
  const [categoria, setCategoria] = useState('');

  // useEffect para buscar todos os clientes assim que o componente for montado
  useEffect(() => {
    getAll(); // Chama a função que faz uma requisição GET para a API
  }, []);

  // Função para cadastrar um novo cliente
  const handleSubmit = async () => {
    const novoCliente = { nome, preco, qtdStock, categoria };
    try {
      await create(novoCliente); // Chama o método POST do hook
      setNome('');
      setPreco('');
      setQtdStock('');
      setCategoria('');
    } catch (err) {
      console.error('Erro ao cadastrar cliente:', err);
    }
  };

  // Função para excluir um cliente
  const handleDelete = async (id: number) => {
    try {
      await remove(id); // Chama o método DELETE do hook
    } catch (err) {
      console.error('Erro ao excluir cliente:', err);
    }
  };

  // Garante que o valor de `data` seja sempre um array
  const clienteData = Array.isArray(data) ? data : data ? [data] : [];

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

      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>
        Lista de Clientes:
      </Text>

      {/* Exibe um indicador de carregamento, mensagem de erro ou a lista */}
      {loading ? (
        <ActivityIndicator size="large" color="#196e52" />
      ) : error ? (
        <Text style={{ color: 'red' }}>Erro ao carregar clientes</Text>
      ) : (
        <FlatList
          data={clienteData} // Garante que seja um array
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

export default Clientes;
