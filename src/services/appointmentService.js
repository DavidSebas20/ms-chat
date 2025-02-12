const axios = require("axios");

const getAppointment = async (appointmentId) => {
    try {
        const response = await axios.get(`${process.env.APPOINTMENT_SERVICE_URL}/appointments/${appointmentId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching appointment:", error.message);
        return null;
    }
};

module.exports = { getAppointment };
