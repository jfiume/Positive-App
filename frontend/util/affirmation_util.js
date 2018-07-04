// // Asynchronously fetch a random affirmation
export const fetchRandom = async function() {
  try {
    const response = await fetch("/affirmation/random");
    const affirmation = await response.json();
    console.log("affirmation:" + affirmation);
    return affirmation;
  } catch (e) {
    console.error("API request raised an error:", e);
  }
};
