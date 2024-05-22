import { Layout, List, Text } from '@ui-kitten/components';
import { Product } from '../../../domain/entities/product.entity';
import { ProductCard } from './ProductCard';
interface Props {
  products: Product[];

  //Todo: fetch dnextPage
}

export const ProductList = ({ products }: Props) => {
  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item}-${index}`}
      renderItem={({ item }) => <ProductCard product={item} />}
      ListFooterComponent={() => <Layout style={{ height: 150 }} />}
    />
  );
};
