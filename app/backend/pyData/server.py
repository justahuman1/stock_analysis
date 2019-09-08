from flask import Flask, request
from flask_cors import CORS
from models.stock_sentiments.util.reddit_crawl import RedditCrawler
import json

#/  CLI INIT
#/*     export FLASK_APP=app.py
#/*     flask run
#/  Optional local run:   flask run --host=0.0.0.0


app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return '{"msg":"Hello, World!"}'


@app.route('/crawl', methods=["POST"])
def crawl_subred():
    """
        Takes 3 inputs:
            User_name
            client_id
            client_secret
        #TODO => Modularize Params
            subreddit
            limit
            moder_name
    """
    data = request.data
    creds = json.loads(data.decode('utf-8'))['creds']

    print(creds['id'])
    reddit_crawler = RedditCrawler(
        client_id=creds['id'],
        client_secret=creds['secret'],
        user_name=creds['username']
    )

    reddit_data = reddit_crawler.get_post_json(
        subred='teslamotors',
        lim_n=3,
        moder_name='AutoModerator'
    )
    reddit_crawler.append_jsonfile(reddit_data, 'tesla')
    return reddit_data

