"""add back

Revision ID: 6ab33a58dae6
Revises: 020cfe1e3cd7
Create Date: 2020-06-15 18:28:06.075972

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6ab33a58dae6'
down_revision = '020cfe1e3cd7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('usr_name', sa.VARCHAR(length=100), nullable=False),
    sa.Column('first_name', sa.VARCHAR(length=100), nullable=True),
    sa.Column('last_name', sa.VARCHAR(length=100), nullable=True),
    sa.Column('email', sa.VARCHAR(length=100), nullable=True),
    sa.Column('location', sa.VARCHAR(length=100), nullable=True),
    sa.Column('pwd', sa.VARCHAR(length=100), nullable=True),
    sa.Column('rank', sa.INTEGER(), nullable=True),
    sa.PrimaryKeyConstraint('usr_name')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    # ### end Alembic commands ###
