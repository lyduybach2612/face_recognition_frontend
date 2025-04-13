const ARCFACE_VALIDATE_URL = "http://127.0.0.1:8000/arcface/validate";
const ARCFACE_EMBEDDINGS_URL = "http://127.0.0.1:8000/arcface/embedding";
const ARCFACE_RECOGNITION_URL = "http://127.0.0.1:8000/arcface/name";

const validateArcfaceImage = async (image_id) => {
  const response = await fetch(ARCFACE_VALIDATE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image_id: image_id }),
  });
  return response.json();
};

const createArcfaceEmbedding = async (image_id, user_id) => {
  const data = await validateArcfaceImage(image_id);
  if (data.detail.code == 200) {
    const response = await fetch(ARCFACE_EMBEDDINGS_URL, {
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

const recognizeByArcface = async (id) => {
  const response = await fetch(ARCFACE_RECOGNITION_URL + "?image_id=" + id);
  return response.json();
};

export { recognizeByArcface, createArcfaceEmbedding };
