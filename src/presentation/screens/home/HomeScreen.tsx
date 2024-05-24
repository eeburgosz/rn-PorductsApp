import { getProductsByPage } from '../../../actions';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { MainLayout } from '../../layouts';
import { FAB, FullScreenLoader, ProductList } from '../../components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  // const { isLoading, data: products = [] } = useQuery({
  //   queryKey: ['products', 'infinite'],
  //   staleTime: 1000 * 60 * 60,
  //   queryFn: () => getProductsByPage(0),
  // });
  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60,
    initialPageParam: 0,
    queryFn: async params => {
      const products = await getProductsByPage(params.pageParam);
      return products;
    },
    getNextPageParam: (lastPages, allPages) => allPages.length,
  });

  //! data regresa un arreglo de arreglos porque trae la información por páginas. Toda la información es un arreglo general y cada sub arreglo es de productos por página. [  [p1,p2,p3],[p4,p5,p6],[p7,p8,p9]  ]

  return (
    <>
      <MainLayout
        title="TesloShop Products"
        subTitle="Aplicación administrativa">
        {isLoading ? (
          <FullScreenLoader />
        ) : (
          <ProductList
            fetchNextPage={fetchNextPage}
            products={data?.pages.flat() ?? []}
          />
        )}
      </MainLayout>
      <FAB
        style={{ position: 'absolute', bottom: 20, right: 20 }}
        onPress={() =>
          navigation.navigate('ProductScreen', { productId: 'new' })
        }
        iconName="plus-outline"
      />
    </>
  );
};
