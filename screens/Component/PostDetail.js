import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
const PostDetail = props => {
    const id = props.route.params.id;
    const [isLoading, setLoading] = useState(false);
    const [post, setpost] = useState([]);
    const navigation = useNavigation()
    const getpost = () => {
        fetch('https://jsonplaceholder.typicode.com/posts/' + id)
          .then((response) => response.json())
          .then((json) => {
              setpost(json);
              console.log(json);
          })
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
    }
    useEffect(() => {
        console.log(id)
        setLoading(true);
        getpost();
    }, []);
    return (
        <SafeAreaView style={styles.main} >
        <View style={styles.loading}>
            {isLoading ? <Text>Loading...</Text> : 
            (
                <View style={{padding:10}}>
                    <Text style={styles.title}>{post.title}</Text>
                    <Text><Text style={styles.user}>User ID:</Text> {post.userId}</Text>
                    <Text style={styles.text}>Description</Text>
                    <Text style={styles.body}>{post.body}</Text>
                </View>
            )}
        </View>
        </SafeAreaView>
);
};
PostDetail.navigationOptions = {
    title: 'Post Details'
};
export default PostDetail;
const styles = StyleSheet.create({
    main:{
        flex:1, 
        backgroundColor:'#fff'
    },
    loading:{
        justifyContent: 'center', 
        alignItems: 'center',
    },
    title:{
        alignItems: 'center', 
        fontSize: 25, 
        color: '#000', 
        fontWeight:'bold',
        marginBottom:20 
    },
    user:{
        color: '#000', 
        marginTop:10, 
        fontWeight:'bold'
    },
    desc:{
        color: '#000', 
        marginTop:10, 
        fontWeight:'bold'
    },
    body:{
        color: '#000', 
        marginTop:0
    }


});