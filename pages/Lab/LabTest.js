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
	const data = await authaxios.get(`${api}/labtest/`)
  	return {
    	props: {
    		labtest:data.data,
    	}, // will be passed to the page component as props
  	}
}

export default function LabTest({labtest}) {
	const router = useRouter();
	const {currentUser} = useAuth()
	const [getSearchValue,setgetSearchValue] = useState("")
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
					    <table className="table table-borderlesstable table-light table-hover col-md-12 cf">
					      	<thead className="cf bg-white">
					       		<tr>
					       			<th scope="col">Id</th>
					       			<th scope="col">Name</th>
					       			<th scope="col">Abbreviation</th>
					        		<th scope="col">Description</th>
					        		<th scope="col">Unit Of Measurement</th>
					        	</tr>
					        </thead>
					       	<tbody>
					       		{labtest.filter((val)=>{
					       			if(getSearchValue == ""){
					       				return val
					       			}else if(val.Name.toLowerCase().includes(getSearchValue.toLowerCase())){
					        			return val
					        		}
					       		}).map((data,index)=>(
						      		<tr key={index} className="bg-white p-3">
						      			<td data-title="Id" scope="row" >{data.id}</td>
						      			<td data-title="Name" >{data.Name}</td>
						      			<td data-title="Abbreviation" >{data.Abbreviation}</td>
						      			<td data-title="Description" >{data.Description}</td>
						      			<td data-title="Unit Of Measurement" >{data.UnitOfMeasurement}</td>
						      		</tr>
						      	))}
					       	</tbody>
					    </table>
				    </div>
				</div>
			</div>
		</div>
	)
}