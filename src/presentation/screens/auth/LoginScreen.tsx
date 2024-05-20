import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export const LoginScreen = () => {
  const {height} = useWindowDimensions();

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.35}}>
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor, ingrese para continuar</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{marginTop: 20}}>
          <Input
            style={{marginBottom: 10}}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            style={{marginBottom: 10}}
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
          />

          {/* Space */}
          <Layout style={{height: 20}} />

          {/* Botón */}
          <Layout>
            <Button
              onPress={() => {}}
              // appearance="ghost"
            >
              Ingresar
            </Button>

            {/* Space */}
            <Layout style={{height: 50}} />

            {/* Información para crear cuenta */}
            <Layout
              style={{
                alignItems: 'flex-end',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text>¿No tienes cuenta?</Text>
              <Text status="primary" category="s1" onPress={() => {}}>
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
