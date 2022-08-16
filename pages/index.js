import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Sidebar from '../components/sidebar/Sidebar.js'
import Navbar from '../components/navbar/Navbar.js'
import {useAuth} from '../context/AuthContext'
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
import {useState, useEffect } from 'react';
import axios from "axios";
import Goto from '../components/Goto.js'
import PieChart from "../components/PieChart";
import LineChart from "../components/Line";
import BarChart from "../components/Bar";
import api from '../components/api'

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
    const data = await authaxios.get(`${api}/report/pcount/`)
    const data1 = await authaxios.get(`${api}/report/dailycliniccount`)
    const data2 = await authaxios.get(`${api}/report/registeredcount/`)

    return {
        props: {
            Report:data.data,
            Report1: data1.data,
            Report2: data2.data
        }, // will be passed to the page component as props
    }
}

export default function Home({Report,Report1,Report2}) {
    console.log(Report1)
    const router = useRouter();
    const {currentUser} = useAuth()

    useEffect(()=>{
        if(!currentUser){
            router.push('/login')
        }else{
            
        }
    },[currentUser, router])

    const ChartData = []
    const file = []

    file.push({
        id:"Daily",
        Number:Report2.Daily
    })
    file.push({
        id:"Monthly",
        Number:Report2.Monthly
    })
    file.push({
        id:"Yearly",
        Number:Report2.Yearly
    })
    ChartData.push({
        id:"Male",
        Number:Report.Male
    })
    ChartData.push({
        id:"Female",
        Number:Report.Female
    })

    console.log(ChartData)
    const [pieChartData, setpieChartData] = useState({
        labels: ChartData.map((data) => data.id),
        datasets: [
          {
            label: "Men and Female",
            data: ChartData.map((data) => data.Number),
            backgroundColor: [
              "#00008b",
              "#ffc0cb",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
    });

    const [ChartData1, setChartData1] = useState({
        labels: Report1.map((data) => data.Clinic),
        datasets: [
          {
            label: "dailycliniccount",
            data: Report1.map((data) => data.Count),
            backgroundColor: [
              "#00008b",
              "#ffc0cb",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
    });


    const [ChartData2, setChartData2] = useState({
        labels: file.map((data) => data.id),
        datasets: [
          {
            label: "Clinic",
            data: file.map((data) => data.Number),
            backgroundColor: [
              "#00008b",
              "#ffc0cb",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
    });


   
    


    return (
        <div className={styles.home}>
            <Sidebar />
            <div className={styles.homeContainer}>
                <Navbar/>
                <div className="d-flex justify-content-between">
                    <div style={{ width: 500 }}>
                        <PieChart chartData={pieChartData} />
                    </div>

                    <div style={{ width: 500 }}>
                        <LineChart chartData={ChartData1} />
                    </div>
                   
                </div>
                <div className="d-flex justify-content-between">

                    <div style={{ width: 500 }}>
                        <BarChart chartData={ChartData2} />
                    </div>
                   
                </div>                
            </div>
        </div>
    )
}
