import React from 'react'
import { useLayoutEffect } from 'react'
import {StyleSheet, Text, View} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomListItem from '../components/CustomListItem'
import { auth,db } from '../firebase'
import { ListItem, Avatar } from 'react-native-elements'
import {AntDesign, SimpleLineIcons} from "@expo/vector-icons"
import { useState } from 'react'
import { useEffect } from 'react'


const HomeScreen = ({navigation}) => {
    const [chats, setChats] = useState([]);

    const signOutUser = () => {
        auth.signOut().then(()=> {
            navigation.replace("Login");
        })
    }

    
    useEffect(() => {

        const unsubscribe = db.collection('chats').onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc => ({

                id: doc.id,
                data: doc.data()
            })))
        ))

        return unsubscribe;
    },[])




    useLayoutEffect(() => {

        navigation.setOptions({
            title: "Chatsapp",
            headerStyle : {backgroundColor: "#fff"},
            headerTitleStyle: {color: "black"},
            headerTintColor: "black",
            headerLeft: () => (
                <View style = {{marginLeft:20}}>
                 
                  
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                    <Avatar
                     rounded 
                     source = {{
                         uri: "https://cdn.iconscout.com/icon/free/png-256/logout-2477642-2061904.png"
                         }}
                         />
                        </TouchableOpacity>   
                </View>
            ),

            headerRight: () => (
                <View 
                style = {{
                    flexDirection:"row",
                    justifyContent: "space-between",
                    width:80,
                    marginRight:20,

                }}
                >
                
                  
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                   <AntDesign name = "apple1" size = {24} color="black"/>
                        </TouchableOpacity>   

                        <TouchableOpacity onPress={() => navigation.navigate('AddChat')} activeOpacity={0.5}>
                   <AntDesign name = "adduser" size = {24} color="black"/>
                        </TouchableOpacity>   
                </View>
            ),



    
        });

        
    },[navigation]);


    const enterChat = (id, chatName) => {
        navigation.navigate('Chat',{
            id,
            chatName,
        })
    }




    return (

        <SafeAreaView> 
            <ScrollView style = {styles.container}>

                {chats.map(({id,data: {chatName}}) => (

                    <CustomListItem 
                    key={id} 
                    id = {id} 
                    chatName = {chatName}
                    enterChat = {enterChat}
                    />

                ))}
            


            </ScrollView>
            
        </SafeAreaView>
    )

}

export default HomeScreen;
const styles = StyleSheet.create({

container:{
    height:"100%"
}

})