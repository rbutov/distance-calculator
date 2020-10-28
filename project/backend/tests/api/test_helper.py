import pytest
import requests
import json
import mongomock
import pymongo

from unittest import mock
from api import helper
from api.helper import getGeoInfo, getDistance, makeApiRequest, GOOGLE_API


def test_getDistance():
    pointA='41.3323577,-81.1747498'
    pointB='26.316911,-80.075626'
    res = getDistance(pointA, pointB)

    assert res == 1036.8211982281207

def test_makeApiRequest(requests_mock):
    res = makeApiRequest('')
    assert res == None

    api_response = json.dumps({
       "results" : [
          {
             "formatted_address" : "Belarus",
             "geometry" : {
                "location" : {
                   "lat" : 53.709807,
                   "lng" : 27.953389
                }
             }
          }
       ],
       "status" : "OK"
    })
    requests_mock.get(GOOGLE_API, status_code=200, text=api_response)
    res = makeApiRequest('belarus')
    assert res == {'geo': '53.709807,27.953389', 'location': 'Belarus'}

def test_getGeoInfo(requests_mock):
    res = getGeoInfo('')
    assert res == None

    mongo = mongomock.MongoClient()
    geo = mongo.db.geo
    objs = {
        'query': 'belarus',
        'location': 'Belarus',
        'geo': '53.709807,27.953389'
    }
    geo.insert_one(objs)
    with mock.patch.object(helper, 'client', mongo):
        res = getGeoInfo('belarus')
    assert str(res.get('geo')) == '53.709807,27.953389'
