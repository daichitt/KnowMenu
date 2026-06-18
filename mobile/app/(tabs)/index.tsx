import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { CameraPermissionGate } from '@/components/camera/camera-permission-gate';
import { Header } from '@/components/Header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Locale from '@/lib/Locale';

export default function HomeScreen() {
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  return (
    <ThemedView style={styles.screen}>
      <Header />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.cameraPane}>
          <CameraPermissionGate onPhotoTaken={setPhotoUri} />
        </ThemedView>

        <ThemedView style={styles.photoPane}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.preview} contentFit="contain" />
          ) : (
            <ThemedText style={styles.placeholder}>
              <Locale ja="写真">Photo</Locale>
            </ThemedText>
          )}
        </ThemedView>
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
    flexDirection: 'row',
  },
  cameraPane: {
    flex: 1,
    padding: 8,
    overflow: 'hidden',
  },
  photoPane: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    opacity: 0.5,
  },
});
