import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";

export default function App() {
  const [minimalSalaryDefault] = useState(607);
  const [earningsAmmount, setEarningsAmmount] = useState(0);
  const [vsdAmmount, setVsdAmmount] = useState(12,52);
  const [additionalPension, setAdditionalPension] = useState({
    base: false,
    typeOne: true,
    typeTwo: false,
  })

  useEffect(() => {
    let base = 0.1252;

    if (additionalPension.base) {
      setVsdAmmount(base);
    } else if (additionalPension.typeOne) {
      setVsdAmmount(base + 0.021);
    } else if (additionalPension.typeTwo) {
      setVsdAmmount(base + 0.03);
    }
  }, [additionalPension])


  const getPsd = () => {
    return (minimalSalaryDefault * 0.0698).toFixed(2);
  }

  const getVsd = () => {
    return ((earningsAmmount * 0.9) * vsdAmmount).toFixed(2);
  }

  const getNetto = () => {
    const psd = getPsd();
    const vsd = getVsd();
    
    return (earningsAmmount - vsd - psd).toFixed(2);
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        
        <View style={styles.result_wrapper}>
          <View style={styles.result_item}>
            <Text style={styles.result_item_text}>PSD: </Text>
            <Text style={styles.result_item_value}>{getPsd()} €</Text>
          </View>

          <View style={styles.result_item}>
            <Text style={styles.result_item_text}>VSD: </Text>
            <Text style={styles.result_item_value}>{getVsd()} €</Text>
          </View>

          <View style={styles.result_item}>
            <Text style={styles.result_item_text}>Lieka: </Text>
            <Text style={styles.result_item_value}>{getNetto() > 0 ? getNetto() : 0} €</Text>
          </View>
        </View>

        <KeyboardAvoidingView 
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.input_wrapper}
        >
          <Text style={styles.input_title} >Įveskite mėnesio pajamas</Text>

          <TextInput
            style={styles.input_earnings}
            keyboardType='numeric'
            onChangeText={(amount) => setEarningsAmmount(amount)}
            value={`${earningsAmmount}`}
          />
        </KeyboardAvoidingView>
        <StatusBar style="auto" />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: '5%',
  },

  content: {
    flex: 1,
    justifyContent: 'space-between',
  },

  result_item: {
    marginBottom: 30,
  },

  result_item_text: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "700",
  },

  result_item_value: {
    fontSize: 24,
    fontWeight: "200",
    color: "#143109"
  },

  input_title: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "500",
  },

  input_earnings: {
    height: 80,
    marginBottom: 50,
    fontWeight: "500",
    fontSize: 32,
    borderColor: "gray",
    borderWidth: 1,
    alignSelf: "stretch",
    textAlign: "center",
  },
});
