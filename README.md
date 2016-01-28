# line-reader

On npm [here](https://www.npmjs.com/package/@klortho/line-reader).

A very simple Node.js module that reads a file line-by-line, and returns
a Promise. The constructor takes a callback function that's called once
for each line. The returned Promise resolves when the reading is done.

Example:

```javascript
var emails = [];
lineReader('email-list.txt', function(line) {
  emails.push(line);
})
.then(
  function() {
    // do something with emails
  },
  function(err) {
    // uh-oh
  }
)
```
