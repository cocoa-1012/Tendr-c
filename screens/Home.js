import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, ImageBackground, TextInput, FlatList } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, icons, images } from '../constants';
import { banners, drink } from '../data';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { Linking } from 'react-native';

const Home = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const openMaps = () => {
    const address = "65 W 36th St, New York, NY, 10018";
    const url = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.viewLeft}>
          <Image
            source={images.user1}
            resizeMode='contain'
            style={styles.userIcon}
          />
          <View style={styles.viewNameContainer}>
            <Text style={styles.greeeting}>Good Morning👋</Text>
            <Text style={[styles.title, {
              color: COLORS.greyscale900
            }]}>John Doe</Text>
          </View>
        </View>
        {/* <View style={styles.viewRight}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}>
            <Image
              source={icons.notificationBell2}
              resizeMode='contain'
              style={[styles.bellIcon, { tintColor: COLORS.greyscale900 }]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Favourite")}>
            <Image
              source={icons.heartOutline}
              resizeMode='contain'
              style={[styles.bookmarkIcon, { tintColor: COLORS.greyscale900 }]}
            />
          </TouchableOpacity>
        </View>*/}
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView}>
        {/* Header with Background Image */}
        <ImageBackground
          source={require('../assets/images/banner1.png')}
          style={styles.headerBackground}
        >
          <View style={styles.headerOverlay}>
            <View style={styles.headerContent}>
              <View>
                <Text style={styles.venueName}>Den Social</Text>
                <Text style={styles.venueLocation}>Lounge • Koreatown</Text>
              </View>
              <TouchableOpacity style={styles.blueStatusIcon}>
                <Feather name="box" size={24} color="#4a9df6" />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* Blue Status Message */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            Get reduced Member pricing with Blue Status.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton}
            onPress={() => navigation.navigate("PurchaseItems")} >
            <Text style={styles.actionButtonText}>Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Reservations</Text>
          </TouchableOpacity>
        </View>

        {/* Options List */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionItem}>
            <MaterialIcons name="event" size={24} color="#666" style={styles.optionIcon} />
            <Text style={styles.optionText}>Tickets</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <FontAwesome5 name="gift" size={22} color="#666" style={styles.optionIcon} />
            <Text style={styles.optionText}>Send a Gift</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="map-outline" size={24} color="#666" style={styles.optionIcon} />
            <Text style={styles.optionText}>Venue Map</Text>
          </TouchableOpacity>
        </View>

        {/* Member Benefits Section */}
        <View style={styles.benefitsContainer}>

          {/* Venue Rules and Information */}
          <View style={styles.rulesContainer}>
            <Text style={styles.benefitsTitle}>Your Member Benefits</Text>
            <Text style={styles.ruleItem}>• Cover charge is $20 for all guys, girls and others unless you're Gold+ Status Member</Text>
            <Text style={styles.ruleItem}>• Earn MEMs when purchasing with your Apollo ID!</Text>
            <Text style={styles.ruleItem}>• Den Social has a karaoke lounge in their basement called Duet - book reservations in advance if you want to karaoke</Text>
            <Text style={styles.ruleItem}>• Use our Member Wifi Apollo @ Den Social (password: apolloid) to access free internet inside Den (changes frequently so check back)</Text>
            <Text style={styles.ruleItem}>• Dress to impress! Please try not to wear shorts, sportswear, sweatpants, or sandals</Text>
            <Text style={styles.ruleItem}>• Physical ID required! Pictures of IDs and passports will not be accepted and will not grant entry in any circumstances.</Text>
            <Text style={styles.ruleItem}>• Table deposits are non-refundable.</Text>
          </View>

          {/* Membership Summary Section */}
          <View style={styles.membershipContainer}>
            <Text style={styles.sectionTitle}>Membership Summary</Text>
            <Text style={styles.memsGoalText}>30,000 MEMs until Gold</Text>

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '23%' }]} />
              </View>
              <View style={styles.progressLabels}>
                <Text style={styles.progressLabelLeft}>0</Text>
                <Text style={styles.progressLabelRight}>30,000</Text>
              </View>
            </View>

            {/* Earning Period */}
            <View style={styles.earningPeriodContainer}>
              <Text style={styles.earningPeriodLabel}>Earning Period</Text>
              <Text style={styles.earningPeriodDate}>8/1/25</Text>
            </View>
            <Text style={styles.earningPeriodNote}>Earning Period will reset upon ranking up.</Text>
          </View>

          {/* Maps Section */}
          <View style={styles.mapsContainer}>
            <Text style={styles.sectionTitle}>Maps</Text>
            <MapView
              style={styles.mapImage}
              initialRegion={{
                latitude: 40.7505,
                longitude: -73.9885,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation={true}
              showsMyLocationButton={true}
              showsIndoors={true}
              showsBuildings={true}
              showsScale={true}
              showsMapToolbar={true}
              showsPointsOfInterest={true}
            >
              <Marker coordinate={{ latitude: 40.7505, longitude: -73.9885 }} title="Den Social" description="65 W 36th St, New York, NY, 10018" />
            </MapView>
          </View>

          {/* Check In Button */}
          <TouchableOpacity style={styles.checkInButton}>
            <Text style={styles.checkInButtonText}>Check In</Text>
          </TouchableOpacity>

          <Text style={styles.enjoyBenefitsText}>Start enjoying your Benefits</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.grayscale200,
  },
  scrollView: {
    flex: 1,
  },
  headerBackground: {
    height: 420,
  },
  headerOverlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    height: '100%',
    justifyContent: 'flex-end',
    padding: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  venueName: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: 'bold',
  },
  venueLocation: {
    color: '#ddd',
    fontSize: 16,
  },
  blueStatusIcon: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  statusContainer: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  statusText: {
    fontSize: 16,
    color: '#333',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  optionsContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: COLORS.white,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionIcon: {
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  benefitsContainer: {
    padding: 16,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  rulesContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  ruleItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  membershipContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  memsGoalText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  progressBarContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4a9df6',
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  progressLabelLeft: {
    fontSize: 12,
    color: '#666',
  },
  progressLabelRight: {
    fontSize: 12,
    color: '#666',
  },
  earningPeriodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 4,
  },
  earningPeriodLabel: {
    fontSize: 14,
    color: '#333',
  },
  earningPeriodDate: {
    fontSize: 14,
    color: '#333',
  },
  earningPeriodNote: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  mapsContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  mapImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  checkInButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  checkInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  enjoyBenefitsText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
});
export default Home