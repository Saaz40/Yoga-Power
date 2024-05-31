import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Pressable, Alert} from 'react-native';
import Video from 'react-native-video';
import RNFS from 'react-native-fs';

const VideoPlayerScreen = ({route}) => {
  const {playOffline, filePath} = route.params; // Get the file path from route params
  console.log(route.params);
  console.log('HEY IM THE FILE PATH' + filePath);
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [videoSource, setVideoSource] = useState(null);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    const loadVideo = async () => {
      try {
        // Check if the file exists
        const fileExists = await RNFS.exists(filePath);
        console.log(fileExists);
        console.log(filePath);
        if (fileExists) {
          // Set the video source to the local file path
          setVideoSource({uri: `file:///${filePath}`});
          console.log('playing from offline');
        } else {
          setVideoSource({uri: `${filePath}`});
          console.log('playing from Online');
        }
      } catch (error) {
        console.error('Error checking local file:', error);
        Alert.alert(
          'Error',
          'An error occurred while checking the local video file.',
        );
      }
    };

    loadVideo();
  }, [filePath]);

  return (
    <Pressable style={styles.container}>
      {videoSource && (
        <Video
          source={videoSource}
          style={
            isFullscreen
              ? {width: screenWidth, height: screenHeight}
              : styles.video
          }
          resizeMode="contain"
          controls
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 300,
    height: 200,
  },
});

export default VideoPlayerScreen;
