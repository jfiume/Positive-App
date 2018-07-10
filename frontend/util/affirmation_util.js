// // Asynchronously fetch a random affirmation
export const fetchRandom = async function() {
  try {
    if (__DEV__) {
      var response = await fetch("http://localhost:5000/affirmation/random");
    } else {
      var response = await fetch("/affirmation/random");
    }
    const affirmation = await response.json();
    return affirmation;
  } catch (e) {
    console.error("API request raised an error:", e);
  }
};
