import unittest


from ..tables.user_table import Users
from ..tables.bae_table import base_table, db


class TestUserModel(base_table):

    def test_encode_auth_token(self):
        user = Users(
            email='test@test.com',
            password='test'
        )
        db.session.add(user)
        db.session.commit()
        auth_token = user.encode_auth_token(user.id)
        self.assertTrue(isinstance(auth_token, bytes))

if __name__ == '__main__':
    unittest.main()