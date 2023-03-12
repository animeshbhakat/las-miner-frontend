import React, { useState } from "react";
import axios from "axios";
import countrydata from "../../Countrydata.json";



const Form = () => {

    const url = "";


    const[countryid, setCountryid]=useState('');
    const[state, setState]=useState([]);
    const[stateid, setStateid]= useState('');
    const[district, setDistrict]=useState([]);
    const[districtid, setDistrictid] = useState('');
    const[block, setBlock]=useState([]);
    const[blockid, setBlockid] = useState('');

    const[data, setData] = useState({
        userid: "",
        owner: "",
        country: "",
        state: ""

    });

    const handleSelect =(e) =>{
        // const val_arr=e.target.value.split(",")
        // data.country=val_arr[1]
        // console.log(data)
        // const newData = {...data};
        // console.log(newData)

        // // newData[e.target.id] = e.target.value;
        // console.log(newData)
        // setData(newData);
    }

    const handleChange = (e) =>{
        const newdata = {...data};
        newdata[e.target.id] = e.target.value;
        setData(newdata);
        // console.log(newdata)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        // axios.post(url, {
        //     id: data.id,
        //     owner: data.owner,
            
        // })
        // .then(res=>{
        //     console.log(res.data);
        // })
        console.log(data);

    }
    

    const handlecounty=(e)=>{
        const val_arr=e.target.value.split(",")
        // console.log(typeof(e.target.value))
        const getcountryId = val_arr[0];
        // console.log(e.target.value);
        // console.log(e.target.);
        
        const getStatedata = countrydata.find(country=>country.country_id===getcountryId).states;
        setState(getStatedata);
        setCountryid(getcountryId);
        data.country=val_arr[1]
        // console.log(data)
        const newData = {...data};
        // console.log(newData)

        // newData[e.target.id] = e.target.value;
        // console.log(newData)
        setData(newData);
        //console.log(getcountryId);
    }

    const handlestate = (e)=>{

        const val_arr=e.target.value.split(",")
        const getStateid = val_arr[0];
        const getDistrictdata = state.find(state=>state.state_id===getStateid).districts;
        // console.log(getStateid);
        setDistrict(getDistrictdata);
        setStateid(getStateid);
        data.state=val_arr[1]
        const newData = {...data};
        setData(newData);
    }

    const handledistrict = (e)=>{
        const val_arr=e.target.value.split(",")
        const getDistrictid = val_arr[0];
        const getBlockdata = district.find(district=>district.district_id===getDistrictid).blocks;

        setBlock(getBlockdata);
        setDistrictid(getDistrictid);
        data.district=val_arr[1]
        const newData = {...data};
        setData(newData);
    }

    const handleblock = (e)=>{
        const getBlockid = e.target.value;
        
        setBlockid(getBlockid);
    }

// const [country, setCountry] = useState("")    
// const handlecountry=(e)=>{
//     console.log(e.target.value)
//     setCountry(e.target.value)
// }
    return(
        <form onSubmit={onSubmitHandler}>
            <h2>Change of Owner</h2>

            <div className={"input-field"}>
                <label htmlFor = "country">Select Country</label>
                <select name='country' className='form-control' onChange={handlecounty}>
                    <option value="">--Select Country--</option>
                    {
                    countrydata.map( (getcountry,index)=>(
                        <option id = "country" onSelect={handleSelect} value={`${getcountry.country_id},${getcountry.country_name}`} key={index}>{getcountry.country_name}</option> 
                    ))
                    }  
                </select>
            </div>

            <div className={"input-field"}>
                <label htmlFor = "state">Select State</label>
                <select name='state' className='form-control' onChange={(e)=>handlestate(e)}>
                    <option value="">--Select State--</option>
                    {
                    state.map( (getstate,index)=>(
                        <option id= "state" value={`${getstate.state_id},${getstate.state_name}`} key={index}>{getstate.state_name}</option> 
                    ))
                    }  
                </select>
            </div>

            <div className={"input-field"}>
                <label htmlFor = "district">Select District</label>
                <select name='district' className='form-control' onChange={(e)=>handledistrict(e)}>
                    <option value="">--Select District--</option>
                    {
                    district.map( (getdistrict,index)=>(
                        <option id="district" value={`${getdistrict.district_id},${getdistrict.district_name}`} key={index}>{getdistrict.district_name}</option> 
                    ))
                    }  
                </select>
            </div>

            {/* <div className={"input-field"}>
                <label htmlFor = "block">Select Block</label>
                <select id = 'block' name='block' className='form-control' onChange={(e)=>handleblock(e)}>
                    <option value="">--Select Block--</option>
                    {
                    block.map( (getblock,index)=>(
                        <option value={getblock.block_id} key={index}>{getblock.block_name}</option> 
                    ))
                    }  
                </select>
            </div> */}


            {/* <div className={"input-field"}>
                <label htmlFor = "prevTransactionId">Previous Transaction Id</label>
                <input 
                    name="prevTransactionId"
                    type="text" 
                    placeholder="Enter Previous Transaction Id" 
                    required>
                </input>
            </div> */}

            <div className={"input-field"}>
                <label htmlFor = "userid">Id</label>
                <input 
                    onChange={(e) => handleChange(e)}
                    name="userid"
                    id="userid"
                    type="text" 
                    placeholder="Enter id" 
                    value={data.userid}
                    required>
                </input>
            </div>

            <div className={"input-field"}>
                <label htmlFor = "owner">Name of Owner</label>
                <input 
                    onChange={(e) => handleChange(e)}
                    name="owner"
                    id="owner"
                    type="text" 
                    placeholder="Enter Name of the Owner" 
                    value = {data.name} 
                    // onChange={handleInput}
                    required>
                </input>
            </div>

            {/* <div className={"input-field"}>
                <label htmlFor = "dateOfTransaction">Date of Transaction</label>
                <input 
                    name="dateOfTransaction"
                    type="date" 
                    placeholder="Enter Date of Transaction" 
                    // value = {props.items.thumbnail} 
                    // onChange={handleInput}
                    required>
                </input>
            </div>

            <div className={"input-field"}>
                <label htmlFor = "typeOfTransaction">Type of Transction</label>
                <input 
                    name="typeOfTransaction"
                    type="text" 
                    placeholder="Enter Thumbnail" 
                    // value = {props.items.thumbnail} 
                    // onChange={handleInput}
                    required>
                </input>
            </div>

            <div className={"input-field"}>
                <label htmlFor = "value">Value</label>
                <input 
                    name="value"
                    type="number" 
                    placeholder="Enter Value" 
                    // value = {props.items.thumbnail} 
                    // onChange={handleInput}
                    required>
                </input>
            </div> */}
            
            <div className={"submit-wrap"}>
                <button>Update</button>
            </div>
        </form>
    )
}

export default Form