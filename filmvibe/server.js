const express = require('express');
const app = express();
const PORT = 6969;
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Set the destination folder for uploads
    }
});

const upload = multer({storage: storage});
const filePath = './db.txt';

const psswd = 'psswd69';

//middlewares
app.use(cors());
app.use(express.json());

// DB search function
function checkTextInFile(filePath, searchText) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return fileContent.includes(searchText);
}

//img extension changer
function imgExt(path1, path2) {
fs.rename(path1, path2, (err) => {
  if (err) {
      console.error("Error ext img", err);
  } else {
      console.log("done ext img");
  }
});
}

app.use(express.static(path.join(__dirname, 'admin')));

//dirReceiver post with 6 var
app.post('/dataReceiver', upload.fields([
  {name: 'movieImage', maxCount: 1},
  {name: 'image1', maxCount: 1},
  {name: 'image2', maxCount: 1},
  {name: 'image3', maxCount: 1},
  {name: 'image4', maxCount: 1},
]), (req, res) => {

  let receivedPsswd = undefined;
  
  receivedPsswd = req.body.receivedPsswd;

  console.log(receivedPsswd);

  if (receivedPsswd !== psswd) {
    res.send('bc');
    console.log('psswd is incorrect');
  } else {

  const movieName = req.body.movieName;
  const searchText = `"${movieName}"`;

if (checkTextInFile(filePath, searchText)) {
  console.log('text found in DB');
  res.send('exists');
 } else {

  res.send('done');


  //adding movieName to db
 fs.appendFile('./db.txt', `\n"${movieName}"`, (err) => {
  if (err) {
      console.error("Error adding to db:", err);
  } else {
      console.log("added text to DB");
  }
});

  const movieImage = req.files['movieImage'][0].filename;
  const movieDescription = req.body.movieDescription;

  const para1 = req.body.para1;
  const image1 = req.files['image1'][0].filename;
  const image2 = req.files['image2'][0].filename;
  const image3 = req.files['image3'][0].filename;
  const image4 = req.files['image4'][0].filename;


  imgExt(`uploads/${movieImage}`, `uploads/${movieImage}.png`);
  imgExt(`uploads/${image1}`, `uploads/${image1}.png`);
  imgExt(`uploads/${image2}`, `uploads/${image2}.png`);
  imgExt(`uploads/${image3}`, `uploads/${image3}.png`);
  imgExt(`uploads/${image4}`, `uploads/${image4}.png`);

 

  /* main bakchodi */


// Read the file content and adds div to main page
fs.readFile('index.html', 'utf8', (err, data) => {
  if (err) throw err;
  
  const divContent = `
  <div id="${movieName}" class="divs">
   <img class="imgs" src="uploads/${movieImage}.png"/>
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


//create directory with the movieName
fs.mkdir(movieName.toLowerCase(), (err) => {
  if (err) {
    console.error('Error creating directory:', err);
  } else {
    console.log('Directory created successfully');
  }
});

  //create index.html in the dir of movieName
  fs.writeFile(`${movieName.toLowerCase()}/index.html`, `
  
  html content
  
   para1: ${para1}
   image1:
   <img src="../uploads/${image1}.png"/>


    `, (err) => {
    if (err) {
        console.error("Error creating dir/index.html:", err);
    } else {
        console.log("created dir/index.html");
    }
});


//end
}
  }
});

let dirChecker;

function checkDirectoryExists(directoryPath) {
  if (fs.existsSync(directoryPath)) { // Check if the path exists
    const stats = fs.lstatSync(directoryPath); // Get the stats of the path
    if (stats.isDirectory()) {
      console.log('Directory exists');
      dirChecker = 'yes';
    } else {
      console.log('Path exists but is not a directory');
      dirChecker = 'no';
    }
  } else {
    console.log('Directory does not exist');
    dirChecker = 'no';
  }
}


app.post('/dataDeleter', (req, res) => {
  
  let psswd2 = undefined;
  
  psswd2 = req.body.psswd2;
  const movieName = req.body.movieName;

  console.log(`psswd: ${psswd2}`);

  if (psswd2 !== psswd) {
    res.send('bc');
    console.log('psswd is incorrect');
  } else {
    //main bkchodi

  const directoryPath = path.join(__dirname, movieName);
  checkDirectoryExists(directoryPath);

    fs.rm(movieName, { recursive: true, force: true }, (err) => {
      if (err) {
        console.error("Error deleting", err);
    } else if (dirChecker == 'no') {
        res.send('dirNotExist');
    } else {


// Read the file content and removes div from main page
fs.readFile('index.html', 'utf8', (err, data) => {
  if (err) throw err;


  const updatedData = data.replace(`id="${movieName}" class="divs"`, `id="${movieName}" class="d-none"`);
  
  fs.writeFile('index.html', updatedData, 'utf8', (err) => {
    if (err) throw err;
    console.log('Div rm done');
  });
  });

      console.log('deleted dir');
      res.send('done');
    }
   });




  }
});


app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
})