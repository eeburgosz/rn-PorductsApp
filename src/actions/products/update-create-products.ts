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

const prepareImages = async (images: string[]) => {
  //Todo: Revisar los FILES
  const fileImages = images.filter(image => image.includes('file://'));
  const currentImages = images.filter(image => !image.includes('file://'));

  if (fileImages.length > 0) {
    const uploadPromises = fileImages.map(uploadImage);
    const uploadedImages = await Promise.all(uploadPromises);
    currentImages.push(...uploadedImages);
  }

  return currentImages.map(image => image.split('/').pop());
};

const uploadImage = async (image: string) => {
  const formData = new FormData();
  formData.append('file', {
    uri: image,
    type: 'image/jpeg',
    name: image.split('/').pop(),
  });

  const { data } = await tesloApi.post<{ image: string }>(
    '/files/product',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return data.image;
};

//Todo: Revisar si viene el usuario
const updateProduct = async (product: Partial<Product>) => {
  //   console.log({ product });

  const { id, images = [], ...rest } = product;

  try {
    const checkedImages = await prepareImages(images);

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
    const checkedImages = await prepareImages(images);

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
