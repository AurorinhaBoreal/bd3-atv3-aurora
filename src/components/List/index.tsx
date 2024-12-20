import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../utils/useFirebase'
import StudentCard from '../StudentCard'
import Student from '../../types/Student'
import styles from './list.module.css'

const List = () => {
    const StudentCollectionRef = collection(db, "activity-collection")
    const [students, setStudents ] = useState<Student[]>([])

    useEffect(() => {
        const getStudents = async () => {
            const data = await getDocs(StudentCollectionRef)
            const dynamicArr: Student[] = []
            data.forEach((doc) => {
                dynamicArr.push(doc.data() as Student)
            })
            setStudents(dynamicArr)
        }

        getStudents()
    }, [students])
    
    return (
        <div className={styles.divWrapper}>
            <h3 className={styles.listTitle}>See the registered Students</h3>
            <div className={styles.cardsWrapper}>
                {students.length > 0 ? students.map((student) => (
                    <>
                        <StudentCard key={student.firstName+student.birthDate} student={student}/>    
                    </>
                )) : (
                    <>
                        <h3 className={styles.listDescription}>There are no registered students on the database!</h3>
                    </>
                )}
            </div>
        </div>
    )
}

export default List;