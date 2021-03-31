# HotPress 🔥 - Hot Reloading for ExpressJs
## Philosophy
- Why should you restart a http server just for a small change in your source code. isn't HTTP meant to be stateless.
- Aren't you meant to have a static fetch-once properties for development.

If you agree with those philosophies, then you'll love HotPress. 

What HotPress does is that it only initializes the server and required parameters once and pass it to your virtual server (Router).

## Usage
```shell
npm install @soniccodes/hotpress
```

#### ./foo.js - The reloadable file
```js
/**
  @param server : Router
**/
function reload(server) {
   server.get("/hi",function(req, res){
       res.send("hi")
   })
   //Anything you'd do with a normal server.  
}
modules.export = reload //This is very important
```

#### server.js 
```js
const express = require("express")
const {setup,reload} = require("@soniccodes/hotpress")
const app = express()
setup({server:app,reloadable:"./foo.js"})
app.listen(port,(err)=>{
   if(err) throw err;
   console.log("⚡ Ready on http://localhost:"+port);
})
```

## Here's what you should expect.
### Before
![Screen Shot 2021-03-31 at 6 41 06 AM](https://user-images.githubusercontent.com/48802163/113087341-17a60e00-91ec-11eb-8d6e-4aab02c5a73c.png)

### After
![Screen Shot 2021-03-31 at 6 43 20 AM](https://user-images.githubusercontent.com/48802163/113087495-66ec3e80-91ec-11eb-9329-b5de4916a8d4.png)

## License
```
Copyright 2021 Rami Mohammed

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

