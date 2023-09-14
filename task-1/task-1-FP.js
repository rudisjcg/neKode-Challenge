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
  /*It will iterates over the array and check if the element 
  is a special character
  */
  for (let i = 0; i < array.length; i++) {
    /*with the match method If the element is a special character, the code pushes its
    index to the specialCharacter Array.
  */
    if (!String(array[i]).match(/[a-zA-Z0-9]/)) {
      /*This will stores the indexes of all special character
       */
      specialCharacters.push(i);
    }
  }

  /*Create another empty array
   */

  const reversedArray = [];
  /*It will iterates over the array and checks if the current
  element is in the specialCharacter Array.
  If it's not then we push that value into our new array.
    OtherWise, the code pushes the element at the end of the array,
    in reverse order.  
  */
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
