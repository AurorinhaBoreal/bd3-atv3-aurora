import Student from "../../types/Student";
import styles from './studentCard.module.css'

interface info {
    student: Student
}
const StudentCard = ({student}: info) => {
    return (
        <div className={styles.cardBody}>
            <div className={styles.studentInfo}>
                <h5 className={styles.infoTitle}>Student</h5>
                <div className={styles.firstLine}>
                    <p>{student.firstName} {student.lastName}</p>
                    <p>{student.birthDate}</p>
                </div>
                <div className={styles.secondLine}>
                    <p>{student.cpf}</p>
                    <p>{student.rg}</p>
                </div>
                <div className={styles.thirdLine}>
                    <p>{student.email}</p>
                    <p>{student.studentNumber}</p>
                </div>
            </div>
            <hr className={styles.infoDivider}/>
            <div className={styles.parentInfo}>
                <h5 className={styles.infoTitle}>Parent</h5>
                <p>{student.parentName}</p>
                <p>{student.parentNumber}</p>
            </div>
        </div>
    )
}

export default StudentCard;