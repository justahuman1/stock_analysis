import praw
from textblob import TextBlob
import json
import os


class RedditCrawler:
    def __init__(self, client_id, client_secret, user_name):
        self.reddit_instance = praw.Reddit(client_id=client_id,
                     client_secret=client_secret,
                     user_agent=f'testscript by /u/{user_name}'
                     )

    def get_post_json(self, subred, lim_n = 100, moder_name = ''):
        subreddit = self.reddit_instance.subreddit(subred)
        posts_json = {}
        for submission in subreddit.hot(limit=lim_n):
            if str(submission.author.name) == moder_name:
                continue

            submiss_json = {'title': submission.title,
                            'score': submission.score,
                            'first_comment': submission.comments[0].body if submission.comments != None else 'None',
                            'time': submission.created_utc}
            submiss_json['title_sentiment'] = TextBlob(submiss_json['title']).sentiment.polarity
            submiss_json['first_comment_sentiment'] = TextBlob(submiss_json['first_comment']).sentiment.polarity
            posts_json[submission.id] = submiss_json
            # print(json.dumps(posts_json))

        return json.dumps(posts_json)

    def append_jsonfile(self, data_json, file_name):
        with open(f'./reddit_data/{file_name}.json', 'a') as outfile:
            json.dump(data_json, outfile)
        return None