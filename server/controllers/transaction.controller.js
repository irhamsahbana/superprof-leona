const fs = require("fs");
const { nanoid } = require("nanoid");
const response = require("../utils/response");

const transactions = require("../data/transactions.json");
const doctors = require("../data/users.json");
const patients = require("../data/patients.json");
const treatments = require("../data/treatments.json");

class TransactionController {
  static index(req, res) {
  }

  static create(req, res) {
    const {
      doctor_id,
      patient_id,
      invoice_number,
      date,
      total,
      status,
      payment_method,
      diagnosis,
      treatments,
    } = req.body

    const doctor = doctors.find((doctor) => doctor.id === doctor_id)
    const patient = patients.find((patient) => patient.id === patient_id)

    if (!doctor) return response(res, 404, "Doctor not found", null)
    if (!patient) return response(res, 404, "Patient not found", null)

    // checking treatments
    const treatmentsArray = treatments.map((treatment) => {
      const treatmentData = treatments.find(
        (treatmentData) => treatmentData.id === treatment.id
      )

      if (!treatmentData) return response(res, 404, "Treatment not found", null)

      return treatmentData
    })

    const transaction = {
      doctor_id: doctor_id,
      patient_id: patient_id,
      invoice_number: invoice_number,
      date: date,
      total: total,
      status: status,
      payment_method: payment_method,
      diagnosis: diagnosis,
      doctor: doctor,
      patient: patient,
    }

    transactions.push(transaction)

    fs.writeFileSync(
      "./server/data/transactions.json",
      JSON.stringify(transactions, null, 2)
    )

    response(res, 201, "Created", transaction)
  }

  static delete(req, res) {
  }
}

module.exports = TransactionController;