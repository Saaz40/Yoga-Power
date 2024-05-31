import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';

const Splashscreen = ({navigation}) => {
  const language = useSelector(state => state.langauge.language);
  const timerRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      timerRef.current = setTimeout(() => {
        navigation.navigate('Dashboard');
      }, 3000);

      return () => clearTimeout(timerRef.current);
    }, [navigation]),
  );

  const isEnglish = language === 'English';
  const content = {
    heading: isEnglish ? 'Yoga Power' : 'योग शक्ति',
    subheading: isEnglish
      ? 'All Yoga Position and Benefits'
      : 'सभी योग आसन और लाभ',
    text: isEnglish
      ? 'Pranayam, Asan, Yoga, Yoga Mudra'
      : 'प्राणायाम, आसन, योग, योग मुद्रा',
  };

  return (
    <View style={styles.maincontainer}>
      <Text style={styles.headingtext}>{content.heading}</Text>
      <Text style={styles.headingsmalltext}>{content.subheading}</Text>
      <View style={styles.imagecontainer}>
        <Image
          source={require('../../assets/splashScreen.webp')}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <Text style={styles.text}>{content.text}</Text>
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    </View>
  );
};

export default Splashscreen;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#393669',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headingtext: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  headingsmalltext: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  imagecontainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 320,
    height: 320,
    borderRadius: 160,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  activityIndicator: {
    marginTop: 20,
  },
});
