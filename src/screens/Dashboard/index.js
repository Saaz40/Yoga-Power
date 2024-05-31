import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  Share,
  Pressable,
  Alert,
  TouchableOpacity,
  Modal,
  ImageBackground,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TextTicker from 'react-native-text-ticker';
import {useDispatch, useSelector} from 'react-redux';
import {setLanguage} from '../../redux/action';
import RNFS from 'react-native-fs';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob';

const dataEnglish = [
  {
    title: 'About Yoga Day',
    image: require('../../assets/splashScreen.webp'),
    onlinevideourl:
      'http://139.162.53.166:8500/assets/all_type/about_yoga_en.mp4',
    offlineurl:
      '/storage/emulated/0/Android/data/com.yogapower/files/about_yoga_en.mp4',
    isavailableOffline: 'false',
    progression: 0,
    pdf: 'http://139.162.53.166:8500/assets/all_type/yp_book_en.pdf',
  },
  {
    title: 'About Yoga',
    image: require('../../assets/splashScreen.webp'),
    onlinevideourl:
      'http://139.162.53.166:8500/assets/all_type/english_modi.mp4',
    offlineurl:
      '/storage/emulated/0/Android/data/com.yogapower/files/english_modi.mp4',
    isavailableOffline: 'false',
    progression: 0,
    pdf: 'http://139.162.53.166:8500/assets/all_type/yp_book_en.pdf',
  },
  {
    title: 'Standing',
    image: require('../../assets/splashScreen.webp'),
    onlinevideourl:
      'http://139.162.53.166:8500/assets/all_type/lying_english.mp4',
    offlineurl:
      '/storage/emulated/0/Android/data/com.yogapower/files/lying_english.mp4',
    isavailableOffline: 'false',
    progression: 0,
    pdf: 'http://139.162.53.166:8500/assets/all_type/yp_book_en.pdf',
  },
  {
    title: 'Seating',
    image: require('../../assets/splashScreen.webp'),
    onlinevideourl:
      'http://139.162.53.166:8500/assets/all_type/english_sitting.mp4',
    offlineurl:
      '/storage/emulated/0/Android/data/com.yogapower/files/english_sitting.mp4',
    isavailableOffline: 'false',
    progression: 0,
    pdf: 'http://139.162.53.166:8500/assets/all_type/yp_book_en.pdf',
  },
  {
    title: 'Lying',
    image: require('../../assets/splashScreen.webp'),
    onlinevideourl:
      'http://139.162.53.166:8500/assets/all_type/english_meditation.mp4',
    offlineurl:
      '/storage/emulated/0/Android/data/com.yogapower/files/english_meditation.mp4',
    isavailableOffline: 'false',
    progression: 0,
    pdf: 'http://139.162.53.166:8500/assets/all_type/yp_book_en.pdf',
  },
  {
    title: 'Meditation',
    image: require('../../assets/splashScreen.webp'),
    onlinevideourl:
      'http://139.162.53.166:8500/assets/all_type/english_sitting.mp4',
    offlineurl:
      '/storage/emulated/0/Android/data/com.yogapower/files/english_sitting.mp4',
    isavailableOffline: 'false',
    progression: 0,
    pdf: 'http://139.162.53.166:8500/assets/all_type/yp_book_en.pdf',
  },
];

