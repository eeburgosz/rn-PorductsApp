import { tesloApi } from '../../config/api';
import { TesloProduct } from '../../infrastructure/interfaces';
import { ProductMapper } from '../../infrastructure/mapper';

export const getProductsByPage = async (page: number, limit: number = 20) => {
  // console.log({ page, limit });
  try {
    const { data } = await tesloApi.get<TesloProduct[]>(
      `/products?offset=${page * 10}&limit=${limit}`,
    );
    //  const products= data.map(tesloProduct=> ProductMapper.tesloProductToEntity(tesloProduct))
    const products = data.map(ProductMapper.tesloProductToEntity);
    // console.log(products[0]);
    return products;
  } catch (error) {
    console.log({ error });
    throw new Error('Error getting products');
  }
};
