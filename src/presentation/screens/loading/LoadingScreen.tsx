import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';

export const LoadingScreen = () => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>LoadingScreen</Text>
      {/* <Icon name="facebook" /> */}
      <Button accessoryRight={<Icon name="facebook" />}>
        <Text>Hola</Text>
      </Button>
    </Layout>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    margin: 2,
  },
});
