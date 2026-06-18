import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Locale, { LocaleEnum, setLocale, useLocale } from '@/lib/Locale';

export default function SettingsScreen() {
  const locale = useLocale();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">
        <Locale ja="設定">Settings</Locale>
      </ThemedText>

      <ThemedText style={styles.label}>
        <Locale ja="言語">Language</Locale>
      </ThemedText>

      <Pressable
        style={[styles.option, locale === LocaleEnum.ja && styles.optionActive]}
        onPress={() => setLocale(LocaleEnum.ja)}>
        <ThemedText>日本語</ThemedText>
      </Pressable>

      <Pressable
        style={[styles.option, locale === LocaleEnum.en && styles.optionActive]}
        onPress={() => setLocale(LocaleEnum.en)}>
        <ThemedText>English</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 16,
  },
  label: {
    marginTop: 24,
    opacity: 0.7,
  },
  option: {
    width: '100%',
    maxWidth: 280,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  optionActive: {
    borderColor: '#0a7ea4',
    backgroundColor: 'rgba(10,126,164,0.1)',
  },
});
