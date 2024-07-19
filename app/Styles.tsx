import { Platform, StyleSheet } from 'react-native'


const bgColor : string = '#FFF6EB'
const primary : string = '#5A72A0'
const secondary : string = '#83B4FF'
const tertiary : string = '#1A2130'
/*
Color Pallette: https://colorhunt.co/palettes/popular
Sand tan: #FFF5E1 --> bgColor
Light Blue: #83B4FF --> secondary
Steel Blue: #5A72A0 --> primary
Blue-Black: #1A2130 --> tertiary
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
        backgroundColor: secondary, //primary
        borderRadius: 8,
        paddingVertical: 65,
        paddingHorizontal: 20,
        width: '100%',
        marginVertical: 15,
        alignItems: 'center',
      },
      exerContainerUnpressed: { // style={styles.exerContainerUnpressed}
        backgroundColor: secondary,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 5,
        width: '100%',
        marginVertical: 5,
        marginHorizontal: 0,
        alignItems: 'center',
      },
      exerContainerPressed: { // style={[styles.exerContainerPressed, styles.shadowProp]}
        backgroundColor: bgColor,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 0,
        width: '100%',
        marginVertical: 5,
        marginHorizontal: 0,
        alignItems: 'center',
      },
      rowExer: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 5,
      },
      textInputExer: {
        borderWidth: 1,
        borderColor: tertiary,
        padding: 6,
        marginHorizontal: 5,
        borderRadius: 4,
        color: primary,
        fontSize: 16
      },
      firstInputExer: {
        flex: 10,
      },
      resistInputExer: {
        flex: 2,
      },
      repInputExer: {
        flex: 1,
      },
      fullWidthInputExer: {
        flex: 1,
        width: '100%',
      },
      textExer: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginHorizontal: 5,
        borderRadius: 4,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: tertiary
      },
      firstTextExer: {
        flex: 7,
      },
      resistTextExer: {
        flex: 3,
      },
      repTextExer: {
        flex: 1,
      },
      scrollContExer: {
        width: "100%"
      },
      cardHalf: { // style={[styles.card, styles.shadowProp]}
        backgroundColor: secondary,
        borderRadius: 8,
        paddingVertical: 65,
        paddingHorizontal: 20,
        width: '45.5%',
        marginVertical: 15,
        marginHorizontal: 15,
        alignItems: 'center',
      },
      smallCardHolder: { // style={styles.smallCardHolder}
        flexDirection : 'row',
      },
      boxShadow: { },
      textIn: { //style={styles.textIn}
        height: 40,
        width: 250,
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
      headingLight:{ // style={styles.headingDark}
        justifyContent: 'center',
        color: secondary,
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
        backgroundColor: bgColor,
        color: primary
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