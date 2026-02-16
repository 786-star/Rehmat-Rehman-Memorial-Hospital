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

  sectionTitle: { fontSize: 10, marginBottom: 4, fontWeight: "bold" },

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
  <View style={styles.tableRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>
      {value === undefined || value === null || value === ""
        ? "-"
        : String(value)}
    </Text>
  </View>
);

const PatientPDF = ({ data = {} }) => {
  const diseases = data.diseases || {};

  const medicalFlags = {
    DM: data.dm ?? diseases.dm ?? false,
    HTN: data.htn ?? diseases.htn ?? false,
    IHD: data.ihd ?? diseases.ihd ?? false,
    Asthma: data.asthma ?? diseases.asthma ?? false,
  };

  const indoorFields = [
    data.operation,
    data.admitDate,
    data.operationDate,
    data.dischargeDate,
  ];

  const hasIndoorData = indoorFields.some(
    (field) => field !== undefined && field !== null && field !== ""
  );

  const basicInfo = [
    { label: "Name", value: data.firstName },
    { label: "Father/Husband Name", value: data.lastName },
    { label: "Gender", value: data.gender },
    { label: "Age", value: data.age },
    { label: "Marital Status", value: data.maritalStatus },
  ];

  const contactInfo = [
    { label: "CNIC", value: data.CNIC },
    { label: "Phone", value: data.phone },
    { label: "Patient Type", value: data.patientType },
  ];

  const medicalInfo = [
    { label: "Temperature (°C)", value: data.temperature },
    { label: "Blood Pressure", value: data.bloodPressure },
    { label: "SpO₂", value: data.spo2 },
    { label: "Pulse Rate", value: data.pulseRate },
    { label: "Allergy", value: data.allergy },
    { label: "Other Disease", value: data.otherDisease },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.heading}>Patient Registration Form</Text>
        </View>

        {/* Basic + Contact */}
        <View style={styles.twoColumnRow}>
          <View style={styles.colLeft}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            {basicInfo.map((item, index) => (
              <RenderRow key={index} {...item} />
            ))}
          </View>

          <View style={styles.colRight}>
            <Text style={styles.sectionTitle}>
              Identification & Contact
            </Text>
            {contactInfo.map((item, index) => (
              <RenderRow key={index} {...item} />
            ))}
          </View>
        </View>

        {/* Medical + Indoor */}
        <View style={styles.twoColumnRow}>
          <View style={styles.colLeft}>
            <Text style={styles.sectionTitle}>Medical Information</Text>

            {medicalInfo.map((item, index) => (
              <RenderRow key={index} {...item} />
            ))}

            {Object.entries(medicalFlags).map(([key, value], index) => (
              <RenderRow
                key={index}
                label={key}
                value={value ? "Yes" : "No"}
              />
            ))}
          </View>

          {data.patientType === "Indoor Patient" && hasIndoorData && (
            <View style={styles.colRight}>
              <View>
                <Text style={styles.sectionTitle}>
                  Indoor Patient Details
                </Text>

                {data.operation && (
                  <RenderRow label="Operation" value={data.operation} />
                )}
                {data.admitDate && (
                  <RenderRow
                    label="Date of Admission"
                    value={data.admitDate}
                  />
                )}
                {data.operationDate && (
                  <RenderRow
                    label="Date of Operation"
                    value={data.operationDate}
                  />
                )}
                {data.dischargeDate && (
                  <RenderRow
                    label="Date of Discharge"
                    value={data.dischargeDate}
                  />
                )}

                {/* Notes */}
                <Text style={styles.notesLabel}>Operation Notes</Text>
                <View style={styles.notesBox}>
                  <Text style={styles.notesText}>
                    ____________________________________
                    ____________________________________
                    ____________________________________
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
        {/* Treatment Table */}
        <View>
          <TreatmentTable />
        </View>
        {/* Footer */}
        <Text style={styles.footer}>
          This is a system-generated patient record. Confidential and for hospital use only.
        </Text>
      </Page>
    </Document>
  );
};

export default PatientPDF;