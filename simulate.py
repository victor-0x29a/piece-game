import requests
import json

baseUrl = "http://localhost:3000"
auth = {'email': 'cartoonbr494@gmail.com', 'password': 'utk5veses'}

token = ""
tokenReq = requests.request("POST", baseUrl + "/autenticacao/entrar", data=auth)
tokenRes = tokenReq.json()
token = tokenRes["data"]["token"]

# loop items
category = dict(
		id = 2,
        name = "Placa de video")

items = []
for i in range(120):
    items.append(dict(
        category = category,
        product = "qqqqqqqq"
    ))

for i, object in enumerate(items):
    try: 
        req = requests.request("POST", baseUrl + "/pieces", data=json.dumps(object), headers={
            "authorization": token,
            "Content-Type": "application/json"
        })
        if req.status_code != 201:
            print("Item " + str(i) + " falhou por request...")
            print(req.json())
        else:
            print("Item " + str(i) + " inserido...")
    except:
        print("Item " + str(i) + " falhou...")