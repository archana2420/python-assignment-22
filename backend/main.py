from fastapi import FastAPI,Depends
import fastapi
import fastapi.security
import models
import database
import schemas
import services
from sqlalchemy.orm import Session



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


@app.post("/api/user-login/")
async def login(email:str,password:str,db:Session = Depends(services.get_db)):
    return await services.authenticate(email,password,db)

@app.get("/api/")
async def root():
    return {"message":"Awesome"}




# @app.post('/')
# def create(request: schemas.ProductBase,db:Session = Depends(get_db)):
#     new_product = models.Products(name=request.name,brand=request.brand,description=request.description,price=request.price,stock=request.stock)
#     db.add(new_product)
#     db.commit()
#     db.refresh(new_product)
#     products = db.query(models.Products).all()
#     return products
#     # return new_product

@app.get("/testing_api/")
async def productsList(db:Session = Depends(services.get_db)):
     products = db.query(models.Products).all()
     return products

# @app.post("/create-items/")
# def create_items(db:Session = Depends(get_db)):
#     url = 'https://dummyjson.com/products?limit=100'
#     response = requests.request('GET',url=url)
#     products = response.json()
#     for item in products["products"]:
#         new_product = models.Products(name=item['title'],brand=item['brand'],description=item['description'],price=item['price'],stock=item['stock'])
#         db.add(new_product)
#         db.commit()
#         db.refresh(new_product)
    
#     return db.query(models.Products).all()


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
