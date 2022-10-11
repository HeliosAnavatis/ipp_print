var http = require("http");
var fs = require('fs');
var formidable = require ('formidable');
var ipp = require('ipp');
var concat = require("concat-stream");

// TODO: Read PrinterUrl (or at least the IP address) from an environment variable!
var printerUrl = "http://192.168.1.140/ipp/printer";

var printer = ipp.Printer(printerUrl);

http.createServer(function (req, res) {

   // Has the user uploaded a file?
   if (req.url == '/fileupload') {
	// Create a new form using formidable
	var form = new formidable.IncomingForm();

	// Parse the form
	form.parse(req, function (err, fields, files) {
		// Get the temporary file path
		var path = files.filetoupload.filepath;
		var originalName = files.filetoupload.originalFilename;

		// Give the user some nice feedback
		// TODO: It would be good to put status and such here, but ...meh
		res.write('<h1>File uploaded</h1>');
		res.write('<p>File: ' + originalName  + '</p>');
		res.write('<p><a href="/">Print another</a></p>');
		res.end();

		// Set up a buffer to stream the file into
		let chunks = [];
		let fileBuffer;

		// and a stream object
		let fileStream = fs.createReadStream(path);

		// When we're finished reading the file, print it
		fileStream.once ('end', () => {
			fileBuffer = Buffer.concat (chunks);

			// Set up an IPP message object
			var msg = {
		                "operation-attributes-tag": {
		                        "requesting-user-name": "Node Print App",
		                        "job-name": originalName,
		                        "document-format": "application/pdf"
		                },
		                "job-attributes-tag":{
		                      "media-col": {
		                      "media-source": "tray-2"
		                      }
		                },
	                	data: fileBuffer
			};

			// Call the IPP printer execute to print the job with the data in the message
			printer.execute ("Print-Job", msg, function (err, res) {
//				console.log (err);
//			 	console.log (res);
			});

			// Tidy up after and delete the temporary file
			fs.unlink (path, (err) => {
				// Just do nothing!
			});
		});

		// When we read a chunk, add it to the buffer
		fileStream.on('data', (chunk) => {
			chunks.push(chunk);
		});

		return res.end();
	});
   } else {
	// Present the user with a simple file upload form
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<h1>Print a PDF</h1>');
	res.write('<p>Choose a file to send to the printer and click Print!</p>');
	res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
	res.write('<input type="file" name="filetoupload"><br>');
	res.write('<input type="submit" value="Print!">');
	res.write('</form>');
	return res.end();
   }
}).listen(8081);
