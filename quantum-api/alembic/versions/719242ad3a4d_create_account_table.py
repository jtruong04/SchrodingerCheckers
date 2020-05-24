"""create account table

Revision ID: 719242ad3a4d
Revises: 
Create Date: 2020-05-23 07:43:24.449823

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '719242ad3a4d'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'user_information',
        sa.Column('usr_name', sa.String(50), primary_key=True),
        sa.Column('First_Name', sa.String(50), nullable=False),
        sa.Column('Last_Name', sa.String(50), nullable=False),
        sa.Column('email', sa.String(50), nullable=False),
        sa.Column('location', sa.String(50), nullable=True),
    )
    op.create_table(
        'login',
        sa.Column('usr_name', sa.String(50), primary_key=True),
        sa.Column('pwd', sa.String(50), nullable=False)
    )
    op.create_foreign_key(
        "user_name_to_login_link", "user_information",
        "login", ["usr_name"], ["usr_name"])
    pass


def downgrade():
    pass
