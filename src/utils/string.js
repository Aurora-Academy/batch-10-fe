export const shortenString = (str) => {
  if (str.length <= 9) return str; // Return the string as is if it's too short to shorten
  return `${str.slice(0, 5)}...${str.slice(-4)}`;
};
