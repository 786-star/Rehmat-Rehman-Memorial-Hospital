import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // even spacing
        width: '100%',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 8,
        height: 8,
        borderWidth: 1,
        borderColor: '#000',
        marginRight: 3,
    },
    label: {
        fontSize: 6,
    },
});

const TimingCheckboxGroup = ({ times = ['6', '10', '2', '6', '10'] }) => {
    return (
        <View style={styles.container}>
            {times.map((time, index) => (
                <View key={index} style={styles.item}>
                    <View style={styles.checkbox} />
                    <Text style={styles.label}>{time}</Text>
                </View>
            ))}
        </View>
    );
};

export default TimingCheckboxGroup;