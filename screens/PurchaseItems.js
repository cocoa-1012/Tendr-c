import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, TextInput, Image, Modal } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { images } from '../constants';

const ProductDetailModal = ({ visible, onClose, product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedTier, setSelectedTier] = useState('Blue');
  const [addRedbull, setAddRedbull] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const pricingTiers = [
    { id: 'non-member', name: 'Non-member pricing', price: 410.01, icon: null, active: false },
    { id: 'blue', name: 'Blue', price: 410.01, icon: '💎', active: true },
    { id: 'gold', name: 'Gold', price: 410.01, icon: '🔶', active: false }
  ];

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const getTotalPrice = () => {
    let basePrice = 410.01;
    let customizationPrice = addRedbull ? 11.00 : 0;
    return (basePrice + customizationPrice) * quantity;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <StatusBar barStyle="dark-content" />
        
        {/* Modal Header */}
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.modalHeaderTitle}>Purchase Items</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.modalScrollView} contentContainerStyle={styles.scrollContent}>
          {/* Product Info */}
          <View style={styles.productHeader}>
            <Text style={styles.productName}>{product?.name || 'Grey Goose'}</Text>
            <Text style={styles.productDescription}>{product?.description || 'Vodka Bottle'}</Text>
          </View>

          {/* Pricing Tiers */}
          <View style={styles.pricingContainer}>
            {pricingTiers.map((tier) => (
              <TouchableOpacity
                key={tier.id}
                style={[
                  styles.pricingTier,
                  tier.active && styles.activePricingTier
                ]}
                onPress={() => setSelectedTier(tier.name)}
              >
                <View style={styles.tierLeft}>
                  {tier.icon && <Text style={styles.tierIcon}>{tier.icon}</Text>}
                  <Text style={[
                    styles.tierName,
                    tier.active && styles.activeTierName
                  ]}>
                    {tier.name}
                  </Text>
                </View>
                <Text style={[
                  styles.tierPrice,
                  tier.active && styles.activeTierPrice
                ]}>
                  ${tier.price.toFixed(2)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity:</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={decrementQuantity}
              >
                <Ionicons name="remove" size={20} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={incrementQuantity}
              >
                <Ionicons name="add" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Customizations */}
          <View style={styles.customizationsContainer}>
            <Text style={styles.customizationsTitle}>Select Customizations!</Text>
            
            <TouchableOpacity 
              style={[
                styles.customizationItem,
                addRedbull && styles.selectedCustomization
              ]}
              onPress={() => setAddRedbull(!addRedbull)}
            >
              <View style={styles.customizationInfo}>
                <Text style={styles.customizationName}>Add Redbull</Text>
                <Text style={styles.customizationPrice}>$11.00</Text>
              </View>
              {addRedbull && (
                <Ionicons name="checkmark" size={20} color="#4a9df6" />
              )}
            </TouchableOpacity>
          </View>

          {/* Second Customizations Section */}
          <View style={styles.customizationsContainer}>
            <Text style={styles.customizationsTitle}>Select Customizations!</Text>
            <View style={styles.emptyCustomizations}>
              <Text style={styles.emptyText}>No additional customizations available</Text>
            </View>
          </View>

          {/* Special Instructions */}
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsTitle}>Special Instructions (Optional)</Text>
            <TextInput
              style={styles.instructionsInput}
              placeholder="Examples: Bring out with bottle sign, no cheese, extra ice, etc."
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
              value={specialInstructions}
              onChangeText={setSpecialInstructions}
            />
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addCheckoutButton}>
            <Text style={styles.addCheckoutText}>Add & Checkout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default function PurchaseItems() {
  const [activeTab, setActiveTab] = useState('Gifting Exclusive Packages');
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const tabs = ['Gifting Exclusive Packages', 'Bottle Service', 'House Favorites'];

  const giftingPackages = [
    {
      id: 1,
      name: "It's a Celebration",
      description: "Choice of Casamigos, Grey Goose, or Johnnie Walker Black, 1 Moët & Chand...",
      price: 900.00,
      image: images.drink9
    }
  ];

  const bottleService = [
    {
      id: 2,
      name: "Grey Goose",
      description: "Vodka Bottle",
      price: 410.01,
      image: images.drink8
    },
    {
      id: 3,
      name: "Titos",
      description: "Vodka Bottle",
      price: 400.00,
      image: images.drink7
    },
    {
      id: 4,
      name: "Jameson",
      description: "Whiskey Bottle",
      price: 400.00,
      image: images.drink6
    },
    {
      id: 5,
      name: "Macallan 12",
      description: "Whiskey Bottle",
      price: 580.00,
      image: images.drink5
    },
    {
      id: 6,
      name: "Johnnie Walker Black",
      description: "Whiskey Bottle",
      price: 410.02,
      image: images.drink4
    }
  ];

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeProductModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const renderProductItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.productItem}
      onPress={() => { openProductModal(item) }}
    >
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
      </View>
      <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  const getActiveTabContent = () => {
    switch (activeTab) {
      case 'Gifting Exclusive Packages':
        return giftingPackages;
      case 'Bottle Service':
        return bottleService;
      case 'House Favorites':
        return []; // Empty for now
      default:
        return [];
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Purchase Items</Text>
        <TouchableOpacity>
          <Ionicons name="cart-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
        </View>

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabsContainer}
          contentContainerStyle={styles.tabsContent}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Blue Status Message */}
        <View style={styles.statusContainer}>
          <Feather name="box" size={16} color="#4a9df6" />
          <Text style={styles.statusText}>
            Enjoy special membership pricing at Den Social with your Blue Status.
          </Text>
        </View>

        {/* Content Sections */}
        {activeTab === 'Gifting Exclusive Packages' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Gifting Exclusive Packages</Text>
            {giftingPackages.map(renderProductItem)}
          </View>
        )}

        {activeTab === 'Bottle Service' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bottle Service</Text>
            {bottleService.map(renderProductItem)}
          </View>
        )}

        {activeTab === 'House Favorites' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>House Favorites</Text>
            <Text style={styles.emptyText}>No items available</Text>
          </View>
        )}
      </ScrollView>
      <ProductDetailModal
        visible={modalVisible}
        onClose={closeProductModal}
        product={selectedProduct}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  tabsContainer: {
    marginBottom: 16,
  },
  tabsContent: {
    paddingHorizontal: 16,
  },
  tab: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeTab: {
    backgroundColor: '#333',
    borderColor: '#333',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#1976d2',
    marginLeft: 8,
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingVertical: 20,
  },
   modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  modalScrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  productHeader: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  pricingContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  pricingTier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
    marginBottom: 2,
  },
  activePricingTier: {
    backgroundColor: '#666',
  },
  tierLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tierIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  tierName: {
    fontSize: 16,
    color: '#333',
  },
  activeTierName: {
    color: '#fff',
  },
  tierPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  activeTierPrice: {
    color: '#fff',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
  },
  quantityLabel: {
    fontSize: 16,
    color: '#333',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#333',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    color: '#333',
  },
  customizationsContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
  },
  customizationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  customizationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCustomization: {
    borderColor: '#4a9df6',
    backgroundColor: '#f0f8ff',
  },
  customizationInfo: {
    flex: 1,
  },
  customizationName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  customizationPrice: {
    fontSize: 14,
    color: '#4a9df6',
    fontWeight: '600',
  },
  emptyCustomizations: {
    padding: 20,
    alignItems: 'center',
  },
  instructionsContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  instructionsInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    textAlignVertical: 'top',
    minHeight: 80,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  addCheckoutButton: {
    flex: 1,
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  addCheckoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});