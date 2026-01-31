const path = require('path');

// Parse a file path
const pathInfo = path.parse('/users/docs/file.txt');
console.log(pathInfo);
/* Output on Unix/macOS:
{
  root: '/',
  dir: '/users/docs',
  base: 'file.txt',
  ext: '.txt',
  name: 'file'
}
*/

// Accessing parsed components
console.log('Directory:', pathInfo.dir); // /users/docs
console.log('Filename:', pathInfo.base); // file.txt
console.log('Name only:', pathInfo.name); // file
console.log('Extension:', pathInfo.ext); // .txt


// Method 1: Using dir and base
const pathString1 = path.format({
dir: '/users/docs',
base: 'file.txt'
});
console.log(pathString1); // '/users/docs/file.txt'

// Method 2: Using root, dir, name, and ext
const pathString2 = path.format({
root: '/',
dir: '/users/docs',
name: 'file',
ext: '.txt'
});
console.log(pathString2); // '/users/docs/file.txt'

// Practical example: Modify and reconstruct a path
const parsedPath = path.parse('/users/docs/old-file.txt');
parsedPath.base = 'new-file.md';
const newPath = path.format(parsedPath);
console.log(newPath); // '/users/docs/new-file.md'