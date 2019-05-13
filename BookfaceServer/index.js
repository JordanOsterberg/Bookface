const socket = require("socket.io")();
const uuidv4 = require("uuid/v4");

const fs = require("fs");

let users = [];
let posts = [];

let adsEnabled = false;
let dataEnabled = false;

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
};

socket.on("connection", (client) => {
    console.log("Connection");
    let user = undefined;

    client.on("adminEnableAds", () => {
        adsEnabled = true;

        socket.emit("showAds");
    });

    client.on("adminDisableAds", () => {
        adsEnabled = false;

        socket.emit("hideAds");
    });

    client.on("adminShowData", () => {
        dataEnabled = true;

        socket.emit("showData");
    });

    client.on("adminHideData", () => {
        dataEnabled = false;

        socket.emit("hideData");
    });

    client.on("adminShowUsername", (uuid) => {
        socket.emit("showUsername", uuid);
    });

    client.on("adminDeleteUser", (uuid) => {
        socket.emit("deleteUser", uuid);
    });

    client.on("adminResetSystem", () => {
        process.exit(1);
    });

    client.on("interestData", (interest, amount) => {
        user.interests[interest] = amount;
        socket.emit("usersUpdate", users);
        console.log(users);
    });

    client.on("join", (uuid, name, picture, callback) => {
        user = {
            uuid: uuid,
            name: name,
            picture: picture,
            interests: {}
        };

        if (user !== undefined) {
            const post = {
                id: uuidv4(),
                type: "join",
                author: user
            };
            posts.unshift(post);
            socket.emit("post", post);
        }

        users.push(user);
        socket.emit("usersUpdate", users);

        callback(user, posts, adsEnabled, dataEnabled);

        console.log("Join from " + user);
    });

    client.on("newPost", (topic) => {
        if (user === undefined) {
            console.log("newPost, undefined user");
            return;
        }

        let file = "";

        if (topic === "Gardening") {
            file = "gardening.json";
        } else if (topic === "Paper Towels") {
            file = "papertowels.json";
        } else if (topic === "Anti-Vaxx") {
            file = "antivaxx.json";
        } else if (topic === "Anti-Anti-Vaxx") {
            file = "antiantivaxx.json";
        } else if (topic === "GDPR") {
            file = "gdpr.json";
        } else if (topic === "Kardashians") {
            file = "kardashians.json";
        } else if (topic === "Memes") {
            file = "memes.json";
        } else if (topic === "Zane and Evan") {
            file = "zaneandevan.json";
        } else if (topic === "Fringed Carpets") {
            file = "fringedcarpets.json";
        } else {
            file = "gdpr.json";
        }

        fs.readFile(file, (err, data) => {
            if (err) {
                return;
            }

            const json = JSON.parse(data);
            handle(json.random());
        });

        function handle(data) {
            const post = {
                id: uuidv4(),
                type: data.type,
                author: user,
                text: data.text,
                topic: topic,
                mediaUrl: data.mediaUrl
            };
            posts.unshift(post);
            socket.emit("post", post);
        }
    });

    client.on("disconnect", () => {
        if (user !== undefined) {
            const post = {
                id: uuidv4(),
                type: "leave",
                author: user
            };
            posts.unshift(post);
            socket.emit("post", post);

            let i = users.indexOf(user);
            users.splice(i, 1);
        }

        socket.emit("usersUpdate", users);

        console.log("Disconnect from " + user);
    })
});

socket.listen(8000);
console.log("listening on port 8000");