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
import {AiOutlineEye} from 'react-icons/ai';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Measurement from './Measurement'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
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
	const data = await authaxios.get(`${api}/measurement/`)
  	return {
    	props: {
    		measurement:data.data,
    	}, // will be passed to the page component as props
  	}
}

export default function Displaymeasurement({measurement}) {
	const router = useRouter();
	const [Data,setData] = useState({})	
	const [getSearchValue,setgetSearchValue] = useState("")
	const {currentUser} = useAuth()
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
  	const [name, setname] = useState("")
   	const [symbols, setsymbols] = useState("")

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
      	await authaxios.patch(`${api}/measurement/${id}`,{
      		name:name,
         	symbols:symbols
      	}).then(function (response) {
         	console.log(response)
         	router.push('/')
      	}).catch(function (error) {
         	console.log(error);
      	});
   	}
    const handleDelete = async (e)=>{
      	e.preventDefault()
      	await authaxios.patch(`${api}/measurement`,{
         	id:parseInt(id),
      	}).then(function (response) {
         	console.log(response)
         	router.push('/')
      	}).catch(function (error) {
         	console.log(error);
      	});
   	}
    useEffect(()=>{
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
					        	placeholder="Search By Name"
					          	aria-label="Search"
					          	aria-describedby="basic-addon1"
					          	className="w-25"
					          	valiue={getSearchValue}
								onChange={(e) => setgetSearchValue(e.target.value)}
					        />      
					    </InputGroup>
				        <div id="no-more-tables">
				        	{ measurement.length == 0 ? 
				        			<p className="text-center fst-italic fw-normal fs-5 text-secondary border bg-white m-3 p-2 rounded">No Patient Data</p> 
				        		:
					            <table className="table table table-light table-hover  col-md-12 cf">
					        		<thead className="cf bg-white">
					        			<tr>
					        				<th scope="col">Id</th>
					        				<th scope="col">Name</th>
					        				<th scope="col">Symbols</th>
					        				<th scope="col">Created By</th>
					        				<th scope="col">Created Date</th>
					        				<th scope="col"></th>
					        				<th scope="col"></th>
					        				<th scope="col"></th>
					        			</tr>
					        		</thead>
					        		<tbody>
					        			{measurement.filter((val)=>{
					        				if(getSearchValue == ""){
					        					return val
					        				}else if(val.name.toLowerCase().includes(getSearchValue.toLowerCase())){
					        					return val
					        				}
					        			}).map((data,index)=>(
						        			<tr key={index} className="bg-white p-3">
						        				<td data-title="Id" scope="row" >{data.id}</td>
						        				<td data-title="Name" >{data.name}</td>
						        				<td data-title="Symbols" >{data.symbols}</td>
						        				<td data-title="Created By" >{data.createdBy}</td>
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
						        						setname(data.name)
						        						setsymbols(data.symbols)
						        						setid(data.id)
						        					}}>
						        						Update
     						 						</Button>
     						 						
												</td>

												<td>
						        					<Button variant="danger" onClick={(index)=>{
						        						handleShow3()
						        						setname(data.name)
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
									<Measurement Data={Data}/>
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
							                     <FloatingLabel controlId="floatingInput" label="Name">
							                        <Form.Control 
							                           type="text" 
							                           placeholder="name"
							                           value = {name}
							                           onChange={(e) => setname(e.target.value)}
							                        />
							                     </FloatingLabel>
							                  </Col>
							                  <Col sm>
							                     <FloatingLabel controlId="floatingInput" label="Symbol">
							                         <Form.Control 
							                           type="text" 
							                           placeholder="symbols" 
							                           value = {symbols}
							                           onChange={(e) => setsymbols(e.target.value)}
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
									Do you want to delete <span className="fs-5 text-danger"> {name}</span>
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