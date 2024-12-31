import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import ProductCard from '../components/ProductCard';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import product data
const products = require('../assets/data/product.json');

const ProductListScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products); // Initialize with all products
  const [isPriceFilterVisible, setIsPriceFilterVisible] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2500);

  // Handle search functionality
  const handleSearch = text => {
    setSearchText(text);
    if (!text) {
      // Reset to all products if search text is empty
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(product => {
      const searchTerm = text.toLowerCase();
      return (
        (product.name && product.name.toLowerCase().includes(searchTerm)) ||
        (product.brand && product.brand.toLowerCase().includes(searchTerm)) ||
        (product.category &&
          product.category.toLowerCase().includes(searchTerm))
      );
    });
    setFilteredProducts(filtered);
  };

  // Apply price filter
  const applyPriceFilter = () => {
    const filtered = products.filter(product => {
      const price = product.price ?? 0;
      return price >= minPrice && price <= maxPrice;
    });
    setFilteredProducts(filtered);
    setIsPriceFilterVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        {/* Search input with icon */}
        <View style={styles.searchInputContainer}>
          <Ionicons
            name="search"
            size={18}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, brand, or category"
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>

        {/* Price filter button */}
        <TouchableOpacity
          style={styles.priceFilterButton}
          onPress={() => setIsPriceFilterVisible(true)}>
          <Ionicons name="filter" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({item}) => (
            <ProductCard
              item={item}
              disabled={item.price === null || item.rating === null}
            />
          )}
        />
      ) : (
        <View style={styles.noResultContainer}>
          <Ionicons name="sad-outline" size={50} color="#888" />
          <Text style={styles.noResultText}>No results found</Text>
        </View>
      )}

      <Modal
        visible={isPriceFilterVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsPriceFilterVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Price Filter</Text>
            <Text style={styles.priceRange}>
              ₹{minPrice} – ₹{maxPrice}
            </Text>

            {/* Range Slider */}
            <MultiSlider
              values={[minPrice, maxPrice]} // Initial values
              sliderLength={300} // Length of the slider in pixels
              onValuesChange={values => {
                setMinPrice(values[0]);
                setMaxPrice(values[1]);
              }}
              min={0} // Minimum value
              max={3000} // Maximum value
              step={100} // Increment step
              allowOverlap={false} // Prevent handles from overlapping
              snapped // Snap to the nearest step
              selectedStyle={{
                backgroundColor: '#4caf50', // Track color between handles
              }}
              unselectedStyle={{
                backgroundColor: '#ddd', // Track color outside handles
              }}
              markerStyle={{
                backgroundColor: '#4caf50', // Handle color
                height: 20,
                width: 20,
              }}
            />

            <TouchableOpacity
              style={styles.goButton}
              onPress={applyPriceFilter}>
              <Text style={styles.goButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 20,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingHorizontal: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 8,
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 14,
    color: '#333',
  },
  priceFilterButton: {
    marginLeft: 10,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  priceFilterText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  brand: {
    fontSize: 14,
    color: '#555',
  },
  category: {
    fontSize: 14,
    color: '#555',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priceRange: {
    fontSize: 16,
    marginBottom: 20,
  },
  goButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  goButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noResultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultText: {
    fontSize: 18,
    color: '#888',
    marginTop: 10,
  },
});

export default ProductListScreen;
