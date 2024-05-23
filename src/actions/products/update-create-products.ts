import { isAxiosError } from 'axios';
import { tesloApi } from '../../config/api';
import { Product } from '../../domain/entities';

export const updateCreateProduct = (product: Partial<Product>) => {
  //!El Partial quiere decir que viene un objeto con no necesariamente todas las propiedades del tipo. Esto quiere decir que todas las properties serán opcionales (product?.id, product?.title,...)

  product.stock = Number(product.stock);
  product.price = Number(product.price);

  if (product.id) {
    return updateProduct(product);
  }

  throw new Error('Creación no implemetada');
};

//Todo: Revisar si viene el usuario
const updateProduct = async (product: Partial<Product>) => {
  console.log({ product });

  const { id, images = [], ...rest } = product;

  try {
    const checkedImages = prepareImages(images);

    console.log(checkedImages);

    const { data } = await tesloApi.patch(`/products/${id}`, {
      images: checkedImages,
      ...rest,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) console.log(error.response?.data);
    console.log({ error });
    throw new Error(`No se pudo actualizar el producto ${id}`);
  }
};

const prepareImages = (images: string[]) => {
  //Todo: Revisar los FILES

  return images.map(image => image.split('/').pop());
};