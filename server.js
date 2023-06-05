const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public"), { extensions: ["css"] }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'bmi.html'));
});

app.post('/', (req, res) => {
    const age =  parseFloat(req.body.age);
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);
    const bmi = weight / ((height / 100) * (height / 100));

    let response = `<head>
    
    <link rel="stylesheet" type="text/css" href="bmi.css">
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>BMI checker</title>
</head>

<body>
    <div class="header">
        <div class="wrapper">
          <form  method="post" action="/">
            <h1>BMI calculator</h1>
            <p>Insert Your Age</p>
            <input type="text" id="age" name="age" value="${age}">
            <p>Insert Weight in Kg</p>
            <input type="text" id="weight" name="weight"  value="${weight}" >
            <br>
            <p>Insert Height in cm</p>
            <input type="text" id="height" name="height"  value="${height}">
            <br>
            <button id="calc">check</button>
            <p id="result"> Your BMI RESULT is: ${bmi.toFixed(2)} </p>
            
          </form>
         
        </div>
        
    </div>
    
</body>
`;
//<h3>Your BMI is: ${bmi.toFixed(2)}</h3>
    res.send(response);
});


app.listen(3000, () => {
    console.log("Server started at port 3000");
});
