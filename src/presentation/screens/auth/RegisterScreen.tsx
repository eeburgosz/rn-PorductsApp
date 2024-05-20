import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {MyIcon} from '../../components';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {height} = useWindowDimensions();

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.25}}>
          <Text category="h1">Crear cuenta</Text>
          <Text category="p2">Por favor, crea una cuenta para continuar</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{marginTop: 20}}>
          <Input
            style={{marginBottom: 10}}
            placeholder="Nombre y Apellido"
            keyboardType="default"
            autoCapitalize="words"
            accessoryLeft={<MyIcon name="person-outline" />}
          />
          <Input
            style={{marginBottom: 10}}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            accessoryLeft={<MyIcon name="email-outline" />}
          />

          <Input
            style={{marginBottom: 10}}
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            accessoryLeft={<MyIcon name="lock-outline" />}
          />

          <Input
            style={{marginBottom: 10}}
            placeholder="Repite tu contraseña"
            secureTextEntry
            autoCapitalize="none"
            accessoryLeft={<MyIcon name="lock-outline" />}
          />

          {/* Space */}
          <Layout style={{height: 10}} />

          {/* Botón */}
          <Layout>
            <Button
              accessoryRight={<MyIcon name="arrow-forward-outline" white />}
              onPress={() => {}}
              // appearance="ghost"
            >
              Crear
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
