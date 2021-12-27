const Twitter = require('twitter-v2');
const snoowrap = require('snoowrap');
const TwitterClient = require("twitter-api-v2").default;

const hidden = require('./secrets.js')

const client = new TwitterClient(hidden.bearerToken);

const r = new snoowrap({
    userAgent: 'put your user-agent string here',
    clientId: hidden.clientId,
    clientSecret: hidden.clientSecret,
    username: hidden.username,
    password: hidden.password
});

const users = [
    {
        name: "Ian Rapoport",
        id: "16403943",
        lastTweet: "1473823063439560706",
        handle: "RapSheet",
        flair: "Rapoport"
    },
    {
        name: "Mike Garafolo",
        id: "12513132",
        lastTweet: "1473770839917182984",
        handle: "MikeGarafolo",
        flair: "Garafolo"
    },
    {
        name: "Tom Pelissero",
        id: "36089053",
        lastTweet: "1473758942526382096",
        handle: "TomPelissero",
        flair: "Pelissero"
    },
    {
        name: "Adam Schefter",
        id: "51263592",
        lastTweet: "1473845205891751936",
        handle: "AdamSchefter",
        flair: "Schefter"
    },
    {
        name: "Jermey Fowler",
        id: "594257142",
        lastTweet: "1473832549495496706",
        handle: "JFowlerESPN",
        flair: "Fowler"
    }
]


let abc = true;


async function getLastTweetId() {
    for (user in users) {
        let userId = users[user].id;
        let tweetsOfUser = await client.v2.userTimeline(`${userId}`, { exclude: 'replies', exclude: 'retweets' });
        let latestTweets = tweetsOfUser.tweets[0];
        users[user].lastTweet = latestTweets.id;
        console.log(latestTweets, users[user].name)
    }
    console.log(users);
}

async function testUsers() {
    for (u in users) {
        let user = users[u];
        const userTweets = await client.v2.userTimeline(`${user.id}`, { exclude: 'replies', exclude: 'retweets' });
        let latestTweets = userTweets.tweets[0];
        console.log(latestTweets, user.lastTweet)
        if (abc) {
            //user.lastTweet = latestTweets.id
            console.log("making post", user.name, user.handle)

            console.log(text)
            r.getSubreddit('maybenews12').submitLink({
                title: `[${user.flair}]${text}`,
                url: `https://twitter.com/${user.handle}/status/${latestTweets.id}`
            });
        }
    }
}

async function main() {
    for (u in users) {
        let user = users[u];
        const userTweets = await client.v2.userTimeline(`${user.id}`, { exclude: 'replies', exclude: 'retweets' });
        let latestTweets = userTweets.tweets[0];
        if (latestTweets.id != user.lastTweet) { //latestTweets.id != user.lastTweet
            user.lastTweet = latestTweets.id
            console.log("making post", user.name)
            let text = latestTweets.text;
            if (text.includes('https')) {
                let index = text.indexOf("https");
                text = text.slice(0, index);
            }


            // r.getSubreddit('nfl').submitLink({
            //     title: `[${user.flair}] ${text}`,
            //     url: `https://twitter.com/${user.handle}/status/${latestTweets.id}`
            // });
            r.getSubreddit('maybenews12').submitLink({
                title: `[${user.flair}] ${text}`,
                url: `https://twitter.com/${user.handle}/status/${latestTweets.id}`
            });
        }
    }
}

setInterval(function () {
    console.log("firing function")
    main();
    //testUsers();
    console.log("done firing")
}, 45 * 1000); // 60 * 1000 milsec

getLastTweetId();
//main();
//testUsers();