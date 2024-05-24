import { tesloApi } from '../../config/api';
import { Gender, Product } from '../../domain/entities';
import { TesloProduct } from '../../infrastructure/interfaces';
import { ProductMapper } from '../../infrastructure/mapper';

const emptyProduct: Product = {
  id: '',
  title: 'Nuevo producto',
  description: '',
  price: 0,
  images: [],
  slug: '',
  gender: Gender.Men,
  sizes: [],
  stock: 0,
  tags: [],
};

export const getProductById = async (id: string): Promise<Product> => {
  if (id === 'new') return emptyProduct;
  try {
    const { data } = await tesloApi.get<TesloProduct>(`/products/${id}`);
    return ProductMapper.tesloProductToEntity(data);
  } catch (error) {
    console.log(error);
    throw new Error('Cannot get product by id ${id} ');
  }
};
