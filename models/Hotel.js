import { Schema, model } from 'mongoose';

const HotelSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  type: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  distance: {
    type: String,
    require: true,
  },
  photos: {
    type: [String],
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Room',
    },
  ],
  cheapestPrice: {
    type: Number,
    require: true,
  },
  featured: {
    type: Boolean,
  },
});

HotelSchema.pre(/^find/, function (next) {
  this.select('-__v');

  // this.populate({
  //   path: 'rooms',
  //   select: '-__v',
  // });

  next();
});

const Hotel = model('Hotel', HotelSchema);

export default Hotel;
