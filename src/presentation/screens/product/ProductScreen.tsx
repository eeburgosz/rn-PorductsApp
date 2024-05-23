import { MainLayout } from '../../layouts';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../../../actions';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useRef } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Input, Layout } from '@ui-kitten/components';
import { FadeInImage } from '../../components';

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({ route }: Props) => {
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

        <Layout style={{ height: 200 }} />
      </ScrollView>
    </MainLayout>
  );
};
