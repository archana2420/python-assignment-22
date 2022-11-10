import sqlalchemy as sql
import sqlalchemy.orm as orm 
import database
import random 
import datetime
import passlib.hash as hash

start_date = datetime.date(2022,1,1)
end_date = datetime.date(2022,10,1)
days_between_dates = (end_date - start_date).days
random_number_of_days = random.randrange(days_between_dates)
random_date = start_date + datetime.timedelta(days=random_number_of_days)

class Products(database.Base):
    __tablename__ = "products"
    id = sql.Column(sql.Integer,primary_key=True,index=True)
    name = sql.Column(sql.String)
    brand = sql.Column(sql.String)
    description = sql.Column(sql.String)
    price = sql.Column(sql.Float)
    stock = sql.Column(sql.Integer,default=50)
    date_of_manufacture = sql.Column(sql.Date,default=random_date)


class User(database.Base):
    __tablename__ = 'users'
    id = sql.Column(sql.Integer,primary_key=True,index=True)
    name = sql.Column(sql.String)
    email = sql.Column(sql.String)
    hashed_password = sql.Column(sql.String)
    wallet = sql.Column(sql.Integer,default=0)

    def verify_password(self,password:str):
        return hash.bcrypt.verify(password,self.hashed_password)

