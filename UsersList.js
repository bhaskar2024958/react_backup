import { useEffect, useState } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import axios from "axios";
import customAxios from "../Utils/apis";

function UsersList() {

    var [users, setUsers] = useState([]); // original data
    var [usersData, setUsersData] = useState([]); // filter data
    let searchText = "";
    
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [age, setAge] = useState("");
    let [gender, setGender] = useState("");


    useEffect(() => {

        async function fetchAllUsers(){
            var response  = await customAxios.get("https://dummyjson.com/users");   
            // setUsers([...response.data.users]);
            //setUsersData([...response.data.users]);
            
            setUsers(response.data.users);
            setUsersData(response.data.users);
        }
        fetchAllUsers();
    },[]);

    function handleSearch(e) {
        searchText = e.target.value;
        console.log(searchText);
        let tempResult = usersData.filter(user => user.firstName.toLowerCase().includes(searchText.toLowerCase()));
        console.log(tempResult);
        setUsers(tempResult);
    }

    function handleNameSort(){
        let tempData = users.sort((a,b) => {
            if(a.firstName < b.firstName) { return -1; }
            if(a.firstName > b.firstName) { return 1; }
            return 0;
        })
        console.log(tempData);
        setUsers([...tempData]);
    }

    function handleEdit(user){
        console.log(user);
        setName(user.firstName);
        setEmail(user.email);
        setAge(user.age);
        setGender(user.gender);
    }

    async function handleDelete(user) {
        var inputUserId = user.id;
        var response = await axios.delete(`https://dummyjson.com/users/${inputUserId}`)
        var result = users.filter(user => user.id !== inputUserId);
        setUsers([...result]);
    }

    return (
        <div className="container">

            <div className="row">
                <div className="col-12">
                    <Header />
                </div>
            </div>
            <div className="row mt-5 mb-5">
                <div className="col-5">
                    <input type="text" className="form-control" onChange={e => handleSearch(e)} placeholder="Search Users"/>
                </div>
                <div className="col-8 mt-2">
                    <table className="table table-hover">
                        <thead>
                            <th>User Id</th>
                            <th onClick={e => handleNameSort()}>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            {
                                users.map(user => (
                                    <tr>
                                        <td>{user.id}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.gender}</td>
                                        <td>{user.age}</td>
                                        <td>
                                            <button className="btn btn-primary me-2" onClick={e => handleEdit(user)}>Edit</button>
                                            <button className="btn btn-danger" onClick={e => handleDelete(user)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="col-4">
                    <div className="mb-3">
                        <lable>Name</lable>
                        <input type="text" placeholder="Name" className="form-control" value={name} />
                    </div>
                    <div className="mb-3">
                        <lable>Email</lable>
                        <input type="text" placeholder="Email" className="form-control"  value={email}/>
                    </div>
                    <div className="mb-3">
                        <lable>Gender</lable>
                        <input type="text" placeholder="Gender" className="form-control" value={gender}/>
                    </div>
                    <div className="mb-3">
                        <lable>Age</lable>
                        <input type="text" placeholder="Age" className="form-control" value={age}/>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary">Update</button>
                    </div>
                </div>
                
            </div>

            <div className="row">
                <div className="col-12">
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default UsersList;