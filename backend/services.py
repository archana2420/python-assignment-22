import database 
import sqlalchemy.orm as orm
from sqlalchemy.orm import Session
import schemas
import models
import jwt
import fastapi
from fastapi import Depends,security
import passlib.hash as hash

JWT_SECRET_KEY ='secret'

oauth2schema = security.OAuth2PasswordBearer(tokenUrl="/api/token/")

def create_database():
    return database.Base.metadata.create_all(bind=database.engine)

def get_db():
    db = database.SessionLocal()
    try:
        yield db 
    except:
        print("error")
    finally:
        db.close()

async def get_user_by_email(email:str,db:Session):
    return db.query(models.User).filter(models.User.email==email).first()

async def create_user(user:schemas.UserCreate,db:Session):
    user_obj = models.User(name=user.name,email=user.email,hashed_password=hash.bcrypt.hash(user.hashed_password))
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)
    return user_obj

async def authenticate(email:str,password:str,db:Session):
    user = await get_user_by_email(email,db)
    if not user:
        return False
    if not user.verify_password(password):
        return False

    return user

async def create_token(user:models.User):
    user_obj = schemas.User.from_orm(user)
    token = jwt.encode(user_obj.dict(),JWT_SECRET_KEY)

    return dict(access_token=token,token_type="bearer")

async def get_current_user(db:Session = Depends(get_db),token:str = Depends(oauth2schema)):
    try:
        payload = jwt.decode(token,JWT_SECRET_KEY,algorithms=["HS256"])
        user = db.query(models.User).get(payload["id"])
    except:
        raise fastapi.HTTPException(status_code=401,detail="Invalid Email or Password")

    return schemas.User.from_orm(user)

    