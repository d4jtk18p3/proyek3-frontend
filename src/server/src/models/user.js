import Sequelize from 'sequelize'

import db from '../db'

const User = db.define('User', {
  email: {
    type: Sequelize.DataTypes.STRING
  }
})

export default User
