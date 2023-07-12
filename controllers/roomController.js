import Hotel from '../models/Hotel';
import Room from '../models/Room';

class RoomController {
  getRooms() {
    return Room.find({});
  }

  getRoom({ roomId }) {
    return Room.findById(roomId);
  }

  async createRoom({ hotelId, data }) {
    const room = await Room.create(data);

    if (room) {
      const option = {
        $push: { rooms: room._id },
      };
      await Hotel.findByIdAndUpdate(hotelId, option, {
        new: true,
        runValidators: true,
      });
    }

    return room;
  }

  updateRoom({ roomId, data }) {
    return Room.findByIdAndUpdate(roomId, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteRoom({ roomId, hotelId }) {
    const room = Room.findByIdAndDelete(roomId, {
      strict: true,
    });

    if (room) {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: roomId },
      });
    }

    return room;
  }
}

export default new RoomController();
