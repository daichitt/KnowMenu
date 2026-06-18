import { CameraView } from 'expo-camera';
import { useRef, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

interface CameraCaptureProps {
  onPhotoTaken?: (uri: string) => void;
}

type CameraViewInstance = InstanceType<typeof CameraView>;

export function CameraCapture({ onPhotoTaken }: CameraCaptureProps) {
  const cameraRef = useRef<CameraViewInstance>(null);
  const [isReady, setIsReady] = useState(false);
  const [isTaking, setIsTaking] = useState(false);

  async function takePicture() {
    if (isTaking || !isReady || !cameraRef.current) return;

    setIsTaking(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });
      if (photo?.uri) {
        onPhotoTaken?.(photo.uri);
      }
    } finally {
      setIsTaking(false);
    }
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
        onCameraReady={() => setIsReady(true)}
      />
      <View style={styles.controls}>
        <Pressable
          style={[styles.shutter, (!isReady || isTaking) && styles.shutterDisabled]}
          onPress={takePicture}
          disabled={!isReady || isTaking}>
          {isTaking ? <ActivityIndicator color="#fff" /> : null}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    borderRadius: 12,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  controls: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutter: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterDisabled: {
    opacity: 0.6,
  },
});
