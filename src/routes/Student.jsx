import { useState, useEffect } from "react";
import db from "../utils/db";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { EditForm } from "../components/EditForm";

export const Student = () => {
    const naviagte = useNavigate();

    //set up state variable for student
    const [student, setStudent] = useState({});

    //id from the route param
    const { id } = useParams();

    //create a function to fetch student
    const fetchStudentById = async (studentId) => {
        const docRef = doc(db,"contact", studentId )
        const docSnapshot = await getDoc(docRef)

        //check if the doc exists in firestore
        if (docSnapshot.exists()) {
            setStudent({
                id: docSnapshot.id,
                ...docSnapshot.data()
            });
        }else {
            alert("DO NoT Exist");
            return null;
        }
    }

    //update function
    const handleUpdate = async(updatedStudent) =>{
        try {
            const docRef = doc(db, "contact", id);
            await updateDoc(docRef, updatedStudent);
            naviagte('/')
        } catch (error){
            alert('There is an error')
            console.error(error);
        }
    }

    //delete function
    const handleStudentDelete = async() =>{
        const msg = "Are you sure you want to delete?"
        try {
            if(confirm(msg) == true){
                const docRef = doc(db, "contact", id);
                await deleteDoc(docRef);
                setStudent({});
                naviagte('/')
            }else{
                naviagte(0);
            }
        } catch (error) {
            alert('There is an error')
            console.error(error);
        }
    }

    useEffect(() => {
        fetchStudentById(id);
    }, [id]);

    const DeleteButton = () =>{
        return(
            <button className="del-btn" onClick={handleStudentDelete}>Delete Student?</button>
        )
    }

    return(
        
        <>
        <div className="container">
        <div className="student-box">
        <h2>Update Student</h2>
        <DeleteButton />
        </div>
         <EditForm student={student} onUpdate={handleUpdate}/>
         </div>
        </>
       
    );
}

export default Student;