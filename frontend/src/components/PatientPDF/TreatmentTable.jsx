import { View, Text, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    tableContainer: {
        borderWidth: 1,
        borderColor: '#000',
        marginTop: 10,
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#e6e6e6',
        borderBottomWidth: 1,
        borderColor: '#000',
    },
    headerCell: {
        borderRightWidth: 1,
        borderColor: '#000',
        padding: 4,
        fontSize: 6,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    leftHeaderCell: {
        backgroundColor: '#333',
        color: 'white',
        textAlign: 'center',
        writingMode: 'vertical-rl',
        paddingVertical: 12,
        fontSize: 10,
    },
    row: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#000',
    },
    cell: {
        borderRightWidth: 1,
        borderColor: '#000',
        padding: 4,
        fontSize: 6,
        textAlign: 'center',
    },
});

const TreatmentTable = () => {
    const columns = ['Sr. No', 'Medicine &', 'Dose', 'Route', 'Frequency', 'Timing', 'Duration'];
    const rows = Array(10).fill(null);

    return (
        <View style={styles.tableContainer}>
            {/* Left vertical label */}
            <View style={{ flexDirection: 'row' }}>

                <View style={{ flex: 1 }}>
                    <View style={styles.headerRow}>
                        {columns.map((col, i) => (
                            <Text
                                key={i}
                                style={[
                                    styles.headerCell,
                                    { flex: i === 1 ? 2 : 1 },
                                ]}
                            >
                                {col}
                            </Text>
                        ))}
                    </View>

                    {rows.map((_, rowIndex) => (
                        <View key={rowIndex} style={styles.row}>
                            <Text style={[styles.cell, { flex: 1 }]}>{rowIndex + 1}</Text>
                            <Text style={[styles.cell, { flex: 2 }]}></Text>
                            <Text style={[styles.cell, { flex: 1 }]}></Text>
                            <Text style={[styles.cell, { flex: 1 }]}></Text>
                            <Text style={[styles.cell, { flex: 1 }]}></Text>
                            <Text
                                style={[
                                    styles.cell,
                                    { flex: 1 },
                                ]}
                            >
                                Before or after meal
                            </Text>
                            <Text style={[styles.cell, { flex: 1 }]}></Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};

export default TreatmentTable;
