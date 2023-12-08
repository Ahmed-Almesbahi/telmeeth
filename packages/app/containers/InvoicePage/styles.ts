import { StyleSheet } from 'react-native';
import { GRAY_BACKGROUND } from '../../utils/constants';
export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: GRAY_BACKGROUND
  },
  bodyContainer: {
    flex: 1
    // paddingHorizontal: 10,
    // paddingVertical: 20
  },
  preCard: {
    // borderWidth: 1,
    // borderColor: "red",
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  invoiceAmountContainer: {
    flexDirection: 'column'
  }
});
