import { model } from 'mongoose';
import { Schema } from 'mongoose';

let UserSchema = new Schema({
    name: { type: String },
    password: { type: String }
});

let User = model('User', UserSchema);

export { User };