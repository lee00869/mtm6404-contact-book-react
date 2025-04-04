import { useState, useEffect } from 'react';
import db from './utils/db';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import './App.css';

function App() {
  // Create state variable
  const [contact, setContact] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  //search
  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };


  // Fetch data from Firestore
  const fetchContact = async () => {
    const q = query(collection(db, "contact"), orderBy('lastName', 'asc'));
    const docSnapshot = await getDocs(q);
    const data = docSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setContact(data);
  };

  //add btn
  const goToAdd = () => {
    navigate('/add')
  }

  // Run once on mount
  useEffect(() => {
    fetchContact();
  }, []);

  console.log(contact);

  return (
    <>
      <div className="container">
      <h1>Contact Book</h1>
      <div className="big-box">
      <div className='box'>
      <input className="search-width" type="text" placeholder="Search" onChange={handleSearch}/>
      <button onClick={goToAdd}>Add Student</button>
      </div>
      <ul>
        {contact.filter((student) =>
            `${student.firstName} ${student.lastName}`
              .toLowerCase()
              .includes(search.toLowerCase())
          ).map((student) => (
          <li key={student.id} className='listStyle'>
            <Link to={`/student/${student.id}`}>
              {`${student.firstName} ${student.lastName}`}
            </Link>
          </li>
        ))}
      </ul>
      </div>
      </div>
    </>
  );
}

export default App;
