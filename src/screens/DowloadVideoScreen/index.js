import React, {useEffect, useState} from 'react';
import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import RNFS from 'react-native-fs';

const DownloadVideo = ({route}) => {
  const {data} = route.params;
  const [progressStates, setProgressStates] = useState(
    data.map(() => ({progress: 0, isDownloaded: false})),
  );

  useEffect(() => {
    data.forEach((item, index) => {
      if (item.isavailableOffline === 'false') {
        downloadVideo(item.onlinevideourl, index);
      }
    });
  }, []);

  const downloadVideo = async (url, index) => {
    const fileName = url.split('/').pop();
    const filePath = `${RNFS.ExternalDirectoryPath}/${fileName}`;

    try {
      const download = RNFS.downloadFile({
        fromUrl: url,
        toFile: filePath,
        background: true,
        discretionary: true,
        progress: res => {
          const progressPercent = (res.bytesWritten / res.contentLength) * 100;
          updateProgress(index, progressPercent);
        },
      });

      const result = await download.promise;

      if (result.statusCode === 200) {
        updateProgress(index, 100, true);
        Alert.alert('Success', `${fileName} downloaded successfully!`);
      } else {
        Alert.alert('Error', `Failed to download ${fileName}`);
      }
    } catch (error) {
      console.error(`Error downloading ${fileName}:`, error);
      Alert.alert('Error', `Error downloading ${fileName}`);
    }
  };

  const updateProgress = (index, progress, isDownloaded = false) => {
    setProgressStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = {progress, isDownloaded};
      return newStates;
    });
  };

  return (
    <ScrollView style={styles.maincontainer}>
      {data.map((item, index) => (
        <View key={index} style={styles.downloadbox}>
          <View style={styles.imagecontainer}>
            <Image
              source={require('../../assets/splashScreen.webp')}
              style={styles.downloadcontainerimage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.textcontainer}>
            <View style={styles.textinnercontainer}>
              <Text style={styles.downloadcontainertext}>{item.title}</Text>
              {item.isavailableOffline === 'true' ? (
                <Text style={styles.downloadcontainertext}>
                  Already Downloaded
                </Text>
              ) : (
                <View>
                  <Text style={styles.downloadcontainertext}>
                    The Video is downloading
                  </Text>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressBarFill,
                        {width: `${progressStates[index].progress}%`},
                      ]}
                    />
                  </View>
                  <Text style={styles.downloadcontainertext}>
                    Progress: {progressStates[index].progress.toFixed(2)}%
                  </Text>
                  {progressStates[index].isDownloaded && (
                    <Text style={styles.downloadcontainertext}>
                      Download Complete
                    </Text>
                  )}
                </View>
              )}
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default DownloadVideo;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  downloadbox: {
    flexDirection: 'row',
    height: 130,
    margin: 10,
    backgroundColor: '#FFFFFF',
  },
  textcontainer: {
    margin: 10,
    gap: 5,
    flex: 1,
  },
  imagecontainer: {
    margin: 10,
  },
  downloadcontainerimage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  downloadcontainertext: {
    color: '#000000',
  },
  textinnercontainer: {
    flex: 1,
  },
  progressBar: {
    height: 20,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#1EB1FC',
  },
});
