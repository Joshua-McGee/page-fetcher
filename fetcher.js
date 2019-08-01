/* take a URL as a command-line argument as well as a local file path and
download the resource to the specified path.

It should print this in the end:
> node fetcher.js http://www.example.com/ ./index.html
Downloaded and saved 3261 bytes to ./index.html

- Use the request library to make the HTTP request - DONE DONE DONE
- Use Node's fs module to write the file
- Use the callback based approach we've been learning so far
- Do not use the pipe function
- Do not use synchronous functions (see warning below)
*/

// we need to be able to type the request to the console then write to a local file path
const fs = require('fs');
const request = require('request');

let arr = process.argv.slice(2)
const url = arr[0];
const filename = arr[1];

console.log(url);
let data = 'input';

const fetcher = function(url) {
  request(url + filename, (error, response, body) => {
    
    //console.log('error:', error); // Print the error if one occurred
    //console.log('statusCode:', response && response.statusCode);
    //console.log('body:', body); // Print the HTML for the example.com
    console.log(`downloaded and saved ${body.length} bytes to temp.txt`)
    data = body; // sets our global data varable to be equal to the body that we recieved.

    fileWrite(); // callback
  })
}

// this writes the variable data's contents which we want to be
const fileWrite = function() {
  fs.writeFile("temp.txt", data, (err) => { 
  if (err) console.log(err);
  console.log("Successfully Written to File.");
});
}

fetcher(url);

