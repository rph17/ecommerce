
import {StyleSheet} from "react-native";

const geral = StyleSheet.create({
    flex: {
         flex: 1
    },
    flexRow: {
        flexDirection:"row"
    },
    justifyContentCenter: {
        justifyContent: 'center'
    },
    justifyContentBetween: {
        justifyContent: 'space-between'
    },
    alignItemCenter: {
        alignItems: 'center'
    },
    iconMenu: {
        width:24,
        height:24
    },
    imgBox: {
        minHeight:150,
        minWidth:150
    },
    imgLine: {
        minHeight:50,
        minWidth:50
    },
    lineBottom:  {
        borderBottomColor: '#CCC',
        borderBottomWidth: 1
    },
    buttonDel: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius:30
    }
});

export default geral;