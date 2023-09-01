import { useNavigation } from '@react-navigation/native';
import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    SafeAreaView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,

} from 'react-native';
import SweetAlert from 'react-native-sweet-alert';
import { useDispatch, useSelector } from 'react-redux';
import { stateSelector } from '../redux/selectors/selectors';
import { useEffect } from 'react';
import * as actionTypes from '../redux/_ActionsType'


const LoginScreen = () => {
    const [username, setusername] = useState('');
    const [userpassword, setUserpassword] = useState('');
    const [errortext, setErrortext] = useState('');
    const [successtext, setSuccesstext] = useState('');
    const navigation = useNavigation()
    const userState = useSelector(state=>stateSelector(state)) //selecting current global state
    const dispatch = useDispatch()

    const passwordInputRef = createRef();

    posts = () => {
        navigation.navigate("Posts")
    }
    // const showAlert = (title, subtitle, style) => {
    //     SweetAlert.showAlertWithOptions({
    //         title: title,
    //         subTitle: subtitle,
    //         confirmButtonTitle: 'OK',
    //         confirmButtonColor: 'red',
    //         style: style,
    //         cancellable: true
    //     });

    // }

    const handleSubmitPress = () => {
        setErrortext('');
        if (!username) {
            // alert('Please fill username');
            // alert("Please fill username")
            setErrortext("Please fill username")
            return;
        }
        if (!userpassword) {
            setErrortext("Please fill password")
            return;
        }
        LoginCheck()

    };
    const LoginCheck = () => {
        if (username == "Admin" && userpassword == "Admin") {
            setSuccesstext("Login successful.")
            dispatch({
                type: actionTypes.UPDATE_USER_DATA_SUCCESS,
                payload: {
                    name: "Together Light"
                }
            }) // Updating User Details to global state
        }
        else {
            setErrortext("Login failed.")
            dispatch({
                type: actionTypes.UPDATE_USER_DATA_FAIL,
                payload: {
                    message: "Login Failed"
                }
            })
        }
    }

    useEffect(()=>{
        //Checking if global state initialised
        if(userState.userDetails != null){
            posts()
        }
    }, [userState])

    return (
        <SafeAreaView style={styles.mainBody}>
            <ScrollView>
                <View style={styles.textSection}>
                    <Text style={styles.text} >Hey! Good to see you again</Text>
                </View>
                <View style={styles.Section}>
                    <Text style={styles.Logintext} >Sign in</Text>
                </View>

                <View style={styles.Card}>

                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(username) =>
                                setusername(username)
                            }
                            placeholder="Enter UserName" //Admin
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                passwordInputRef.current &&
                                passwordInputRef.current.focus()
                            }
                            underlineColorAndroid="#f000"
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(Userpassword) =>
                                setUserpassword(Userpassword)
                            }
                            placeholder="Enter password" //Admin
                            placeholderTextColor="#8b9cb5"
                            keyboardType="default"
                            ref={passwordInputRef}
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                            secureTextEntry={true}
                            underlineColorAndroid="#f000"
                            returnKeyType="next"
                        />
                    </View>
                    {errortext != '' ? (
                        <Text style={styles.errorTextStyle}>
                            {errortext}
                        </Text>
                    ) : null}
                    {successtext != '' ? (
                        <Text style={styles.successTextStyle}>
                            {successtext}
                        </Text>
                    ) : null}
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}>
                        <Text onPress={handleSubmitPress} style={styles.buttonTextStyle}>LOGIN</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        onPress={posts}>
                        <Text style={styles.posts}>Click here to go to Posts</Text>
                    </TouchableOpacity> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default LoginScreen;

const styles = StyleSheet.create({
    mainBody: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignContent: 'center',
    },
    Logintext: {
        fontSize: 30,
        textAlign: 'left',
        flex: 1,
        fontWeight: 'bold',
        color: '#0D094E'
    },
    text: {
        fontSize: 15,
        textAlign: 'left',
        flex: 1,
        color: '#0D094E',
    },
    textSection: {
        flexDirection: 'row',
        marginLeft: 25,
        marginRight: 35,
        marginBottom: 40,
        marginTop: 10
    },
    Section: {
        flexDirection: 'row',
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    }, SectionStyle: {
        flexDirection: 'row',
        height: 60,
        marginTop: 40,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    Card: {
        backgroundColor: '#0D094E',
        margin: 10, 
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 100, 
        borderBottomLeftRadius: 20, 
        orderBottomRightRadius: 50

    },
    posts: {
        flexDirection: 'row',
        alignSelf: 'center',
        color: '#fff',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        borderStyle: 'dotted'
    },
    buttonStyle: {
        backgroundColor: '#fff',
        borderWidth: 0,
        color: '#0D094E',
        borderColor: '#7DE24E',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 35,
        marginRight: 35,
        marginTop: 40,
        marginBottom: 25,
        borderBottomRightRadius: 40,
        borderTopLeftRadius: 40
    },
    buttonTextStyle: {
        color: '#0D094E',
        paddingVertical: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    inputStyle: {
        flex: 1,
        color: '#fff',
        paddingLeft: 15,
        paddingRight: 15,
        borderBottomWidth: 2,
        borderRadius: 10,
        borderColor: '#ccc',
    },
    registerTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'green',
        textAlign: 'center',
        fontSize: 14,
    },
});