import { useMemo, useState } from "react";
import "./App.css";

const initialItems = [
  {
    id: 1,
    type: "Lost",
    name: "Black Wallet",
    category: "Personal",
    location: "Library Block",
    date: "2026-09-15",
    description: "Black leather wallet found missing near the library entrance.",
    status: "Lost",
    reporter: {
      name: "Arun Kumar",
      phone: "9876543210",
      email: "arun@example.com",
    },
  },
  {
    id: 2,
    type: "Found",
    name: "Blue Water Bottle",
    category: "Accessories",
    location: "CSE Block",
    date: "2026-09-16",
    description: "Blue insulated bottle found near the first-floor classroom.",
    status: "Found",
    reporter: {
      name: "Meena S",
      phone: "9876501234",
      email: "meena@example.com",
    },
  },
];

function App() {
  const [items, setItems] = useState(initialItems);
  const [activeTab, setActiveTab] = useState("home");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    type: "Lost",
    name: "",
    category: "Personal",
    location: "",
    date: "",
    description: "",
    reporterName: "",
    phone: "",
    email: "",
  });

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || item.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [items, search, filter]);

  const updateForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitReport = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.location ||
      !form.date ||
      !form.reporterName ||
      !form.phone
    ) {
      setMessage("Please fill all required fields.");
      return;
    }

    const newItem = {
      id: Date.now(),
      type: form.type,
      name: form.name,
      category: form.category,
      location: form.location,
      date: form.date,
      description: form.description,
      status: form.type,
      reporter: {
        name: form.reporterName,
        phone: form.phone,
        email: form.email,
      },
    };

    setItems([newItem, ...items]);
    setForm({
      type: "Lost",
      name: "",
      category: "Personal",
      location: "",
      date: "",
      description: "",
      reporterName: "",
      phone: "",
      email: "",
    });

    setMessage("Report submitted successfully!");
    setShowReport(false);
    setActiveTab("items");
  };

  const openClaim = (item) => {
    setSelectedItem(item);
  };

  const closeClaim = () => {
    setSelectedItem(null);
  };

  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="brand">
          <div className="brand-icon">🔎</div>
          <div>
            <h1>Campus<span>Find</span></h1>
            <p>Lost & Found Portal</p>
          </div>
        </div>

        <nav>
          <button
            className={activeTab === "home" ? "active" : ""}
            onClick={() => setActiveTab("home")}
          >
            Home
          </button>

          <button
            className={activeTab === "items" ? "active" : ""}
            onClick={() => setActiveTab("items")}
          >
            Browse Items
          </button>

          <button
            className={activeTab === "storage" ? "active" : ""}
            onClick={() => setActiveTab("storage")}
          >
            Storage
          </button>

          <button
            className="report-btn"
            onClick={() => setShowReport(true)}
          >
            + Report Item
          </button>
        </nav>
      </header>

      {/* MESSAGE */}
      {message && (
        <div className="toast">
          {message}
          <button onClick={() => setMessage("")}>×</button>
        </div>
      )}

      {/* HOME */}
      {activeTab === "home" && (
        <main>

          <section className="hero">
            <div className="hero-content">
              <div className="hero-badge">
                SMART CAMPUS • LOST & FOUND
              </div>

              <h2>
                Find what you lost.
                <br />
                Return what you found.
              </h2>

              <p>
                A centralized campus platform to report, search,
                store and safely return lost belongings.
              </p>

              <div className="hero-actions">
                <button
                  className="primary-btn"
                  onClick={() => setShowReport(true)}
                >
                  Report an Item →
                </button>

                <button
                  className="secondary-btn"
                  onClick={() => setActiveTab("items")}
                >
                  Browse Found Items
                </button>
              </div>
            </div>

            <div className="hero-card">
              <div className="floating-icon">📦</div>
              <h3>One place for everything.</h3>
              <p>
                Reports, item details, finder information,
                owner claims and storage records.
              </p>

              <div className="mini-stat-row">
                <div>
                  <strong>{items.length}</strong>
                  <span>Reports</span>
                </div>
                <div>
                  <strong>
                    {items.filter((i) => i.type === "Found").length}
                  </strong>
                  <span>Found</span>
                </div>
                <div>
                  <strong>
                    {items.filter((i) => i.type === "Lost").length}
                  </strong>
                  <span>Lost</span>
                </div>
              </div>
            </div>
          </section>

          <section className="stats-section">
            <div className="stat-card">
              <span>📋</span>
              <div>
                <strong>{items.length}</strong>
                <p>Total Reports</p>
              </div>
            </div>

            <div className="stat-card">
              <span>🔴</span>
              <div>
                <strong>
                  {items.filter((i) => i.type === "Lost").length}
                </strong>
                <p>Lost Items</p>
              </div>
            </div>

            <div className="stat-card">
              <span>🟢</span>
              <div>
                <strong>
                  {items.filter((i) => i.type === "Found").length}
                </strong>
                <p>Found Items</p>
              </div>
            </div>

            <div className="stat-card">
              <span>🏢</span>
              <div>
                <strong>01</strong>
                <p>Campus Storage</p>
              </div>
            </div>
          </section>

          <section className="features">
            <div className="section-heading">
              <div>
                <span>HOW IT WORKS</span>
                <h2>Simple. Organized. Secure.</h2>
              </div>
            </div>

            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-number">01</div>
                <div className="feature-icon">📝</div>
                <h3>Report</h3>
                <p>
                  Report a lost or found item with complete
                  item and reporter information.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-number">02</div>
                <div className="feature-icon">🗄️</div>
                <h3>Store</h3>
                <p>
                  Found belongings can be recorded and moved
                  to the designated campus storage.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-number">03</div>
                <div className="feature-icon">🔍</div>
                <h3>Search</h3>
                <p>
                  Students can search reported items using
                  name, category or location.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-number">04</div>
                <div className="feature-icon">🤝</div>
                <h3>Return</h3>
                <p>
                  Owners can contact the finder or authorized
                  staff to verify and collect the item.
                </p>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ITEMS */}
      {activeTab === "items" && (
        <main className="page">
          <section className="page-header">
            <div>
              <span>ITEM DIRECTORY</span>
              <h2>Reported Items</h2>
              <p>
                Search and browse all registered campus lost and found items.
              </p>
            </div>

            <button
              className="primary-btn"
              onClick={() => setShowReport(true)}
            >
              + New Report
            </button>
          </section>

          <section className="search-panel">
            <input
              type="text"
              placeholder="Search by item, category or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Items</option>
              <option value="Lost">Lost Items</option>
              <option value="Found">Found Items</option>
            </select>
          </section>

          <section className="items-grid">
            {filteredItems.length === 0 ? (
              <div className="empty-state">
                <div>🔍</div>
                <h3>No matching items</h3>
                <p>Try another search or report a new item.</p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <article className="item-card" key={item.id}>
                  <div className="item-top">
                    <span
                      className={
                        item.type === "Lost"
                          ? "status lost"
                          : "status found"
                      }
                    >
                      {item.type}
                    </span>
                    <span className="item-date">
                      {item.date}
                    </span>
                  </div>

                  <div className="item-icon">
                    {item.type === "Lost" ? "❓" : "📦"}
                  </div>

                  <h3>{item.name}</h3>
                  <span className="category">{item.category}</span>

                  <div className="item-info">
                    <p>📍 {item.location}</p>
                    <p>🗓️ {item.date}</p>
                  </div>

                  <p className="description">
                    {item.description || "No additional description."}
                  </p>

                  <div className="reporter-preview">
                    <span>Reported by</span>
                    <strong>{item.reporter.name}</strong>
                  </div>

                  <button
                    className="claim-btn"
                    onClick={() => openClaim(item)}
                  >
                    View Details & Claim →
                  </button>
                </article>
              ))
            )}
          </section>
        </main>
      )}

      {/* STORAGE */}
      {activeTab === "storage" && (
        <main className="page">
          <section className="page-header">
            <div>
              <span>SECURE STORAGE</span>
              <h2>Campus Lost & Found Storage</h2>
              <p>
                Centralized record of where found belongings are kept.
              </p>
            </div>
          </section>

          <section className="storage-layout">
            <div className="storage-main">
              <div className="storage-icon">🏢</div>
              <h2>Student Affairs Lost & Found Desk</h2>
              <p>
                Main Administrative Block · Ground Floor
              </p>

              <div className="storage-details">
                <div>
                  <span>Storage ID</span>
                  <strong>LF-CAMPUS-001</strong>
                </div>

                <div>
                  <span>Responsible Unit</span>
                  <strong>Student Affairs Office</strong>
                </div>

                <div>
                  <span>Current Items</span>
                  <strong>
                    {items.filter((i) => i.type === "Found").length}
                  </strong>
                </div>

                <div>
                  <span>Verification</span>
                  <strong>Required before release</strong>
                </div>
              </div>
            </div>

            <div className="storage-rules">
              <h3>Storage & Collection Rules</h3>

              <div className="rule">
                <span>01</span>
                <p>Found items must be registered before storage.</p>
              </div>

              <div className="rule">
                <span>02</span>
                <p>Owner identity must be verified before collection.</p>
              </div>

              <div className="rule">
                <span>03</span>
                <p>Item details and collection records are maintained.</p>
              </div>

              <div className="rule">
                <span>04</span>
                <p>Only authorized staff can release stored items.</p>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* REPORT MODAL */}
      {showReport && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="close-btn"
              onClick={() => setShowReport(false)}
            >
              ×
            </button>

            <div className="modal-header">
              <span>NEW REPORT</span>
              <h2>Report a Lost / Found Item</h2>
              <p>
                Provide accurate details so the item can be identified.
              </p>
            </div>

            <form onSubmit={submitReport}>

              <div className="form-section">
                <h3>01 · Item Information</h3>

                <div className="type-selector">
                  <label className={form.type === "Lost" ? "selected" : ""}>
                    <input
                      type="radio"
                      name="type"
                      value="Lost"
                      checked={form.type === "Lost"}
                      onChange={updateForm}
                    />
                    🔴 Lost Item
                  </label>

                  <label className={form.type === "Found" ? "selected" : ""}>
                    <input
                      type="radio"
                      name="type"
                      value="Found"
                      checked={form.type === "Found"}
                      onChange={updateForm}
                    />
                    🟢 Found Item
                  </label>
                </div>

                <div className="form-grid">
                  <div className="field">
                    <label>Item Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={updateForm}
                      placeholder="Example: Black Wallet"
                    />
                  </div>

                  <div className="field">
                    <label>Category *</label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={updateForm}
                    >
                      <option>Personal</option>
                      <option>Electronics</option>
                      <option>Documents</option>
                      <option>Accessories</option>
                      <option>Books</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="field">
                    <label>Location *</label>
                    <input
                      name="location"
                      value={form.location}
                      onChange={updateForm}
                      placeholder="Example: CSE Block"
                    />
                  </div>

                  <div className="field">
                    <label>Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={updateForm}
                    />
                  </div>
                </div>

                <div className="field">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={updateForm}
                    placeholder="Describe colour, brand, identifying marks and other details..."
                    rows="4"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>02 · Reporter / Finder Information</h3>

                <div className="form-grid">
                  <div className="field">
                    <label>Full Name *</label>
                    <input
                      name="reporterName"
                      value={form.reporterName}
                      onChange={updateForm}
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="field">
                    <label>Phone Number *</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={updateForm}
                      placeholder="10-digit phone number"
                    />
                  </div>

                  <div className="field full">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={updateForm}
                      placeholder="yourname@example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="privacy-note">
                🔒 Contact information is collected for safe
                communication and item verification.
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowReport(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="submit-btn">
                  Submit Report →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CLAIM / DETAILS MODAL */}
      {selectedItem && (
        <div className="modal-overlay">
          <div className="modal details-modal">
            <button className="close-btn" onClick={closeClaim}>
              ×
            </button>

            <div className="modal-header">
              <span>{selectedItem.type.toUpperCase()} ITEM</span>
              <h2>{selectedItem.name}</h2>
              <p>{selectedItem.description}</p>
            </div>

            <div className="details-grid">

              <div className="details-box">
                <span>ITEM DETAILS</span>
                <p><strong>Category:</strong> {selectedItem.category}</p>
                <p><strong>Location:</strong> {selectedItem.location}</p>
                <p><strong>Date:</strong> {selectedItem.date}</p>
                <p><strong>Status:</strong> {selectedItem.status}</p>
              </div>

              <div className="details-box">
                <span>REPORTER / FINDER</span>
                <p><strong>Name:</strong> {selectedItem.reporter.name}</p>
                <p><strong>Phone:</strong> {selectedItem.reporter.phone}</p>
                <p><strong>Email:</strong> {selectedItem.reporter.email || "Not provided"}</p>
              </div>

              <div className="details-box">
                <span>COLLECTION / STORAGE</span>
                <p><strong>Storage:</strong> Student Affairs Lost & Found Desk</p>
                <p><strong>Location:</strong> Main Administrative Block</p>
                <p><strong>Verification:</strong> Required</p>
              </div>

              <div className="details-box owner-box">
                <span>OWNER / CLAIM INFORMATION</span>
                <p>
                  If this is your item, contact the reporter or
                  authorized campus staff for verification.
                </p>
                <button className="contact-btn">
                  📞 Contact Reporter
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer>
        <div className="footer-brand">
          <h2>Campus<span>Find</span></h2>
          <p>
            A smarter way to reconnect students with their belongings.
          </p>
        </div>

        <div className="footer-links">
          <span>Lost & Found</span>
          <span>Secure Storage</span>
          <span>Student Verification</span>
          <span>Campus Support</span>
        </div>

        <div className="footer-bottom">
          © 2026 CampusFind · Campus Lost & Found Management System
        </div>
      </footer>

    </div>
  );
}

export default App;