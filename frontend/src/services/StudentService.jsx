import axios from 'axios'


export function getStudents() {
    return axios.get('http://127.0.0.1:8000/students/')
        .then(response => response.data)
}


export function deleteStudents(studentid) {
    return axios.delete('http://127.0.0.1:8000/students/' + studentid + '/', {

    })
        .then(response => response.data)
}



export function addStudents(student) {
    return axios.post('http://127.0.0.1:8000/students/', {

        studentid: null,
        firstName: student.firstName.value,
        lastName: student.lastName.value,
        registrationNo: student.registrationNo.value,
        email: student.email.value,
        course: student.course.value

    })
        .then(response => response.data)
}

export function updateStudents(stuid, student) {
    return axios.put('http://127.0.0.1:8000/students/' + stuid + '/', {

        firstName: student.firstName.value,
        lastName: student.lastName.value,
        registrationNo: student.registrationNo.value,
        email: student.email.value,
        course: student.course.value

    })
        .then(response => response.data)
}