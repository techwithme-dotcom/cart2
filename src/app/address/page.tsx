/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import './address.css'

export default function AddressPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    number: "",
    pin: "",
    city: "",
    state: "AP",
    flat: "",
    area: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") { // extra safety
      const addresses = localStorage.getItem('address');
      if (addresses) {
        try {
          const savedAddress = JSON.parse(addresses);
          if (savedAddress?.name) {
            setForm(savedAddress);
          }
        } catch (err) {
          console.error("Error parsing saved address:", err);
        }
      }
    }
  }, []);


  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('address', JSON.stringify(form))
    router.push("/order-summary");
  };

  const goBack = () => {
    router.back(); // takes user to previous page in history
  };

  return (
    <main>
      <div className="container-fluid p-3 header-container" style={{ position: 'relative' }}>
        <div className="row header">
          <div className="col-1">
            <div className="menu-icon" id="back_btn" onClick={goBack}>
              <img src={`/assets/images/theme/back_dark.svg`} alt="logo" />
            </div>
          </div>
          <div className="col-8">
            <div className="menu-logo">
              <h4 className="mb-0 mt-1 ms-2">Add delivery address</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="_1fhgRH max-height mb-70">
        <div className="card py-1 max-height" style={{ border: 'none' }}>
          <div className="progress-box">
            <img className="w-100" src={`/assets/images/theme/progress-indicator-address.svg`} alt="progress" />
          </div>
          <form onSubmit={onSubmit} className="card-body">
            <div className="form-floating mb-3">
              <input className="form-control" type="text" placeholder="Full name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <label>Full Name (Required)*</label>
            </div>
            <div className="form-floating mb-3">
              <input className="form-control" type="text" placeholder="Mobile number" required value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} />
              <label>Mobile number (Required)*</label>
            </div>
            <div className="form-floating mb-3">
              <input className="form-control" type="text" placeholder="PIN code" required value={form.pin} onChange={(e) => setForm({ ...form, pin: e.target.value })} />
              <label>Pincode (Required)*</label>
            </div>
            <div className="row">
              <div className="col-6 form-floating">
                <input className="form-control" type="text" placeholder="Town/City" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                <label>City (Required)*</label>
              </div>
              <div className="col-6 form-floating">
                <select className="form-select" required value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })}>
                  <option value="AP">Andhra Pradesh</option>
                  <option value="AR">Arunachal Pradesh</option>
                  <option value="AS">Assam</option>
                  <option value="BR">Bihar</option>
                  <option value="CT">Chhattisgarh</option>
                  <option value="GA">Goa</option>
                  <option value="GJ">Gujarat</option>
                  <option value="HR">Haryana</option>
                  <option value="HP">Himachal Pradesh</option>
                  <option value="JK">Jammu & Kashmir</option>
                  <option value="JH">Jharkhand</option>
                  <option value="KA">Karnataka</option>
                  <option value="KL">Kerala</option>
                  <option value="MP">Madhya Pradesh</option>
                  <option value="MH">Maharashtra</option>
                  <option value="MN">Manipur</option>
                  <option value="ML">Meghalaya</option>
                  <option value="MZ">Mizoram</option>
                  <option value="NL">Nagaland</option>
                  <option value="OR">Odisha</option>
                  <option value="PB">Punjab</option>
                  <option value="RJ">Rajasthan</option>
                  <option value="SK">Sikkim</option>
                  <option value="TN">Tamil Nadu</option>
                  <option value="TS">Telangana</option>
                  <option value="TR">Tripura</option>
                  <option value="UK">Uttarakhand</option>
                  <option value="UP">Uttar Pradesh</option>
                  <option value="WB">West Bengal</option>
                  <option value="AN">Andaman & Nicobar</option>
                  <option value="CH">Chandigarh</option>
                  <option value="DN">Dadra and Nagar Haveli</option>
                  <option value="DD">Daman & Diu</option>
                  <option value="DL">Delhi</option>
                  <option value="LD">Lakshadweep</option>
                  <option value="PY">Puducherry</option>
                </select>
                <label>State (Required)*</label>
              </div>
            </div>
            <div className="form-floating mb-3">
              <input className="form-control" type="text" placeholder="House No., Building Name" value={form.flat} onChange={(e) => setForm({ ...form, flat: e.target.value })} />
              <label>House No., Building Name (Required)*</label>
            </div>
            <div className="form-floating mb-3">
              <input className="form-control" type="text" placeholder="Road name, Area, Colony" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} />
              <label>Road name, Area, Colony (Required)*</label>
            </div>
            <div className="card-footer px-0">
              <button className="common-button" type="submit" style={{ width: "100%", background: "#FFC107", border: "none", color: "black", fontWeight: 600 }}>Save Address</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}


