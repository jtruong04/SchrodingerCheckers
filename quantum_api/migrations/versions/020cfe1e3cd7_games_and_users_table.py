"""games and users table

Revision ID: 020cfe1e3cd7
Revises: fbac2cd4c501
Create Date: 2020-06-15 06:07:33.565456

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '020cfe1e3cd7'
down_revision = 'fbac2cd4c501'
branch_labels = None
depends_on = None


def upgrade():
    op.drop_table('user_information')


def downgrade():
    pass
