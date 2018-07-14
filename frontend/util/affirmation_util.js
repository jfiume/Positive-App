// // Asynchronously fetch a random affirmation
export const fetchRandom = async function() {
  try {
    var response = await fetch("http://localhost:5000/affirmation/random");
    // var response = await fetch("/affirmation/random");
    const affirmation = await response.json();
    return affirmation;
  } catch (e) {
    console.log("API request raised an error:", e);
  }
};
