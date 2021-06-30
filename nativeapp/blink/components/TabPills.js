import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from 'react-native';

import pillData from '../data/Pill';
import TabPillTile from './UI/TabPillTile';

const TabPills = props => {
    return (
        <View style={styles.root}>
            <FlatList 
                data={pillData}
                horizontal
                renderItem={({item, index}) => (
                    <TabPillTile 
                        title={item.title}
                    />
                )}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        marginVertical: 10,
    },
});

export default TabPills;