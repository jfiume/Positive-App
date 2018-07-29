// // Asynchronously fetch a random affirmation
export const fetchAllAffirmations = async function() {
  try {
    var response = await fetch("http://localhost:5000/api/affirmation/");
    // var response = await fetch("/api/affirmation");
    const affirmations = await response.json();
    return affirmations;
  } catch (e) {
    console.log("API request raised an error:", e);
  }
};
