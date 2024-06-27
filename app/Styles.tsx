import { Platform, StyleSheet } from 'react-native'


const bgColor : string = '#FFF6EB'
const primary : string = '#5A72A0'
const secondary : string = '#83B4FF'
const tertiary : string = '#1A2130'
/*
Color Pallette: https://colorhunt.co/palettes/popular
Sand tan: #FFF5E1 -- Background of app?
Light Blue: #83B4FF
Steel Blue: #5A72A0
Blue-Black: #1A2130
*/
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
        backgroundColor: secondary,
        borderRadius: 8,
        paddingVertical: 65,
        paddingHorizontal: 20,
        width: '100%',
        marginVertical: 15,
        alignItems: 'center',
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
      button: { // style={styles.button}
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 32,
        margin: 20,
        width: 200,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: tertiary,
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
      },
      text: { // style={styles.text}
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: bgColor,
      },
      heading:{ // style={styles.heading}
        justifyContent: 'center',
        color: primary,
        fontWeight: 'bold',
        fontSize: 15
      },
      headingSplits: {
        color: primary,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: "center",
        textDecorationLine: "underline",
        margin: 10,
        paddingTop: 10
      },
      mainTextSplits: {
        color: primary,
        fontWeight: 'bold',
        fontSize: 15
      },
      mainTextInSplits: { // style={styles.mainTextSplits}
        width: 150,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        marginBottom: 15,
        marginTop: 10,
        backgroundColor: bgColor,
        color: primary,
      },
      mainTextSplitsSelected: { // style={styles.mainTextSplitsSelected}
        fontWeight: 'bold',
        fontSize: 15,
        color: tertiary
      },
      textInDescSplits: { //style={styles.textInDesc}
        textAlign: 'left',
        textAlignVertical: 'top',
        height: 80,
        width: 250,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        marginBottom: 15,
        marginTop: 3,
        backgroundColor: bgColor
      },
      splitRadioSelected: {
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 5,
        margin: 3,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: secondary,
      },
      splitRadioNot: {
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 5,
        margin: 3,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: bgColor,
        borderColor: tertiary,
        borderWidth: 1
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