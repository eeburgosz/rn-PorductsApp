import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { Alert, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MyIcon } from '../../components';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useState } from 'react';
import { useAuthStore } from '../../store';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({ navigation }: Props) => {
  const { height } = useWindowDimensions();
  const { login } = useAuthStore();

  const [isPosting, setIsPosting] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onLogin = async () => {
    if (form.email.length === 0 || form.password.length === 0) return;
    setIsPosting(true);
    const wasSuccessful = await login(form.email, form.password);
    setIsPosting(false);
    if (wasSuccessful) return;

    Alert.alert('Error, usuario y contraseña incorrectos');
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.35 }}>
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor, ingrese para continuar</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{ marginTop: 20 }}>
          <Input
            style={{ marginBottom: 10 }}
            placeholder="Correo electrónico"
            //*
            value={form.email}
            onChangeText={email => setForm({ ...form, email })}
            //*
            keyboardType="email-address"
            autoCapitalize="none"
            accessoryLeft={<MyIcon name="email-outline" />}
          />

          <Input
            style={{ marginBottom: 10 }}
            placeholder="Contraseña"
            //*
            value={form.password}
            onChangeText={password => setForm({ ...form, password })}
            //*
            secureTextEntry
            autoCapitalize="none"
            accessoryLeft={<MyIcon name="lock-outline" />}
          />

          {/* <Text>{JSON.stringify(form, null, 4)}</Text> */}

          {/* Space */}
          <Layout style={{ height: 10 }} />

          {/* Botón */}
          <Layout>
            <Button
              accessoryRight={<MyIcon name="arrow-forward-outline" white />}
              onPress={onLogin}
              disabled={isPosting}
              // appearance="ghost"
            >
              Ingresar
            </Button>

            {/* Space */}
            <Layout style={{ height: 50 }} />

            {/* Información para crear cuenta */}
            <Layout
              style={{
                alignItems: 'flex-end',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text>¿No tienes cuenta?</Text>
              <Text
                status="primary"
                category="s1"
                onPress={() => navigation.navigate('RegisterScreen')}>
                {' '}
                Crea una
              </Text>
            </Layout>
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
