import {useState, useEffect} from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Cookies from 'universal-cookie';
import {useAuth} from '../../context/AuthContext'
import Sidebar from '../../components/sidebar/Sidebar.js'
import Navbar from "../../components/navbar/Navbar";
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
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

export default function AddMedicalRecord() {
   const router = useRouter();
   const {currentUser} = useAuth()
    useEffect(()=>{
        if(!currentUser){
            router.push('/login')
        }else{
         
        }
    },[currentUser, router])
   const [FirstName, setFirstName] = useState("")
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
   const cookies = new Cookies();
   const accesstoken = cookies.get('token')
   const authaxios = axios.create({
      baseURL : api,
      headers :{
         Authorization : `Bearer ${accesstoken} `
      }
   })
   
   const handlesubmit = async (e)=>{
      e.preventDefault()
      await authaxios.post(`${api}/auth/register`,{
         FirstName:FirstName,
         MiddleName:MiddleName,
         LastName:LastName,
         AccountGroupId:parseInt(AccountGroupId),
         UserName:UserName,
         Password:Password,
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
   return (
      <div className={styles.home}>
         <Sidebar />
         <div className={styles.homeContainer}>
            <Navbar />
            <form onSubmit={handlesubmit} className="m-3 bg-white border rounded">
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
                        <FloatingLabel controlId="floatingInput" label="Password">
                           <Form.Control 
                              type="Password" 
                              placeholder="Password"
                              value = {Password}
                              onChange={(e) => setPassword(e.target.value)}
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
                  <Button type="submit" variant="primary">Submit</Button>
               </Container>
            </form >
         </div>
      </div>
  )
}

