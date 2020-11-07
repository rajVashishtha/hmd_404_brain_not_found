"""name not unique

Revision ID: 3de2e4b91312
Revises: 294731fec6c6
Create Date: 2020-11-05 11:20:31.151660

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3de2e4b91312'
down_revision = '294731fec6c6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_blood_banks_name', table_name='blood_banks')
    op.add_column('users', sa.Column('name', sa.String(length=64), nullable=False))
    op.drop_index('ix_users_username', table_name='users')
    op.drop_column('users', 'username')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('username', sa.VARCHAR(length=64), autoincrement=False, nullable=False))
    op.create_index('ix_users_username', 'users', ['username'], unique=True)
    op.drop_column('users', 'name')
    op.create_index('ix_blood_banks_name', 'blood_banks', ['name'], unique=True)
    # ### end Alembic commands ###
