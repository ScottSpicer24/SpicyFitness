import { Platform, StyleSheet } from 'react-native'


export const styles = StyleSheet.create({
    container: { // style={styles.container}
        marginHorizontal : 20, 
      },
      form: { // style={styles.form}
        marginVertical: 20,
        flexDirection : 'column',
        alignItems: 'center',
      },
      card: { // style={[styles.card, styles.shadowProp]}
        backgroundColor: 'skyblue',
        borderRadius: 8,
        paddingVertical: 65,
        paddingHorizontal: 20,
        width: '100%',
        marginVertical: 15,
      },
      boxShadow: { },
      textIn: { //style={styles.textIn}
        height: 40,
        width: 150,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        marginBottom: 15,
        marginTop: 10,
        backgroundColor: '#fff'
      },
      textInDesc: { //style={styles.textInDesc}
        textAlign: 'left',
        textAlignVertical: 'top',
        height: 150,
        width: 250,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        marginBottom: 15,
        marginTop: 3,
        backgroundColor: '#fff'
      },
      button: { // style={styles.button}
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 32,
        margin: 20,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'blue',
      },
      text: { // style={styles.text}
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
      heading:{
        justifyContent: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15
      },
      buttonSmall: { // style={styles.buttonSmall}
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 16,
        margin: 10,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'skyblue',
      }
  });


  export const generateBoxShadowStyle = () => {
    if (Platform.OS === 'ios') {
      styles.boxShadow = {
        shadowColor: 'black',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      };
    } else if (Platform.OS === 'android') {
      styles.boxShadow = {
        elevation: 20,
        shadowColor: 'black',
      };
    }
  };