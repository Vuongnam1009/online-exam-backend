const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const permissionSchema = new mongoose.Schema(
  {
    name: String,
    method: String,  // GET, POST, PUT, DELETE
    uri: String,
    type: String, //MENU API
    groupPermission: {
      type: ObjectId,
      ref: 'Group Permission',
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Permission', permissionSchema);
