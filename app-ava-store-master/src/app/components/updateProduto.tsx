import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  TextInput,
  View
} from 'react-native';
import { useCRUD } from '@/src/hooks/useCrud'; // Importa o hook customizado para operações CRUD
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';


interface Produto{
  id?: number;
  nome: string;
  preco: number;
  qtdStock: number;
  categoria: string;
}


function updateProduto(){
    const route = useRoute();
    const navigation = useNavigation();
    const { id, nome: nomeParam, preco: precoParam } = useLocalSearchParams();

    const { data, loading, error, create, getAll, remove, update } =
        //useCRUD<Produto>('users');
        useCRUD<Produto>('produto');
    

    const [nome, setNome] = useState(nomeParam || '');
    const [preco, setPreco] = useState(precoParam ? precoParam.toString() : '');

    //const [nome, setNome] = useState('');
    //const [preco, setPreco] = useState('');
    const [qtdStock, setQtdStock] = useState('');
    const [categoria, setCategoria] = useState('');

    const salvar = () => {
        
        navigation.goBack();
    }


return(
    <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
            Alteração de Produto
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

          <Button title="Salvar" onPress={salvar} />
    </View>
)
};

export default updateProduto;