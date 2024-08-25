import { useEffect, useState } from 'react';
import { getStudents, deleteStudents } from '../services/StudentService';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar, Form } from 'react-bootstrap';
import AddStudentModal from './AddStudentModal';
import UpdateStudentModal from './UpdateStudentModal';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';

const Manage = () => {
    const [student, setStudent] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editStudent, setEditStudent] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        let mounted = true;
        if (student.length && !isUpdated) {
            return;
        }
        getStudents()
            .then(data => {

                if (mounted) {
                    setStudent(data)
                }
            })
        return () => {
            mounted = false;
            setIsUpdated(false);
        }
    }, [isUpdated, student]);

    const handleAdd = (e) => {
        e.preventDefault()
        setAddModalShow(true)
    }

    const handleUpdate = (e, stu) => {
        e.preventDefault()
        setEditModalShow(true);
        setEditStudent(stu)
    }


    const handleDelete = (e, studentid) => {
        if (window.confirm("Are you sure?")) {
            e.preventDefault()
            deleteStudents(studentid)
                .then(result => {
                    alert(result)
                    setIsUpdated(true)
                },
                    () => {
                        alert("Failed to delete student")
                    }
                )
        }
    }

    let addModalClose = () => setAddModalShow(false);
    let editModalClose = () => setEditModalShow(false);

    // Filter students based on the search query   {/* search  */}
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
            {/* search  */}
            <div className="col-8 mb-3">
                <Form.Control
                    type="text"
                    placeholder="Search by ID, Name, Registration No, Email, or Course"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            {/* search  */}

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Registration No</th>
                        <th>Email</th>
                        <th>Course</th>
                        <th>Action</th>
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
                            <td>
                                <Button className='mr-2' variant="danger" onClick={event => handleDelete(event, stu.studentid)}>
                                    <RiDeleteBin5Line />
                                </Button>

                                <Button className='mr-2' variant="primary" onClick={event => handleUpdate(event, stu)}>
                                    <FaEdit />
                                </Button>

                                <UpdateStudentModal show={editModalShow} student={editStudent} setUpdated={setIsUpdated} onHide={editModalClose}></UpdateStudentModal>


                            </td>

                        </tr>
                    )}

                </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="success" onClick={handleAdd}>Add Student</Button>{' '}
                <AddStudentModal show={addModalShow} setUpdated={setIsUpdated} onHide={addModalClose}></AddStudentModal>
            </ButtonToolbar>

        </div>
    );
};

export default Manage;