//sanity check
console.log("--------------------------------------");
console.log("ADES> backend>index.js");
console.log("--------------------------------------");


const hostname = "localhost";
const port = 3000;


// --------------------------
//imports
//---------------------------
const express=require("express");
const app =express();




/** 
 * @param {object} req 
 *  request object
 * @param {object} res  
 *  response object 
 * @param {function} 
 *  reference to the enxt function to call
 * 
 */


 function printDebugInfo(req, res, next) {
    console.log();
    console.log("-----------------[Debug Info]----------");
    //console.log(`Servicing ${urlPattern}...`);
    console.log("Servicing" + req.url + " ..");

    console.log("> req.params:" + JSON.stringify(req.params));
    console.log("> req.body:" + JSON.stringify(req.body));
    // console.log("> req.myOwnDebugIssue:"+JSON.stringify(req.myOwnDebugInfo));
    console.log("-----------------[Debug Info Ends]----------");
    console.log();

    next();

}


app.get("/async", async (req, res) => {
	try {
		const response = await axios({
			url: "users",
			method: "get",
		});
		res.status(200).json(response.data);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});


//standard for express
app.listen(port, hostname, () => {
    console.log(`Server started and accessible via http://${hostname}:${port}/`);
});
