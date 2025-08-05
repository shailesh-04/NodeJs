// == Challenge 1: Reverse a String
// Problem:
// Write a function that takes a string as input and returns the reversed version of the string.

// Example:
// reverseString("hello") // "olleh"
function reverseString(str: string) {
    return str.split("").reverse().join("");
}
// == Challenge 2: Check for Palindrome
// Problem:
// Write a function that checks if a given string is a palindrome (a word that reads the same backward as forward).

// Example:
// isPalindrome("madam") // true
// isPalindrome("hello") // false

function isPalindrome(str: string) {
    return (str == str.split("").reverse().join("") ? "isPalidrom" : "notPlindrom");
}
// == Challenge 3: Find the Largest Number in an Array
// Problem:
// Write a function that takes an array of numbers and returns the largest number in it.

// Example:
// findLargest([4, 9, 1, 32, 7]) // 32

function findLargest(array: number[]) {
    return array.sort((a, b) => b - a)[0];
}

// Challenge 4: Count Vowels in a String
// Problem:
// Write a function that counts the number of vowels (a, e, i, o, u) in a given string.

// Example:
// countVowels("hello") // 2
// countVowels("typescript") // 2

function countVowels(str: string): number {
    const vowels = str.split("").reduce((prev, cur) => {
        if (
            cur.toLocaleLowerCase() == 'a' ||
            cur.toLocaleLowerCase() == 'i' ||
            cur.toLocaleLowerCase() == 'o' ||
            cur.toLocaleLowerCase() == 'u' ||
            cur.toLocaleLowerCase() == 'e'
        )
            prev += 1;
        return prev;
    }, 0);

    return vowels;
}

// Challenge 5: Sum of Digits in a Number
// Problem:
// Write a function that takes a number and returns the sum of its digits.

// Example:
// sumDigits(1234) // 10  → (1 + 2 + 3 + 4)
// sumDigits(2024) // 8   → (2 + 0 + 2 + 4)

function sumDigits(num:number):number{
    return num.toString().split("").reduce((prev,cur)=>{
        return prev+Number(cur);
    },0);

}
// Challenge 6: Remove Duplicates from an Array
// Problem:
// Write a function that takes an array and returns a new array with duplicates removed.

// Example:
// removeDuplicates([1, 2, 2, 3, 4, 4, 5]) // [1, 2, 3, 4, 5]


function removeDuplicates(array:number[]):number[]{
    const data:number[] = [];
    array.forEach((el)=>{
        data.find(_t=>_t===el)?'':data.push(el);
    });
    return data;
}
console.log(removeDuplicates([1,2,4,5,123,5,6,7,6,7,4,3,2,1]))
