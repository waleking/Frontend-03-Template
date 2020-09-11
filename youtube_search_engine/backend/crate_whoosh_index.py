import os
from whoosh.index import create_in
from whoosh.fields import Schema, TEXT, ID
import sys
import json
import pdb

def createSearchableData():

    '''
    Schema definition: video title, video title, description
    '''
    schema = Schema(id=ID(stored=True),title=TEXT(stored=True),\
              description=TEXT(stored=True))
    if not os.path.exists("indexdir"):
        os.mkdir("indexdir")

    # Creating an index writer to add document as per schema
    ix = create_in("indexdir",schema)
    writer = ix.writer()

    with open('./webpage_data.json') as f:
        line = f.read()
        youtube_array = json.loads(line)
        for youtube_item in youtube_array:
            youtube_id = youtube_item['id']
            youtube_title = youtube_item['title']
            youtube_description = youtube_item['description']
            try:
                print("creating the index of youtube video %s" % youtube_id) 
                writer.add_document(id=youtube_id, title=youtube_title,\
                  description=youtube_description)
            except Exception:
                pdb.set_trace()

    writer.commit()

createSearchableData()
