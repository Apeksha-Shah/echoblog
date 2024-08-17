import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema({
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: [true, 'Role ID is required']
  },
  permission_name: {
    type: String,
    required: [true, 'Permission name is required'],
    minlength: [1, 'Permission name must be at least 1 character long'],
    maxlength: [100, 'Permission name cannot exceed 100 characters']
  }
});

const Permission = mongoose.model('Permission', permissionSchema);

export default Permission;
