import { StyleSheet } from 'react-native';

import { Header } from '@/components/Header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Locale from '@/lib/Locale';

export default function ExploreScreen() {
  return (
    <ThemedView style={styles.screen}>
      <Header />
      <ThemedView style={styles.container}>
        <ThemedText>
          <Locale ja="ハローワールド">Hello World</Locale>
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
