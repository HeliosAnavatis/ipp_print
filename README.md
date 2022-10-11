# ipp_print
## About the Project

This is a simple, dockerised node.js Web server to print a PDF to a specific printer

I created this because of someone's stated need to print PDF documents while working from home from a laptop on which printer drivers could not be installed.

The idea is to have a simple web server which allows upload of a PDF file, which is then sent via IPP directly to the printer.

## Getting Started
1. Grab the repo
2. Edit main.js and change
    ```
    var printerUrl = "http://192.168.1.140/ipp/printer";
    ```
    to match your printer's IP address
3. Build the container
    ```
    docker build . -t ipp_server
    ```
4. Run the container
    ```
    docker run -p 8081:8081 --name ipp_server -d ipp_server
    ```
5. Go to http://localhost:8081 and profit!

## Built With
* [![Node][Node.js]][Node-url] [Node.js][Node-url]
* [![Docker][Docker]][Docker-url] [Docker][Docker-url]
* [![IPP][IPP]][IPP-url] [NPM IPP Package][IPP-url]

## TO DOs:
- [ ] Orchestrate my server better - set this up wih docker-compose :vertical_traffic_light: FTW
- [ ] Don't hardcode the port in main.js :shrug:
- [ ] Sanity check the inputs :closed_lock_with_key: (yes, yes, I know - this is quick, dirty and only used on my internal network)
- [ ] Improve the UI.  'Basic' is an understatement! Some ideas:
    - [ ] General layout of the page/form
    - [ ] Printer status (online, ready?)
    - [ ] Printer supplies status (paper, toner/ink levels)
    - [ ] Better feedback on print job progress
- [ ] Add some nice logging
- [ ] Make the printer IP address configurable.
- [ ] (Extra credit) Make the printer discoverable & selectable by the user.
- [ ] Tidy all this up and stick a maintained container on Dockerhub.

[Node.js]: https://nodejs.org/static/images/favicons/favicon.ico
[Docker]: https://www.docker.com/favicon.ico
[IPP]: https://static.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png
[Node-url]: https://nodejs.org
[Docker-url]: https://www.docker.com
[IPP-url]: https://www.npmjs.com/package/ipp
