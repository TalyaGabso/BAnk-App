import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Accounts=()=> {

  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const responst = await axios.get('http://localhost:5000/api/bank/accounts/');
      console.log("RES: ",responst);
      setData(responst.data.accounts)
    }
    getData();
  }, [])

  return (
    <div className="all-accounts">
        <h1>BANK ACCOUNTS</h1>
      {data.map((account, index) => {
        return (
          <div className="display-accounts" key={account.id} key={account._id}>
            <p>account #{index + 1}</p><br/>
            <h4>Account Holder</h4>
            <p>name: {account.name}</p>
            <p>email: {account.email}</p>
            <p>Active: {String(account.isActive)}</p>
            <h4>Account Balance</h4>
            <p>cash: {account.account.cash}</p>
            <p>credit: {account.account.credit}</p>
          </div>
        )
      })}
    </div>
  );
}

export default Accounts;