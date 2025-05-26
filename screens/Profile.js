import { View, Text, StyleSheet, ScrollView, Alert, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, FlatList, TextInput } from 'react-native';
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { COLORS, SIZES, FONTS, icons } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { reducer } from '../utils/reducers/formReducers';
import { validateInput } from '../utils/actions/formActions';
import { MaterialCommunityIcons, Feather, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { launchImagePicker } from '../utils/ImagePickerHelper';
import { getFirestore, collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { app } from '../firebaseConfig'; // adjust path if needed

const db = getFirestore(app);

const isTestMode = true;

const initialState = {
  inputValues: {
    firstName: isTestMode ? 'John Doe' : '',
    lastName: isTestMode ? 'Doe' : '',
    inviteCode: isTestMode ? 'example@gmail.com' : '',
    nickname: isTestMode ? "" : "",
    gender: '',
    birthday: '',
    avatar: null,
  },
  inputValidities: {
    firstName: false,
    lastName: false,
    inviteCode: false,
    nickname: false,
    gender: false,
    birthday: false,
    avatar: false,
  },
  formIsValid: false,
}


const Profile = ({ navigation, route }) => {
  const profile = route.params?.profile || {};;
  const drinkPreferences = route.params?.drinkPreferences || [];
  const foodPreferences = route.params?.foodPreferences || [];
  const [image, setImage] = useState(profile.avatar.uri);
  const [error, setError] = useState();
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [birthdayModalVisible, setBirthdayModalVisible] = useState(false);
  const genderOptions = [
    { id: 1, label: "Male", value: 'male' },
    { id: 2, label: 'Female', value: 'female' },
    { id: 3, label: 'Other', value: 'other' },];


  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue)
      dispatchFormState({ inputId, validationResult: result, inputValue })
    },
    [dispatchFormState]
  )

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error)
    }
  }, [error])

  useEffect(() => {
    console.log("profile", profile, "drinkPreferences", drinkPreferences, "foodPreferences", foodPreferences);
    // Fetch the latest user profile from Firestore
    const fetchUserProfile = async () => {
      try {
        const q = query(collection(db, "users"), orderBy("createdAt", "desc"), limit(1));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          // You can now use userData.profile, userData.drinkPreferences, userData.foodPreferences
          console.log("Fetched user data from Firestore:", userData);
          // For example, set to state:
          // setProfile(userData.profile);
          // setDrinkPreferences(userData.drinkPreferences);
          // setFoodPreferences(userData.foodPreferences);
        }
      } catch (err) {
        console.log("Error fetching user data:", err);
      }
    };

    fetchUserProfile();
  }, []);

  const pickImage = async () => {
    try {
      const tempUri = await launchImagePicker();
      if (!tempUri) return;
      // set the image
      setImage({ uri: tempUri });
      inputChangedHandler('avatar', { uri: tempUri });
    } catch (error) { }
  };

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header title="Profile" showBackButton={false} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: "center", marginVertical: 12 }}>
            <View style={styles.avatarContainer}>
              <Image
                source={image === null ? icons.userDefault2 : image}
                resizeMode="cover"
                style={styles.avatar} />
              <TouchableOpacity
                onPress={pickImage}
                style={styles.pickImage}>
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={24}
                  color={COLORS.white} />
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>{profile.firstName}{"  "} {profile.lastName}</Text>
            <Text style={styles.userHandle}>@{profile.nickname}</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Memberships</Text>
                <Text style={styles.statValue}>0</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Followers</Text>
                <Text style={styles.statValue}>0</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Following</Text>
                <Text style={styles.statValue}>0</Text>
              </View>
            </View>
            {/* MEMs Counter */}
            <View style={styles.memsContainer}>
              <View style={styles.memsValueContainer}>
                <Text style={styles.memsLabel}>Total MEMs</Text>
                <Text style={styles.memsValue}>0</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="information-circle-outline" size={24} color={COLORS.gray} />
              </TouchableOpacity>
            </View>
            {/* Make More MEMs Button */}
            <TouchableOpacity style={styles.makeMemsButton}>
              <Text style={styles.makeMemsButtonText}>Make More MEMs</Text>
            </TouchableOpacity>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
              <TouchableOpacity style={styles.navItem}>
                <Ionicons name="bag-outline" size={24} color={COLORS.white} />
                <Text style={styles.navLabel}>Orders</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navItem}>
                <Ionicons name="search" size={24} color={COLORS.white} />
                <Text style={styles.navLabel}>Add Friends</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navItem}>
                <Ionicons name="gift-outline" size={24} color={COLORS.white} />
                <Text style={styles.navLabel}>Gifts</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, width: "100%", paddingHorizontal: 16 }}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>
              </View>

              {/* Birthday Section */}
              <TouchableOpacity style={styles.item}>
                <View style={styles.itemLeft}>
                  <FontAwesome5 name="birthday-cake" size={18} color={COLORS.primary} style={styles.itemIcon} />
                  <Text style={styles.itemText}> {profile.birthday}</Text>
                </View>
              </TouchableOpacity>

              {/* Preferences Section Header */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Your Preferences</Text>
              </View>

              {/* Drinks Preferences */}
              <TouchableOpacity style={styles.item}>
                <View style={styles.itemLeft}>
                  <Ionicons name="wine-outline" size={20} color={COLORS.primary} style={styles.itemIcon} />
                  <View>
                    <Text style={styles.itemText}>Drinks:</Text>
                    <Text style={styles.itemSubtext}>{drinkPreferences.join(', ')}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
              </TouchableOpacity>

              {/* Food Preferences */}
              <TouchableOpacity style={styles.item}>
                <View style={styles.itemLeft}>
                  <Ionicons name="restaurant-outline" size={20} color={COLORS.primary} style={styles.itemIcon} />
                  <View>
                    <Text style={styles.itemText}>Food:</Text>
                    <Text style={styles.itemSubtext}>{foodPreferences.join(', ')}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
              </TouchableOpacity>

              {/* Venue Preferences */}
              <TouchableOpacity style={styles.item}>
                <View style={styles.itemLeft}>
                  <Ionicons name="home-outline" size={20} color={COLORS.primary} style={styles.itemIcon} />
                  <Text style={styles.itemText}>Venue Related</Text>
                </View>s
                <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
              </TouchableOpacity>

              {/* Account Actions */}
              <View style={styles.accountActions}>
                <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("Signup")} >
                  <Text style={styles.signOutText}>Sign Out</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("Signup")}>
                  <Text style={styles.deleteText}>Delete Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white
  },
  normalText: {
    paddingTop: 20,
    fontSize: 16,
    fontFamily: "regular",
    fontWeight: "900",
    color: COLORS.black,
    textAlign: "left",
  },
  avatarContainer: {
    marginVertical: 12,
    alignItems: "center",
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  avatar: {
    height: 130,
    width: 130,
    borderRadius: 65,
  },
  pickImage: {
    height: 42,
    width: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  userName: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userHandle: {
    color: '#999',
    fontSize: 16,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#999',
    fontSize: 14,
  },
  memsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memsLabel: {
    color: COLORS.gray,
    fontSize: 16,
    marginBottom: 8,
  },
  memsValueContainer: {
    alignItems: 'center',
    gap: 4,
    marginRight: 8,
  },
  memsValue: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  makeMemsButton: {
    width: '100%',
    backgroundColor: COLORS.primary,
    marginHorizontal: 16,
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  makeMemsButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.greyscale500,
    marginTop: 'auto',
  },
  navItem: {
    width: '32%',
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  navLabel: {
    color: COLORS.secondaryWhite,
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  sectionTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemIcon: {
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  itemText: {
    color: COLORS.primary,
    fontSize: 16,
  },
  itemSubtext: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 2,
    flexShrink: 1,
  },
  accountActions: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  actionButton: {
    paddingVertical: 12,
    marginBottom: 16,
  },
  signOutText: {
    color: '#ff3b30',
    fontSize: 16,
    fontWeight: '500',
  },
  deleteText: {
    color: '#ff3b30',
    fontSize: 16,
    fontWeight: '500',
  },
})

export default Profile