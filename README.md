# TwitterNFLReddit

## Purpose
This script when running will poll verified twitter users contained in the users object in index.js every 45 seconds looking for a new tweet. When a new tweet is found it is posted to Reddit. The subreddit is specified in the main function. I currently use this to scan for NFL news to post to /r/NFL. Only original tweets are used and not replies or other media

## Technology Used
This was build using Javascript as well as the Twitter and Reddit API. Thirdparty libraries used are snoowrap and twitter-api-v2

