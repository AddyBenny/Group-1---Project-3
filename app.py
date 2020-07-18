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
    jobs_data = mongo.Indeed_db.data_jobs.find_one()
    print(jobs_data)
    #JSONEncoder().encode(jobs_data)

    return JSONEncoder().encode(jobs_data)#json.encode(jobs_data, cls=JSONEncoder)
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
