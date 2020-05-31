"""update pwd column

Revision ID: 1a3dfac2b3c3
Revises: 719242ad3a4d
Create Date: 2020-05-31 14:39:36.496073

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1a3dfac2b3c3'
down_revision = '719242ad3a4d'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('login', 'pwd',
                existing_type=sa.String(50),
                type_=sa.String(99))
    pass


def downgrade():
    pass
