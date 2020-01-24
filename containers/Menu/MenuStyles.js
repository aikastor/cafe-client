import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  price: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold'
  },
  btnContainer : {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'space-around'
  },
  modal: {
    flex: 1,
  },
  modalFooter : {position: 'absolute', left: 0, right: 0, bottom: 0},

});
export default styles;