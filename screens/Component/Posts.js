import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
const Posts = props => {
    const [isLoading, setLoading] = useState(false);
    const [posts, setposts] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const navigation = useNavigation()

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getposts()
    }, []);

    const getposts = () => {
        // fetch('https://jsonplaceholder.typicode.com/posts/')
        fetch('https://jsonplaceholder.typicode.com/posts ')
            .then((response) => response.json())
            .then((json) => setposts(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
        setTimeout(setRefreshing, 2000)
    }
    useEffect(() => {
        setLoading(true);
        getposts();
    }, []);

    const handleClick = (item) => {
        navigation.navigate("PostDetail", {id: item.id})
    }

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff' }}>
        <View style={{ padding: 20,}}>
            
            <TouchableOpacity  onPress={onRefresh} style={{ flexDirection:'row',alignContent:'flex-end', alignSelf:'flex-end'}}>
                <Icon name='refresh' color={"#F8E480"} size={20} style={{backgroundColor:'#0D094E', borderRadius:20, height:40, width:40,padding:10}} />
            </TouchableOpacity>
            {isLoading ? <Text>Loading...</Text> :
                (
                    <FlatList
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        data={posts}
                        keyExtractor={({ id }) => id.toString()}
                        renderItem={({ item }) =>
                            <>
                                <TouchableOpacity onPress={()=>handleClick(item)} style={{ backgroundColor: '#eee', borderRadius: 10, margin: 5, borderColor:'#0D094E', borderWidth:1, borderStyle:'solid' }}>
                                    <Text style={{ padding: 10, fontSize: 20, fontWeight: 'bold', color: '#000' }}>{item.title}
                                    </Text>
                                    <Text style={{ padding: 10, color: '#000' }}>{item.body}
                                    </Text>
                                </TouchableOpacity>
                            </>
                        }
                    />
                )}
        </View>
        </SafeAreaView>
    );
};
export default Posts;