import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  role_name: {
    type: String,
    required: [true, 'Role name is required'],
    enum: ['user', 'admin'],
    unique: true
  }
});

const Role = mongoose.model('Role', roleSchema);

export default Role;
