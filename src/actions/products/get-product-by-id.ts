import { tesloApi } from '../../config/api';
import { Product } from '../../domain/entities';
import { TesloProduct } from '../../infrastructure/interfaces';
import { ProductMapper } from '../../infrastructure/mapper';

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const { data } = await tesloApi.get<TesloProduct>(`/products/${id}`);
    return ProductMapper.tesloProductToEntity(data);
  } catch (error) {
    console.log(error);
    throw new Error('Cannot get product by id ${id} ');
  }
};
