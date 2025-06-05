import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Text,
  TextInput,
  View
} from 'react-native';
import { useCRUD } from '@/src/hooks/useCrud'; // Importa o hook customizado para operações CRUD
import React, { useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';


type Produto = {
  id: number;
  nome: string;
  preco: number;
  qtdStock: number;
  categoria: string;
};


function updateProduto(){
    //const route = useRoute<RouteProp<ParamList, 'EditarProduto'>>();
    const navigation = useNavigation();
    const route = useRoute<RouteProp<any>>();
    const { id, nome: initialNome, preco: initialPreco, qtdStock: initialQtdStock, categoria: initialCategoria } = route.params;
    console.log('params recebidos:', route.params);

    const [nome, setNome] = useState(initialNome);
    const [preco, setPreco] = useState(String(initialPreco));
    const [qtdStock, setQtdStock] = useState(String(initialQtdStock));
    const [categoria, setCategoria] = useState(initialCategoria);

    //const { update, loading } = useCRUD<Produto>('produto');
    const { update} =
      useCRUD<Produto>('produto');

    const salvar = () => {
        
        navigation.goBack();
    }

    const handleSalvar = async () => {
    try {
      const dadosAtualizados = {
        nome,
        preco: parseFloat(preco),
        qtdStock: parseFloat(qtdStock),
        categoria
      };
      console.log('Enviando dados:', { dadosAtualizados });

      await update(id, dadosAtualizados);

      Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
      navigation.goBack();
    } catch (err) {
      console.error('Erro ao atualizar produto:', err.response?.data || err.message || err);
      Alert.alert('Erro', 'Não foi possível atualizar o produto.');
    }
  };

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

          <Button title="Salvar" onPress={handleSalvar} />
    </View>
)
};

export default updateProduto;