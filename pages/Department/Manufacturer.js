import {useEffect,useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/Home.module.css'
import {useAuth} from '../../context/AuthContext'
import moment from 'moment';


export default function Manufacturer({Data}){
	return(		
		<Container >
			<div className="bg-white border px-3 py-2 my-2 rounded">
				<Row >
					<Col>
						<h5>Id</h5>
						<p>{Data.id}</p>
					</Col>

					<Col>
						<h5>Created BY</h5>
						<p>{Data.CreatedBy}</p>
					</Col>

					<Col>
						<h5>Created Date</h5>
						<p>{moment(Data.CreatedDate).utc().format('YYYY-MM-DD')}</p>
					</Col>
				</Row>
			</div>

			<div className="bg-white border px-3 py-2 rounded">

				<Row >
						<Col>
							<h5>Name</h5>
							<p>{Data.name}</p>
						</Col>

						<Col>
							<h5>Abbreviation</h5>
							<p>{Data.abbreviation}</p>
						</Col>

				</Row>

				<Row>
						<Col>
							<h5 >isActive</h5>
							<p>{Data.isActive}</p>
						</Col>

						<Col>
							<h5>Remark</h5>
							<p>{Data.remark}</p>
						</Col>
				</Row>		
			</div>
		</Container>
	)	
}



