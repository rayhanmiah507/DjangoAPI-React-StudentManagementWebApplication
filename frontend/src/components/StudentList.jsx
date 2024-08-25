import { useEffect, useState } from 'react';
import { getStudents } from '../services/StudentService';
import { Table } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

const StudentList = () => {

    const [student, setStudent] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        let mounted = true;
        getStudents()
            .then(data => {

                if (mounted) {
                    setStudent(data)
                }
            })
        return () => mounted = false;
    }, []);

    const filteredStudents = student.filter(stu =>
        stu.studentid.toString().includes(searchQuery) ||
        stu.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stu.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stu.registrationNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stu.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stu.course.toLowerCase().includes(searchQuery.toLowerCase())

    );

    return (
        <div className='row'>

            <div className="col-6 mb-3">
                <Form.Control
                    type="text"
                    placeholder="Search by ID, Name, Registration No, Email, or Course"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>


            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Registration No</th>
                        <th>Email</th>
                        <th>Course</th>
                    </tr>
                </thead>
                <tbody>

                    {filteredStudents.map((stu) =>
                        <tr key={stu.id}>
                            <td>{stu.studentid}</td>
                            <td>{stu.firstName}</td>
                            <td>{stu.lastName}</td>
                            <td>{stu.registrationNo}</td>
                            <td>{stu.email}</td>
                            <td>{stu.course}</td>

                        </tr>
                    )}

                </tbody>
            </Table>
        </div>
    );
};

export default StudentList;