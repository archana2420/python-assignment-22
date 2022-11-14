import pydantic as pydantic 
import datetime

class ProductBase(pydantic.BaseModel):
    name:str 
    brand:str 
    description:str 
    price:int 
    stock:int 
    thumbnail:str
    
    

class Product(ProductBase):
    id:int 
    date_of_manufacture:datetime.date

    class Config:
        orm_mode = True

class UserBase(pydantic.BaseModel):
    name:str
    email:str 

class UserAddMoney(pydantic.BaseModel):
    id:int
    wallet:int

class UserCreate(UserBase):
    hashed_password:str 

class User(UserBase):
    id:int 
    wallet:int 

    class Config:
        orm_mode = True

class Weather(pydantic.BaseModel):
    city:str

class BuyItem(pydantic.BaseModel):
    product_id:int 
    product_stock:int
    user_id:int 

class GetProduct(pydantic.BaseModel):
    product_name:str
    