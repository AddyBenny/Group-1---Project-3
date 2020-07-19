from flask import Flask, render_template, redirect,jsonify
from flask_pymongo import PyMongo
import pymongo 
from pymongo import MongoClient
import json
from bson import json_util,ObjectId
from flask_cors import CORS, cross_origin
# Create an instance of Flask  
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Use PyMongo to establish Mongo connection
#mongo = PyMongo(app, uri="mongodb://localhost:27017/Indeed_db") 
conn = 'mongodb://localhost:27017'
mongo = pymongo.MongoClient(conn)
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

# Route to render index.html template using data from Mongo
@app.route("/")
@cross_origin()
def home():
    # Find one record of data from the mongo database
    jobs_data = mongo.Indeed_db.Data_jobs.find()
    se_jobs = mongo.Indeed_db.software_jobs.find()


    docs_list  = list(jobs_data)
    docs_list2 = list(se_jobs)

    # job_stuff = json.dumps(docs_list, default=json_util.default)

    json_docs = []
    for doc in docs_list:
        json_doc = json.dumps(doc, default=json_util.default)
        json_docs.append(json_doc)

    docs = [json.loads(j_doc, object_hook=json_util.object_hook) for j_doc in json_docs]

    json_docs2 = []
    for doc in docs_list2:
        json_doc2 = json.dumps(doc, default=json_util.default)
        json_docs2.append(json_doc2)

    docs2 = [json.loads(j_doc, object_hook=json_util.object_hook) for j_doc in json_docs2]

    return_ds = JSONEncoder().encode(docs)
    return_se = JSONEncoder().encode(docs2)
    
    #JSONEncoder().encode(jobs_data)

    return  return_ds
    
    #json.encode(jobs_data, cls=JSONEncoder)
    # jsonify(data = data)
    #return jsonify(jobs_data)
    #return render_template("index.html", jobs=jobs_data)

#mongodb <- Flask -> html -> javascript -> visual -> html
#mongodb<- flask -> api       <- javascript+html
# # Route that will trigger the scrape function
# @app.route("/scrape")
# def scrape():

#     # Run the scrape function
#     mars_data = scrape_mars.scrape_info()

#     # Update the Mongo database using update and upsert=True
#     mongo.db.collection.update({}, mars_data, upsert=True)

#     # Redirect back to home page
#     return redirect("/")


if __name__ == "__main__":
    app.run(debug=True,port=4545)
