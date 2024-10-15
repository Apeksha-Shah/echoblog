import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [50, 'Username cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    minlength: [5, 'Email must be at least 5 characters long'],
    maxlength: [100, 'Email cannot exceed 100 characters'],
    validate: {
      validator: function (v) {
       
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    maxlength: [1024, 'Password cannot exceed 1024 characters']
  },
  firstName: {
    type: String,
    minlength: [1, 'First name must be at least 1 character long'],
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    minlength: [1, 'Last name must be at least 1 character long'],
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  profilePicture: {
    type: String,
    default: 'https://example.com/default-profile.png' 
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: [true, 'Role ID is required']
  }
});


const User = mongoose.model('User', userSchema);

export default User;
