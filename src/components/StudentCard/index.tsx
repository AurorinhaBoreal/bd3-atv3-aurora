import Student from "../../types/Student";

interface info {
    student: Student
}
const StudentCard = ({student}: info) => {
    return (
        <div className="cardBody">
            <p>{student.firstName}</p>
            <p>{student.lastName}</p>
            <p>{student.email}</p>
            <p>{student.studentNumber}</p>
            <p>{student.birthDate}</p>
            <p>{student.cpf}</p>
            <p>{student.rg}</p>
            <p>{student.parentName}</p>
            <p>{student.parentNumber}</p>
        </div>
    )
}

export default StudentCard;