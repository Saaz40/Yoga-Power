import React, {useRef, useEffect, useState} from 'react';
import {Animated, Text, View, Dimensions, StyleSheet} from 'react-native';

const AutoScrollingText = ({text}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    if (textWidth > 0) {
      const animateScroll = () => {
        animatedValue.setValue(screenWidth);
        Animated.timing(animatedValue, {
          toValue: -textWidth,
          duration: (screenWidth + textWidth) * 10, // Adjust duration based on text width
          useNativeDriver: true,
        }).start(animateScroll); // Loop the animation
      };

      animateScroll();
    }
  }, [textWidth]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, screenWidth],
    outputRange: [screenWidth, -textWidth],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{transform: [{translateX}]}}
        onLayout={e => setTextWidth(e.nativeEvent.layout.width)}>
        <Text style={styles.text}>{text}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default AutoScrollingText;
