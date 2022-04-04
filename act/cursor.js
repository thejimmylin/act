const cursor = {
  value: 0,
};
const getAndIncrementCursor = () => {
  const value = cursor.value;
  cursor.value += 1;
  return value;
};
const resetCursor = () => {
  cursor.value = 0;
};
export { getAndIncrementCursor, resetCursor };
