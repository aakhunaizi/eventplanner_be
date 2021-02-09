module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      organizer: {
        type: DataTypes.STRING(20),
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          notContains: {
            args: "event",
            msg: "Must not contain the word event",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      numOfSeats: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          max: 10000,
        },
      },
      bookedSeats: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          isGreater() {
            if (this.bookedSeats > this.numOfSeats) {
              throw new Error("All seats have been booked.");
            }
          },
        },
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {
            args: true,
            msg: "Please enter a valid url.",
          },
        },
      },
    },
    { timestamps: false }
  );
  return Event;
};
