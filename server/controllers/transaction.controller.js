const fs = require("fs");
const { nanoid } = require("nanoid");
const _ = require("lodash");
const response = require("../utils/response");

const transactions = require("../data/transactions.json");
const doctors = require("../data/users.json");
const patients = require("../data/patients.json");
const treatments = require("../data/treatments.json");

class TransactionController {
  static index(req, res) {
    return response(res, 200, "Success", transactions);
  }

  static create(req, res) {
    const {
      doctor_id,
      patient_id,
      invoice_number,
      date,
      status,
      payment_method,
      diagnosis,
    } = req.body

    let { treatments: treatmentsReq } = req.body

    const doctor = _.find(doctors, { id: doctor_id })
    const patient = _.find(patients, { id: patient_id })

    if (!doctor) return response(res, 404, "Doctor not found", null)
    if (!patient) return response(res, 404, "Patient not found", null)

    const list = _.map(treatments, (el) => el.list)
    const listTreatments = _.flattenDeep(list)

    treatmentsReq = _.map(treatmentsReq, (treatment, index) => {
      const treatmentData = _.find(listTreatments, { id: treatment.id })

      if (!treatmentData) return response(res, 404, "Treatment not found on index " + index, null)

      return {
        id: treatment.id,
        name: treatmentData.name,
        price: treatmentData.price,
        quantity: treatment.quantity,
        discount: treatment.discount,
        unit: "percent",
        total: (treatmentData.price * treatment.quantity * (100 - treatment.discount)) / 100,
      }
    })

    const total = _.sumBy(treatmentsReq, "total")

    const transaction = {
      id: nanoid(),
      doctor_id: doctor_id,
      patient_id: patient_id,
      invoice_number: invoice_number,
      doctor: doctor,
      patient: patient,
      treatments: treatmentsReq,
      date: date,
      total: total,
      status: status,
      payment_method: payment_method,
      diagnosis: diagnosis,
    }

    transactions.push(transaction)

    fs.writeFileSync(
      "./server/data/transactions.json",
      JSON.stringify(transactions, null, 2)
    )

    return response(res, 201, "Created", transaction)
  }

  static delete(req, res) {
    const { id } = req.params

    const transaction = _.find(transactions, { id: id })

    if (!transaction) return response(res, 404, "Transaction not found", null)

    _.remove(transactions, { id: id })

    fs.writeFileSync(
      "./server/data/transactions.json",
      JSON.stringify(transactions, null, 2)
    )

    response(res, 200, "Deleted", transaction)
  }
}

module.exports = TransactionController;