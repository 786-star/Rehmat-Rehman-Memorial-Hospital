import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import TreatmentTable from "./TreatmentTable";

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 11, fontFamily: "Helvetica" },

  header: { textAlign: "center", marginBottom: 10 },
  heading: { fontSize: 18, fontWeight: "bold", marginBottom: 4, color: "red" },

  twoColumnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  colLeft: { width: "49%", borderWidth: 1, borderColor: "#000", padding: 4 },
  colRight: { width: "49%", borderWidth: 1, borderColor: "#000", padding: 4 },

  sectionTitle: { fontSize: 10, marginBottom: 2, fontWeight: "bold" },

  tableRow: { flexDirection: "row", alignItems: "center" },
  label: {
    width: "50%",
    backgroundColor: "#f2f2f2",
    borderRightWidth: 1,
    borderRightColor: "#000",
    padding: 3,
    fontWeight: "bold",
    fontSize: 8,
  },
  value: {
    width: "50%",
    padding: 6,
  },

  fullSection: { borderWidth: 1, borderColor: "#000", padding: 6, marginBottom: 12 },

  footer: {
    position: "absolute",
    bottom: 20,
    left: 24,
    right: 24,
    fontSize: 9,
    textAlign: "center",
    color: "gray",
  },

  notesLabel: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 8,
  },

  notesBox: {
    padding: 2,
    minHeight: 3,
  },

  notesText: {
    lineHeight: 2,
  },
});

const RenderRow = ({ label, value }) => (
  <View style={styles.tableRow} key={label}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value === undefined || value === null ? "-" : String(value)}</Text>
  </View>
);

const PatientPDF = ({ data = {} }) => {
  const diseases = data.diseases || {};
  const dm = data.dm ?? diseases.dm ?? false;
  const htn = data.htn ?? diseases.htn ?? false;
  const ihd = data.ihd ?? diseases.ihd ?? false;
  const asthma = data.asthma ?? diseases.asthma ?? false;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.heading}>Patient Registration Form</Text>
        </View>

        {/* First row: two columns (Basic + Identification) */}
        <View style={styles.twoColumnRow}>
          <View style={styles.colLeft}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            {RenderRow({ label: "Name", value: `${data.firstName || "-"}` })}
            {RenderRow({ label: "Father/Husband Name", value: data.lastName || "-" })}
            {RenderRow({ label: "Gender", value: data.gender })}
            {RenderRow({ label: "Age", value: data.age })}
            {RenderRow({ label: "Marital Status", value: data.maritalStatus })}
          </View>

          <View style={styles.colRight}>
            <Text style={styles.sectionTitle}>Identification & Contact</Text>
            {RenderRow({ label: "CNIC", value: data.CNIC })}
            {RenderRow({ label: "Phone", value: data.phone })}
            {RenderRow({ label: "Patient Type", value: data.patientType })}
          </View>
        </View>

        {/* Second row: Medical Information (full width) */}
        <View style={styles.twoColumnRow}>
          <View style={styles.colLeft}>
            <Text style={styles.sectionTitle}>Medical Information</Text>
            {RenderRow({ label: "Temperature (°C)", value: data.temperature })}
            {RenderRow({ label: "Blood Pressure", value: data.bloodPressure })}
            {RenderRow({ label: "SpO₂", value: data.spo2 })}
            {RenderRow({ label: "Pulse Rate", value: data.pulseRate })}
            {RenderRow({ label: "Allergy", value: data.allergy })}
            {RenderRow({ label: "Other Disease", value: data.otherDisease })}
            {RenderRow({ label: "DM", value: dm ? "Yes" : "No" })}
            {RenderRow({ label: "HTN", value: htn ? "Yes" : "No" })}
            {RenderRow({ label: "IHD", value: ihd ? "Yes" : "No" })}
            {RenderRow({ label: "Asthma", value: asthma ? "Yes" : "No" })}
          </View>
          <View style={styles.colRight}>
            {data.patientType === "Indoor Patient" && (
              <View>
                <Text style={styles.sectionTitle}>Indoor Patient Details</Text>
                {RenderRow({ label: "Operation", value: data.operation })}
                {RenderRow({ label: "Date of Admission", value: data.admitDate })}
                {RenderRow({ label: "Date of Operation", value: data.operationDate })}
                {RenderRow({ label: "Date of Discharge", value: data.dischargeDate })}

                {/* Operation Notes (Static) */}
                <Text style={styles.notesLabel}>Operation Notes</Text>

                <View style={styles.notesBox}>
                  <Text style={styles.notesText}>
                    ____________________________________
                    ____________________________________
                    ____________________________________
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
        <View>
          <TreatmentTable />
        </View>
        <Text style={styles.footer}>
          This is a system-generated patient record. Confidential and for hospital use only.
        </Text>
      </Page>
    </Document>
  );
};

export default PatientPDF;
