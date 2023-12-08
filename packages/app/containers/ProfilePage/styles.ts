import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white"
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20
  },
  textInput: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: "transparent"
  },
  errorText: {
    marginBottom: 10,
    color: "red"
  },
  contentStyleButton: {
    width: "100%",
    height: 45
  },
  button: {
    marginTop: 5,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 50
  },
  flexDirectorRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  iconColumn: {
    // borderWidth: 1,
    // borderColor: "red",
    paddingTop: 15,
    alignItems: "center",
    width: 60
  }
});
