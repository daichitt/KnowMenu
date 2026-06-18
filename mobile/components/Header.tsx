import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function Header() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const iconColor = Colors[colorScheme].icon;

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <Pressable
          style={styles.settingsButton}
          onPress={() => router.push('/settings')}
          hitSlop={8}>
          <Ionicons name="settings-outline" size={24} color={iconColor} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'transparent',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  settingsButton: {
    padding: 4,
  },
});
