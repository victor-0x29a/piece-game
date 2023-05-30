import requests
import json
import os 

class Simulator:
    def __init__(self):
        self.url = "http://localhost:3000"
        self.category = dict(
		id = 2,
        name = "Placa de video")
        self.authSettings = {'email': 'cartoonbr494@gmail.com', 'password': 'utk5veses'}
        self.token = ""
        self.pieces = []
    def authenticate(self):
        request = requests.request("POST", self.url + "/autenticacao/entrar", data=self.authSettings)
        if request.status_code == 200:
            self.token = request.json()["data"]["token"]
            return True
        return False
    def generateData(self):
        try:
            x = int(input("Quantia de dados para gerar -> "))
            for i in range(x):
                self.pieces.append(dict(
                    category = self.category,
                    product = "qqqqqqqq"
                ))
            return True
        except:
            print("Ops..")
            return False
    def insertPieces(self):
        for i, object in enumerate(self.pieces):
            try: 
                req = requests.request("POST", self.url + "/pieces", data=json.dumps(object), headers={
                    "authorization": self.token,
                    "Content-Type": "application/json"
                })
                if req.status_code != 201:
                    print("Piece #" + str(i) + " falhou por request...")
                else:
                    print("Piece #" + str(i) + " inserido...")
            except:
                print("Piece #" + str(i) + " falhou...")
    def insertData(self):
        self.authenticate()
        self.generateData()
        self.insertPieces()

while True:
    os.system("cls") # windows
    choice = input('01 -> Start\n02 -> Stop\n -> ')
    if (choice == '02'):
        break
    else:
        simulate = Simulator()
        simulate.insertData()