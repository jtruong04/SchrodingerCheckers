"""added games table

Revision ID: d31866a7ec4c
Revises: 6ab33a58dae6
Create Date: 2020-06-15 20:01:01.277216

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd31866a7ec4c'
down_revision = '6ab33a58dae6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('games',
    sa.Column('index', sa.INTEGER(), nullable=False),
    sa.Column('winner', sa.VARCHAR(length=100), nullable=True),
    sa.Column('loser', sa.VARCHAR(length=100), nullable=True),
    sa.Column('w_moves', sa.INTEGER(), nullable=True),
    sa.Column('l_moves', sa.INTEGER(), nullable=True),
    sa.Column('time', sa.INTEGER(), nullable=True),
    sa.PrimaryKeyConstraint('index')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('games')
    # ### end Alembic commands ###