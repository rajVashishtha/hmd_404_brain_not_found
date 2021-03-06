"""bag_sizes table

Revision ID: fb7bd3ea9a02
Revises: 506775485dfb
Create Date: 2020-11-04 08:42:01.980729

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fb7bd3ea9a02'
down_revision = '506775485dfb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bag_sizes',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('volume', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('bag_sizes')
    # ### end Alembic commands ###
