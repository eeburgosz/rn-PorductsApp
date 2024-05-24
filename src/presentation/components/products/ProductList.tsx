import { useState } from 'react';
import { Layout, List } from '@ui-kitten/components';
import { Product } from '../../../domain/entities/product.entity';
import { ProductCard } from './ProductCard';
import { RefreshControl } from 'react-native-gesture-handler';
import { useQueryClient } from '@tanstack/react-query';
interface Props {
  products: Product[];
  fetchNextPage: () => void;

  //Todo: fetch dnextPage
}

export const ProductList = ({ products, fetchNextPage }: Props) => {
  const queryClient = useQueryClient();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] });
    //Sleep 2 seconds
    await new Promise(resolve => setTimeout(resolve, 200));
    setIsRefreshing(false);
  };

  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item}-${index}`}
      renderItem={({ item }) => <ProductCard product={item} />}
      ListFooterComponent={() => <Layout style={{ height: 150 }} />}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.6}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};
