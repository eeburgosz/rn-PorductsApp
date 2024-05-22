import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { Alert, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MyIcon } from '../../components';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useAuthStore } from '../../store';
import { useState } from 'react';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({ navigation }: Props) => {
  const { height } = useWindowDimensions();
  const { register } = useAuthStore();

  const [isPosting, setIsPosting] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    password2: '',
  });

  const onRegister = async () => {
    if (
      form.email.length === 0 ||
      form.password.length === 0 ||
      form.fullName.length < 2 ||
      form.password2.length === 0
    )
      return Alert.alert(
        'Debes llenar todos los campos y el nombre no puede ser menor a 3 caracteres.',
      );
    if (form.password !== form.password2)
      return Alert.alert('Las contraseñas deben coincidir.');
    setIsPosting(true);
    const wasSuccessfull = await register(
      form.fullName,
      form.email,
      form.password,
    );
    setIsPosting(false);
    if (wasSuccessfull) return;
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.25 }}>
          <Text category="h1">Crear cuenta</Text>
          <Text category="p2">Por favor, crea una cuenta para continuar</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{ marginTop: 20 }}>
          <Input
            style={{ marginBottom: 10 }}
            placeholder="Nombre y Apellido"
            keyboardType="default"
            autoCapitalize="words"
            accessoryLeft={<MyIcon name="person-outline" />}
            value={form.fullName}
            onChangeText={fullName => setForm({ ...form, fullName })}
          />
          <Input
            style={{ marginBottom: 10 }}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            value={form.email}
            accessoryLeft={<MyIcon name="email-outline" />}
            autoCapitalize="none"
            onChangeText={email => setForm({ ...form, email })}
          />

          <Input
            style={{ marginBottom: 10 }}
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            accessoryLeft={<MyIcon name="lock-outline" />}
            value={form.password}
            onChangeText={password => setForm({ ...form, password })}
          />

          <Input
            style={{ marginBottom: 10 }}
            placeholder="Repite tu contraseña"
            secureTextEntry
            autoCapitalize="none"
            accessoryLeft={<MyIcon name="lock-outline" />}
            value={form.password2}
            onChangeText={password2 => setForm({ ...form, password2 })}
          />

          {/* Space */}
          <Layout style={{ height: 10 }} />

          {/* Botón */}
          <Layout>
            <Button
              disabled={isPosting}
              accessoryRight={<MyIcon name="arrow-forward-outline" white />}
              onPress={onRegister}
              // appearance="ghost"
            >
              Crear
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
              <Text>¿Ya tienes cuenta?</Text>
              <Text
                status="primary"
                category="s1"
                onPress={() => navigation.pop()} //! O navigation.goBack()
              >
                {' '}
                Accede con ella
              </Text>
            </Layout>
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
