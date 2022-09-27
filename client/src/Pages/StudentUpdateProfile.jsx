import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import { studentUpdate, studentLogout,newerChats, previousChats } from '../redux/action/studentAction'
import HomeHelper from '../Components/HomeHelper'

import { useHistory, withRouter } from 'react-router-dom'

const StudentUpdateProfile = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const history = useHistory()
    const [gender, setGender] = useState('')
    const [studentMobileNumber, setContactNumber] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [fatherMobileNumber, setFatherContactNumber] = useState('')
    const [aadharCard, setAadharCard] = useState('')
    const [error, setError] = useState({})
    const [avatar, setAvatar] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const imagehandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setAvatar(img)
        }
    }

    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
    }, [store.error])

    const formHandler = async(e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("gender", gender)
        formData.append("studentMobileNumber", studentMobileNumber)
        formData.append("fatherName", fatherName)
        formData.append("fatherMobileNumber", fatherMobileNumber)
        formData.append("aadharCard", aadharCard)
        formData.append("avatar", avatar)
        formData.append("email", store.student.student.student.email)
        dispatch(studentUpdate(formData, history))
        setModal(true)
        alert("Kindly login again to see updates")
        dispatch(studentLogout())
        history.push('/')
    }
        return (
            <div>
                {store.student.isAuthenticated ? <>
                    <HomeHelper />
                    <div className="container mt-5">
                        <div className="row ">
                            <div className="col-md-5 w-100 m-auto">
                                <form onSubmit={formHandler}>
                                    <div className="form-group">
                                        <label htmlFor="inputId">Ảnh cá nhân</label>
                                        <input required className="form-control" type="file" accept=".jpg,.png,.jpeg" id="inputId" onChange={imagehandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="genderId">Giới tính</label>
                                        <select onChange={(e) => setGender(e.target.value)} className="form-control" id="genderId">
                                            <option>Select</option>
                                            <option value="Male">Nam</option>
                                            <option value="Female">Nữ</option>
                                            <option value="Other">Khác</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="numberId">Số điện thoại</label>
                                        <input onChange={(e) => setContactNumber(e.target.value)} required type="number" className="form-control" id="numberId" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fatherId">Tên bố</label>
                                        <input onChange={(e) => setFatherName(e.target.value)} type="text" className="form-control" id="fatherId" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fathercnId">Số điện thoại của bố (mẹ)</label>
                                        <input onChange={(e) => setFatherContactNumber(e.target.value)} type="number" className="form-control" id="fathercnId" />
                                    </div>
                                    {/* <div className="form-group">
                                        <label htmlFor="aadharId">Aadhar Card Number</label>
                                        <input onChange={(e) => setAadharCard(e.target.value)} type="number" className="form-control" id="aadharId" />
                                    </div> */}
                                    <button type="submit" className="btn btn-primary">Cập nhật</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </> : (history.push('/'))}
                
            </div>
        )
    }

export default withRouter(StudentUpdateProfile)
