const FACENET_VALIDATE_URL = "http://127.0.0.1:8000/facenet/validate";
const FACENET_EMBEDDING_URL = "http://127.0.0.1:8000/facenet/embedding";
const FACENET_RECOGNITION_URL = "http://127.0.0.1:8000/facenet/name";

const validateFacenetImage = async (image_id) => {
  const response = await fetch(FACENET_VALIDATE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image_id: image_id }),
  });
  return response.json();
};

const createFacenetEmbedding = async (image_id, user_id) => {
  const data = await validateFacenetImage(image_id);
  if (data.detail.code == 200) {
    const response = await fetch(FACENET_EMBEDDING_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: { image_id: image_id },
        user_id: user_id,
      }),
    });
    return response.json();
  }
};

const recognizeByFacenet = async (id) => {
  const response = await fetch(FACENET_RECOGNITION_URL + "?image_id=" + id);
  return response.json();
};

export { validateFacenetImage, recognizeByFacenet, createFacenetEmbedding };
