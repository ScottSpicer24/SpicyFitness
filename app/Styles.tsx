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
      formLogin: { // style={styles.formLogin}
        marginVertical: 20,
        flexDirection : 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      formSW: { // style={styles.form}
        marginVertical: 10,
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
        backgroundColor: bgColor,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 5,
        width: '100%',
        marginVertical: 0,
        marginHorizontal: 0,
        alignItems: 'center',
      },
      exerContainerPressed: { // style={[styles.exerContainerPressed, styles.shadowProp]}
        backgroundColor: secondary,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
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
        fontSize: 15,
        //fontWeight: 'bold',
      },
      unconfirmedExerInputText: {
        opacity: 0.75
      },
      confirmedExerInputText: {
        fontWeight: 'bold',
      },
      firstInputExer: {
        flex: 10,
      },
      resistInputExer: {
        flex: 3,
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
        width: "100%",
      },
      bottomSpacer: {
        height: 30
      },
      confirmedExerText: {
        color: primary,
        fontSize: 15,
        fontWeight: 'bold',
      },
      unconfirmedExerText: {
        borderBottomColor: tertiary,
        fontSize: 15,
        opacity: 0.5
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
        height: 50,
        width: 250,
        borderBottomWidth: 2,
        padding: 10,
        marginBottom: 15,
        marginTop: 10,
        backgroundColor: bgColor,
        color: primary,
        fontSize: 16
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
      buttonLogin: { // style={styles.button}
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 32,
        marginTop: 20,
        marginBottom: 10,
        width: 200,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: tertiary,
      },
      buttonFP: { // style={styles.button}
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 32,
        marginTop: 10,
        marginBottom: 20,
        width: 200,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: tertiary,
      },
      buttonSm: { // style={styles.buttonSm}
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 32,
        margin: 15,
        width: 150,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: tertiary,
        justifyContent: 'center',
        textAlign: "center"
      },
      buttonAddSplit: { // style={styles.buttonAddSplit}
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 32,
        margin: 10,
        width: 200,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: tertiary,
      },
      buttonSW: { // style={styles.buttonSW}
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 32,
        marginHorizontal: 10,
        //width: 200,
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
      buttonMed: { // style={styles.buttonMed}
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginBottom: 10,
        marginTop: 5,
        marginHorizontal: 1,
        width: '100%',
        borderRadius: 4,
        elevation: 3,
        backgroundColor: tertiary,
      },
      buttonAddSub: { // style={styles.buttonAddSub}
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginBottom: 10,
        marginTop: 5,
        marginHorizontal: 5,
        width: '100%',
        borderRadius: 20,
        elevation: 3,
        backgroundColor: tertiary,
      },
      buttonLg: { // style={styles.buttonLg}
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        marginVertical: 30,
        marginHorizontal: 1,
        width: '100%',
        borderRadius: 4,
        elevation: 3,
        backgroundColor: tertiary,
      },
      buttonExer:{
        flex: 4
      },
      buttonNext:{
        flex: 2
      },
      floatingButton: {
        alignItems: 'center',
        paddingVertical: 10,
        marginLeft: '55%',
        marginVertical : 15,
        width: 125,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: tertiary,
      },
      text: { // style={styles.text}
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: bgColor,
      },
      textArrowAddSub: { // style={styles.textArrowAddSub}
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        color: bgColor,
      },
      AppLoginText: { // style={styles.AppLoginText}
        fontSize: 37,
        color: secondary,
        marginBottom: 20,
        fontWeight: 'bold',
        textDecorationLine: "underline",
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
      },

      modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
      },
      modalContainer: {
        width: 300,
        backgroundColor: bgColor,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: tertiary,
        padding: 10,
        alignItems: 'center',
        margin: 10,
      },
      modalTitle: {
        fontSize: 18,
        marginBottom: 10,
      },
      modalButton: {
        backgroundColor: bgColor,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: tertiary,
        paddingVertical: 10,
        paddingHorizontal: 5,
        width: '100%',
        marginVertical: 5,
        marginHorizontal: 0,
        alignItems: 'center',
      },


      containerHome: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginHorizontal : 20,
        marginVertical: 10,
      },
      row: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      HomePressable: {
        height: 130, // Adjust as needed
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgColor,
        borderBottomWidth: 3,
        borderColor: tertiary,
        //borderRadius: 8,
        paddingVertical: 20,
        paddingHorizontal: 5,
        width: '100%',
        marginVertical: 15,
      },
      WeightText: {
        fontSize: 40,
        color: primary,
        textDecorationLine: 'underline',
      },
      WeightDateText: {
        fontSize: 20,
        color: primary,
        margin: 5
      },
      WeightContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
      },
      headingHomeText: {
        fontSize: 20,
        color: primary,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
      },
      icon: {
        width: 75,
        height: 75,
        margin: 10,
      },
      iconMadeBigger: {
        width: 90,
        height: 90,
        margin: 7,
      },
      iconHeader: {
        width: 130,
        height: 130,
        margin: 20,
        marginRight: 33,
      }, 
      StartContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
      },
      StartText: {
        fontSize: 40,
        color: primary,
        marginHorizontal: 20,
      },
      ChangeContainer: {
        height: 135, // Adjust as needed
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgColor,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: '100%',
        marginVertical: 15,
      },
      ChangePressable:{
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      ChangeText:{
        fontSize: 15,
        color: primary,
        marginTop: 5,
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