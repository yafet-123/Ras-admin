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
import User from './User.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {PhoneNumberTypeIdList} from '../../data/PhoneNumberTypeId'
import {CountryIdList} from '../../data/CountryId'
import {RegionIdList} from '../../data/RegionId'
import {ZoneIdList} from '../../data/ZoneID'
import {SubCityIdList} from '../../data/SubCityId'
import {TitleIdList} from '../../data/TitleId'
import {IdTypeIdList} from '../../data/IdTypeId'
import {AccountGroupIdList} from '../../data/AccountGroupId'
import {GenderIdList} from '../../data/GenderId'
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
	const data = await authaxios.get(`${api}/user/`)
  	return {
    	props: {
    		Users:data.data,
    	}, // will be passed to the page component as props
  	}
}

export default function AllClinic({Users}) {
	const router = useRouter();
	const [Data,setData] = useState({})	
	const [getSearchValue,setgetSearchValue] = useState("")
	const {currentUser} = useAuth()
	const [show, setShow] = useState(false);
	const cookies = new Cookies();
    const accesstoken = cookies.get('token')
  	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);
  	const [fullscreen, setFullscreen] = useState(true);

  	const [show2, setShow2] = useState(false);
  	const handleClose2 = () => setShow2(false);
  	const handleShow2 = () => setShow2(true);

  	const [show3, setShow3] = useState(false);
  	const handleClose3 = () => setShow3(false);
  	const handleShow3 = () => setShow3(true);
  	const authaxios = axios.create({
      baseURL : api,
      headers :{
         Authorization : `Bearer ${accesstoken} `
      }
   })
  	const [FirstName, setFirstName] = useState("")
  		const [DeleteName,setDeleteName] = useState("")
   	const [MiddleName, setMiddleName] = useState("")
   	const [LastName, setLastName] = useState("")
   	const [AccountGroupId, setAccountGroupId] = useState("")
   	const [UserName, setUserName] = useState("")
   	const [Password, setPassword] = useState("")
   	const [AccountExpirationDate, setAccountExpirationDate] = useState("")
   	const [TitleId, setTitleId] = useState(0)
   	const [IdNumber, setIdNumber] = useState()
   	const [IdTypeId, setIdTypeId] = useState()
   	const [Email, setEmail] = useState()
   	const [GenderId, setGenderId] = useState()
   	const [PhoneNumberTypeId, setPhoneNumberTypeId] = useState()
   	const [PhoneNumber, setPhoneNumber] = useState()
   	const [CountryId, setCountryId] = useState()
   	const [RegionId, setRegionId] = useState()
   	const [SubCityId, setSubCityId] = useState()
   	const [WoredaName, setWoredaName] = useState("")
   	const [ZoneId, setZoneId] = useState()
   	const [Kebele,setKebele] = useState("")
   	const [HouseNumber,setHouseNumber] = useState("")
   	const [id,setid]=useState("")

   	const ForgetPassword = async(e)=>{
   		e.preventDefault()
      	await authaxios.patch(`${api}/auth/forgot/${id}`,{
         	Password:Password
      	}).then(function (response) {
         	console.log(response)
         	router.push('/')
      	}).catch(function (error) {
         	console.log(error);
      	});
   	}
   	const handleupdate = async (e)=>{
      e.preventDefault()
      await authaxios.patch(`${api}/user/${id}`,{
         FirstName:FirstName,
         MiddleName:MiddleName,
         LastName:LastName,
         AccountGroupId:parseInt(AccountGroupId),
         UserName:UserName,
         AccountExpirationDate:AccountExpirationDate,
         TitleId:parseInt(TitleId),
         IdNumber:IdNumber,
         IdTypeId:parseInt(IdTypeId),
         Email:Email,
         PhoneNumberTypeId:parseInt(PhoneNumberTypeId),
         PhoneNumber:parseInt(PhoneNumber),
         GenderId:parseInt(GenderId),
         CountryId:parseInt(CountryId),
         RegionId:parseInt(RegionId),
         SubCityId:parseInt(SubCityId),
         WoredaName:WoredaName,
         ZoneId:parseInt(ZoneId),
         Kebele:Kebele,
         HouseNumber:HouseNumber,
      }).then(function (response) {
         console.log(response)
         router.push('/User/allUser')
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
				        	{ Users.length == 0 ? 
				        			<p className="text-center fst-italic fw-normal fs-5 text-secondary border bg-white m-3 p-2 rounded">No Patient Data</p> 
				        		:
					            <table className="table table table-light table-hover  col-md-12 cf">
					        		<thead className="cf bg-white">
					        			<tr>
					        				<th scope="col">Id</th>
					        				<th scope="col">Full Name</th>
					        				<th scope="col">Gender</th>
					        				<th scope="col">Username</th>
					        				<th scope="col">Phone Number</th>
					        				<th scope="col">Created By</th>
					        				<th scope="col">Created Date</th>
					        				<th scope="col"></th>
					        				<th scope="col"></th>
					        				<th scope="col"></th>

					        			</tr>
					        		</thead>
					        		<tbody>
					        			{Users.filter((val)=>{
					        				if(getSearchValue == ""){
					        					return val
					        				}else if(val.Name.toLowerCase().includes(getSearchValue.toLowerCase())){
					        					return val
					        				}
					        			}).map((data,index)=>(
						        			<tr key={index} className="bg-white p-3">
						        				<td data-title="Id" scope="row" >{data.id}</td>
						        				<td data-title="Full Name" >{data.Name}</td>
						        				<td data-title="Gender" >{data.Gender}</td>
						        				<td data-title="Username" >{data.UserName}</td>
						        				<td data-title="Phone Number" >{data.PhoneNumber}</td>
						        				<td data-title="Created By" >{data.CreatedBy}</td>
						        				<td data-title="Created Date" >{moment(data.CreatedDate).utc().format('YYYY-MM-DD')}</td>
						        				<td>
						        					<Button variant="primary" onClick={(index)=>{
						        						handleShow()
						        						setData(data)
						        					}}>
						        						<AiOutlineEye />
     						 						</Button>
	
												</td>
												<td>
													<Button variant="warning" onClick={(index)=>{
						        						handleShow2()
						        						setid(data.id)
						        						setFirstName(data.FirstName)
												        setMiddleName(data.MiddleName)
												        setLastName(data.LastName)
												        setAccountGroupId(data.AccountGroupId)
												        setUserName(data.UserName)
												        setPassword(data.Password)
												        setAccountExpirationDate(data.AccountExpirationDate)
												        setTitleId(data.TitleId)
												        setIdNumber(data.IdNumber)
												        setIdTypeId(data.IdTypeId)
												        setEmail(data.Email)
												        setPhoneNumberTypeId(data.PhoneNumberTypeId)
												        setPhoneNumber(data.PhoneNumber)
												        setGenderId(data.GenderId)
												        setCountryId(data.CountryId)
												        setRegionId(data.RegionId)
												        setSubCityId(data.SubCityId)
												        setWoredaName(data.WoredaName)
												        setZoneId(data.ZoneId)
												        setKebele(data.Kebele)
												        setHouseNumber(data.HouseNumber)
						        					}}>
						        						Update
     						 						</Button>
												</td>
												<td>
						        					<Button variant="danger" onClick={(index)=>{
						        						handleShow3()
						        						setid(data.id)
						        						
						        					}}>
						        						Forget Password
     						 						</Button>
     						 						
												</td>
						        			</tr>								      	
					        			))}
					        		</tbody>
					        	</table>
					        }

					        <Modal size="lg" show={show} onHide={handleClose} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title">
								<Modal.Header closeButton>
									<Modal.Title>Modal title</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<User Data={Data}/>
								</Modal.Body>
								<Modal.Footer>
									<Button variant="secondary" onClick={handleClose}>
										Close
									</Button>
								</Modal.Footer>
							</Modal>

							<Modal size="lg" show={show2} onHide={handleClose2} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title">
								<Modal.Header closeButton>
									<Modal.Title>Update Data</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<Container className="p-3">
						                  <Row className="mb-3">
						                     <Col sm>
						                        <FloatingLabel controlId="floatingSelect" label="Title">
						                           <Form.Select 
						                              aria-label="Floating label select example"
						                              value = {TitleId}
						                              onChange={(e) => setTitleId(e.target.value)}
						                           >
						                              <option></option>
						                              {TitleIdList.map((data,index)=>(
						                                 <option key={index} value={data.id}>{data.name}</option>
						                              ))}
						                           </Form.Select>
						                        </FloatingLabel>
						                     </Col>
						                     <Col sm>
						                        <FloatingLabel controlId="floatingInput" label="First Name">
						                            <Form.Control 
						                              type="text" 
						                              placeholder="firstname" 
						                              value = {FirstName}
						                              onChange={(e) => setFirstName(e.target.value)}
						                           />
						                        </FloatingLabel>
						                     </Col>

						                     <Col sm>
						                        <FloatingLabel controlId="floatingInput" label="Middle Name">
						                           <Form.Control 
						                              type="text" 
						                              placeholder="middlename"
						                              value = {MiddleName}
						                              onChange={(e) => setMiddleName(e.target.value)}
						                           />
						                        </FloatingLabel>
						                     </Col>

						                     <Col sm>
						                        <FloatingLabel controlId="floatingInput" label="Last Name">
						                           <Form.Control 
						                              type="text" 
						                              placeholder="lastname"
						                              value = {LastName}
						                              onChange={(e) => setLastName(e.target.value)}
						                           />
						                        </FloatingLabel>
						                     </Col>
						                  </Row>   

						                  <Row className="mb-4">
						                     <Col sm>
						                        <FloatingLabel controlId="floatingInput" label="Email">
						                            <Form.Control 
						                              type="email" 
						                              placeholder="Email" 
						                              value = {Email}
						                              onChange={(e) => setEmail(e.target.value)}
						                           />
						                        </FloatingLabel>
						                     </Col>

						                     <Col sm>
						                        <FloatingLabel controlId="floatingInput" label="PhoneNumber">
						                           <Form.Control 
						                              type="number" 
						                              placeholder="PhoneNumber"
						                              value = {PhoneNumber}
						                              onChange={(e) => setPhoneNumber(e.target.value)}
						                           />
						                        </FloatingLabel>
						                     </Col>

						                     <Col sm>
						                        <FloatingLabel controlId="floatingSelect" label="Gender">
						                           <Form.Select 
						                              aria-label="Floating label select example"
						                              value = {GenderId}
						                              onChange={(e) => setGenderId(e.target.value)}
						                           >
						                              <option></option>
						                              {GenderIdList.map((data,index)=>(
						                                  <option key={index} value={data.id}>{data.name}</option>
						                              ))}
						                           </Form.Select>
						                        </FloatingLabel>
						                     </Col>
						                  </Row>
						                  <Row className="mb-4">
						                     <Col sm>
						                        <FloatingLabel controlId="floatingSelect" label="Phone Number Type Id">
						                           <Form.Select 
						                              aria-label="Floating label select example"
						                              value = {PhoneNumberTypeId}
						                              onChange={(e) => setPhoneNumberTypeId(e.target.value)}
						                           >
						                              <option></option>
						                              {PhoneNumberTypeIdList.map((data,index)=>(
						                                  <option key={index} value={data.id}>{data.name}</option>
						                              ))}
						                           </Form.Select>
						                        </FloatingLabel>
						                     </Col>

						                     <Col sm>
						                        <FloatingLabel controlId="floatingInput" label="Id Number">
						                            <Form.Control 
						                              type="text" 
						                              placeholder="Id Number" 
						                              value = {IdNumber}
						                              onChange={(e) => setIdNumber(e.target.value)}
						                           />
						                        </FloatingLabel>
						                     </Col>
						                     <Col sm>
						                        <FloatingLabel controlId="floatingSelect" label="Id Number Type ">
						                           <Form.Select 
						                              aria-label="Floating label select example"
						                              value = {IdTypeId}
						                              onChange={(e) => setIdTypeId(e.target.value)}
						                           >
						                              <option></option>
						                              {IdTypeIdList.map((data,index)=>(
						                                 <option key={index} value={data.id}>{data.name}</option>
						                              ))}
						                           </Form.Select>
						                        </FloatingLabel>
						                     </Col>
						                     
						                  </Row>
						                  <Row className="mb-4">
						                     <Col sm>
						                        <FloatingLabel controlId="floatingSelect" label="Country">
						                           <Form.Select 
						                              aria-label="Floating label select example"
						                              value = {CountryId}
						                              onChange={(e) => setCountryId(e.target.value)}
						                           >
						                              <option></option>
						                              {CountryIdList.map((data,index)=>(
						                                 <option key={index} value={data.id}>{data.name}</option>
						                              ))}
						                           </Form.Select>
						                        </FloatingLabel>
						                     </Col>

						                     <Col sm>
						                        <FloatingLabel controlId="floatingSelect" label="Region">
						                           <Form.Select 
						                              aria-label="Floating label select example"
						                              value = {RegionId}
						                              onChange={(e) => setRegionId(e.target.value)}
						                           >
						                              <option></option>
						                              {RegionIdList.map((data,index)=>(
						                                 <option key={index} value={data.id}>{data.name}</option>
						                              ))}
						                           </Form.Select>
						                        </FloatingLabel>
						                     </Col>

						                     <Col sm>
						                        <FloatingLabel controlId="floatingSelect" label="Zone">
						                           <Form.Select 
						                              aria-label="Floating label select example"
						                              value = {ZoneId}
						                              onChange={(e) => setZoneId(e.target.value)}
						                           >
						                              <option></option>
						                              {ZoneIdList.map((data,index)=>(
						                                 <option key={index} value={data.id}>{data.name}</option>
						                              ))}
						                           </Form.Select>
						                        </FloatingLabel>
						                     </Col>
						                  </Row> 

						                  <Row className="mb-4">
						                     <Col sm>
						                        <FloatingLabel controlId="floatingSelect" label="Sub City">
						                           <Form.Select 
						                              aria-label="Floating label select example"
						                              value = {SubCityId}
						                              onChange={(e) => setSubCityId(e.target.value)}
						                           >
						                              <option></option>
						                              {SubCityIdList.map((data,index)=>(
						                                 <option key={index} value={data.id}>{data.name}</option>
						                              ))}
						                           </Form.Select>
						                        </FloatingLabel>
						                     </Col>

						                     <Col sm>
						                        <FloatingLabel controlId="floatingInput" label="Woreda Name">
						                           <Form.Control 
						                              type="text" 
						                              placeholder="Woreda Name"
						                              value = {WoredaName}
						                              onChange={(e) => setWoredaName(e.target.value)}
						                           />
						                        </FloatingLabel>
						                     </Col>

						                     <Col sm>
						                        <FloatingLabel controlId="floatingInput" label="Kebele">
						                           <Form.Control 
						                              type="text" 
						                              placeholder="Kebele"
						                              value = {Kebele}
						                              onChange={(e) => setKebele(e.target.value)}
						                           />
						                        </FloatingLabel>
						                     </Col>

						                     <Col sm>
						                        <FloatingLabel controlId="floatingInput" label="House Number">
						                           <Form.Control 
						                              type="text" 
						                              placeholder="House Number"
						                              value = {HouseNumber}
						                              onChange={(e) => setHouseNumber(e.target.value)}
						                           />
						                        </FloatingLabel>
						                     </Col>
						                  </Row>

						                  <Row className="mb-4">
						                     <Col sm>
						                        <FloatingLabel controlId="floatingInput" label="UserName">
						                           <Form.Control 
						                              type="text" 
						                              placeholder="UserName"
						                              value = {UserName}
						                              onChange={(e) => setUserName(e.target.value)}
						                           />
						                        </FloatingLabel>
						                     </Col>

						                     
						                     <Col sm>
						                        <FloatingLabel controlId="floatingSelect" label="Account Group">
						                           <Form.Select 
						                              aria-label="Floating label select example"
						                              value = {AccountGroupId}
						                              onChange={(e) => setAccountGroupId(e.target.value)}
						                           >
						                              <option></option>
						                              {AccountGroupIdList.map((data,index)=>(
						                                 <option key={index} value={data.id}>{data.name}</option>
						                              ))}
						                           </Form.Select>
						                        </FloatingLabel>
						                     </Col>

						                     <Col sm>
						                        <FloatingLabel controlId="floatingInput" label="Account Expiration Date">
						                           <Form.Control 
						                              type="date" 
						                              placeholder="Account Expiration Date"
						                              value = {AccountExpirationDate}
						                              onChange={(e) => setAccountExpirationDate(e.target.value)}
						                           />
						                        </FloatingLabel>
						                     </Col>
						                  </Row> 
               						</Container>
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
									<Row className="mb-3">
						           	<Col sm>
                        			<FloatingLabel controlId="floatingInput" label="Password">
                           			<Form.Control 
                              			type="password" 
                              			placeholder="Password"
                              			value = {Password}
                              			onChange={(e) => setPassword(e.target.value)}
                           			/>
                        			</FloatingLabel>
                     			</Col>
						         </Row>
								</Modal.Body>
								<Modal.Footer>
									<Button variant="danger" onClick={ForgetPassword}>
						        		Confirm
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