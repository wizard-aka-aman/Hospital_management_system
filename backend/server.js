import app from "./app.js";
import {v2 as cloudinary} from "cloudinary"
 
cloudinary.config({
    cloud_name :"dbsrx38gz",
    api_key :"392464345412426",
    api_secret :"V0bCZZI2cUXRWeW4ZOAGJuDEZXs"
})

app.listen( 4000, ()=>{
    console.log(`server listening on port ${4000}`);

})