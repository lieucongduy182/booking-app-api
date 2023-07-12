import Hotel from '../models/Hotel';

class HotelController {
  getAllHotels() {
    return Hotel.find({});
  }

  getHotel({ hotelId }) {
    return Hotel.findById(hotelId);
  }

  createHotel({ data }) {
    return Hotel.create(data);
  }

  updateHotel({ hotelId, data }) {
    return Hotel.findByIdAndUpdate(hotelId, data, {
      new: true,
      runValidators: true,
    });
  }

  deleteHotel({ hotelId }) {
    return Hotel.findByIdAndDelete(hotelId, {
      strict: true,
    });
  }
}

export default new HotelController();
