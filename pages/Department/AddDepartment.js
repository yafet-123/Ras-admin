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
import api from '../../components/api'

export default function AddManufacture() {
   const router = useRouter();
   const {currentUser} = useAuth()
    useEffect(()=>{
        if(!currentUser){
            router.push('/login')
        }else{
         
        }
    },[currentUser, router])
   const [name, setName] = useState("")
   const [abbreviation, setAbbreviation] = useState("")
   const [remark, setremark] = useState("")
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
      await authaxios.post(`${api}/labdepartment`,{
         name:name,
         abbreviation:abbreviation,
         remark:remark
      }).then(function (response) {
         console.log(response)
         router.push('/Department/DisplayDepartment')
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
                        <FloatingLabel controlId="floatingInput" label="Name">
                           <Form.Control 
                              type="text" 
                              placeholder="Name"
                              required
                              value = {name}
                              onChange={(e) => setName(e.target.value)}
                           />
                        </FloatingLabel>
                     </Col>
                     <Col sm>
                        <FloatingLabel controlId="floatingInput" label="Abbreviation">
                            <Form.Control 
                              type="text" 
                              placeholder="Abbreviation"
                              required 
                              value = {abbreviation}
                              onChange={(e) => setAbbreviation(e.target.value)}
                           />
                        </FloatingLabel>
                     </Col>
                  </Row>

                  <Row className="mb-3">
                     <Col sm>
                        <FloatingLabel controlId="floatingInput" label="remark">
                           <Form.Control 
                              type="text" 
                              placeholder="remark"
                              required
                              value = {remark}
                              onChange={(e) => setremark(e.target.value)}
                           />
                        </FloatingLabel>
                     </Col>
                   </Row>  
                  <Button className="mb-3" type="submit" variant="primary">Submit</Button>
               </Container>
            </form >
         </div>
      </div>
  )
}

