export const moveIndex = (arr: any[], oldIndex: number, newIndex: number) => {
  // Account for negative indices
  while (oldIndex < 0) {
    oldIndex += arr.length;
  }
  // Account for negative indices
  while (newIndex < 0) {
    newIndex += arr.length;
  }
  // Pad the array with undefined until the array is big enough for the new index
  if (newIndex >= arr.length) {
    let k = newIndex - arr.length;
    while (k-- + 1) {
      arr.push(undefined);
    }
  }
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  return arr;
}

export default moveIndex;
