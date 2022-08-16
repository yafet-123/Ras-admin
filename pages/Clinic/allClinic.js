import { useState,useEffect, useContext} from 'react'
import Image from 'next/image'
import axios from "axios";
import Link from "next/link";
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
import moment from 'moment';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import {useAuth} from '../../context/AuthContext'
import Sidebar from '../../components/sidebar/Sidebar.js'
import Navbar from "../../components/navbar/Navbar";
import styles from '../../styles/Home.module.css'
import Clinic from './Clinic'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {AiOutlineEye} from 'react-icons/ai';
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
	const data = await authaxios.get(`${api}/clinic/`)
  	return {
    	props: {
    		Clinics:data.data,
    	}, // will be passed to the page component as props
  	}
}

export default function AllClinic({Clinics}) {
	const [Data,setData] = useState({})	
	const router = useRouter();
	const [clinics,setclinics] = useState([])	
	const [getSearchValue,setgetSearchValue] = useState("")
	const {currentUser} = useAuth()
	const [Name, setName] = useState("")
	const [show1, setShow1] = useState(false);
  	const handleClose1 = () => setShow1(false);
  	const handleShow1 = () => setShow1(true);


  	const [show2, setShow2] = useState(false);
  	const handleClose2 = () => setShow2(false);
  	const handleShow2 = () => setShow2(true);

  	const [show3, setShow3] = useState(false);
  	const handleClose3 = () => setShow3(false);
  	const handleShow3 = () => setShow3(true);

  	const [fullscreen, setFullscreen] = useState(true);

  	const [id,setid] = useState("")
  	const [ClinicName, setClinicName] = useState("")
   	const [Description, setDescription] = useState("")

   	const cookies = new Cookies();
   	const accesstoken = cookies.get('token')
   	const authaxios = axios.create({
    	baseURL : api,
      	headers :{
         	Authorization : `Bearer ${accesstoken} `
      	}
   	})

  	const handleupdate = async (e)=>{
      	e.preventDefault()
      	await authaxios.patch(`${api}/clinic/${id}`,{
      		ClinicName:ClinicName,
			Description:Description
      	}).then(function (response) {
         	console.log(response)
         	router.push('/')
      	}).catch(function (error) {
         	console.log(error);
      	});
   	}
    const handleDelete = async (e)=>{
      	e.preventDefault()
      	await authaxios.patch(`${api}/clinic`,{
         	id:parseInt(id),
      	}).then(function (response) {
         	console.log(response)
         	router.push('/')
      	}).catch(function (error) {
         	console.log(error);
      	});
   	}
    useEffect(()=>{
    	setclinics(Clinics)
        if(!currentUser){
            router.push('/login')
        }else{
        	
        }
    },[currentUser, router])
	return(
		<div className={styles.home}>
			<Sidebar />
			<div className={styles.homeContainer}>
                <Navbar />
				<div className="container">
				    <div className="">
				    	<InputGroup className="p-3">
					        <Form.Control
					        	placeholder="Search By Clinic Name"
					          	aria-label="Search"
					          	aria-describedby="basic-addon1"
					          	className="w-25"
					          	valiue={getSearchValue}
								onChange={(e) => setgetSearchValue(e.target.value)}
					        />      
					    </InputGroup>
				        <div id="no-more-tables">
				        	{ clinics.length == 0 ? 
				        			<p className="text-center fst-italic fw-normal fs-5 text-secondary border bg-white m-3 p-2 rounded">No Patient Data</p> 
				        		:
					            <table className="table table table-light table-hover  col-md-12 cf">
					        		<thead className="cf bg-white">
					        			<tr>
					        				<th scope="col">Id</th>
					        				<th scope="col">Clinic Name</th>
					        				<th scope="col">Created By</th>
					        				<th scope="col">Created Date</th>
					        				<td></td>
					        				<td></td>
					        				<td></td>
					        			</tr>
					        		</thead>
					        		<tbody>
					        			{clinics.filter((val)=>{
					        				if(getSearchValue == ""){
					        					return val
					        				}else if(val.ClinicName.toLowerCase().includes(getSearchValue.toLowerCase())){
					        					return val
					        				}
					        			}).map((data,index)=>(
						        			<tr key={index} className="bg-white p-3">
						        				<td data-title="MRN" scope="row" >{data.id}</td>
						        				<td data-title="Clinic Name" >{data.ClinicName}</td>
						        				<td data-title="Created By" >{data.CreatedBy}</td>
						        				<td data-title="Created Date" >{moment(data.CreatedDate).utc().format('YYYY-MM-DD')}</td>
						        				<td>
						        					<Button variant="info" onClick={(index)=>{
						        						handleShow1()
						        						setData(data)
						        					}}>
						        						<AiOutlineEye />
     						 						</Button>
     						 						
												</td>

						        				<td>
						        					<Button variant="warning" onClick={(index)=>{
						        						handleShow2()
						        						setClinicName(data.ClinicName)
						        						setDescription(data.Description)
						        						setid(data.id)
						        					}}>
						        						Edit
     						 						</Button>
     						 						
												</td>

												<td>
						        					<Button variant="danger" onClick={(index)=>{
						        						handleShow3()
						        						setName(data.ClinicName)
						        						setid(data.id)
						        					}}>
						        						Delete
     						 						</Button>
     						 						
												</td>
						        			</tr>
					        			))}
					        		</tbody>
					        	</table>
					        }
					        <Modal size="lg" show={show1} onHide={handleClose1} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title">
								<Modal.Header closeButton>
									<Modal.Title>Modal title</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<Clinic Data={Data}/>
								</Modal.Body>
								<Modal.Footer>
									<Button variant="secondary" onClick={handleClose1}>
										Close
									</Button>
								</Modal.Footer>
							</Modal>

							<Modal size="lg" show={show2} onHide={handleClose2} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title">
								<Modal.Header closeButton>
									<Modal.Title>Modal title</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<div className="m-3 bg-white">
							            <Container className="p-3">
							               <Row className="mb-3">
							                  <Col sm>
							                     <FloatingLabel controlId="floatingInput" label="ClinicName">
							                        <Form.Control 
							                           type="text" 
							                           placeholder="ClinicName"
							                           value = {ClinicName}
							                           onChange={(e) => setClinicName(e.target.value)}
							                        />
							                     </FloatingLabel>
							                  </Col>
							                  <Col sm>
							                     <FloatingLabel controlId="floatingInput" label="Description">
							                         <Form.Control 
							                           type="text" 
							                           placeholder="Description" 
							                           value = {Description}
							                           onChange={(e) => setDescription(e.target.value)}
							                        />
							                     </FloatingLabel>
							                  </Col>
							               </Row>
							                     
							            </Container>
         							</div >
								</Modal.Body>
								<Modal.Footer>
									<Button onClick={handleupdate} type="submit" variant="primary">Submit</Button>

									<Button variant="secondary" onClick={handleClose2}>
										Close
									</Button>
								</Modal.Footer>
							</Modal>

							<Modal size="lg" show={show3} onHide={handleClose3} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title">
								<Modal.Header closeButton>
									<Modal.Title>Modal title</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									Do you want to delete <span className="fs-5 text-danger"> {Name}</span>
								</Modal.Body>
								<Modal.Footer>
									<Button onClick={handleDelete}variant="danger">
										yes
									</Button>
									<Button variant="secondary" onClick={handleClose3}>
										Close
									</Button>
								</Modal.Footer>
							</Modal>
				        </div>
				    </div>
				</div>
			</div>
		</div>
	)
}