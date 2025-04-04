import { useState } from "react";
import db from "../utils/db";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const Add = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const c = collection(db, "contact");

        try {
            const student = await addDoc(c, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,

            })
            navigate('/')
        } catch (error) {
            alert('There is an error')
            console.error(error);
        }
    }


    return(
       <form onSubmit={handleSubmit} className="container">
        <h2>Add Student</h2>
        <div>
            <input type="text" className="input-width" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange}/>
        </div>
        <div>
            <input type="text" className="input-width" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange}/>
        </div>
        <div>
            <input type="email" className="input-width" name="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
        </div>
        <button type="submit">Add Student</button>
       </form>
    );
}

export default Add;