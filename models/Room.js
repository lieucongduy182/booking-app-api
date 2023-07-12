import { Schema, model } from 'mongoose';

const RoomSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    maxPeople: {
      type: Number,
      require: true,
    },
    roomNumbers: [{ number: Number, unavailableDates: [Date] }],
  },
  {
    timestamps: true,
  },
);

const Room = model('Room', RoomSchema);

export default Room;
