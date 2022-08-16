import {useEffect,useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/Home.module.css'
import {useAuth} from '../../context/AuthContext'
import moment from 'moment';


export default function IndividualData({Data}){
	return(		
		<Container >
			<Row >
				<div className="p-3 d-flex justify-content-between align-items-center">
					<p>Id: <span>{Data.id}</span></p>
					<p>Username: <span>{Data.UserName}</span></p>
					<p>Created BY: <span>{Data.CreatedBy}</span> </p>
					<p>Created Date: <span>{moment(Data.CreatedDate).utc().format('YYYY-MM-DD')}</span></p>
					
				</div>
			</Row>

			<Row>
				<Col>
					<h5 className="text-center">Personal Information</h5>
					<div className="bg-white border p-3 rounded">
						<div className="d-flex justify-content-between">
							<p>Full Name</p>
							<p>{Data.Name}</p>
						</div>

						<div className="d-flex justify-content-between">
							<p>Title</p>
							<p>{Data.Title}</p>
						</div>

						<div className="d-flex justify-content-between">
							<p>Gender</p>
							<p>{Data.Gender}</p>
						</div>

						<div className="d-flex justify-content-between">
							<p>Phone Number</p>
							<p>{Data.PhoneNumber}</p>
						</div>

						<div className="d-flex justify-content-between">
							<p>Phone Type</p>
							<p>{Data.PhoneType}</p>
						</div>

						<div className="d-flex justify-content-between">
							<p>Email</p>
							<p>{Data.Email}</p>
						</div>

						<div className="d-flex justify-content-between">
							<p>Id Type</p>
							<p>{Data.IdType}</p>
						</div>

						<div className="d-flex justify-content-between">
							<p>Id Number</p>
							<p>{Data.IdNumber}</p>
						</div>

						
					</div>
				</Col>

				<Col>
					<h5 className="text-center">Address Info</h5>
					<div className="bg-white border p-3 rounded">
						<div className="d-flex justify-content-between">
							<p>Country</p>
							<p>{Data.Country}</p>
						</div>

						<div className="d-flex justify-content-between">
							<p>Region</p>
							<p>{Data.Region}</p>
						</div>

						<div className="d-flex justify-content-between">
							<p>Zone</p>
							<p>{Data.Zone}</p>
						</div>

						<div className="d-flex justify-content-between">
							<p>Sub City</p>
							<p >{Data.SubCity}</p>
						</div>

						<div className="d-flex justify-content-between">
							<p>Woreda</p>
							<p>{Data.Woreda}</p>
						</div>

						<div className="d-flex justify-content-between">
							<p>Kebele</p>
							<p>{Data.Kebele}</p>
						</div>

						<div className="d-flex justify-content-between">
							<p>House Number</p>
							<p>{Data.HouseNumber}</p>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	)	
}



