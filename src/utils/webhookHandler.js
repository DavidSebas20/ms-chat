const { getAppointment } = require("../services/appointmentService");

module.exports = (io) => async (req, res) => {
    const { appointmentId } = req.body;

    if (!appointmentId) {
        return res.status(400).json({ message: "appointmentId requerido" });
    }

    const appointment = await getAppointment(appointmentId);

    if (!appointment) {
        return res.status(404).json({ message: "Cita no encontrada" });
    }

    if (appointment.status !== "CONFIRMED") {
        return res.status(400).json({ message: "Cita no está confirmada" });
    }

    io.emit(`chat_start_${appointmentId}`, {
        appointmentId,
        patientId: appointment.patientId,
        doctorId: appointment.doctorId,
    });

    return res.status(200).json({ message: "Chat iniciado", appointment });
};
