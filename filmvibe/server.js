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

app.post('/dataReceiver', upload.single('movieImage'), (req,res) => {
    movieName = req.body.movieName;
    movieDescription = req.body.movieDescription;
    movieImage = req.file.filename;

  imgExt(`uploads/${movieImage}`, `uploads/${movieImage}.png`);

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

 //create directory with the movieName
 fs.mkdir(movieName.toLowerCase(), (err) => {
    if (err) {
      console.error('Error creating directory:', err);
    } else {
      console.log('Directory created successfully');
    }
  });


// Read the file content and adds div to main page
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

});


app.post('/dirReceiver', upload.fields([
  {name: 'image1', maxCount: 1},
  {name: 'image2', maxCount: 1},
  {name: 'image3', maxCount: 1},
  {name: 'image4', maxCount: 1},
]), (req, res) => {

  const movieName2 = req.body.movieName2;
  const para1 = req.body.para1;
  const image1 = req.files['image1'][0].filename;
  const image2 = req.files['image2'][0].filename;
  const image3 = req.files['image3'][0].filename;
  const image4 = req.files['image4'][0].filename;

  imgExt(`uploads/${image1}`, `uploads/${image1}.png`);
  imgExt(`uploads/${image2}`, `uploads/${image2}.png`);
  imgExt(`uploads/${image3}`, `uploads/${image3}.png`);
  imgExt(`uploads/${image4}`, `uploads/${image4}.png`);

  
if (checkTextInFile(filePath, movieName2)) {
  console.log('text found in DB');
  res.send('valid');

  /* main bakchodi */

  console.log(para1);

  //create index.html in the dir of movieName
  fs.writeFile(`${movieName2.toLowerCase()}/index.html`, `
  
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

} else {
  res.send('notValid');
}

})


app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
})
