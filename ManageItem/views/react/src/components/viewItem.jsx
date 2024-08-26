import React,{useEffect,useState} from 'react';
import axios from 'axios';
const ViewItem = () => {
  const [items, setItems] = useState([]);
  useEffect(()=>{
    fetch("/api").then(res=>res.json())
    .then((res)=>{
      setItems(res);
    }); 
  },[]);
  return (
    <div className="p-5">
      
        <table className="table text-dark bg-light border-info">
          <thead>
            <tr>
              <th colSpan="3">
                <h1 className=" p-2 text-danger border-bottom border-5 border-danger">Full CURD Project Node+Reac</h1>
              </th>
              <th className="text-center">
                <a href="/New" className="btn text-decoration-none bg-info text-dark p-2 ps-5 pe-5">New</a>
              </th>
            </tr>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th className="text-center">#Action</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {
              items.map(item => {  
                return(
                <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td class="d-flex gap-2 justify-content-center">
                      <a href={"http://localhost:3000/"+item.id} className="btn text-decoration-none bg-success text-light ps-2 pe-2">Edit</a>
                      <input type="button" name="submit" id="submit" value="Delete" className="btn text-decoration-none bg-danger text-light ps-2 pe-2"/>
                     </td>
                </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
  )
}
export default ViewItem;