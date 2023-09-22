import { View, Text, ActivityIndicator } from "react-native";

const StartPage = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color="green" />
    </View>
  );
};

export default StartPage;
