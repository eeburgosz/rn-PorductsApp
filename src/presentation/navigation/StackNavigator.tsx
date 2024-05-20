import {createStackNavigator} from '@react-navigation/stack';
import {
  HomeScreen,
  LoadingScreen,
  LoginScreen,
  ProductScreen,
  RegisterScreen,
} from '../screens';

export type RootStackParams = {
  HomeScreen: undefined;
  LoadingScreen: undefined;
  RegisterScreen: undefined;
  LoginScreen: undefined;
  ProductScreen: {productId: string};
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
};
