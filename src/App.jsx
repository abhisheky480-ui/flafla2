import { useState } from "react";
import {
  Car,
  MapPin,
  Calendar,
  Users,
  Search,
  Plus,
  ArrowRight,
  X,
  CheckCircle,
} from "lucide-react";

function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);

  const [showResults, setShowResults] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [showOfferRide, setShowOfferRide] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const [newRide, setNewRide] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    seats: 1,
    price: "",
    driver: "You",
  });

  const [rides, setRides] = useState([
    {
      id: 1,
      from: "Delhi",
      to: "Gurugram",
      time: "8:30 AM",
      date: "Today",
      seats: 2,
      price: 150,
      driver: "Rahul",
      rating: 4.8,
      car: "Maruti Suzuki",
    },
    {
      id: 2,
      from: "Noida",
      to: "Delhi",
      time: "9:00 AM",
      date: "Today",
      seats: 3,
      price: 100,
      driver: "Aman",
      rating: 4.7,
      car: "Hyundai i20",
    },
    {
      id: 3,
      from: "Gurugram",
      to: "Delhi",
      time: "6:30 PM",
      date: "Today",
      seats: 1,
      price: 180,
      driver: "Priya",
      rating: 4.9,
      car: "Honda City",
    },
  ]);

  const searchRides = () => {
    setShowResults(true);
  };

  const filteredRides = rides.filter((ride) => {
    const matchesFrom =
      !from || ride.from.toLowerCase().includes(from.toLowerCase());

    const matchesTo =
      !to || ride.to.toLowerCase().includes(to.toLowerCase());

    return matchesFrom && matchesTo && ride.seats >= passengers;
  });

  const bookRide = () => {
    setBookingConfirmed(true);
  };

  const addRide = () => {
    if (
      !newRide.from ||
      !newRide.to ||
      !newRide.time ||
      !newRide.price
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const ride = {
      id: rides.length + 1,
      from: newRide.from,
      to: newRide.to,
      time: newRide.time,
      date: newRide.date || "Today",
      seats: Number(newRide.seats),
      price: Number(newRide.price),
      driver: newRide.driver,
      rating: 5.0,
      car: "Your car",
    };

    setRides([...rides, ride]);
    setShowOfferRide(false);

    setNewRide({
      from: "",
      to: "",
      date: "",
      time: "",
      seats: 1,
      price: "",
      driver: "You",
    });
  };

  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">
          <Car size={30} />
          <span>FlaFla</span>
        </div>

        <button
          className="post-btn"
          onClick={() => setShowOfferRide(true)}
        >
          <Plus size={18} />
          Offer a ride
        </button>
      </header>

      <main>

        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <h1>Your journey, shared.</h1>

            <p>
              Find people travelling your way and share the ride.
            </p>

            {/* SEARCH CARD */}
            <div className="search-card">

              <div className="input-box">
                <MapPin size={20} />
                <input
                  type="text"
                  placeholder="Leaving from"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>

              <ArrowRight className="arrow" size={20} />

              <div className="input-box">
                <MapPin size={20} />
                <input
                  type="text"
                  placeholder="Going to"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>

              <div className="input-box">
                <Calendar size={20} />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="input-box">
                <Users size={20} />

                <select
                  value={passengers}
                  onChange={(e) =>
                    setPassengers(Number(e.target.value))
                  }
                >
                  <option value={1}>1 passenger</option>
                  <option value={2}>2 passengers</option>
                  <option value={3}>3 passengers</option>
                  <option value={4}>4 passengers</option>
                </select>
              </div>

              <button
                className="search-btn"
                onClick={searchRides}
              >
                <Search size={20} />
                Search
              </button>
            </div>
          </div>
        </section>

        {/* RIDES */}
        <section className="rides-section">

          <div className="section-header">
            <div>
              <h2>
                {showResults ? "Available rides" : "Popular rides"}
              </h2>

              <p>
                {showResults
                  ? `${filteredRides.length} rides found`
                  : "People travelling near you"}
              </p>
            </div>

            <button
              className="filter-btn"
              onClick={() => setShowResults(true)}
            >
              <Users size={18} />
              {passengers} passenger
              {passengers > 1 ? "s" : ""}
            </button>
          </div>

          {filteredRides.length === 0 ? (
            <div className="empty-state">
              <Car size={45} />
              <h3>No rides found</h3>
              <p>
                Try changing your locations or passenger count.
              </p>
            </div>
          ) : (
            <div className="rides">

              {filteredRides.map((ride) => (
                <div className="ride-card" key={ride.id}>

                  <div className="ride-main">

                    {/* ROUTE */}
                    <div className="route">
                      <strong>{ride.from}</strong>

                      <ArrowRight size={18} />

                      <strong>{ride.to}</strong>
                    </div>

                    {/* DETAILS */}
                    <div className="ride-details">

                      <span>
                        <Calendar size={16} />
                        {ride.date}
                      </span>

                      <span>
                        {ride.time}
                      </span>

                      <span>
                        <Users size={16} />
                        {ride.seats} seat
                        {ride.seats > 1 ? "s" : ""}
                      </span>

                    </div>

                    {/* DRIVER */}
                    <div className="driver">

                      <div className="driver-avatar">
                        {ride.driver.charAt(0)}
                      </div>

                      <div>
                        <p>
                          Driver: <strong>{ride.driver}</strong>
                        </p>

                        <small>
                          ★ {ride.rating} · {ride.car}
                        </small>
                      </div>

                    </div>

                  </div>

                  {/* PRICE */}
                  <div className="ride-price">

                    <strong>₹{ride.price}</strong>

                    <span>per seat</span>

                    <button
                      onClick={() => {
                        setSelectedRide(ride);
                        setBookingConfirmed(false);
                      }}
                    >
                      View ride
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}
        </section>

        {/* WHY FLAFla */}
        <section className="why-section">

          <h2>Why ride with FlaFla?</h2>

          <div className="benefits">

            <div>
              <CheckCircle size={25} />
              <h3>Save money</h3>
              <p>
                Share travel costs with people going your way.
              </p>
            </div>

            <div>
              <CheckCircle size={25} />
              <h3>Meet people</h3>
              <p>
                Travel together and make your journey social.
              </p>
            </div>

            <div>
              <CheckCircle size={25} />
              <h3>Travel smarter</h3>
              <p>
                Reduce empty seats and make better use of every car.
              </p>
            </div>

          </div>

        </section>

      </main>

      {/* RIDE DETAILS MODAL */}
      {selectedRide && (
        <div className="modal-overlay">

          <div className="modal">

            <button
              className="close-btn"
              onClick={() => setSelectedRide(null)}
            >
              <X size={22} />
            </button>

            {!bookingConfirmed ? (
              <>
                <div className="modal-icon">
                  <Car size={30} />
                </div>

                <h2>
                  {selectedRide.from} → {selectedRide.to}
                </h2>

                <p className="modal-subtitle">
                  {selectedRide.date} · {selectedRide.time}
                </p>

                <div className="ride-summary">

                  <div>
                    <span>Driver</span>
                    <strong>{selectedRide.driver}</strong>
                  </div>

                  <div>
                    <span>Rating</span>
                    <strong>★ {selectedRide.rating}</strong>
                  </div>

                  <div>
                    <span>Car</span>
                    <strong>{selectedRide.car}</strong>
                  </div>

                  <div>
                    <span>Available seats</span>
                    <strong>{selectedRide.seats}</strong>
                  </div>

                </div>

                <div className="modal-price">
                  <span>Price per seat</span>
                  <strong>₹{selectedRide.price}</strong>
                </div>

                <button
                  className="confirm-btn"
                  onClick={bookRide}
                >
                  Book this ride
                </button>
              </>
            ) : (
              <div className="confirmation">

                <CheckCircle size={55} />

                <h2>Ride booked!</h2>

                <p>
                  Your seat with {selectedRide.driver} has been
                  requested successfully.
                </p>

                <button
                  className="confirm-btn"
                  onClick={() => setSelectedRide(null)}
                >
                  Done
                </button>

              </div>
            )}

          </div>

        </div>
      )}

      {/* OFFER RIDE MODAL */}
      {showOfferRide && (
        <div className="modal-overlay">

          <div className="modal offer-modal">

            <button
              className="close-btn"
              onClick={() => setShowOfferRide(false)}
            >
              <X size={22} />
            </button>

            <h2>Offer a ride</h2>

            <p className="modal-subtitle">
              Tell passengers about your journey.
            </p>

            <div className="form">

              <label>Leaving from</label>

              <input
                type="text"
                placeholder="e.g. Delhi"
                value={newRide.from}
                onChange={(e) =>
                  setNewRide({
                    ...newRide,
                    from: e.target.value,
                  })
                }
              />

              <label>Going to</label>

              <input
                type="text"
                placeholder="e.g. Gurugram"
                value={newRide.to}
                onChange={(e) =>
                  setNewRide({
                    ...newRide,
                    to: e.target.value,
                  })
                }
              />

              <label>Date</label>

              <input
                type="date"
                value={newRide.date}
                onChange={(e) =>
                  setNewRide({
                    ...newRide,
                    date: e.target.value,
                  })
                }
              />

              <label>Departure time</label>

              <input
                type="text"
                placeholder="e.g. 8:30 AM"
                value={newRide.time}
                onChange={(e) =>
                  setNewRide({
                    ...newRide,
                    time: e.target.value,
                  })
                }
              />

              <label>Available seats</label>

              <select
                value={newRide.seats}
                onChange={(e) =>
                  setNewRide({
                    ...newRide,
                    seats: e.target.value,
                  })
                }
              >
                <option value={1}>1 seat</option>
                <option value={2}>2 seats</option>
                <option value={3}>3 seats</option>
                <option value={4}>4 seats</option>
              </select>

              <label>Price per seat</label>

              <input
                type="number"
                placeholder="₹150"
                value={newRide.price}
                onChange={(e) =>
                  setNewRide({
                    ...newRide,
                    price: e.target.value,
                  })
                }
              />

              <button
                className="confirm-btn"
                onClick={addRide}
              >
                <Plus size={18} />
                Publish ride
              </button>

            </div>

          </div>

        </div>
      )}

      {/* FOOTER */}
      <footer>
        <div className="logo">
          <Car size={22} />
          <span>FlaFla</span>
        </div>

        <p>Share the journey. Make travel better.</p>
      </footer>

    </div>
  );
}

export default App;
