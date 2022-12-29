const { nanoid } = require("nanoid");
const fs = require("fs");
const appointments = require("../data/appointments.json");
const response = require("../utils/response");

class AppointmentsController {
  static index(req, res) {
    response(res, 200, "OK", appointments);
  }

  static create(req, res) {
    let { date, start, end, doctor, room, patient, notes } = req.body;
    const id = nanoid();

    appointments.push({
      date,
      start,
      end,
      doctor,
      room,
      notes,
      patient,
    });

    fs.writeFileSync(
      "./server/data/appointments.json",
      JSON.stringify(appointments, null, 2)
    );

    response(res, 201, "Created", {
      id,
      date,
      start,
      end,
      doctor,
      room,
      notes,
      patient,
    });
  }

  static delete(req, res) {
    const { id } = req.params;

    const appointment = appointments.find(
      (appointment) => appointment.id === id
    );
    if (appointment) {
      const index = appointments.indexOf(appointment);
      appointments.splice(index, 1);

      fs.writeFileSync(
        "./server/data/appointments.json",
        JSON.stringify(appointments, null, 2)
      );

      response(res, 200, "OK", {
        id: appointment.id,
        date: appointment.date,
        start: appointment.start,
        end: appointment.end,
        doctor: appointment.doctor,
        room: appointment.room,
        notes: appointment.notes,
        patient: appointment.patient,
      });
    } else {
      response(res, 404, "Not Found", {
        error: "User not found",
      });
    }
  }

  static update(req, res) {
    const { id } = req.params;
    const { date, start, end, doctor, room, notes, patient } = req.body;

    const appointment = appointments.find(
      (appointment) => appointment.id === id
    );

    if (appointment) {
      appointment.date = date;
      appointment.start = start;
      appointment.end = end;
      appointment.doctor = doctor;
      appointment.room = room;
      appointment.notes = notes;
      appointment.patient = patient;

      fs.writeFileSync(
        "./server/data/appointments.json",
        JSON.stringify(appointments, null, 2)
      );

      response(res, 200, "OK", {
        id: appointment.id,
        date: appointment.date,
        start: appointment.start,
        end: appointment.end,
        doctor: appointment.doctor,
        room: appointment.room,
        notes: appointment.notes,
        patient: appointment.patient,
      });
    } else {
      response(res, 404, "Not Found", {
        error: "User not found",
      });
    }
  }
}

module.exports = AppointmentsController;
