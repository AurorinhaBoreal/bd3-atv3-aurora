import Student from "../../types/Student";
import styles from './studentCard.module.css'

interface info {
    student: Student
}
const StudentCard = ({student}: info) => {
    
    const formatBirthDate = (birthDate: string) => {
        let formattedBirthDate;
        
        formattedBirthDate = birthDate.replace(/-/g, "/")
        return formattedBirthDate;
    }

    const formatCPF = (cpf: string) => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    const formatRG = (rg: string) => {
        return rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
    }

    const formatPhoneNumber = (phoneNumber: string) => {
        return phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }

    return (
        <div className={styles.cardBody}>
            <div className={styles.studentInfo}>
                <h5 className={styles.infoTitle}>Student</h5>
                <div className={styles.firstLine}>
                    <p>{student.firstName} {student.lastName}</p>
                    <p>{formatBirthDate(student.birthDate)}</p>
                </div>
                <div className={styles.secondLine}>
                    <div>
                        <h5 className={styles.infoName}>CPF</h5>
                        <p>{formatCPF(student.cpf)}</p>
                    </div>
                    <div>
                        <h5 className={styles.infoName}>RG</h5>
                        <p>{formatRG(student.rg)}</p>
                    </div>
                </div>
                <div className={styles.thirdLine}>
                    <div>
                        <h5 className={styles.infoName}>Phone Number</h5>
                        <p className={styles.smallInfo}>{formatPhoneNumber(student.studentNumber)}</p>
                    </div>
                    <div>
                        <h5 className={styles.infoName}>Email</h5>
                        <p className={styles.smallInfo}>{student.email}</p>
                    </div>
                </div>
            </div>
            <hr className={styles.infoDivider}/>
            <div className={styles.parentInfo}>
                <h5 className={styles.infoTitle}>Parent</h5>
                <div className={styles.alignedInfo}>
                    <div>
                        <h5 className={styles.infoName}>Parent Name</h5>
                        <p>{student.parentName}</p>
                    </div>
                    <div>
                        <h5 className={styles.infoName}>Parent Number</h5>
                        <p>{formatPhoneNumber(student.parentNumber)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentCard;