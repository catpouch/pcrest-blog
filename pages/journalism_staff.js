import styles from './journalism_staff.module.scss'
import Image from 'next/image'
import data from '../staff_info.json'
import parse from 'html-react-parser'

export default function JournalismStaff() {
    return (
        <div className={styles.topWrapper}>
            <div className={styles.textWrapper}>
                <h1 style={{'fontSize': '3rem', 'lineHeight': '3rem'}}>The Journalism Team</h1>
                <span style={{'whiteSpace': 'pre-line'}}>
                    {data.description ? parse(data.description) : <div><p>The Pacific Crest journalism team is comprised of motivated students that write articles on the regular for the both this website and the physical Goat Scene and Herd paper.</p><p>This semester's students include:</p></div>}
                    <div className={styles.studentList}>
                        {data.students.map((student) => {
                            return (
                                <div key={student.name} className={styles.student}>
                                    <strong>{student.name}</strong><br/>
                                    <em>{student.position}</em><br/>
                                    <div className={styles.pfp}>
                                        <Image src={'http://localhost:54410/api/images/staff_pictures/' + student.image} objectFit='cover' layout='fill'/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </span>
            </div>
        </div>
    )
}