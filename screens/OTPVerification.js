import { View, Text, Alert, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { COLORS } from '../constants';
import { OtpInput } from "react-native-otp-entry";
import Button from "../components/Button";
import { use } from 'react';

const OTPVerification = ({ navigation, route }) => {
  const { confirmationResult } = route.params;
  console.log("OTPVerification", confirmationResult);
  const [time, setTime] = useState(119);
  const [otp, setOtp] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleVerify = async () => {
    try {
      const credential = await confirmationResult.confirm(otp);
      // OTP verified successfully, navigate to next screen
      navigation.navigate("FillYourProfile");
    } catch (error) {
      setOtp('');
      Alert.alert('Verification Failed', 'Please enter the correct code sent to your phone.');
    }
  };

  useEffect(() => {
    if (time === 0) {
      Alert.alert('Time Out', 'Please request a new code.');
    }
  }, [time, otp]);

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header title="OTP Verification" />
        <ScrollView>
          <Text style={[styles.title, {
            color: COLORS.black
          }]}>Code has been send to your phone</Text>
          <OtpInput
            numberOfDigits={6}
            value={otp}
            onTextChange={setOtp}
            focusColor={COLORS.primary}
            focusStickBlinkingDuration={500}
            theme={{
              pinCodeContainerStyle: {
                backgroundColor: COLORS.secondaryWhite,
                borderColor: COLORS.secondaryWhite,
                borderWidth: .4,
                borderRadius: 10,
                height: 58,
                width: 58,
              },
              pinCodeTextStyle: {
                color: COLORS.black,
              }
            }}
          />
          <View style={styles.codeContainer}>
            <Text style={[styles.code, {
              color: COLORS.greyscale900
            }]}>Resend code in</Text>
            <Text style={styles.time}>{`  ${time}  `}</Text>
            <Text style={[styles.code, {
              color: COLORS.greyscale900
            }]}>s</Text>
          </View>
        </ScrollView>
        <Button
          title="Verify"
          filled
          style={styles.button}
          onPress={handleVerify}
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
  title: {
    fontSize: 18,
    fontFamily: "medium",
    color: COLORS.greyscale900,
    textAlign: "center",
    marginVertical: 54
  },
  OTPStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.black,
    borderRadius: 8,
    height: 58,
    width: 58,
    backgroundColor: COLORS.secondaryWhite,
    borderBottomColor: "gray",
    borderBottomWidth: .4,
    borderWidth: .4,
    borderColor: "gray"
  },
  codeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
    justifyContent: "center"
  },
  code: {
    fontSize: 18,
    fontFamily: "medium",
    color: COLORS.greyscale900,
    textAlign: "center"
  },
  time: {
    fontFamily: "medium",
    fontSize: 18,
    color: COLORS.primary
  },
  button: {
    borderRadius: 32
  }
})

export default OTPVerification