import { Text } from '@ui-kitten/components';
import { MainLayout } from '../../layouts';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../../../actions';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useRef } from 'react';

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
      <Text>Hola mundo</Text>
    </MainLayout>
  );
};
