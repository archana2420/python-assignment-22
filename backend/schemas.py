import pydantic as pydantic 
import datetime

class ProductBase(pydantic.BaseModel):
    name:str 
    brand:str 
    description:str 
    price:int 
    stock:int 
    
    

class Product(ProductBase):
    id:int 
    date_of_manufacture:datetime.date

    class Config:
        orm_mode = True

class UserBase(pydantic.BaseModel):
    name:str
    email:str 
    

class UserCreate(UserBase):
    hashed_password:str 

class User(UserBase):
    id:int 
    wallet:int 

    class Config:
        orm_mode = True