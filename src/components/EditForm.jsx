import { useState, useEffect } from "react"

export const EditForm = ({student, onUpdate}) => {

    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:""
    });

    useEffect(() => {
            setFormData({
                firstName: student.firstName,
                lastName: student.lastName,
                email: student.email,
            });   
    }, [student]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    }

    return(
        <form onSubmit={handleSubmit}>
        
        <div>
            <input type="text" className="input-width" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange}/>
        </div>
        <div>
            <input type="text" className="input-width" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange}/>
        </div>
        <div>
            <input type="email" className="input-width" name="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
        </div>
        <button type="submit">Update Student</button>
       </form>
    )
}