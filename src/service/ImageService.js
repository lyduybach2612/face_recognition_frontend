const URL = "http://127.0.0.1:8000/image/";

/**
 * Convert base64 string to file object
 * @param {string} base64String - Base64 encoded image string (with data URL prefix)
 * @param {string} fileName - Name of the file to create
 * @returns {File} - File object
 */
const base64ToFile = (base64String, fileName = "captured_image.png") => {
  // Remove the data URL prefix (e.g., "data:image/png;base64,")
  const base64Data = base64String.split(",")[1] || base64String;

  // Convert base64 to binary
  const binaryString = atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Create a Blob from the binary data
  const blob = new Blob([bytes], { type: "image/png" });

  // Create a File from the Blob
  return new File([blob], fileName, { type: "image/png" });
};

const uploadImage = async (imageSrc) => {
  try {
    const formData = new FormData();
    formData.append("file", base64ToFile(imageSrc));
    const response = await fetch(URL, {
      method: "POST",
      body: formData,
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};

export { uploadImage };
