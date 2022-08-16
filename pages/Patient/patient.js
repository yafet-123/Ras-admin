import {AiOutlineRight} from 'react-icons/ai'
import Link from 'next/link'
import { useRouter } from "next/router";
import axios from "axios";
import {useEffect,useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/Home.module.css'
import Sidebar from '../../components/sidebar/Sidebar.js'
import Navbar from "../../components/navbar/Navbar";
import {useAuth} from '../../context/AuthContext'
import moment from 'moment';
import api from '../../components/api'

export async function getServerSideProps(context) {
	const {params,req,res,query} = context
	const patient_id_Medical_Record = query.mrn
	const token = req.cookies.token
	if (!token) {
    	return {
      		redirect: {
        		destination: '/login',
        		permanent: false,
      		},
      	}
    }
	const accesstoken = token
	const authaxios = axios.create({
		baseURL : api,
		headers :{
			Authorization : `Bearer ${accesstoken} `
		}
	})
	const data = await authaxios.get(`${api}/patient/${patient_id_Medical_Record}`)
  	return {
    	props: {
	    	patient:data.data,
	    }, // will be passed to the page component as props
	}
}

export default function IndividualPatient({patient}){
	return(
		<div className={styles.home}>
            <Sidebar />
            <div className={styles.homeContainer}>
            	<Navbar />
				<Container >
					<Row >
						<div className="p-3 d-flex justify-content-between align-items-center">
							<h1>MRN <span>{patient.MRN}</span></h1>
							<p>Created BY: <span>{patient.CreatedBy}</span> </p>
							<p>Registered At: <span>{moment(patient.RegistrationDate).utc().format('YYYY-MM-DD')}</span></p>
						</div>
					</Row>

					<Row>
						<Col>
							<h5 className="text-center">Personal Information</h5>
							<div className="bg-white border p-3 rounded">
								<div className="d-flex justify-content-between">
									<p>Previous MRN</p>
									<p>{patient.PreviousMRN}</p>
								</div>

								<div className="d-flex justify-content-between">
									<p>Full Name</p>
									<p>{patient.Name}</p>
								</div>

								<div className="d-flex justify-content-between">
									<p>Gender</p>
									<p>{patient.Gender}</p>
								</div>


								<div className="d-flex justify-content-between">
									<p>Date Of Birth</p>
									<p>{patient.DateOfBirth}</p>
								</div>


								<div className="d-flex justify-content-between">
									<p>Phone Number</p>
									<p>{patient.PhoneNumber}</p>
								</div>

								<div className="d-flex justify-content-between">
									<p>Email</p>
									<p>{patient.Email}</p>
								</div>

								<div className="d-flex justify-content-between">
									<p>Postal</p>
									<p>{patient.Postal}</p>
								</div>

								<div className="d-flex justify-content-between">
									<p>Marital Status</p>
									<p>{patient.MaritalStatus}</p>
								</div>

								<div className="d-flex justify-content-between">
									<p>Occupation</p>
									<p>{patient.Occupation}</p>
								</div>
							</div>
						</Col>

						<Col>
							<h5 className="text-center">Address Info</h5>
							<div className="bg-white border p-3 rounded">
								<div className="d-flex justify-content-between">
									<p>Country</p>
									<p>{patient.Country}</p>
								</div>

								<div className="d-flex justify-content-between">
									<p>Region</p>
									<p>{patient.Region}</p>
								</div>

								<div className="d-flex justify-content-between">
									<p>Gender</p>
									<p>{patient.Gender}</p>
								</div>


								<div className="d-flex justify-content-between">
									<p>Zone</p>
									<p>{patient.Zone}</p>
								</div>

								<div className="d-flex justify-content-between">
									<p>Sub City</p>
									<p >{patient.SubCity}</p>
								</div>

								<div className="d-flex justify-content-between">
									<p>Woreda</p>
									<p>{patient.Woreda}</p>
								</div>

								<div className="d-flex justify-content-between">
									<p>Kebele</p>
									<p>{patient.Kebele}</p>
								</div>

								<div className="d-flex justify-content-between">
									<p>House Number</p>
									<p>{patient.HouseNumber}</p>
								</div>
							</div>
						</Col>
					</Row>

					<Row>
						<Col>
							<h5 className="mt-3 text-center">Emergency Contact Info</h5>
							<div className="bg-white border p-3 mb-3">
								<div className="d-flex justify-content-between">
									<p>Name</p>
									<p>{patient.Emergency_Contact}</p>
								</div>

								<div className="d-flex justify-content-between">
									<p>Gender</p>
									<p>{patient.Emergency_Contact_Gender}</p>
								</div>

								<div className="d-flex justify-content-between">
									<p>Relationship</p>
									<p>{patient.Emergency_Contact_Relationship}</p>
								</div>


								<div className="d-flex justify-content-between">
									<p>Phonenumber</p>
									<p>{patient.Emergency_Contact_Phonenumber}</p>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</div>				
		</div>
	)	
}



