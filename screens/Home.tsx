import "react-native-gesture-handler";
import { Text } from "react-native";
import styles from "../styles.js";
import firebase from "../config.js";

const ref = firebase.firestore().collection("users");

// const Home = ({ navigation }) => {
//   const getEmail = () =>
//     ref.onSnapshot(({ docs }); => {
//       docs.forEach((doc) => {
//         console.log(doc.data());
//         console.log("1");
//       });
//     });

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}
//       >
//         <Text
//           style={{
//             textAlign: "center",
//             fontWeight: "bold",
//             fontSize: 18,
//             marginTop: 30,
//             marginBottom: 30,
//             width: 200,
//           }}
//         >
//           CYBER-DRIP
//         </Text>

//         <StatusBar style="auto" />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Home;
