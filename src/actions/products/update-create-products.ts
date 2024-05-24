import { isAxiosError } from 'axios';
import { tesloApi } from '../../config/api';
import { Product } from '../../domain/entities';
import { TesloProduct } from '../../infrastructure/interfaces';

export const updateCreateProduct = (product: Partial<Product>) => {
  //!El Partial quiere decir que viene un objeto con no necesariamente todas las propiedades del tipo. Esto quiere decir que todas las properties serán opcionales (product?.id, product?.title,...)

  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

  if (product.id && product.id !== 'new') {
    return updateProduct(product);
  }

  return createProduct(product);
};

const prepareImages = (images: string[]) => {
  //Todo: Revisar los FILES

  return images.map(image => image.split('/').pop());
};

//Todo: Revisar si viene el usuario
const updateProduct = async (product: Partial<Product>) => {
  //   console.log({ product });

  const { id, images = [], ...rest } = product;

  try {
    const checkedImages = prepareImages(images);

    //  console.log({ checkedImages });

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

const createProduct = async (product: Partial<Product>) => {
  const { id, images = [], ...rest } = product;

  try {
    const checkedImages = prepareImages(images);

    const { data } = await tesloApi.post(`/products`, {
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
