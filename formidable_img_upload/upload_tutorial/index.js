import express from "express";
import formidable from "formidable";

const app = express();

app.get("/", (req, res) => {
  res.send(`
        <h2>With <code>"express"</code> npm package</h2>
        <form action="/api/upload" enctype="multipart/form-data" method="post">
        <div>Text field title: <input type="text" name="title" /></div>
        <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
        <input type="submit" value="Upload" />
        </form>
     `);
});

app.post("/api/upload", (req, res) => {
    const form = formidable({
        uploadDir: "./uploads", // Save files in 'uploads' folder
      keepExtensions: true
    })

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
        }

        res.json({fields, files})
    })
})

app.listen(5000, () => {
  console.log("App is Listening on port 5000");
});
