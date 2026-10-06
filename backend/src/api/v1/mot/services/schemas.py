from __future__ import annotations

from decimal import Decimal
from typing import List, Optional
from uuid import UUID

from pydantic import BaseModel, Field


class MotServiceBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None
    price: Decimal = Field(..., ge=0)
    is_active: bool = True
    display_order: int = Field(0, ge=0)


class MotServiceCreate(MotServiceBase):
    pass


class MotServiceUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None
    price: Optional[Decimal] = Field(None, ge=0)
    is_active: Optional[bool] = None
    display_order: Optional[int] = Field(None, ge=0)


class MotServiceResponse(MotServiceBase):
    id: UUID
    tenant_id: UUID

    class Config:
        from_attributes = True


class MotServiceListResponse(BaseModel):
    items: List[MotServiceResponse]
    total: int = 0
