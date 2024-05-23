import { getProductsByPage } from '../../../actions';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { MainLayout } from '../../layouts';
import { FullScreenLoader, ProductList } from '../../components';

export const HomeScreen = () => {
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
      console.log(params);
      const products = await getProductsByPage(params.pageParam);
      return products;
    },
    getNextPageParam: (lastPages, allPages) => allPages.length,
  });

  //! data regresa un arreglo de arreglos porque trae la información por páginas. Toda la información es un arreglo general y cada sub arreglo es de productos por página. [  [p1,p2,p3],[p4,p5,p6],[p7,p8,p9]  ]

  return (
    <MainLayout title="TesloShop Products" subTitle="Aplicación administrativa">
      {isLoading ? (
        <FullScreenLoader />
      ) : (
        <ProductList
          fetchNextPage={fetchNextPage}
          products={data?.pages.flat() ?? []}
        />
      )}
    </MainLayout>
  );
};
