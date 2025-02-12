const activeChats = new Map(); 

const startChat = (req, res) => {
    const { appointmentId, patientId, doctorId } = req.body;

    if (!appointmentId || !patientId || !doctorId) {
        return res.status(400).json({ message: "Datos incompletos" });
    }

    if (activeChats.has(appointmentId)) {
        return res.status(400).json({ message: "Chat ya está activo" });
    }

    activeChats.set(appointmentId, { patientId, doctorId });

    return res.status(200).json({ message: "Chat activado" });
};

const endChat = (req, res) => {
    const { appointmentId } = req.body;

    if (activeChats.has(appointmentId)) {
        activeChats.delete(appointmentId);
        return res.status(200).json({ message: "Chat finalizado" });
    }

    return res.status(404).json({ message: "Chat no encontrado" });
};

module.exports = { startChat, endChat };
