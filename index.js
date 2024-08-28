const express= require("express");
const app= express();

let port= 8080;

const path= require("path");

const{ v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname , "views"));

app.use(express.static(path.join(__dirname , "public")));

let posts=[
    {
        id:uuidv4(),
        username:"Iqra Shehzad",
        content: "I am studing Web Development"
    },
    {
        id:uuidv4(),
        username:"Shivani Chauhan",
        content: "She is working"
    },
    {
        id:uuidv4(),
        username: "Mansi Rohilla",
        content:"She loves to study"
    }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs", { posts });
});

app.get("/posts/new",(req,res)=>{
    //let {user,content}= req.query;
    //console.log(user,content);
    res.render("new.ejs");
});

app.post("/posts", (req,res)=>{
    //console.log(req.body);
    let newid= uuidv4();
    let {username,content}= req.body;
    posts.push({id:newid,username: username,content: content});
    res.redirect("/posts");
});

app.get("/posts/:uniqueid",(req,res)=>{
   let{ uniqueid }= req.params;
   //console.log(id);
   let post= posts.find((posts)=> uniqueid === posts.id);
   //console.log(post);
   res.render("show.ejs", { post });
});

app.get("/posts/:uniqueid/edit",(req,res)=>{
    let {uniqueid}= req.params;
    let post= posts.find((posts)=> uniqueid === posts.id);
    res.render("edit.ejs",{ post });
    
});

app.patch("/posts/:uniqueid",(req,res)=>{
    let {uniqueid}= req.params;
    let newContent= req.body.content;
    //console.log(newContent);
    let post= posts.find((posts)=> uniqueid === posts.id);
    post.content= newContent;
    console.log(post);
    res.redirect("/posts");
});

app.delete("/posts/:uniqueid", (req,res)=>{
    let {uniqueid} = req.params;
    posts= posts.filter((posts)=> uniqueid != posts.id);
    res.redirect("/posts");
});

app.listen(port,()=>{
    console.log(`app is listening to port ${port}`);
});