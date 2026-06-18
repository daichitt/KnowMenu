import { Linking } from 'react-native';
import { useCameraPermissions, type PermissionResponse } from 'expo-camera';

export function useCameraPermissionState() {
  const [permission, requestPermission] = useCameraPermissions();
  return { permission, requestPermission };
}

export async function openAppSettings() {
  await Linking.openSettings();
}

export function canAskAgain(permission: PermissionResponse | null) {
  return permission?.canAskAgain ?? true;
}

export function isCameraGranted(permission: PermissionResponse | null) {
  return permission?.granted === true;
}
