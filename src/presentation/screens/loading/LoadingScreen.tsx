import { Button, Icon, Layout, Spinner, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

export const LoadingScreen = () => {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spinner status="primary" size="large" />
    </Layout>
  );
};
