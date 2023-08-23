import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
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
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}} >
        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            {isLoading ? <Text>Loading...</Text> : 
            (
                <View style={{padding:10}}>
                    <Text style={{ alignItems: 'center', fontSize: 25, color: '#000', fontWeight:'bold',marginBottom:20 }}>{post.title}</Text>
                    <Text><Text style={{color: '#000', marginTop:10, fontWeight:'bold'}}>User ID:</Text> {post.userId}</Text>
                    <Text style={{color: '#000', marginTop:10, fontWeight:'bold'}}>Description</Text>
                    <Text style={{color: '#000', marginTop:0}}>{post.body}</Text>
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