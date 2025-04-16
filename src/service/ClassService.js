const CLASS_URL = "http://127.0.0.1:8000/credit-class/";

const createClass = async (name) => {
  const body = { name: name };
  const response = await fetch(CLASS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(body),
  });
  return response.json();
};

const getAllClasses = async () => {
  const response = await fetch(CLASS_URL);
  return response.json();
};

const updateClass = async (id, name) => {
  const body = { name: name };
  const response = await fetch(CLASS_URL + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return response.json();
};

const deleteClass = async (id) => {
  const response = await fetch(CLASS_URL + id, {
    method: "DELETE",
  });
  console.log(response);
};

export { deleteClass, updateClass, createClass, getAllClasses };
