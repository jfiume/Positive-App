// // Asynchronously fetch a random affirmation
export const fetchRandom = async function() {
  try {
    const response = await fetch("http://localhost:5000/affirmation/random");
    const affirmation = await response.json();
    return affirmation;
  } catch (e) {
    console.error("API request raised an error:", e);
  }
};
