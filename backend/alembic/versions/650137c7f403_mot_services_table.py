"""mot_services_table

Revision ID: 650137c7f403
Revises: x1y2z3a4b5c6
Create Date: 2026-10-06 14:21:26.886976

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = '650137c7f403'
down_revision: Union[str, None] = 'x1y2z3a4b5c6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('mot_services',
    sa.Column('id', postgresql.UUID(as_uuid=True), server_default=sa.text('gen_random_uuid()'), nullable=False),
    sa.Column('tenant_id', sa.UUID(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('price', sa.Numeric(precision=10, scale=2), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False, default=True),
    sa.Column('display_order', sa.Integer(), nullable=False, default=0),
    sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.text('now()')),
    sa.Column('updated_at', sa.DateTime(), nullable=False, server_default=sa.text('now()')),
    sa.ForeignKeyConstraint(['tenant_id'], ['tenants.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('tenant_id', 'name', name='uq_mot_services_tenant_name')
    )
    op.create_index('ix_mot_services_display_order', 'mot_services', ['display_order'], unique=False)
    op.create_index('ix_mot_services_is_active', 'mot_services', ['is_active'], unique=False)
    op.create_index('ix_mot_services_tenant_active_order', 'mot_services', ['tenant_id', 'is_active', 'display_order'], unique=False)
    op.create_index('ix_mot_services_tenant_id', 'mot_services', ['tenant_id'], unique=False)


def downgrade() -> None:
    op.drop_index('ix_mot_services_tenant_id', table_name='mot_services')
    op.drop_index('ix_mot_services_tenant_active_order', table_name='mot_services')
    op.drop_index('ix_mot_services_is_active', table_name='mot_services')
    op.drop_index('ix_mot_services_display_order', table_name='mot_services')
    op.drop_table('mot_services')