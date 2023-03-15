/**
 * @format
 * Map Style
 */

import {ScaledSheet} from 'react-native-size-matters';
import {Dimensions, Platform} from 'react-native';
import {Colors} from '../../../helpers';

export const getStyle = () => {
  return ScaledSheet.create({
    head: {
      height: '70@ms',
      backgroundColor: 'orange',
    },
    headerTitle: {
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      fontSize: '22@ms',
      fontFamily: 'Poppins',
    },
    container: {
      flex: 1,
      color: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    bubble: {
      flexDirection: 'column',
      alignSelf: 'flex-start',
      backgroundColor: '#fff',
      borderRadius: '6@ms',
      borderColor: '#ccc',
      borderWidth: 0.5,
      padding: '15@ms',
    },
    name: {
      fontSize: '10@ms',
      marginTop: '5@ms',
      color: '#900',
      fontWeight: 600,
    },
    description: {
      fontSize: '13@ms',
      marginTop: '5@ms',
      color: '#000',
      fontWeight: 400,
      textAlign: 'center',
      fontWeight: 600,
    },
    arrow: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderTopColor: '#fff',
      borderWidth: '16@ms',
      alignSelf: 'center',
      marginTop: '-32@ms',
    },
    arrowBorder: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderTopColor: '#007a87',
      borderWidth: '16@ms',
      alignSelf: 'center',
      marginTop: '-0.5@ms',
    },
    imageMap: {
      width: '120@ms',
      height: '80@ms',
      borderColor: '#000',
      borderWidth: 0.5,
    },
    searchBar: {
      position: 'absolute',
      top: '20@ms',
      flexDirection: 'row',
      backgroundColor: '#fff',
      width: '95%',
      alignSelf: 'center',
      borderRadius: '5@ms',
      padding: '10@ms',
      shadowColor: '#ccc',
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 10,
    },
    chipScrollView: {
      position: 'absolute',
      top: Platform.OS === 'android' ? 80 : 70,
      paddingHorizontal: '10@ms',
    },
    chipListScrollView: {
      position: 'absolute',
      bottom: Platform.OS === 'android' ? 0 : 0,
      left: Platform.OS === 'android' ? 5 : 5,
      paddingHorizontal: '5@ms',
      backgroundColor: '#fff',
      height: '80@ms',
      zIndex: 500,
    },
    chipItem: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: '20@ms',
      padding: '8@ms',
      paddingHorizontal: '10@ms',
      marginHorizontal: '10@ms',
      height: '35@ms',
      shadowColor: '#ccc',
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 10,
    },
    chipListItem: {
      // position: 'absolute',
      marginTop: Platform.OS === 'android' ? 20 : 0,
      backgroundColor: '#fff',
      borderRadius: '20@ms',
      padding: '8@ms',
      paddingHorizontal: '10@ms',
      marginHorizontal: '5@ms',
      height: '35@ms',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    chipListContent: {
      color: '#000',
    },
    activeTabContainer: {
      backgroundColor: '#900',
    },
    activeTabTitle: {
      color: '#fff',
      fontWeight: 600,
    },
    buttonContainer: {
      backgroundColor: '#900',
      justifyContent: 'center',
      alignItems: 'center',
      height: '30@ms',
      borderRadius: '35@ms',
      marginTop: '10@ms',
    },

    buttonText: {
      color: '#fff',
      fontWeight: 600,
    },
  });
};
