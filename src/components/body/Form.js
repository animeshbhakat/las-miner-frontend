import React, { useState, useEffect } from "react";
import axios from "axios";
import countrydata from "../../Countrydata.json";
import Web3 from "web3";
import ABI from "../../web3/ABIArray";
import contractAddress from "../../web3/contractAddress";
import { getaccount } from "../../web3/connectwallet";

const Form = (props) => {
  const url = "http://localhost:8000/api/create-block";

  const [countryid, setCountryid] = useState("");
  const [state, setState] = useState([]);
  const [stateid, setStateid] = useState("");
  const [district, setDistrict] = useState([]);
  const [districtid, setDistrictid] = useState("");
  const [block, setBlock] = useState([]);
  const [blockid, setBlockid] = useState("");
  const [web3, setWeb3] = useState("");
  const [showAuth, setShowAuth] = useState("");
  //const time = new Date().toLocaleString();
  const [data, setData] = useState({
    // vefId: "",
    country: "",
    state: "",
    district: "",
    block: "",
    land_size: 0,
    owner: "",
    //father_name: "",
    //gender: "",
    phone_number: "",
    //verifying_officer: "",
    //transaction_type: "",
    valuation: 0,
    aadhar: "",
    daag_number: 0,
    prev_daag_number: 0,
  });
  useEffect(() => {
    setWeb3(new Web3(window.ethereum));
  }, []);

  const handleSelect = (e) => {
    // const val_arr=e.target.value.split(",")
    // data.country=val_arr[1]
    // console.log(data)
    // const newData = {...data};
    // console.log(newData)
    // // newData[e.target.id] = e.target.value;
    // console.log(newData)
    // setData(newData);
  };

  const handleChange = (e) => {
    setShowAuth("");
    const newdata = { ...data };
    newdata[e.target.id] = e.target.validity.valid
      ? e.target.value
      : newdata[e.target.id];
    setData(newdata);
    // console.log(newdata)
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let address = await getaccount();
    const contract = await new web3.eth.Contract(ABI, contractAddress);
    contract.methods
      .addLand(
        data.aadhar,
        data.daag_number,
        data.prev_daag_number,
        data.district,
        data.block,
        data.land_size,
        data.owner,
        data.phone_number,
        data.valuation
      )
      .send({ from: address })
      .on("receipt", function (receipt) {
        // console.log(receipt.blockHash);
        setShowAuth(receipt.blockHash);
      })
      .on("error", function (error) {
        console.error(error);
      });
  };

  const handlecounty = (e) => {
    const val_arr = e.target.value.split(",");
    // console.log(typeof(e.target.value))
    const getcountryId = val_arr[0];
    // console.log(e.target.value);
    // console.log(e.target.);

    const getStatedata = countrydata.find(
      (country) => country.country_id === getcountryId
    ).states;
    setState(getStatedata);
    setCountryid(getcountryId);
    data.country = val_arr[1];
    // console.log(data)
    const newData = { ...data };
    // console.log(newData)

    // newData[e.target.id] = e.target.value;
    // console.log(newData)
    setData(newData);
    //console.log(getcountryId);
  };

  const handlestate = (e) => {
    const val_arr = e.target.value.split(",");
    const getStateid = val_arr[0];
    const getDistrictdata = state.find(
      (state) => state.state_id === getStateid
    ).districts;
    // console.log(getStateid);
    setDistrict(getDistrictdata);
    setStateid(getStateid);
    data.state = val_arr[1];
    const newData = { ...data };
    setData(newData);
  };

  const handledistrict = (e) => {
    const val_arr = e.target.value.split(",");
    const getDistrictid = val_arr[0];
    const getBlockdata = district.find(
      (district) => district.district_id === getDistrictid
    ).blocks;

    setBlock(getBlockdata);
    setDistrictid(getDistrictid);
    data.district = val_arr[1];
    const newData = { ...data };
    setData(newData);
  };

  const handleblock = (e) => {
    const val_arr = e.target.value.split(",");
    const getBlockid = val_arr[0];

    setBlockid(getBlockid);
    data.block = val_arr[1];
    const newData = { ...data };
    setData(newData);
  };

  return (
    <div className={"form"}>
      <form onSubmit={onSubmitHandler}>
        <h2>Register Your Land</h2>

        <div className={"input-field"}>
          <label htmlFor="country">
            Select Country<span className="required">*</span>
          </label>
          <select
            name="country"
            className="form-control"
            onChange={handlecounty}
          >
            <option value="">--Select Country--</option>
            {countrydata.map((getcountry, index) => (
              <option
                id="country"
                onSelect={handleSelect}
                value={`${getcountry.country_id},${getcountry.country_name}`}
                key={index}
              >
                {getcountry.country_name}
              </option>
            ))}
          </select>
        </div>

        <div className={"input-field"}>
          <label htmlFor="state">
            Select State<span className="required">*</span>
          </label>
          <select
            name="state"
            className="form-control"
            onChange={(e) => handlestate(e)}
          >
            <option value="">--Select State--</option>
            {state.map((getstate, index) => (
              <option
                id="state"
                value={`${getstate.state_id},${getstate.state_name}`}
                key={index}
              >
                {getstate.state_name}
              </option>
            ))}
          </select>
        </div>

        <div className={"input-field"}>
          <label htmlFor="district">
            Select District<span className="required">*</span>
          </label>
          <select
            name="district"
            className="form-control"
            onChange={(e) => handledistrict(e)}
          >
            <option value="">--Select District--</option>
            {district.map((getdistrict, index) => (
              <option
                id="district"
                value={`${getdistrict.district_id},${getdistrict.district_name}`}
                key={index}
              >
                {getdistrict.district_name}
              </option>
            ))}
          </select>
        </div>

        <div className={"input-field"}>
          <label htmlFor="block">
            Select Block<span className="required">*</span>
          </label>
          <select
            id="block"
            name="block"
            className="form-control"
            onChange={(e) => handleblock(e)}
          >
            <option value="">--Select Block--</option>
            {block.map((getblock, index) => (
              <option
                id="block"
                value={`${getblock.block_id},${getblock.block_name}`}
                key={index}
              >
                {getblock.block_name}
              </option>
            ))}
          </select>
        </div>

        <div className={"input-field"}>
          <label htmlFor="land_size">
            Size of the Land (in Katta)<span className="required">*</span>
          </label>
          <input
            onChange={(e) => handleChange(e)}
            name="land_size"
            id="land_size"
            type="text"
            maxLength="6"
            pattern="[0-9]*"
            placeholder="Enter size of land in Katta"
            value={data.land_size}
            required
          ></input>
        </div>

        <div className={"input-field"}>
          <label htmlFor="owner">
            Name of Owner<span className="required">*</span>
          </label>
          <input
            onChange={(e) => handleChange(e)}
            name="owner"
            id="owner"
            type="text"
            placeholder="Enter Name of the Owner"
            value={data.name}
            required
          ></input>
        </div>

        <div className={"input-field"}>
          <label htmlFor="phone_number">
            Phone Number<span className="required">*</span>
          </label>
          <input
            onChange={(e) => handleChange(e)}
            name="phone_number"
            id="phone_number"
            type="text"
            maxLength="10"
            pattern="[0-9]*"
            placeholder="Enter Contact Number of the Owner"
            value={data.phone_number}
            required
          ></input>
        </div>

        <div className={"input-field"}>
          <label htmlFor="valuation">
            Valuation<span className="required">*</span>
          </label>
          <input
            onChange={(e) => handleChange(e)}
            name="valuation"
            id="valuation"
            type="text"
            maxLength="9"
            pattern="[0-9]*"
            placeholder="Enter valuation of the land"
            value={data.valuation}
            required
          ></input>
        </div>

        <div className={"input-field"}>
          <label htmlFor="aadhar">
            Aadhar Number<span className="required">*</span>
          </label>

          <input
            onChange={(e) => handleChange(e)}
            name="aadhar"
            id="aadhar"
            type="text"
            maxLength="12"
            pattern="[0-9]*"
            placeholder="Enter Aadhar Number"
            value={data.aadhar}
            required
          ></input>
        </div>

        <div className={"input-field"}>
          <label htmlFor="daag_number">
            Daag Number<span className="required">*</span>
          </label>
          <input
            onChange={(e) => handleChange(e)}
            name="daag_number"
            id="daag_number"
            type="text"
            maxLength="8"
            pattern="[0-9]*"
            placeholder="Enter Daag Number of land"
            value={data.daag_number}
            required
          ></input>
        </div>

        <div className={"input-field"}>
          <label htmlFor="prev_daag_number">
            Previous Daag Number<span className="required">*</span>
          </label>
          <input
            onChange={(e) => handleChange(e)}
            name="prev_daag_number"
            id="prev_daag_number"
            type="text"
            maxLength="8"
            pattern="[0-9]*"
            placeholder="Enter Previous Daag Number of land"
            value={data.prev_daag_number}
            required
          ></input>
        </div>

        <div className={"submit-wrap"}>
          <button>Update</button>
        </div>
      </form>
      {showAuth !== "" && (
        <div className="container">
          <div className="card mt-4">
            <div className="card-body">
              <h2 className="form-success-msg">
                Your Request is Successful!!!
              </h2>
            </div>
            <p className="form-success-content">
              To Validate Your Transaction &nbsp;{" "}
              <a
                className="form-success-href"
                href={`https://testnet.snowtrace.io/block/${showAuth}`}
                target="_blank"
              >
                Click Here
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
