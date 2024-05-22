import { API_URL } from '../../config/api';
import { Product } from '../../domain/entities';
import type { TesloProduct } from '../interfaces';

export class ProductMapper {
  static tesloProductToEntity(tesloProduct: TesloProduct): Product {
    return {
      id: tesloProduct.id,
      title: tesloProduct.title,
      price: tesloProduct.price,
      description: tesloProduct.description,
      sizes: tesloProduct.sizes,
      gender: tesloProduct.gender,
      slug: tesloProduct.slug,
      stock: tesloProduct.stock,
      tags: tesloProduct.tags,
      //! De la api, las imágenes solamente vienen como "nombre.jpg"
      images: tesloProduct.images.map(
        image => `${API_URL}/files/product/${image}`,
      ),
    };
  }
}
