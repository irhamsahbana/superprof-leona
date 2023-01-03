const { nanoid } = require("nanoid");
const fs = require("fs");
const response = require("../utils/response");

const appointments = require("../data/appointments.json");
const doctors = require("../data/users.json");
const rooms = require("../data/rooms.json");
const patients = require("../data/patients.json");

class AppointmentsController {
  static index(req, res) {
    const { date } = req.query;

    if (date) {
      const filteredAppointments = appointments.filter(
        (appointment) => appointment.date === date
      );

      return response(res, 200, "OK", filteredAppointments);
    }

    response(res, 200, "OK", appointments);
  }

  static create(req, res) {
    const { date, start, end, doctor_id, room_id, patient_id, notes } = req.body;
    const id = nanoid();

    const doctor = doctors.find((doctor) => doctor.id === doctor_id);
    const room = rooms.find((room) => room.id === room_id);
    const patient = patients.find((patient) => patient.id === patient_id);

    if (!doctor) return response(res, 404, "Doctor not found", null);
    if (!room) return response(res, 404, "Room not found", null);
    if (!patient) return response(res, 404, "Patient not found", null);

    appointments.push({
      id: id,
      doctor_id: doctor_id,
      patient_id: patient_id,
      room_id: room_id,
      date: date,
      start: start,
      end: end,
      doctor: doctor,
      room: room,
      notes: notes,
      patient: patient,
    });

    fs.writeFileSync(
      "./server/data/appointments.json",
      JSON.stringify(appointments, null, 2)
    );

    response(res, 201, "Created", {
      id: id,
      doctor_id: doctor_id,
      patient_id: patient_id,
      room_id: room_id,
      doctor: doctor,
      room: room,
      patient: patient,
      date: date,
      start: start,
      end: end,
      notes: notes,
    });
  }

  static delete(req, res) {
    const { id } = req.params;

    const appointment = appointments.find(
      (appointment) => appointment.id === id
    );

    if (!appointment) return response(res, 404, "Not Found", null);

    const index = appointments.indexOf(appointment);
    appointments.splice(index, 1);

    fs.writeFileSync(
      "./server/data/appointments.json",
      JSON.stringify(appointments, null, 2)
    );

    response(res, 200, "OK", appointment);
  }

  static update(req, res) {
    const { id } = req.params;
    const { date, start, end, doctor_id, room_id, notes, patient_id } = req.body;

    const doctor = doctors.find((doctor) => doctor.id === doctor_id);
    const room = rooms.find((room) => room.id === room_id);
    const patient = patients.find((patient) => patient.id === patient_id);

    if (!doctor) return response(res, 404, "Doctor not found", null);
    if (!room) return response(res, 404, "Room not found", null);
    if (!patient) return response(res, 404, "Patient not found", null);

    const appointment = appointments.find(
      (appointment) => appointment.id === id
    );

    if (!appointment) return response(res, 404, "Not Found", null);

    appointment.doctor_id = doctor_id;
    appointment.patient_id = patient_id;
    appointment.room_id = room_id;
    appointment.doctor = doctor;
    appointment.room = room;
    appointment.patient = patient;
    appointment.date = date;
    appointment.start = start;
    appointment.end = end;
    appointment.notes = notes;

    fs.writeFileSync(
      "./server/data/appointments.json",
      JSON.stringify(appointments, null, 2)
    );

    return response(res, 200, "OK", {
      id: appointment.id,
      date: appointment.date,
      start: appointment.start,
      end: appointment.end,
      doctor: appointment.doctor,
      room: appointment.room,
      notes: appointment.notes,
      patient: appointment.patient,
    });

  }
}

module.exports = AppointmentsController;
