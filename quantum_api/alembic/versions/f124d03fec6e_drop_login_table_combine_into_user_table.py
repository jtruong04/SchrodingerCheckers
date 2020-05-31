"""drop login-table, combine into user table

Revision ID: f124d03fec6e
Revises: 1a3dfac2b3c3
Create Date: 2020-05-31 14:47:48.371103

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f124d03fec6e'
down_revision = '1a3dfac2b3c3'
branch_labels = None
depends_on = None


def upgrade():
    op.drop_constraint('user_name_to_login_link', 'user_information', type_='foreignkey')
    op.drop_table('login')
    op.add_column('user_information', sa.Column('pwd', sa.String(99), nullable=False))
    pass



def downgrade():
    pass
