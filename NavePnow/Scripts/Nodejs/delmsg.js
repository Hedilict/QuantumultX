/*
Server Info
 
关于作者

NavePnow
    Telegram: NavePnow
    GitHub: NavePnow
*/

var token = '';

var chat_id = "";
var url = "https://api.telegram.org/bot" + token;
const request = require('request');
const fs = require("fs");

// function originalData(estring) {
//     var payload = {
//         "method": "sendMessage",
//         "chat_id": chat_id,
//         "text": estring,
//         "parse_mode": "Markdown",
//     };
//     sendMsg(payload)
// }

// function sendMsg(payload) {
//     var options = {
//         'method': 'post',
//         'payload': payload
//     };

//     console.log(UrlFetchApp.fetch(url + "/", options))
// }

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function getStartID() {
    request({
        url: url + "/sendMessage?chat_id=" + chat_id + "&text=Memories%20are%20wiped%20now!",
        json: true
    }, function (error, reponse, body) {
        if (!error && reponse.statusCode == 200) {
            startID = body.result.message_id;
            getOriginalData(startID)
        }
    })
}

function getOriginalData(startID){
    request({
        url: url + "/getUpdates",
        json: true
    }, function (error, reponse, body) {
        if (!error && reponse.statusCode == 200) {
            data = body.result;
            delMessage(startID, data)
        }
    })
}

async function delMessage(startID, data) {
    // delete message
    // value = 0
    if (data != "") {
        for (i = 0; i < data.length; i++) {
            try {
                console.log(i)
                request({
                    url: url + "/deleteMessage?chat_id=" + chat_id + "&message_id=" + data[i].message.message_id,
                })
                await sleep(10);
                // UrlFetchApp.fetch(url + "/deleteMessage?chat_id=" + chat_id + "&message_id=" + data[i].message.message_id, options);
            } catch (e) {
                //count += 1
                //if (count >= 3) break;
            }
        }

        // update link for getUpdate
        value = data[data.length - 1].update_id + 1
        request({
            url: url + "/getUpdates?offset=" + value,
            json: true
        }, function (error, reponse, body) {
            if (!error && reponse.statusCode == 200) {
                data = body.result;
                delMessage(startID, data)
            }
        })
        // updateResults = UrlFetchApp.fetch(url + "/getUpdates?offset=" + value, options);
        // data = JSON.parse(updateResults.getContentText()).result;
    }
    else delWipe(startID);

}

function delWipe(startID) {
    // delete wipe memory
    request({
        url: url + "/deleteMessage?chat_id=" + chat_id + "&message_id=" + startID,
        json: true
    })
    // UrlFetchApp.fetch(url + "/deleteMessage?chat_id=" + chat_id + "&message_id=" + startID, options);
    delWelcome()
}

function delWelcome(){
    // delete welcome to eastworld
    fs.readFile('info.txt', function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log(data.toString())
        try {
            request({
                url: url + "/deleteMessage?chat_id=" + chat_id + "&message_id=" + data.toString(),
            })
            // UrlFetchApp.fetch(url + "/deleteMessage?chat_id=" + chat_id + "&message_id=" + endID, options);
        } catch (e) {
        }
    });
    printWelome()
    // endID = SheetName.getSheetValues(1, 1, 1, 1)[0][0];
    // try {
    //     UrlFetchApp.fetch(url + "/deleteMessage?chat_id=" + chat_id + "&message_id=" + endID, options);
    // } catch (e) {
    // }

}

function printWelome(){
    request({
        url: url + "/sendMessage?chat_id=" + chat_id + "&text=Welcome%20to%20Eastworld!",
        json: true
    }, function (error, reponse, body) {
        if (!error && reponse.statusCode == 200) {
            endID = body.result.message_id;
            console.log(endID)
            savetoFile(endID)
        }
    })
    // print welcome to eastworld
    // var endRst = UrlFetchApp.fetch(url + "/sendMessage?chat_id=" + chat_id + "&text=Welcome%20to%20Eastworld!", options);
    // endID = JSON.parse(endRst.getContentText()).result.message_id;
    // SheetName.getRange(LastRow, 1).setValue(endID);
}

function savetoFile(endID){
    fs.writeFile('info.txt', endID.toString(), function (err) {
        if (err) {
            return console.error(err);
        }
    });
}



const schedule = require('node-schedule');

const scheduleCronstyle = () => {
    schedule.scheduleJob('0 21 0 * * *', () => {
        getStartID()
    });
}

// scheduleCronstyle();        
getStartID()
