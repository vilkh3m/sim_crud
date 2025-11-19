from sqlalchemy.orm import Session
from sqlalchemy import or_
from models import User, Item
from schemas import UserCreate, ItemCreate, ItemUpdate
from auth import get_password_hash
from typing import Optional, List


# User CRUD
def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()


def get_user_by_username(db: Session, username: str) -> Optional[User]:
    return db.query(User).filter(User.username == username).first()


def create_user(db: Session, user: UserCreate) -> User:
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        username=user.username,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# Item CRUD
def get_items(db: Session, user_id: int, skip: int = 0, limit: int = 100) -> List[Item]:
    return db.query(Item).filter(Item.owner_id == user_id).offset(skip).limit(limit).all()


def get_item(db: Session, item_id: int, user_id: int) -> Optional[Item]:
    return db.query(Item).filter(Item.id == item_id, Item.owner_id == user_id).first()


def create_item(db: Session, item: ItemCreate, user_id: int) -> Item:
    db_item = Item(**item.dict(), owner_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def update_item(db: Session, item_id: int, item: ItemUpdate, user_id: int) -> Optional[Item]:
    db_item = get_item(db, item_id, user_id)
    if db_item is None:
        return None

    update_data = item.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_item, field, value)

    db.commit()
    db.refresh(db_item)
    return db_item


def delete_item(db: Session, item_id: int, user_id: int) -> bool:
    db_item = get_item(db, item_id, user_id)
    if db_item is None:
        return False

    db.delete(db_item)
    db.commit()
    return True
