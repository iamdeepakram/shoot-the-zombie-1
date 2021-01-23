function generateHexString(length) {
    let ret = "";
    while (ret.length < length) {
        ret += Math.random().toString(16).substring(2);
    }
    return ret.substring(0, length);
}

function DeletePreviousScore() {
    localStorage.removeItem("Kills");
    localStorage.removeItem("Score");
    let Level_Stars = "Level_Stars_"
    for (x = 1; x <= 16; x++) {
        if (x < 10) {
            localStorage.removeItem(Level_Stars + "00" + x);
        } else {
            localStorage.removeItem(Level_Stars + "0" + x);
        }
    }
}

function sendscores(listener_user_id,listener_session_id,listener_score,method){

    let xhr = new XMLHttpRequest();
    xhr.open(method, "http://localhost:4000/Game_Data", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({

        "User_ID": listener_user_id,
        "Session_ID": listener_session_id,
        "Score":listener_score

    }));
    console.log("Score Sent");

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function score_listener() {

    let listener_user_id = localStorage.getItem("User_ID")
    let listener_session_id = localStorage.getItem("Session_ID")
    let listener_score = localStorage.getItem("Score")

    sendscores(listener_user_id,listener_session_id,listener_score,"POST")

    while (true) {

        if (localStorage.getItem("Score") !== listener_score) {
            alert("level passed", listener_score, listener_session_id, listener_user_id)
            listener_score = localStorage.getItem("Score");

            sendscores(listener_user_id,listener_session_id,listener_score,"POST")

        }

        await sleep(500);
    }
}

function setuserandsessionid() {

    let user_ID = generateHexString(58);
    let session_ID = generateHexString(10);
    if (localStorage.getItem("User_ID") === null) {
        console.log("User ID Does not exist. Setting User ID Now.")
        localStorage.setItem("User_ID", user_ID);
        console.log("User ID set to", user_ID);
    } else {
        console.log("User ID, Detected. User ID is", user_ID)
    }

    localStorage.setItem("Session_ID", session_ID);
    console.log("Session ID is", session_ID);

}


setuserandsessionid();
DeletePreviousScore();
score_listener();