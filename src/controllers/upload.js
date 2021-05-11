const fs = require("fs");
const path=require("path")


const db = require("../models");
const Image = db.images;

const uploadFiles = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file === undefined) {
      return res.send(`You must select a file.`);
    }
   

    Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + req.file.filename
      ),
    }).then((image) => {
      fs.writeFileSync(
        __basedir + "/resources/static/assets/tmp/" + image.name,
        image.data
      );

      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

const multiple= async (req,res)=>{
  try{
    const paths = await req.file.map((file) => ({ fileName: file.filename }));
    Image.create({
      type:req.file.mimetype,
      name:req.file.originalname,
      data: JSON.stringify(paths),
    }).then 

  }catch(error){}
} 

module.exports = {
  uploadFiles,
};
