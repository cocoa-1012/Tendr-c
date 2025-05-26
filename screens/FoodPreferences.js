import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import { COLORS, SIZES } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Button from '../components/Button';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from '../firebaseConfig'; // adjust path if needed

const db = getFirestore(app);
// Define preference categories and options
const preferencesData = [
  {
    category: "Dietary Preferences",
    options: ["Sweet Tooth", "Bring on the spice!", "Meat Lover", "Seafood Lover", "Veggie Lover"]
  },
  {
    category: "Dietary Restrictions",
    options: ["Vegetarian", "Vegan", "Pescatarian", "Nut Allergy", "Shellfish Allergy", "Gluten-Free", "Dairy-Free", "Halal", "Kosher"]
  },
];

const FoodPreferences = ({ route, navigation }) => {
  const { profile, drinkPreferences } = route.params;
  const [selectedPreferences, setSelectedPreferences] = useState([]);

  const togglePreference = (preference) => {
    setSelectedPreferences(prev => 
      prev.includes(preference)
        ? prev.filter(item => item !== preference)
        : [...prev, preference]
    );
  };

  const handleNext = async () => {
    console.log("Selected preferences result:","PROFILE : ", profile, "DRINK : ", drinkPreferences, "FOOD : ", selectedPreferences);
    // In a real app, you would save these preferences to your Firebase store
    try {
    // Save to Firestore (e.g., to a "users" collection)
    await addDoc(collection(db, "users"), {
      profile,
      drinkPreferences,
      foodPreferences: selectedPreferences,
      createdAt: new Date()
    });
    // Navigate after saving
    navigation.navigate("Main", { profile, drinkPreferences, foodPreferences: selectedPreferences });
  } catch (error) {
    console.log("Error saving to Firestore:", error);
    // Optionally show an alert
  }
    navigation.navigate("Profile", { profile: profile, drinkPreferences: drinkPreferences, foodPreferences: selectedPreferences });
  };

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header title="YOUR FOOD PREFERENCES" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.normalText}>This allows venue staff to personalize your experience and make better recommendations from the menu.</Text>
            {preferencesData.map((category, index) => (
              <View key={index}>
                <Text style={[styles.normalText, { fontWeight: "bold", marginTop: 20 }]}>{category.category}</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
                  {category.options.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => togglePreference(option)}
                      style={{
                        backgroundColor: selectedPreferences.includes(option) ? COLORS.primary : COLORS.greyscale500,
                        padding: 10,
                        borderRadius: 8,
                        margin: 4,
                        width: '45%',
                      }}
                    >
                      <Text style={{ color: selectedPreferences.includes(option) ? COLORS.white : COLORS.black }}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>

        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <Button
          title="Next"
          filled
          style={styles.continueButton}
          onPress={ handleNext }
        />
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
  inputContainer: {
    flexDirection: "row",
    borderColor: COLORS.greyscale500,
    borderWidth: .4,
    borderRadius: 12,
    height: 52,
    width: SIZES.width - 32,
    alignItems: 'center',
    marginVertical: 12,
    backgroundColor: COLORS.greyscale500,
  },
  downIcon: {
    width: 10,
    height: 10,
    tintColor: "#111"
  },
  selectFlagContainer: {
    width: 90,
    height: 50,
    marginHorizontal: 5,
    flexDirection: "row",
  },
  flagIcon: {
    width: 30,
    height: 30
  },
  input: {
    flex: 1,
    marginVertical: 10,
    height: 40,
    fontSize: 14,
    color: "#111"
  },
  inputBtn: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLORS.greyscale500,
    height: 52,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: "space-between",
    marginTop: 4,
    backgroundColor: COLORS.greyscale500,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bottomContainer: {
    position: "absolute",
    bottom: 32,
    right: 16,
    left: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    width: SIZES.width - 32,
    alignItems: "center"
  },
  continueButton: {
    width: (SIZES.width - 32) - 8,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary
  },
  closeBtn: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: COLORS.white,
    position: "absolute",
    right: 16,
    top: 32,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  }
})

export default FoodPreferences