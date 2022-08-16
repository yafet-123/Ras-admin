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
	const data = await authaxios.get(`${api}/labpaneltest/`)
  	return {
    	props: {
    		labpaneltest:data.data,
    	}, // will be passed to the page component as props
  	}
}

export default function LabPanelTest({labpaneltest}) {
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
				    <div id="no-more-tables">
				    	<InputGroup className="p-3">
					        <Form.Control
					        	placeholder="Search By Panel"
					          	aria-label="Search"
					          	aria-describedby="basic-addon1"
					          	className="w-25"
					          	valiue={getSearchValue}
								onChange={(e) => setgetSearchValue(e.target.value)}
					        />      
					    </InputGroup>
					    <table className="table table table-light table-hover col-md-12 cf">
					      	<thead className="cf bg-white">
					       		<tr>
					       			<th scope="col">Id</th>
					       			<th scope="col">Panel</th>
					       			<th scope="col">Test</th>
					        	</tr>
					        </thead>
					       	<tbody>
					       		{labpaneltest.filter((val)=>{
					       			if(getSearchValue == ""){
					       				return val
					       			}else if(val.Panel.toLowerCase().includes(getSearchValue.toLowerCase())){
					        			return val
					        		}
					       		}).map((data,index)=>(
						      		<tr key={index} className="bg-white p-3">
						      			<td data-title="Id" scope="row" >{data.id}</td>
						      			<td data-title="Panel" >{data.Panel}</td>
						      			<td data-title="Abbreviation" >{data.Test}</td>
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