from fastapi import FastAPI,Depends
import fastapi
import fastapi.security
import models
import database
import schemas
import services
from sqlalchemy.orm import Session
import requests
from typing import List


app = FastAPI()

models.database.Base.metadata.create_all(bind=database.engine)
# services.create_database()

@app.post("/api/create-user/")
async def create_user(user:schemas.UserCreate,db:Session = Depends(services.get_db)):
    db_user = await services.get_user_by_email(user.email,db)
    if db_user:
        raise fastapi.HTTPException(status_code=400,detail="Email already exists!")

    user = await services.create_user(user,db)    
    
    return await services.create_token(user)

@app.post("/api/token/")
async def generate_token(form_data:fastapi.security.OAuth2PasswordRequestForm = Depends(),db:Session=Depends(services.get_db)):
    user = await services.authenticate(form_data.username,form_data.password,db)
    if not user:
        raise fastapi.HTTPException(status_code=401,detail="Invalid Credentails")
    return await services.create_token(user)

@app.get("/api/user/")
async def get_user(user:schemas.User = Depends(services.get_current_user)):
    return user

@app.post("/api/user/add-money/")
async def add_money(user:schemas.UserAddMoney,db:Session = Depends(services.get_db)):
    updated_user = db.query(models.User).filter(models.User.id==user.id).first()
    updated_user.wallet += user.wallet
    db.commit()
    db.refresh(updated_user)
    return updated_user

@app.post("/api/user/weather/")
async def get_weather(location:schemas.Weather):
    url = "https://visual-crossing-weather.p.rapidapi.com/forecast"
    querystring = {"aggregateHours":"1","location":{location.city},"contentType":"json","shortColumnNames":"true"}

    headers = {
        "X-RapidAPI-Key": "348bad0d17msh6fd59a0c6e9c2b7p154319jsn90c3fa4080ce",
        "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com"
    }

    response = requests.request("GET",url,params=querystring,headers=headers)
    
    return response.json()['locations'][location.city]['values'][0]

@app.post("/api/user/item-purchase")
async def buy_items(details:schemas.BuyItem,db:Session = Depends(services.get_db)):
    user = db.query(models.User).filter(models.User.id==details.user_id).first()
    product = db.query(models.Products).filter(models.Products.id==details.product_id).first()
    if user.wallet >= (product.price * details.product_stock) and user.wallet!=0 :
        if product.stock >= details.product_stock and product.stock!=0:
            user.wallet -= (product.price * details.product_stock)
            product.stock -= details.product_stock
            db.commit()
            db.refresh(user)
            db.refresh(product)
            return {"wallet":user.wallet,"product stock":product.stock}
        else:
            return {"Insufficient Stocks!!"}
    else:
        return {"Insufficient Balance!! Add Money Now!!"}

@app.post("/api/user-login/")
async def login(email:str,password:str,db:Session = Depends(services.get_db)):
    return await services.authenticate(email,password,db)

@app.get("/api/")
async def root():
    return {"message":"Awesome"}




@app.post('/')
def create(request: schemas.ProductBase,db:Session = Depends(services.get_db)):
    new_product = models.Products(name=request.name,brand=request.brand,description=request.description,price=request.price,stock=request.stock,thumbnail=request.thumbnail)
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    products = db.query(models.Products).all()
    return products
    # return new_product

@app.get("/testing_api/")
async def productsList(db:Session = Depends(services.get_db)):
     products = db.query(models.Products).all()
     return products

@app.post("/create-items/")
def create_items(db:Session = Depends(services.get_db)):
    url = 'https://dummyjson.com/products?limit=100'
    response = requests.request('GET',url=url)
    products = response.json()
    for item in products["products"]:
        new_product = models.Products(name=item['title'],brand=item['brand'],description=item['description'],price=item['price'],stock=item['stock'],thumbnail=item['thumbnail'])
        db.add(new_product)
        db.commit()
        db.refresh(new_product)
    
    return db.query(models.Products).all()

@app.post("/create-items-2/")
def create_items(db:Session = Depends(services.get_db)):
    url = 'https://fakestoreapi.com/products'
    response = requests.request('GET',url=url)
    products = response.json()
    for item in products:
        new_product = models.Products(name=item['title'],description=item['description'],price=item['price'],thumbnail=item['image'])
        db.add(new_product)
        db.commit()
        db.refresh(new_product)
    
    return db.query(models.Products).all()

@app.get("/create-items-3/")
def create_items(db:Session = Depends(services.get_db)):
    url = 'https://api.fakeshop-api.com/products/getAllProducts'
    response = requests.request('GET',url=url)
    # products = response.json()
    print(response)
    # for item in products["products"]:
    #     new_product = models.Products(name=item['title'],brand=item['brand'],description=item['description'],price=item['price'])
    #     db.add(new_product)
    #     db.commit()
    #     db.refresh(new_product)
    
    # return db.query(models.Products).all()




# @app.post("/create-user/")
# def create_user(request:schemas.UserCreate,db:Session = Depends(get_db)):
#     new_user = models.User(name=request.name,email=request.email,password=request.password)
#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)
#     return db.query(models.User).all()

# @app.post("/login-user/")
# def login_users(request:schemas.UserBase,db:Session = Depends(get_db)):
#     email = request.email 
#     password = request.password
#     res = db.query(models.User).filter(models.User.email==email)
#     for row in res:
#         return row.id


# @app.get("/members")
# def send_info():
#     return {"members":["Member1","Member2","Member3"]}

