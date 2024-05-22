import { Text } from '@ui-kitten/components';
import { Product } from '../../../domain/entities';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  return <Text>{product.id}</Text>;
};
