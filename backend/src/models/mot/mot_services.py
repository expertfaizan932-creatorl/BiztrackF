from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from sqlalchemy import Column, String, Numeric, Boolean, Integer, ForeignKey, UniqueConstraint, Index, Text, DateTime, text
from sqlalchemy.dialects.postgresql import UUID

from ...config.database_config import Base


class MotService(Base):
    __tablename__ = "mot_services"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    tenant_id = Column(UUID(as_uuid=True), ForeignKey("tenants.id", ondelete="CASCADE"), nullable=False, index=True)

    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    price = Column(Numeric(10, 2), nullable=False, default=Decimal("0.00"))

    is_active = Column(Boolean, nullable=False, default=True, index=True)
    display_order = Column(Integer, nullable=False, default=0, index=True)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    __table_args__ = (
        UniqueConstraint("tenant_id", "name", name="uq_mot_services_tenant_name"),
        Index("ix_mot_services_tenant_active_order", "tenant_id", "is_active", "display_order"),
    )
