import openSocket from 'socket.io-client';

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

const socket = openSocket(
    isLocalhost ?
        "http://localhost:8000" :
        "https://server.bookface.network"
)

socket.on('disconnect', function() {
    setTimeout(() => {
      window.location.reload()
    }, 1000);
  });

function join(uuid, name, picture, callback) {
    socket.emit("join", uuid, name, picture, callback);
}

function post(topic) {
    socket.emit("newPost", topic);
}

function sendInterestData(interest, amount) {
    socket.emit("interestData", interest, amount)
}

function subscribeToPosts(callback) {
    socket.on("post", (post) => {
        callback(post)
    })
}

function subscribeToAds(showAdsCallback, hideAdsCallback, showDataCallback, hideDataCallback) {
    socket.on("showAds", () => {
        showAdsCallback()
    })

    socket.on("hideAds", () => {
        hideAdsCallback()
    })

    socket.on("showData", () => {
        showDataCallback()
    })

    socket.on("hideData", () => {
        hideDataCallback()
    })
}

function subscribeToAdminIntervention(showUsernameCallback, deleteUserCallback) {
    socket.on("showUsername", (uuid) => {
        showUsernameCallback(uuid);
    })

    socket.on("deleteUser", (uuid) => {
        deleteUserCallback(uuid);
    })
}

function adminEnableAds() {
    socket.emit("adminEnableAds");
}

function adminDisableAds() {
    socket.emit("adminDisableAds");
}

function adminEnableData() {
    socket.emit("adminShowData");
}

function adminDisableData() {
    socket.emit("adminHideData");
}

function adminResetSystem() {
    socket.emit("adminResetSystem");
}

function subscribeToUsers(callback) {
    socket.on("usersUpdate", (users) => {
        callback(users)
    })
}

export { join, post, subscribeToPosts, socket, subscribeToAds, sendInterestData, adminEnableAds, adminDisableAds, adminEnableData, adminDisableData, subscribeToUsers, subscribeToAdminIntervention, adminResetSystem };
