import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { CameraCapture } from '@/components/camera/camera-capture';
import { ThemedText } from '@/components/themed-text';
import Locale from '@/lib/Locale';
import {
  canAskAgain,
  isCameraGranted,
  openAppSettings,
  useCameraPermissionState,
} from '@/lib/permissions/cameraPermissions';

interface CameraPermissionGateProps {
  onPhotoTaken?: (uri: string) => void;
}

export function CameraPermissionGate({ onPhotoTaken }: CameraPermissionGateProps) {
  const { permission, requestPermission } = useCameraPermissionState();

  useEffect(() => {
    if (permission && !isCameraGranted(permission) && canAskAgain(permission)) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  if (!permission) {
    return (
      <View style={styles.fill}>
        <ThemedText>
          <Locale ja="カメラの準備中...">Preparing camera...</Locale>
        </ThemedText>
      </View>
    );
  }

  if (!isCameraGranted(permission)) {
    if (canAskAgain(permission)) {
      return (
        <View style={styles.fill}>
          <ThemedText style={styles.message}>
            <Locale ja="写真を撮るにはカメラの許可が必要です">
              Camera permission is required to take photos
            </Locale>
          </ThemedText>
          <Pressable style={styles.button} onPress={requestPermission}>
            <ThemedText style={styles.buttonText}>
              <Locale ja="カメラを許可">Allow camera</Locale>
            </ThemedText>
          </Pressable>
        </View>
      );
    }

    return (
      <View style={styles.fill}>
        <ThemedText style={styles.message}>
          <Locale ja="設定からカメラの許可をオンにしてください">
            Please enable camera access in Settings
          </Locale>
        </ThemedText>
        <Pressable style={styles.button} onPress={openAppSettings}>
          <ThemedText style={styles.buttonText}>
            <Locale ja="設定を開く">Open Settings</Locale>
          </ThemedText>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.fill}>
      <CameraCapture onPhotoTaken={onPhotoTaken} />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 16,
  },
  message: {
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#0a7ea4',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
