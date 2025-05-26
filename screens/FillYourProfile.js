import { View, Text, StyleSheet, ScrollView, Alert, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, FlatList, TextInput } from 'react-native';
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { COLORS, SIZES, FONTS, icons } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { reducer } from '../utils/reducers/formReducers';
import { validateInput } from '../utils/actions/formActions';
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import { launchImagePicker } from '../utils/ImagePickerHelper';
import Input from '../components/Input';
import { getFormatedDate } from "react-native-modern-datepicker";
import DatePickerModal from '../components/DatePickerModal';
import Button from '../components/Button';
import DatePicker from 'react-native-modern-datepicker'

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


const FillYourProfile = ({ navigation }) => {
  const [image, setImage] = useState(null);
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
        <Header title="Fill Your Profile" showBackButton={false} />
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
          </View>
          <View>
            <Input
              id="firstName"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['firstName']}
              placeholder="First Name"
              placeholderTextColor={COLORS.gray} />
            <Input
              id="lastName"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['lastName']}
              placeholder="Last Name"
              placeholderTextColor={COLORS.gray} />
            <Input
              id="nickname"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['nickname']}
              placeholder="Custom Username"
              placeholderTextColor={COLORS.gray} />
            <Input
              id="inviteCode"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['inviteCode']}
              placeholder="Invite Code (optional)"
              placeholderTextColor={COLORS.gray}
              keyboardType="email-address" />
            <Text style={styles.normalText}>Gender</Text>
            <TouchableOpacity
              style={styles.inputBtn}
              onPress={() => setGenderModalVisible(true)}
            >
              <Text style={{ color: formState.inputValues.gender ? COLORS.black : COLORS.gray }}>
                {formState.inputValues.gender
                  ? genderOptions.find(opt => opt.value === formState.inputValues.gender)?.label
                  : 'Select Gender'}
              </Text>
              <Feather name="chevron-down" size={20} color={COLORS.gray} />
            </TouchableOpacity>
            <Text style={styles.normalText}>Birthday</Text>
            <TouchableOpacity
              style={styles.inputBtn}
              onPress={() => setBirthdayModalVisible(true)}
            >
              <Text style={{ color: formState.inputValues.birthday ? COLORS.black : COLORS.gray }}>
                {formState.inputValues.birthday
                  ? formState.inputValues.birthday
                  : 'Select Birthday'}
              </Text>
              <Feather name="chevron-down" size={20} color={COLORS.gray} />
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <Button
          title="Continue"
          filled
          style={styles.continueButton}
          onPress={() => navigation.navigate("DrinkPreferences", { profile: formState.inputValues })}
        />
      </View>
      <Modal
        visible={genderModalVisible}
        transparent
        animationType="slide"
      >
        <TouchableWithoutFeedback onPress={() => setGenderModalVisible(false)}>
          <View style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.2)',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{
              backgroundColor: COLORS.white,
              borderRadius: 16,
              padding: 24,
              width: '80%',
              alignItems: 'center'
            }}>
              {genderOptions.map(option => (
                <TouchableOpacity
                  key={option.value}
                  style={{ paddingVertical: 12, width: '100%' }}
                  onPress={() => {
                    inputChangedHandler('gender', option.value);
                    setGenderModalVisible(false);
                  }}
                >
                  <Text style={{
                    fontSize: 16,
                    color: COLORS.black,
                    textAlign: 'center'
                  }}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal
        visible={birthdayModalVisible}
        transparent
        animationType="slide"
      >
        <TouchableWithoutFeedback onPress={() => setBirthdayModalVisible(false)}>
          <View style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.2)',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{
              backgroundColor: COLORS.white,
              borderRadius: 16,
              padding: 24,
              width: '80%',
              alignItems: 'center'
            }}>
              <DatePicker
                mode="calendar"
                onSelectedChange={date => {
                  inputChangedHandler('birthday', date);
                  setBirthdayModalVisible(false);
                }}
                options={{
                  backgroundColor: COLORS.white,
                  textHeaderColor: COLORS.primary,
                  textDefaultColor: COLORS.black,
                  selectedTextColor: COLORS.white,
                  mainColor: COLORS.primary,
                  textSecondaryColor: COLORS.gray,
                  borderColor: "rgba(122, 146, 165, 0.1)",
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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

export default FillYourProfile