import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProductCard = ({item,disabled}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        disabled && {opacity: 0.5}, // Grey out if disabled
      ]}
      disabled={disabled} // Disable touch events
      onPress={() => navigation.navigate('ProductDetails', {product: item})}>
      <View style={styles.imageContainer}>
        {item.imageUrl ? (
          <Image
            source={{uri: item.imageUrl}}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <Ionicons name="tv-outline" color={'#5C6776'} size={130} />
        )}

        {/* Rating on top-right corner */}
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>
            {item.rating?.toFixed(1) ?? '0.0'}
          </Text>
          <FontAwesome name="star" size={10} color="#EFB954" />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.name}>{item.name}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{item.price ?? 0}</Text>
          {item.discountedPrice && (
            <Text style={styles.discountedPrice}>₹{item.discountedPrice}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 10,
    marginVertical: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 14,
    // paddingVertical: 10,
  },
  imageContainer: {
    height: 145,
    width: 178,
    alignSelf: 'center',
    paddingTop: 10,
    borderRadius: 20,
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '80%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 18,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingVertical: 1,
    paddingHorizontal: 4,
    elevation: 14,
  },
  ratingText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 4,
  },
  infoContainer: {
    padding: 10,
    marginLeft: 5,
    marginTop: -30,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9A9A9A',
    marginVertical: 2,
  },
  brand: {
    color: '#000',
    alignSelf: 'flex-start',
    borderRadius: 13,
    fontSize: 18,
    fontWeight: '900',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000',
    paddingTop: 5,
  },
  discountedPrice: {
    fontSize: 14,
    color: '#89ABE3FF',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
});

export default ProductCard;