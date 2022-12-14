import Pagination from 'react-bootstrap/Pagination';
import { useState,useEffect, useContext} from 'react'
import Image from 'next/image'
import axios from "axios";
import Link from "next/link";
import {AiOutlineArrowRight} from 'react-icons/ai';
import {AiOutlineDown} from 'react-icons/ai'
import {AiOutlineSearch} from 'react-icons/ai'
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
import moment from 'moment';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import {AiOutlineEye} from 'react-icons/ai';
import {useAuth} from '../../context/AuthContext'
import Sidebar from '../../components/sidebar/Sidebar.js'
import Navbar from "../../components/navbar/Navbar";
import styles from '../../styles/Home.module.css'
import api from '../../components/api'

export async function getServerSideProps(context) {
	const {params,req,res,query} = context
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
	const data = await authaxios.get(`${api}/patient/`)
  	return {
    	props: {
    		patient:data.data,
    	}, // will be passed to the page component as props
  	}
}

export default function AllPatient({patient}) {
	const router = useRouter();
	const [patients,setpatients] = useState([])
	const [placeholder,setPlaceholder] = useState("")	
	const [getSearchValue,setgetSearchValue] = useState("")
	const {currentUser} = useAuth()
    useEffect(()=>{
    	setpatients(patient)
        if(!currentUser){
            router.push('/login')
        }else{
        	
        }
    },[currentUser, router])
	const handleSearch = async (e)=>{
		const cookies = new Cookies();
		const accesstoken = cookies.get('token')
		const authaxios = axios.create({
			baseURL : api,
			headers :{
				Authorization : `Bearer ${accesstoken} `
			}
		})
		const oneData = await authaxios.post(`${api}/search/`,{
			"searchName": getSearchValue,
   	 		"type": e
		})

		const objOneData = oneData.data

		if(Array.isArray(objOneData)){
			setpatients(objOneData)
		}else{
			const patient = []
			patient.push(objOneData)
			setpatients(patient)
			console.log(patient)
		}
	
	}
	return(
		<div className={styles.home}>
			<Sidebar />
			<div className={styles.homeContainer}>
                <Navbar />
				<div className="container">
				    <div className="">
				    	<InputGroup className="p-3">
					        <Form.Control
					        	placeholder="Search"
					          	aria-label="Search"
					          	aria-describedby="basic-addon1"
					          	className="w-25"
					          	valiue={getSearchValue}
								onChange={(e) => setgetSearchValue(e.target.value)}
					        />

					        <DropdownButton
						        title="Search"
						        id="input-group-dropdown-2"
						        align="end"
						        variant="primary"
						        className="text-lg-start text-uppercase"
						    >
						        	<Dropdown.Item onClick={()=> handleSearch(1)}>
						        		By MRN
						        	</Dropdown.Item>

						        	<Dropdown.Item onClick={()=> handleSearch(2)}>
						        		By Name
						        	</Dropdown.Item>

						        	<Dropdown.Item onClick={()=> handleSearch(3)}>
						        		By PhoneNumber
						        	</Dropdown.Item>

						        	<Dropdown.Item onClick={()=> handleSearch(4)}>
						        		By PreviousMRN
						        	</Dropdown.Item>
        					</DropdownButton>
					    </InputGroup>
				        <div id="no-more-tables">
				        	{ patients.length == 0 ? 
				        			<p className="text-center fst-italic fw-normal fs-5 text-secondary border bg-white m-3 p-2 rounded">No Patient Data</p> 
				        		:
					            <table className="table table-light table-hover col-md-12 cf">
					        		<thead className="cf bg-white">
					        			<tr>
					        				<th scope="col">MRN</th>
					        				<th scope="col">Full Name</th>
					        				<th scope="col">Gender</th>
					        				<th scope="col">Age</th>
					        				<th scope="col">Phone Number</th>
					        				<th scope="col">Regestration Date</th>
					        				<th scope="col">Created By</th>
					        				<th scope="col"></th>
					        			</tr>
					        		</thead>
					        		<tbody>
					        			{patients.map((data,index)=>(
						        			<tr key={index} className="bg-white p-3">
						        				<td data-title="MRN" scope="row" >{data.MRN}</td>
						        				<td data-title="Full Name" >{data.Name}</td>
						        				<td data-title="Gender" >{data.Gender}</td>
						        				<td data-title="Age" >{data.DateOfBirth}</td>
						        				<td data-title="Phone Number" >{data.PhoneNumber}</td>
						        				<td data-title="Regestration Date" >{moment(data.RegistrationDate).utc().format('YYYY-MM-DD')}</td>
						        				<td data-title="Created By" >{data.CreatedBy}</td>
						        				<td>
						        					<Link
														href={{
								            				pathname: `/Patient/patient`,
								            				query:{ mrn: data.MRN }
								            				
								        				}}
													>	
														<a  
															className="btn btn-info"
														><AiOutlineEye /></a>
													</Link>
												</td>
						        			</tr>
					        			))}
					        		</tbody>
					        	</table>
					        }
				        </div>
				    </div>
				</div>
			</div>
		</div>
	)
}