const dataHindi = [
  {
    title: 'योग दिवस के बारे में',
    image: require('../../assets/splashScreen.webp'),
    onlinevideourl:
      'http://139.162.53.166:8500/assets/all_type/about_yoga_hin.mp4',
    offlineurl:
      '/storage/emulated/0/Android/data/com.yogapower/files/about_yoga_hin.mp4',
    isavailableOffline: 'false',
    progression: 0,
    pdf: 'http://139.162.53.166:8500/assets/all_type/yp_book_hindi.pdf',
  },
  {
    title: 'योग के बारे में',
    image: require('../../assets/splashScreen.webp'),
    onlinevideourl:
      'http://139.162.53.166:8500/assets/all_type/yoga_modi_hindi.mp4',
    offlineurl:
      '/storage/emulated/0/Android/data/com.yogapower/files/yoga_modi_hindi.mp4',
    isavailableOffline: 'false',
    progression: 0,
    pdf: 'http://139.162.53.166:8500/assets/all_type/yp_book_hindi.pdf',
  },
  {
    title: 'खड़ा होना',
    image: require('../../assets/splashScreen.webp'),
    onlinevideourl:
      'http://139.162.53.166:8500/assets/all_type/hindi_lying.mp4',
    offlineurl:
      '/storage/emulated/0/Android/data/com.yogapower/files/hindi_lying.mp4',
    isavailableOffline: 'false',
    progression: 0,
    pdf: 'http://139.162.53.166:8500/assets/all_type/yp_book_hindi.pdf',
  },
  {
    title: 'बैठक',
    image: require('../../assets/splashScreen.webp'),
    onlinevideourl:
      'http://139.162.53.166:8500/assets/all_type/hindi_meditation.mp4',
    offlineurl:
      '/storage/emulated/0/Android/data/com.yogapower/files/hindi_meditation.mp4',
    isavailableOffline: 'false',
    progression: 0,
    pdf: 'http://139.162.53.166:8500/assets/all_type/yp_book_hindi.pdf',
  },
  {
    title: 'लेटना',
    image: require('../../assets/splashScreen.webp'),
    onlinevideourl:
      'http://139.162.53.166:8500/assets/all_type/hindi_sitting.mp4',
    offlineurl:
      '/storage/emulated/0/Android/data/com.yogapower/files/hindi_sitting.mp4',
    isavailableOffline: 'false',
    progression: 0,
    pdf: 'http://139.162.53.166:8500/assets/all_type/yp_book_hindi.pdf',
  },
  {
    title: 'ध्यान',
    image: require('../../assets/splashScreen.webp'),
    onlinevideourl:
      'http://139.162.53.166:8500/assets/all_type/hindi_standing.mp4',
    offlineurl:
      '/storage/emulated/0/Android/data/com.yogapower/files/hindi_standing.mp4',
    isavailableOffline: 'false',
    isDownloading: '',
    progression: 0,
    pdf: 'http://139.162.53.166:8500/assets/all_type/yp_book_hindi.pdf',
  },
];

