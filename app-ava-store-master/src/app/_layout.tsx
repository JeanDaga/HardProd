import { Stack } from 'expo-router';
import { AuthProvider } from './contexts/authContext';

export default function Layout(){
    return (
      <AuthProvider>
        <Stack screenOptions={
            {headerStyle: {backgroundColor: 'rgba(##00ffff)'}, 
            headerTitleStyle:{color: 'white'}
            }}>
            
            <Stack.Screen name="index" options={{headerShown: false}}/>
            <Stack.Screen name="profile" options={{title: 'Menu'}}/>
            <Stack.Screen name="components/produto" options={{title: 'Produtos'}}/>
            <Stack.Screen name="components/updateProduto" options={{title: 'Alterar'}}/>

        </Stack>
      </AuthProvider>
    );
}

/*
export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
}*/
