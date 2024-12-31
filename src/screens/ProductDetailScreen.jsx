import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ProductDetailsScreen = ({route}) => {
  const {product} = route.params;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: '#fff', // Ensure the background is visible for the shadow
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 5},
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 10, // Elevation for Android shadow
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{marginRight: 40}}>
          <Ionicons name="arrow-back-circle" color={'#000'} size={35} />
        </TouchableOpacity>

        {/* Centered Title */}
        <Text
          style={{
            fontSize: 20,
            color: '#000',
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            marginRight: 40,
          }}>
          Product Detail
        </Text>

        {/* Placeholder for spacing on the right */}
        <View style={{width: 30}} />
      </View>

      {/* Image and Title Section */}
      <View style={styles.imageContainer}>
        {product.imageUrl ? (
          <Image
            width={370}
            height={240}
            source={{uri: product.imageUrl}}
            style={styles.header}
            resizeMode="cover"
          />
        ) : (
          <Ionicons name="tv-outline" color={'#5C6776'} size={350} />
        )}

        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>
            {product.rating?.toFixed(1) ?? '0.0'}
          </Text>
          <FontAwesome name="star" size={14} color="#EFB954" />
        </View>
      </View>

      {/* Info Section */}
      <ScrollView>
        <View style={styles.headerBottom}>
          <View>
            <Text style={styles.subtitle}>{product.brand ?? 'N/A'}</Text>
            <Text style={styles.title}>{product.name}</Text>
          </View>
          <View style={styles.priceTag}>
            <Text style={styles.title}>MRP </Text>
            <Text style={styles.price}>₹{product.price ?? 0}</Text>
          </View>
        </View>
        <Text
          style={{
            color: 'green',
            fontWeight: '500',
            marginLeft: 20,
            marginTop: -10,
          }}>
          Stock: {product.stock ?? 0} available!
        </Text>

        <View style={styles.infoSection}>
          {/* Details Section */}
          <View style={styles.detailsRow}>
            <Text style={styles.detailTitle}>Category</Text>
            <Text style={styles.detailText}>{product.category ?? 'N/A'}</Text>
            <Text style={styles.detailTitle}>Rating</Text>

            <Text style={styles.detailText}>{product.rating ?? 0}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailTitle}>Weight</Text>
            <Text style={styles.detailText}>{product.weight ?? 'N/A'} kg</Text>
            <Text style={styles.detailTitle}>Model</Text>

            <Text style={styles.detailText}>{product.sku ?? 0}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 300,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'red',
  },
  header: {
    // height: '100%',
    // width: '100%',
    position: 'relative',
  },
  headerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  priceTag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    color: '#9A9A9A',
  },
  subtitle: {
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  infoSection: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 10,
    marginBottom: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  detailsRow: {
    marginTop: 15,
    gap: 10,
  },
  detailTitle: {
    color: '#000',
    fontWeight: '500',
    fontSize: 14,
  },
  detailText: {
    color: '#818181',
    fontSize: 17,
    flex: 1,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 12,
    elevation: 14,
  },
  ratingText: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 4,
  },
});

export default ProductDetailsScreen;
