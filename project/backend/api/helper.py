import geopy.distance
import json
import os
import requests

from pymongo import MongoClient
from flask import request

GOOGLE_API_KEY = os.environ.get('GOOGLE_API_KEY')
GOOGLE_API = 'https://maps.googleapis.com/maps/api/geocode/json'

MONGODB_USERNAME = os.environ.get('MONGODB_USERNAME')
MONGODB_PASSWORD = os.environ.get('MONGODB_PASSWORD')

client = None
if MONGODB_USERNAME:
    client = MongoClient('db', 27017)
    client.admin.authenticate(MONGODB_USERNAME, MONGODB_PASSWORD)

def getGeoInfo(query, type='address'):
    if query == '':
        return None

    column = 'location' if type == 'address' else 'geo'
    geo = None
    if client:
        geo = client.db.geo.find_one({'query': query})
    if geo:
        return dict(location=geo.get('location'), geo=geo.get('geo'))
    else:
        res = makeApiRequest(query, type)
        print('ssss {}'.format(res), flush=True)
        if client and res:
            client.db.geo.insert_one(
                dict(
                    query=query.lower(),
                    location=res.get('location'),
                    geo=res.get('geo')
                )
            )
            return dict(location=res.get('location'), geo=res.get('geo'))
        return None

def makeApiRequest(query, type='address'):
    if query == '':
        return None
    r = requests.get(
            GOOGLE_API,
            params={type: query, 'key': GOOGLE_API_KEY})
    if r.status_code == 200:
        response = json.loads(r.text)
        if response['status'] == 'OK':
            tmp = response['results'][0]
            return dict(
                location=tmp['formatted_address'],
                geo='{0},{1}'.format(tmp['geometry']['location']['lat'], tmp['geometry']['location']['lng'])
            )
        return None

    return None

def getDistance(pointA, pointB):
    pointAE = pointA.split(',')
    pointBE = pointB.split(',')

    pointAD = (pointAE[0], pointAE[1])
    pointBD = (pointBE[0], pointBE[1])

    return geopy.distance.geodesic(pointAD, pointBD).miles
