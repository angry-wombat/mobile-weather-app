import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTable } from "react-table";

export default function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  // // Render the UI for your table
  return (
    <ScrollView horizontal>
      <View {...getTableProps()} style={styles.table}>
        {/* <View> */}
        {headerGroups.map((headerGroup) => (
          <View {...headerGroup.getHeaderGroupProps()} style={styles.headerRow}>
            {headerGroup.headers.map((column) => (
              <View {...column.getHeaderProps()} style={styles.headerCell}>
                <Text>{column.render("Header")}</Text>
              </View>
            ))}
          </View>
        ))}
        {/* </View> */}
        <View {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <View {...row.getRowProps()} style={styles.row}>
                {row.cells.map((cell) => {
                  return (
                    <View {...cell.getCellProps()} style={styles.cell}>
                      <Text>{cell.render("Cell")}</Text>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  table: { width: "100%", padding: 16, backgroundColor: "#f8f8f8" },
  headerRow: { flexDirection: "row", backgroundColor: "#ddd", padding: 8 },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "left",
    width: "4rem",
  },
  row: { flexDirection: "row", paddingVertical: 8, backgroundColor: "ff0000" },
  cell: {
    flex: 1,
    textAlign: "left",
    width: "4rem",
    backgroundColor: "ff0000",
  },
});
