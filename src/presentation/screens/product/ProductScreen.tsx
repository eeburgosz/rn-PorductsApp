import { MainLayout } from '../../layouts';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getProductById, updateCreateProduct } from '../../../actions';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useRef } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';
import { FadeInImage, MyIcon } from '../../components';
import { Gender, Product, Size } from '../../../domain/entities';
import { Formik } from 'formik';

const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];
const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Women];

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({ route }: Props) => {
  const theme = useTheme();

  // const { productId } = route.params;
  //! Es mejor dejar una referencia al ID porque esta misma pantalla la voy a usar para otras acciones.
  const productIdRef = useRef(route.params.productId);

  // useQuery
  const { data: product } = useQuery({
    queryKey: ['product', productIdRef.current],
    queryFn: () => getProductById(productIdRef.current),
    // staleTime: 1000 * 60 * 60,
  });

  //useMutation
  const mutation = useMutation({
    mutationFn: (data: Product) =>
      updateCreateProduct({ ...data, id: productIdRef.current }),
    onSuccess(data: Product) {
      console.log('onSuccess');
      console.log({ data });
    },
  });

  if (!product) {
    return <MainLayout title="Cargando..."></MainLayout>;
  }

  return (
    <Formik
      initialValues={product}
      // onSubmit={values => mutation.mutate(values)}
      onSubmit={mutation.mutate}>
      {/* Esta es la parte "más complicada" de Formik en esta implementación */}
      {/* Hago todos los inputs y selectores, envuelvo todo el contenido dentro del Formik y luego pongo ese contenido dentro de un fallback para poder desestructurar sus propiedades. */}
      {/* <Formik>{ ({})=>(Contenido) }</Formik> */}
      {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
        <MainLayout title={values.title} subTitle={`Precio: ${values.price}`}>
          <ScrollView style={{ flex: 1 }}>
            {/* Imágenes del producto */}
            {/* Todo: Tener en consideración cuando no hay imágenes  */}
            <Layout>
              <FlatList
                data={values.images}
                keyExtractor={item => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <FadeInImage
                    uri={item}
                    style={{ width: 300, height: 300, marginHorizontal: 7 }}
                  />
                )}
              />
            </Layout>

            {/* Formulario */}
            <Layout style={{ marginHorizontal: 10 }}>
              <Input
                label="Titulo"
                style={{ marginVertical: 5 }}
                value={values.title}
                onChangeText={handleChange('title')}
              />
              <Input
                label="Slug"
                style={{ marginVertical: 5 }}
                value={values.slug}
                onChangeText={handleChange('slug')}
              />
              <Input
                label="Descripción"
                multiline
                numberOfLines={5}
                style={{ marginVertical: 5 }}
                value={values.description}
                onChangeText={handleChange('description')}
              />
            </Layout>

            {/* Precio e inventario */}
            <Layout
              style={{
                marginVertical: 5,
                marginHorizontal: 15,
                flexDirection: 'row',
                gap: 10,
              }}>
              <Input
                label="Precio"
                keyboardType="numeric"
                style={{ flex: 1 }}
                value={values.price.toString()}
                onChangeText={handleChange('price')}
              />
              <Input
                label="Inventario"
                keyboardType="numeric"
                style={{ flex: 1 }}
                value={values.stock.toString()}
                onChangeText={handleChange('stock')}
              />
            </Layout>

            {/* Selectores */}
            <ButtonGroup
              size="small"
              appearance="outline"
              style={{
                margin: 2,
                marginHorizontal: 15,
                marginTop: 20,
              }}>
              {sizes.map(size => (
                <Button
                  onPress={() =>
                    setFieldValue(
                      'sizes',
                      values.sizes.includes(size)
                        ? values.sizes.filter(s => s !== size)
                        : [...values.sizes, size],
                    )
                  }
                  style={{
                    flex: 1,
                    backgroundColor: values.sizes.includes(size)
                      ? theme['color-primary-200']
                      : undefined,
                  }}
                  key={size}>
                  {size}
                </Button>
              ))}
            </ButtonGroup>
            <ButtonGroup
              size="small"
              appearance="outline"
              style={{
                margin: 2,
                marginHorizontal: 15,
                marginTop: 20,
              }}>
              {genders.map(gender => (
                <Button
                  onPress={() => setFieldValue('gender', gender)}
                  style={{
                    flex: 1,
                    backgroundColor: values.gender.startsWith(gender)
                      ? theme['color-primary-200']
                      : undefined,
                  }}
                  key={gender}>
                  {gender}
                </Button>
              ))}
            </ButtonGroup>

            {/* Botón para guardar */}

            <Button
              onPress={() => handleSubmit()}
              disabled={mutation.isPending}
              style={{ margin: 15 }}
              accessoryLeft={<MyIcon name="save-outline" white />}>
              Guardar
            </Button>

            <Text>{JSON.stringify(values, null, 3)}</Text>

            <Layout style={{ height: 200 }} />
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
  );
};
