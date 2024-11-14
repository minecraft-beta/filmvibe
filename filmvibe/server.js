const express = require('express');
const app = express();
const PORT = 6969;
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Set the destination folder for uploads
    },
    filename: (req, file, cb) => {
        // Use the original file name (with its extension)
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

let movieName;
let movieImage;
let movieDescription;
const filePath = './db.txt';

//middlewares
app.use(cors());
app.use(express.json());

// DB search function
function checkTextInFile(filePath, searchText) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return fileContent.includes(searchText);
}

app.post('/dataReceiver', upload.single('image'), (req,res) => {
    movieName = req.body.movieName;
    movieImage = req.file.originalname;
    movieDescription = req.body.movieDescription;


    //needs to be added in divContent var
    console.log(movieImage);

    // checks if movieName exists in DB
    const searchText = movieName;
    console.log(`received data: ${movieName}`);

if (checkTextInFile(filePath, searchText)) {
   console.log('text found in DB');
   res.send('exists');
} else {

    /* main bakchodi if movieName is new */

    console.log('text not found');
    res.send('done');

    //adding movieName to db
   fs.appendFile('./db.txt', `\n${movieName}`, (err) => {
        if (err) {
            console.error("Error adding to db:", err);
        } else {
            console.log("added text to DB");
        }
    });

 //create directory
 fs.mkdir(movieName.toLowerCase(), (err) => {
    if (err) {
      console.error('Error creating directory:', err);
    } else {
      console.log('Directory created successfully');
    }
  });
  

// Read the file content and adding div
fs.readFile('index.html', 'utf8', (err, data) => {
  if (err) throw err;

  const divContent = `
  <div id="${movieName}" class="divs">
   <img class="imgs" src="uploads/${movieImage}"/>
    <h2 class="hd1">${movieName}</h2>
    <p class="p1">${movieDescription}</p>
    <button class="btn" onclick="window.location.href='${movieName.toLowerCase()}/'">Download</button>
  </div>
  `;
  const updatedData = data.replace('<script src', `${divContent}\n<script src`);

  fs.writeFile('index.html', updatedData, 'utf8', (err) => {
    if (err) throw err;
    console.log('Div added inside the body!');
  });
});

}

// this needs to be added in divContent var
console.log(movieDescription);

});



app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
})
