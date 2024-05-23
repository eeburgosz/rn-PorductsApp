import { Card, Text } from '@ui-kitten/components';
import { Product } from '../../../domain/entities';
import { Image } from 'react-native';
import { FadeInImage } from '../../components';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <Card style={{ flex: 1, backgroundColor: '#F9F9F9', margin: 3 }}>
      {product.images.length === 0 ? (
        <Image
          source={require('../../../assets/no-product-image.png')}
          style={{ width: '100%', height: 200 }}
        />
      ) : (
        <FadeInImage
          uri={product.images[0]}
          style={{ flex: 1, width: '100%', height: 200 }}
        />
      )}

      <Text style={{ textAlign: 'center' }} numberOfLines={2}>
        {product.title}
      </Text>
    </Card>
  );
};
