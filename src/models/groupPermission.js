const mongoose = require('mongoose');
const groupPermissionSchema = new mongoose.Schema(
    {
        name: String
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

module.exports = mongoose.model('Group Permission',groupPermissionSchema)