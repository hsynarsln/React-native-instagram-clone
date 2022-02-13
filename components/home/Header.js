import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image style={styles.logo} source={require('../../assets/logo.png')} />
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.push('NewPostScreen')}>
          <Image source={{ uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png' }} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={{ uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png' }} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>2</Text>
          </View>
          <Image source={{ uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png' }} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20
  },
  iconsContainer: {
    flexDirection: 'row'
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginHorizontal: 10
  },
  unreadBadge: {
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 18,
    width: 25,
    height: 18,
    left: 25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100
  },
  unreadBadgeText: {
    color: 'white',
    fontWeight: '600'
  }
});

export default Header;
