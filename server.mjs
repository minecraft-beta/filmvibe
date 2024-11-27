import express from 'express';
const app = express();
const PORT = 6969;
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Set the destination folder for uploads
    }
});

const upload = multer({storage: storage});
const filePath = './DB.txt';

const psswd = process.env.PSSWD;

//middlewares
app.use(express.json());


//pushChanges
const OWNER = "minecraft-beta";  // GitHub username or organization
const REPO = "filmvibe"; // Repository name
const BRANCH = "main";          // Branch to commit to




async function pushChanges(filePaths = [], commitMessage, deletedPaths = []) {
  // Process file updates or creations
  for (const filePath of filePaths) {
    try {
      const fileExtension = path.extname(filePath).toLowerCase();
      const isImage = [".png", ".jpg", ".jpeg", ".gif"].includes(fileExtension);
      const fileContent = isImage
        ? fs.readFileSync(filePath) // Binary data for images
        : fs.readFileSync(filePath, "utf8"); // Text data for others
      const base64Content = Buffer.from(fileContent).toString("base64");

      let fileSHA;
      try {
        const { data } = await octokit.repos.getContent({
          owner: OWNER,
          repo: REPO,
          path: filePath,
          ref: BRANCH,
        });
        fileSHA = data.sha;
      } catch (error) {
        if (error.status === 404) {
          console.log(`File ${filePath} does not exist on GitHub. It will be created.`);
        } else {
          throw error;
        }
      }

      // Create or update the file
      await octokit.repos.createOrUpdateFileContents({
        owner: OWNER,
        repo: REPO,
        path: filePath,
        message: commitMessage,
        content: base64Content,
        branch: BRANCH,
        sha: fileSHA,
      });

      console.log(`File ${filePath} committed and pushed successfully!`);
    } catch (error) {
      console.error(`Error pushing file ${filePath}:`, error.message);
    }
  }

  // Process file deletions
  for (const deletedPath of deletedPaths) {
    try {
      const { data } = await octokit.repos.getContent({
        owner: OWNER,
        repo: REPO,
        path: deletedPath,
        ref: BRANCH,
      });

      await octokit.repos.deleteFile({
        owner: OWNER,
        repo: REPO,
        path: deletedPath,
        message: commitMessage,
        branch: BRANCH,
        sha: data.sha,
      });

      console.log(`File ${deletedPath} deleted successfully!`);
    } catch (error) {
      if (error.status === 404) {
        console.log(`File ${deletedPath} does not exist on GitHub. Nothing to delete.`);
      } else {
        console.error(`Error deleting file ${deletedPath}:`, error.message);
      }
    }
  }
}


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

//dirReceiver post with 7 var
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

    //main bakchodi

  res.send('done');


  //adding movieName to db
 fs.appendFile(filePath, `\n"${movieName}"`, (err) => {
  if (err) {
      console.error("Error adding to db:", err);
  } else {
      console.log("added text to DB");
  }
});

  const movieImage = req.files['movieImage'][0].filename;
  const movieDescription = req.body.movieDescription;

  const para1 = req.body.para1;
  const movieLink = req.body.movieLink;
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

  //create index.html in the dir of movieName
  fs.writeFile(`${movieName.toLowerCase()}/index.html`, `
  
 <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>

    body {
    margin: 0;
    padding: 0;
    background-color: #121212;
}


.header1 {
    background-color: #000000;
    height: 75px;
    width: 100% auto;
    display: flex;
}

.img {
    margin: 0;
    height: 75px;
    position: relative;
    left: 50%;
    transform: translate(-50%);
    pointer-events: none;
}

/* */

.pOne {
    color: white;
    font-size: 25px;
    text-align: center;
    margin-top: 220px;
}

.imgOne {
    height: 160px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    margin-top: 30px;
}

.pTwo {
    color: white;
}

.hdOne {
    margin-top: 60px;
    color: red;
}

.imgss {
    height: 140px;
}

.btnOne {
    background-color: yellow;
    border-style: none;
    color: black;
    height: 30px;
    width: 90px;
    position: relative;
    left: 50%;
    transform: translate(-50%);
}

    </style>
</head>

<body>

    <header class="header1">
    <img class="img" src="../images/text.png"/>
    </header>

    <img class="imgOne" src="../uploads/${movieImage}.png"/> 
    <p class="pOne">${movieName}</p>

    <h3 class="hdOne">Description:</h3>
    <p class="pTwo"> ${para1} </p>

    <h3 class="hdOne">Screenshots:</h3>
    <img class="imgss" src="../uploads/${image1}.png"/>
    <img class="imgss" src="../uploads/${image2}.png"/>
    <img class="imgss" src="../uploads/${image3}.png"/>
    <img class="imgss" src="../uploads/${image4}.png"/>

    <h3 class="hdOne">Download Link:</h3>
    <button class="btnOne" id="btnLink" onclick="window.location.href='${movieLink}'"> Download </button>

</body>

</html>


    `, (err) => {
    if (err) {
        console.error("Error creating dir/index.html:", err);
    } else {
        console.log("created dir/index.html");
    }
});

}
});




// git push

const filePaths = [
  `uploads/${movieImage}.png`,
  `uploads/${image1}.png`,
  `uploads/${image2}.png`,
  `uploads/${image3}.png`,
  `uploads/${image4}.png`,
  `${movieName.toLowerCase()}/index.html`,
  'DB.txt',
  'index.html'
];

pushChanges(filePaths, "Automated commit");


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

// Read the file content and removes movieName from DB
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) throw err;
  
  const updatedData2 = data.replace(`"${movieName}"`, `null`);
  
  fs.writeFile(filePath, updatedData2, 'utf8', (err) => {
    if (err) throw err;
    console.log('movieName del from DB');
  });
  });

      console.log('deleted dir');
      res.send('done');

      
      //git push
   const filePaths = [
    'index.html',
    'DB.txt'
   ]

   const deletedPaths = [
    `${movieName.toLowerCase()}/index.html`
   ]

      pushChanges(filePaths, 'automated commit -r', deletedPaths);

    }
   });

  }
});


app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
})

