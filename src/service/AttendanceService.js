const ATTENDANCE_URL = "http://127.0.0.1:8000/attendances/";
const EXPORT_URL = "http://127.0.0.1:8000/attendances/attendance/export";

export const attendence = async (class_id, user_id) => {
  const data = {
    user_id: user_id,
    class_id: class_id,
  };

  try {
    const response = await fetch(ATTENDANCE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getAllAttendences = async () => {
  try {
    const response = await fetch(ATTENDANCE_URL);
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const exportExcel = async (data) => {
  try {
    const response = await fetch(EXPORT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const blob = await response.blob();
    return blob;
  } catch (error) {
    throw error;
  }
};
