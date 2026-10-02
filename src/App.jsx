import { useState } from "react";
import {
  Car,
  MapPin,
  Calendar,
  Users,
  Search,
  Plus,
  ArrowRight,
} from "lucide-react";

function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const [rides] = useState([
    {
      id: 1,
      from: "Delhi",
      to: "Gurugram",
      time: "8:30 AM",
      seats: 2,
      price: 150,
      driver: "Rahul",
    },
    {
      id: 2,
      from: "Noida",
      to: "Delhi",
      time: "9:00 AM",
      seats: 3,
      price: 100,
      driver: "Aman",
    },
    {
      id: 3,
      from: "Gurugram",
      to: "Delhi",
      time: "6:30 PM",
      seats: 1,
      price: 180,
      driver: "Priya",
    },
  ]);

  const searchRides = () => {
    alert(
      `Searching rides from ${from || "anywhere"} to ${
        to || "anywhere"
      }${date ? ` on ${date}` : ""}`
    );
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">
          <Car size={28} />
          <span>FlaFla</span>
        </div>

        <button className="post-btn">
          <Plus size={18} />
          Offer a ride
        </button>
      </header>

      <main>
        <section className="hero">
          <h1>Your journey, shared.</h1>

          <p>
            Find people travelling your way and share the ride.
          </p>

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

            <ArrowRight className="arrow" size={22} />

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

            <button className="search-btn" onClick={searchRides}>
              <Search size={20} />
              Search
            </button>
          </div>
        </section>

        <section className="rides-section">
          <div className="section-header">
            <div>
              <h2>Available rides</h2>
              <p>People travelling near you</p>
            </div>

            <button className="filter-btn">
              <Users size={18} />
              2 passengers
            </button>
          </div>

          <div className="rides">
            {rides.map((ride) => (
              <div className="ride-card" key={ride.id}>
                <div className="ride-main">
                  <div className="route">
                    <strong>{ride.from}</strong>
                    <ArrowRight size={18} />
                    <strong>{ride.to}</strong>
                  </div>

                  <div className="ride-details">
                    <span>
                      <Calendar size={16} />
                      {ride.time}
                    </span>

                    <span>
                      <Users size={16} />
                      {ride.seats} seats
                    </span>
                  </div>

                  <p className="driver">
                    Driver: <strong>{ride.driver}</strong>
                  </p>
                </div>

                <div className="ride-price">
                  <strong>₹{ride.price}</strong>
                  <span>per seat</span>

                  <button>View ride</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