const Dashboard = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [bottomModalVisible, setBottomModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [langselected, setlangselected] = useState('');
  const language = useSelector(state => state.langauge.language);
  const [pdfVisible, setPdfVisible] = useState(false);
  const [pdfPath, setPdfPath] = useState('');
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(
    language === 'English' ? dataEnglish : dataHindi,
  );

  useEffect(() => {
    console.log('Language changed:', language);
    setData(language === 'English' ? dataEnglish : dataHindi);
    checkFilesExistence();
  }, [language]);

  const checkFilesExistence = async () => {
    setIsLoading(true);
    if (language === 'English') {
      await Promise.all(
        dataEnglish.map(async (item, index) => {
          const fileExists = await RNFS.exists(item.offlineurl);
          dataEnglish[index] = {
            ...item,
            isavailableOffline: fileExists ? 'true' : 'false',
          };
        }),
      );
      setData([...dataEnglish]); // Update the state with the modified data
    } else {
      await Promise.all(
        dataHindi.map(async (item, index) => {
          const fileExists = await RNFS.exists(item.offlineurl);
          dataHindi[index] = {
            ...item,
            isavailableOffline: fileExists ? 'true' : 'false',
          };
        }),
      );
      setData([...dataHindi]); // Update the state with the modified data
    }
    setIsLoading(false);
  };

  const handleCardPress = item => {
    setSelectedCard(item);
    setModalVisible(true);
    console.log(item);
  };
  const handleSingleVideo = () => {
    const carddata = [selectedCard];
    navigation.navigate('DownloadVideoScreen', {
      data: carddata,
    });
  };

  const handleVideoplay = async () => {
    const filePath = selectedCard.offlineurl;
    const fileExists = await RNFS.exists(filePath);

    const playOffline = fileExists;
    const videoPath = playOffline ? filePath : selectedCard.onlinevideourl;

    // Navigate to VideoPlayerScreen with the appropriate video path
    navigation.navigate('VideoPlayerScreen', {
      filePath: videoPath,
      playOffline,
    });
  };

  const handleDownloadPress = () => {
    // Navigation logic based on language
    if (language === 'English') {
      navigation.navigate('DownloadVideoScreen', {
        data: dataEnglish,
      });
    } else {
      navigation.navigate('DownloadVideoScreen', {
        data: dataHindi,
      });
    }
  };
  const loadPdf = async pdfUrl => {
    const dirs = RNFetchBlob.fs.dirs;
    const localPath = `${dirs.DocumentDir}/temp.pdf`;

    setLoading(true);
    RNFetchBlob.config({
      fileCache: true,
      path: localPath,
      trusty: true, // Add this line to trust all SSL certificates
    })
      .fetch('GET', pdfUrl)
      .then(res => {
        setPdfPath({uri: res.path()});
        setPdfVisible(true);
        setLoading(false);
        setModalVisible(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        Alert.alert('Error', 'Failed to download PDF');
      });
  };

  const textdata = {
    textEnglish:
      'Department of AYUSH (Health), Government of India and Yoga masters and scientists of the world on World Yoga Day has prepared standard protocol of Yoga, Asana, Pranayam etc. (Video). With continuous practice, you will be able to feel energetic, anxious and acute remembrance power with healthy life and control obesity and anger. Therefore, you are requested to do yoga regularly for a happy human life. Also share the link of Yoga App for human welfare. Thank you..',
    textHindi:
      'भारत सरकार के आयुष (स्वास्थ्य) विभाग द्वारा विश्व योग दिवस पर विश्व के योग गुरूओं व वैज्ञानिकों के द्वारा प्रमाणित योग, आसन, प्राणायाम आदि के वीडियो (स्टैण्डर्ड प्रोटोकॉल) तैयार किये गये है। जिनके निरन्तर अभ्यास से आप स्वस्थ जीवन के साथ स्वयं को ऊर्जावान, चिन्तामुक्त व तीव्र स्मरण शक्ति को महसूस करेंगे साथ ही मोटापे व गुस्से को नियंत्रित कर सकेंगे | अतः आप से निवेदन हैं कि आनंदमय मानव जीवन के लिए नियमित योग करे । साथ ही मानव कल्याण के लिये योगा ऐप्प का लिंक अपने जानकारों को शेयर करें । धन्यवाद ।',
  };

  const shareApp = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this awesome app!', // Message to be shared
        url: 'https://your-app-url.com', // URL of your app (optional)
        title: 'Awesome App', // Title of the message (optional)
      });

      if (result.action === Share.sharedAction) {
        // Sharing completed successfully
        console.log('Shared successfully');
      } else if (result.action === Share.dismissedAction) {
        // Sharing dismissed
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  const handleLang = () => {
    Alert.alert('Choose Language', 'Select your preferred language', [
      {
        text: 'English\n',
        onPress: () => {
          dispatch(setLanguage('English'));
          setlangselected('English');
        },
      },
      {
        text: 'Hindi\n',
        onPress: () => {
          dispatch(setLanguage('Hindi'));
          setlangselected('Hindi');
        },
      },
    ]);
  };

  return (
    <View style={styles.maincontainer}>
      <View style={styles.headercontainer}>
        <Pressable onPress={shareApp}>
          <Ionicons name="share-social" size={26} color={'#FFFFFF'} />
        </Pressable>
        <TouchableOpacity
          style={styles.headerinnercontainer}
          onPress={handleLang}>
          <AntDesign name="earth" size={20} color={'#FFFFFF'} />
          {language === 'English' ? (
            <Text style={styles.changlangtext}>EN</Text>
          ) : (
            <Text style={styles.changlangtext}>HN</Text>
          )}
          <MaterialIcons
            name="keyboard-arrow-down"
            size={30}
            color={'#FFFFFF'}
          />
        </TouchableOpacity>
      </View>
      <View>
        {language === 'English' ? (
          <Text style={styles.headtext}>Yoga Power</Text>
        ) : (
          <Text style={styles.headtext}>योग शक्ति</Text>
        )}
        <View style={styles.cardcontainer}>
          <>
            {language == 'English' ? (
              <>
                {dataEnglish.map((item, index) => (
                  <Pressable
                    key={index}
                    style={styles.innercard}
                    onPress={() => handleCardPress(item)}>
                    <Image source={item.image} style={styles.cardimage} />
                    <Text style={styles.cardinnertext}>{item.title}</Text>
                  </Pressable>
                ))}
              </>
            ) : (
              <>
                {dataHindi.map((item, index) => (
                  <Pressable
                    key={index}
                    style={styles.innercard}
                    onPress={() => handleCardPress(item)}>
                    <Image source={item.image} style={styles.cardimage} />
                    <Text style={styles.cardinnertext}>{item.title}</Text>
                  </Pressable>
                ))}
              </>
            )}
          </>
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalcontainer}>
              <View style={styles.modalinnercontainer}>
                {selectedCard && (
                  <>
                    <View style={styles.modalheadcontainer}>
                      <Text style={styles.modaltext}>
                        {language === 'English' ? 'Yoga Power' : 'योग शक्ति'}
                      </Text>
                    </View>

                    <ImageBackground
                      source={selectedCard.image}
                      style={styles.modalImage}
                      resizeMode="cover">
                      <TouchableOpacity
                        style={styles.playButton}
                        onPress={() => {
                          handleVideoplay();
                          setModalVisible(!modalVisible);
                        }}>
                        <AntDesign
                          name="playcircleo"
                          size={46}
                          color={'#FFFFFF'}
                        />
                      </TouchableOpacity>
                    </ImageBackground>

                    <View style={styles.modalbottomcontainer}>
                      {selectedCard.isavailableOffline === 'true' ? (
                        <TouchableOpacity
                          style={[styles.modalinnerbottom, styles.playOnline]}
                          onPress={() => {
                            handleVideoplay();
                            setModalVisible(!modalVisible);
                          }}>
                          <AntDesign
                            name="playcircleo"
                            size={36}
                            color={'#FFFFFF'}
                          />
                          <Text style={styles.modalinnertext}>
                            {language === 'English'
                              ? 'Play Offline'
                              : 'प्ले ऑफलाइन'}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={[styles.modalinnerbottom, styles.playOnline]}
                          onPress={() => {
                            handleVideoplay();
                            setModalVisible(!modalVisible);
                          }}>
                          <AntDesign
                            name="playcircleo"
                            size={36}
                            color={'#FFFFFF'}
                          />
                          <Text style={styles.modalinnertext}>
                            {language === 'English'
                              ? 'Play Online'
                              : 'प्ले ऑनलाइन'}
                          </Text>
                        </TouchableOpacity>
                      )}

                      {selectedCard.isavailableOffline === 'true' ? (
                        <TouchableOpacity
                          style={[styles.modalinnerbottom, styles.download]}
                          onPress={() => {
                            handleVideoplay();
                            setModalVisible(!modalVisible);
                          }}>
                          <MaterialCommunityIcons
                            name="cloud-download"
                            size={36}
                            color={'#FFFFFF'}
                          />
                          <Text style={styles.modalinnertext}>
                            {language === 'English'
                              ? 'Watch Offline'
                              : 'ऑफ़लाइन देखें'}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={[styles.modalinnerbottom, styles.download]}
                          onPress={() => {
                            handleSingleVideo(), setModalVisible(!modalVisible);
                          }}>
                          <MaterialCommunityIcons
                            name="cloud-download"
                            size={36}
                            color={'#FFFFFF'}
                          />
                          <Text style={styles.modalinnertext}>
                            {language === 'English' ? 'Download' : 'डाउनलोड'}
                          </Text>
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        style={[styles.modalinnerbottom, styles.study]}
                        onPress={() => {
                          loadPdf(selectedCard.pdf);
                          setModalVisible(!modalVisible);
                        }}>
                        <MaterialCommunityIcons
                          name="book-open-outline"
                          size={36}
                          color={'#000000'}
                        />
                        <Text style={styles.modalinnertext}>
                          {language === 'English' ? 'Study' : 'पढ़े'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </View>
          </Modal>
        )}

        <Modal
          visible={pdfVisible || loading}
          onRequestClose={() => setPdfVisible(false)}
          animationType="slide">
          <View style={styles.pdfContainer}>
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size={200} color="#0000ff" />
                <Text style={styles.loadingText}>Loading PDF...</Text>
              </View>
            )}
            {!loading && pdfPath && (
              <Pdf
                source={pdfPath}
                onLoadComplete={(numberOfPages, filePath) => {
                  console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                  console.log(`Current page: ${page}`);
                }}
                onError={error => {
                  console.log(error);
                  Alert.alert('Error', 'Failed to load PDF');
                }}
                style={styles.pdf}
              />
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setPdfVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <View style={styles.bottomcontainer}>
          <Pressable onPress={() => setBottomModalVisible(true)}>
            <TextTicker
              style={styles.tickerText}
              scrollSpeed={10}
              loop
              bounce={false}
              numberOfLines={1}
              marqueeDelay={0}>
              {language === 'English'
                ? textdata.textEnglish
                : textdata.textHindi}
            </TextTicker>
          </Pressable>
        </View>

        <TouchableOpacity
          style={styles.dowloadcontainer}
          onPress={() => handleDownloadPress()}>
          <MaterialCommunityIcons
            name="cloud-download"
            size={32}
            color={'#FFFFFF'}
          />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={bottomModalVisible}
          onRequestClose={() => {
            setBottomModalVisible(!bottomModalVisible);
          }}>
          <View style={styles.modalcontainer}>
            <View style={styles.modalinnercontainerbottom}>
              {language === 'English' ? (
                <Text style={styles.bottomcontainertext}>
                  {textdata.textEnglish}
                </Text>
              ) : (
                <Text style={styles.bottomcontainertext}>
                  {textdata.textHindi}
                </Text>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#393669',
    position: 'relative',
  },
  tickerText: {
    fontSize: 20,
  },
  headercontainer: {
    margin: 10,
    justifyContent: 'flex-end',
    gap: 10,
    flexDirection: 'row',
  },
  changlangtext: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  headerinnercontainer: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headtext: {
    color: '#FFFFFF',
    fontSize: 26,
    marginTop: 15,
    marginLeft: 20,
  },
  cardcontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  innercard: {
    width: 130,
    borderRadius: 20,
    height: 170,
    backgroundColor: '#00000080',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardimage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  cardinnertext: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  modalinnertext: {
    color: '#000000',
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  dowloadcontainer: {
    height: 60,
    width: 60,
    position: 'absolute',
    bottom: 40,
    right: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#FF4282',
  },
  bottomcontainer: {
    position: 'relative',
    bottom: -40,
    height: 50,
    width: '100%',
    backgroundColor: '#00000080', // Semi-transparent background
    justifyContent: 'center', // Center the text vertically
    paddingHorizontal: 10, // Add padding if needed
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
  },
  modalcontainer: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalinnercontainer: {
    backgroundColor: '#FFFFFF',
    width: 320,
    alignItems: 'stretch',
  },
  modalinnercontainerbottom: {
    backgroundColor: '#393669',
    width: 300,
    alignItems: 'stretch',
    padding: 15,
  },
  bottomcontainertext: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  modalheadcontainer: {
    backgroundColor: '#393669',
    height: 80,
    justifyContent: 'center',
  },
  modalImage: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modaltext: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  playButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalbottomcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalinnerbottom: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  playOnline: {
    backgroundColor: '#49ACD5',
  },
  download: {
    backgroundColor: '#EAAD43',
  },
  study: {
    backgroundColor: '#45BC62',
  },
  pdfContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
