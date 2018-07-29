// // Asynchronously fetch a random affirmation
export const fetchAllAffirmations = async function() {
  try {
    // const response = await fetch("http://localhost:5000/api/affirmation/");
    const response = await fetch("https://positive-app-backend.herokuapp.com/api/affirmation");
    const affirmations = await response.json();
    return affirmations;
  } catch (e) {
    console.log("API request raised an error:", e);
  }
};
