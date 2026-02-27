const Booking = require("../models/Booking");
const Service = require("../models/Service");


// ===============================
// Customer creates booking
// ===============================
exports.createBooking = async (req, res) => {
  try {

    const { serviceId, bookingDate, timeSlot } = req.body;

    const service = await Service.findById(serviceId);
    if (!service)
      return res.status(404).json({ message: "Service not found" });

    // 🚫 vendor apni service book na kare
    if (service.vendor.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot book your own service" });
    }

    // ---------- DATE SAFE ----------
    const [year, month, day] = bookingDate.split("-");
    const selectedDate = new Date(year, month - 1, day);

    // ---------- CHECK SERVICE WORKS THAT DAY ----------
    const dateData = service.availability.find(d => {
      const dbDate = new Date(d.date);
      return (
        dbDate.getFullYear() === selectedDate.getFullYear() &&
        dbDate.getMonth() === selectedDate.getMonth() &&
        dbDate.getDate() === selectedDate.getDate()
      );
    });

    if (!dateData)
      return res.status(400).json({ message: "Selected date not available" });

    if (!dateData.slots.includes(timeSlot))
      return res.status(400).json({ message: "Time slot not available" });

    // ---------- REAL SLOT BLOCK CHECK (MOST IMPORTANT) ----------
    const existingBooking = await Booking.findOne({
      vendor: service.vendor,
      bookingDate: selectedDate,
      timeSlot,
      status: { $ne: "cancelled" }
    });

    if (existingBooking)
      return res.status(400).json({ message: "Time slot already booked" });

    // ---------- CREATE ----------
    const booking = await Booking.create({
      customer: req.user._id,
      service: service._id,
      vendor: service.vendor,
      bookingDate: selectedDate,
      timeSlot,
      address: req.body.address,
      city: req.body.city,
      pincode: req.body.pincode,
      contactNumber: req.body.contactNumber
    });

    res.status(201).json({
      message: "Booking successful",
      booking
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// ===============================
// Get my bookings
// ===============================
exports.getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ customer: req.user._id })
    .populate("service", "title price")
    .populate("vendor", "name")
    .sort({ createdAt: -1 });

  res.json(bookings);
};



// ===============================
// Vendor updates booking status
// ===============================
exports.updateBookingStatus = async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id)
      .populate("service");

    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    // ⭐ SERVICE EXISTS CHECK
    if (!booking.service)
      return res.status(400).json({ message: "Service no longer exists" });

    // ⭐ OWNER CHECK
    if (booking.service.vendor.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not your booking" });

    // ⭐ STATUS UPDATE
    booking.status = req.body.status;
    await booking.save();

    res.json({ message: "Booking updated", booking });

  } catch (err) {
    console.log("STATUS UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};





// ===============================
// Cancel booking
// ===============================
exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking)
    return res.status(404).json({ message: "Booking not found" });

  if (booking.customer.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Not your booking" });

  if (booking.status !== "pending")
    return res.status(400).json({ message: "Only pending booking can be cancelled" });

  booking.status = "cancelled";
  await booking.save();

  res.json({ message: "Booking cancelled" });
};



// ===============================
// Vendor requests completion (OTP)
// ===============================
exports.requestCompletion = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    if (booking.vendor.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not your booking" });

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    booking.otp = otp;
    await booking.save();

    console.log("OTP for booking:", otp);

    res.json({ message: "OTP sent to customer" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ===============================
// Verify completion OTP
// ===============================
exports.verifyCompletion = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    if (booking.otp !== req.body.otp)
      return res.status(400).json({ message: "Invalid OTP" });

    booking.status = "completed";
    booking.otpVerified = true;
    await booking.save();

    res.json({ message: "Service completed successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ===============================
// Get booking by ID
// ===============================
exports.getBookingById = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking)
    return res.status(404).json({ message: "Booking not found" });

  res.json(booking);
};

// ===============================
// Get bookings for vendor (NEW)
// ===============================
// ===============================
// Get bookings for vendor (FIXED)
// ===============================
exports.getVendorBookings = async (req,res)=>{
  try{

    const bookings = await Booking.find({ vendor: req.user._id })
      .populate("customer","name email")
      .populate("service","title price")
      .sort({ createdAt:-1 });

    res.json(bookings);

  }catch(err){
    res.status(500).json({message:err.message});
  }
};


