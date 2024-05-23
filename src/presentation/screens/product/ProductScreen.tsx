import { MainLayout } from '../../layouts';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../../../actions';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useRef } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';
import { FadeInImage, MyIcon } from '../../components';
import { Gender, Size } from '../../../domain/entities';

const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];
const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Women];

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({ route }: Props) => {
  const theme = useTheme();

  // const { productId } = route.params;
  //! Es mejor dejar una referencia al ID porque esta misma pantalla la voy a usar para otras acciones.
  const productIdRef = useRef(route.params.productId);

  // useQuery
  const { data: product } = useQuery({
    queryKey: ['product', productIdRef.current],
    queryFn: () => getProductById(productIdRef.current),
    staleTime: 1000 * 60 * 60,
  });

  //useMutation
  if (!product) {
    return <MainLayout title="Cargando..."></MainLayout>;
  }

  return (
    <MainLayout title={product.title} subTitle={`Precio: ${product.price}`}>
      <ScrollView style={{ flex: 1 }}>
        {/* Imágenes del producto */}
        {/* Todo: Tener en consideración cuando no hay imágenes  */}
        <Layout>
          <FlatList
            data={product.images}
            keyExtractor={item => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <FadeInImage
                uri={item}
                style={{ width: 300, height: 300, marginHorizontal: 7 }}
              />
            )}
          />
        </Layout>

        {/* Formulario */}
        <Layout style={{ marginHorizontal: 10 }}>
          <Input
            label="Titulo"
            value={product.title}
            style={{ marginVertical: 5 }}
          />
          <Input
            label="Slug"
            value={product.slug}
            style={{ marginVertical: 5 }}
          />
          <Input
            label="Descripción"
            value={product.description}
            multiline
            numberOfLines={5}
            style={{ marginVertical: 5 }}
          />
        </Layout>

        {/* Precio e inventario */}
        <Layout
          style={{
            marginVertical: 5,
            marginHorizontal: 15,
            flexDirection: 'row',
            gap: 10,
          }}>
          <Input
            label="Precio"
            value={product.price.toString()}
            style={{ flex: 1 }}
          />
          <Input
            label="Inventario"
            value={product.stock.toString()}
            style={{ flex: 1 }}
          />
        </Layout>

        {/* Selectores */}
        <ButtonGroup
          size="small"
          appearance="outline"
          style={{
            margin: 2,
            marginHorizontal: 15,
            marginTop: 20,
          }}>
          {sizes.map(size => (
            <Button
              style={{
                flex: 1,
                backgroundColor: true ? theme['color-primary-200'] : undefined,
              }}
              key={size}>
              {size}
            </Button>
          ))}
        </ButtonGroup>
        <ButtonGroup
          size="small"
          appearance="outline"
          style={{
            margin: 2,
            marginHorizontal: 15,
            marginTop: 20,
          }}>
          {genders.map(gender => (
            <Button
              style={{
                flex: 1,
                backgroundColor: true ? theme['color-primary-200'] : undefined,
              }}
              key={gender}>
              {gender}
            </Button>
          ))}
        </ButtonGroup>

        {/* Botón para guardar */}

        <Button
          onPress={() => {}}
          style={{ margin: 15 }}
          accessoryLeft={<MyIcon name="save-outline" white />}>
          Guardar
        </Button>

        <Text>{JSON.stringify(product, null, 3)}</Text>

        <Layout style={{ height: 200 }} />
      </ScrollView>
    </MainLayout>
  );
};
