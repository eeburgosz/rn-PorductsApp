//! Un layout no es más que un HOC (recibe otros componentes como hijos)
import { useNavigation } from '@react-navigation/native';
import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MyIcon } from '../components';

// interface Props extends PropsWithChildren {
interface Props {
  title: string;
  subTitle?: string;

  rightAction?: () => void;
  rightActionIcon?: string;

  //! En código limpio, se prioriza la composición sobre la herencia, por eso el children lo declaro así
  children: React.ReactNode;
}

export const MainLayout = ({
  title,
  subTitle,
  rightAction,
  rightActionIcon,
  children,
}: Props) => {
  const { top } = useSafeAreaInsets();
  const { canGoBack, goBack } = useNavigation();

  const renderBackAction = () => (
    <TopNavigationAction
      onPress={goBack}
      icon={<MyIcon name="arrow-back-outline" />}
    />
  );

  const RenderRightAction = () => {
    if (rightAction === undefined || rightActionIcon === undefined) return null;

    return (
      <TopNavigationAction
        onPress={rightAction}
        icon={<MyIcon name={rightActionIcon} />}
      />
    );
  };

  return (
    <Layout style={{ paddingTop: top + 20 }}>
      <TopNavigation
        title={title}
        subtitle={subTitle}
        alignment="center"
        accessoryLeft={canGoBack() ? renderBackAction : undefined}
        accessoryRight={() => <RenderRightAction />}
      />
      <Divider />
      <Layout style={{ height: '100%' }}>{children}</Layout>
    </Layout>
  );
};
