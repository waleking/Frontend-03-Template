echo "testing POST method on http://127.0.0.1:4201/query/"
curl -H "Content-Type:application/json" -X POST -d '{ "query": "music" }' http://127.0.0.1:4201/query

