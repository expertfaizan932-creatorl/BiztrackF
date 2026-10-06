from __future__ import annotations

from decimal import Decimal
from typing import List, Optional
from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy import and_, desc, asc
from sqlalchemy.orm import Session

from .....models.mot.mot_services import MotService
from .schemas import MotServiceCreate, MotServiceUpdate


def _default_services(tenant_id: UUID) -> List[dict]:
    return [
        {"tenant_id": tenant_id, "name": "Oil & Filter", "price": Decimal("79.00"), "is_active": True, "display_order": 1},
        {"tenant_id": tenant_id, "name": "Brakes", "price": Decimal("149.00"), "is_active": True, "display_order": 2},
        {"tenant_id": tenant_id, "name": "Full Service", "price": Decimal("199.00"), "is_active": True, "display_order": 3},
        {"tenant_id": tenant_id, "name": "Tyre rotation", "price": Decimal("39.00"), "is_active": True, "display_order": 4},
        {"tenant_id": tenant_id, "name": "Air-con", "price": Decimal("89.00"), "is_active": True, "display_order": 5},
        {"tenant_id": tenant_id, "name": "Battery", "price": Decimal("120.00"), "is_active": True, "display_order": 6},
        {"tenant_id": tenant_id, "name": "Wheel alignment", "price": Decimal("65.00"), "is_active": True, "display_order": 7},
    ]


def ensure_default_mot_services(db: Session, tenant_id: UUID) -> List[MotService]:
    existing = db.query(MotService).filter(MotService.tenant_id == tenant_id).count()
    if existing == 0:
        for s in _default_services(tenant_id):
            db.add(MotService(**s))
        db.commit()
    return get_mot_services(db, tenant_id, active_only=True)


def get_mot_services(db: Session, tenant_id: UUID, active_only: bool = False, include_inactive: bool = False) -> List[MotService]:
    q = db.query(MotService).filter(MotService.tenant_id == tenant_id)
    if active_only and not include_inactive:
        q = q.filter(MotService.is_active == True)
    return q.order_by(asc(MotService.display_order), asc(MotService.name)).all()


def get_mot_service(db: Session, tenant_id: UUID, service_id: UUID) -> MotService:
    svc = db.query(MotService).filter(and_(MotService.tenant_id == tenant_id, MotService.id == service_id)).first()
    if not svc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="MOT service not found")
    return svc


def create_mot_service(db: Session, tenant_id: UUID, payload: MotServiceCreate) -> MotService:
    if payload.name:
        exists = db.query(MotService).filter(and_(MotService.tenant_id == tenant_id, MotService.name == payload.name)).first()
        if exists:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Service with this name already exists")
    svc = MotService(tenant_id=tenant_id, **payload.model_dump())
    db.add(svc)
    db.commit()
    db.refresh(svc)
    return svc


def update_mot_service(db: Session, tenant_id: UUID, service_id: UUID, payload: MotServiceUpdate) -> MotService:
    svc = get_mot_service(db, tenant_id, service_id)
    data = payload.model_dump(exclude_unset=True)
    if data.get("name"):
        exists = db.query(MotService).filter(and_(MotService.tenant_id == tenant_id, MotService.name == data["name"], MotService.id != service_id)).first()
        if exists:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Service with this name already exists")
    for k, v in data.items():
        setattr(svc, k, v)
    db.commit()
    db.refresh(svc)
    return svc


def delete_mot_service(db: Session, tenant_id: UUID, service_id: UUID) -> None:
    svc = get_mot_service(db, tenant_id, service_id)
    db.delete(svc)
    db.commit()
