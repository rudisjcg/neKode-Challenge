//fundamental Programming

/*
Write a function to reverse the elements of a given array 
while keeping special characters in their original positions. 
The function should handle dynamic changes in the array and 
special character positions. For example:

Input:

['n', 2, '&', 'a', 'l', 9, '$', 'q', 47, 'i', 'a', 'j', 'b', 'z', '%', 8]


Output:

[8, 'z', '&', 'b', 'j', 'a', '$', 'i', 47, 'q', 9, 'l', 'a', 2, '%', 'n']
*/

const array = [
  "n",
  2,
  "&",
  "a",
  "l",
  9,
  "$",
  "q",
  47,
  "i",
  "a",
  "j",
  "b",
  "z",
  "%",
  8,
];

function reverseArrayWithSpecialCharacters(array) {
  const specialCharacters = [];
  for (let i = 0; i < array.length; i++) {
    if (!String(array[i]).match(/[a-zA-Z0-9]/)) {
      specialCharacters.push(i);
    }
  }

  const reversedArray = [];
  for (let i = 0; i < array.length; i++) {
    if (specialCharacters.indexOf(i) !== -1) {
      reversedArray.push(array[i]);
    } else {
      reversedArray.push(array[array.length - i - 1]);
    }
  }

  return reversedArray;
}

const reversedArray = reverseArrayWithSpecialCharacters(array);

console.log(reversedArray);
