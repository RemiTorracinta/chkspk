import json
import base64
import os
import requests



filename = '/Users/rct66/Downloads/TRIPPIE REDD ft 6IX9INE - POLES1469 official music video.mp3'
with open(filename, "rb") as mp3:
    encoded_string = base64.b64encode(mp3.read())

json = json.dumps({os.path.basename(filename): encoded_string})
url = 'https://rpzb2hjcz3.execute-api.us-east-1.amazonaws.com/dev/users/upload'
headers =  {'Content-Type': 'application/json'}
# 'x-api-key': 'lFHtiYT6Kt5tAGU8YnUsX005zjsxsaaKnStu7B70'
resp = requests.post(url, data=json, headers=headers)
print(resp)
