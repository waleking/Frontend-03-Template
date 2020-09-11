from whoosh.qparser import QueryParser
from whoosh import scoring
from whoosh.index import open_dir
import sys
import pdb


def query(query_str, topN=10):
    ix = open_dir("indexdir")

    with ix.searcher(weighting=scoring.Frequency) as searcher:
        query = QueryParser("description", ix.schema).parse(query_str)
        results = searcher.search(query,limit=topN)
        l = []
        for i in range(min(len(results), topN)):
            d={}
            url = "https://www.youtube.com/watch?v=%s" % results[i]['id']
            print(url)
            print(results[i]['title'])
            print("score=%s" % str(results[i].score))
            print(results[i].highlights("description"))
            print("---------------------")
            d["url"] = url
            d["title"] = results[i]['title']
            d["score"] = results[i].score
            d["description"] = results[i].highlights("description")
            l.append(d)
        return l



if __name__=="__main__":
    # query_str is query string
    query_str = sys.argv[1]
    # Top 'n' documents as result
    topN = int(sys.argv[2])
    query(query_str, topN)
