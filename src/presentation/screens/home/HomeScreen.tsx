import { Layout, Text } from '@ui-kitten/components';
import { getProductsByPage } from '../../../actions';
import { useQuery } from '@tanstack/react-query';
import { MainLayout } from '../../layouts';

export const HomeScreen = () => {
  const { isLoading, data: products = [] } = useQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60,
    queryFn: () => getProductsByPage(0),
  });

  return (
    <MainLayout title="TesloShop Products" subTitle="Aplicación administrativa">
      <Text>Hola mundo</Text>
    </MainLayout>
  );
};
