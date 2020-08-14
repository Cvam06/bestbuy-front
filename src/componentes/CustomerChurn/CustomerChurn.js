import React, { useState, useEffect } from "react";
import ClvCard from "../ClvCard/ClvCard";
import { baseUrl } from "../../constants";
import { FormControl, Select, MenuItem, Button } from "@material-ui/core";
import "./CustomerChurn.css";

function CustomerChurn() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("Select User");
  const [purchaseFrequency, setPurchaseFrequency] = useState();
  const [repeatRate, setRepeatRate] = useState();
  const [churnRate, setChurnRate] = useState();
  const [clv, setClv] = useState();
  const [custLife, setCustLife] = useState();

  useEffect(() => {
    async function getUsers() {
      await fetch(baseUrl + "/getUserCustomer")
        .then((response) => response.json())
        .then((data) => {
          setUsers(data.userId);
        });
    }
    getUsers();
  }, []);

  useEffect(() => {
    async function getFrequencyData() {
      await fetch(baseUrl + "/churnCalculations")
        .then((response) => response.json())
        .then((data) => {
          setPurchaseFrequency(data.purchase_frequency.toFixed(2));
          setRepeatRate(data.repeat_rate.toFixed(2));
          setChurnRate(data.churn_rate.toFixed(2));
        });
    }
    getFrequencyData();
  }, []);

  const userSelectChange = (e) => {
    setSelectedUser(e.target.value);
  };

  useEffect(() => {
    async function getUserData() {
      await fetch(baseUrl + "/getUserClv/" + selectedUser)
        .then((response) => response.json())
        .then((data) => {
          setClv(data.CLV.toFixed(2));
          setCustLife(data.cust_lifetime_value.toFixed(2));
        });
    }
    getUserData();
  }, [selectedUser]);
  return (
    <div>
      <h1>Customer Lifetime Value</h1>
      <div className="card_row">
        <ClvCard name="Purchase Frequency" value={purchaseFrequency} />
        <ClvCard name="Repeat Rate" value={repeatRate} />
        <ClvCard name="Churn Rate" value={churnRate} />
      </div>
      <FormControl className="app_dropdown">
        <Select
          variant="outlined"
          value={selectedUser}
          onChange={userSelectChange}
        >
          <MenuItem value="Select User">Select User</MenuItem>
          {users.map((user) => (
            <MenuItem value={user}>{user}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <h4>
        CLV : <p>{clv}</p>
      </h4>
      <h4>
        Customer Lifetime Value : <p>{custLife}</p>
      </h4>
    </div>
  );
}

export default CustomerChurn;
