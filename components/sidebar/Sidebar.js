import Link from 'next/link'
import { useContext } from "react";
import { MdOutlineDashboard } from 'react-icons/md';
import { IoPersonOutline } from 'react-icons/md';
import { BiClinic } from 'react-icons/bi';
import { BsPerson } from 'react-icons/bs';
import { ImLab } from 'react-icons/im';
import { FaGreaterThan } from 'react-icons/fa';
import styles from '../../styles/Sidebar.module.css'
import Image from "next/image"
import NavDropdown from 'react-bootstrap/NavDropdown';

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.top}>
                <Link href="/" style={{ textDecoration: "none" }}>
                    <a>
                        <Image
                            alt="Mountains"
                            src="/images/logo.png"
                            width = {50}
                            height={50}
                            className="rounded float-start NavbarImage mt-2"
                            quality={100}
                        />
                    </a>
                </Link>
            </div>
            <hr className={styles.horizontal}/>
            <div className={styles.center}>
                <ul className={styles.ullist}>
                    <p className={styles.title}>MAIN</p>
                    <li className={styles.list}>
                        <Link href="/" >
                            <a style={{ textDecoration: "none" }}>
                                <span className={styles.spanstyle}>Dashboard</span>
                            </a>
                        </Link>
                    </li>

                    <li className={styles.list}>
                        <Link href="/Patient/allPatient" >
                            <a style={{ textDecoration: "none" }}>
                                <span className={styles.spanstyle}>Patient</span>
                            </a>
                        </Link>
                    </li>
                    

                    <li className={styles.dropdown}>
                        <input id="drop2" type="checkbox"/>
                        <label htmlFor="drop2" className="d-flex justify-content-between">
                            <span className={styles.spanstyle}>Clinic</span>
                            <FaGreaterThan className={styles.icon} />
                        </label>
                        <ul className={styles.ullist}>
                            <li className={styles.dropdownlist}>
                                <Link href="/Clinic/AddClinic" >
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}>Add Clinic</span>
                                    </a>
                                </Link>
                            </li>

                            <li className={styles.dropdownlist}>
                                <Link href="/Clinic/allClinic" >
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}>Display Clinic</span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className={styles.dropdown}>
                        <input id="drop8" type="checkbox"/>
                        <label htmlFor="drop8" className="d-flex justify-content-between">
                            <span className={styles.spanstyle}>User</span>
                            <FaGreaterThan className={styles.icon} />
                        </label>
                        <ul className={styles.ullist}>
                            <li className={styles.dropdownlist}>
                                <Link href="/User/AddUser" >
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}>Add User</span>
                                    </a>
                                </Link>
                            </li>

                            <li className={styles.dropdownlist}>
                                <Link href="/User/allUser" >
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}>Display User</span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className={styles.dropdown}>
                        <input id="drop3" type="checkbox"/>
                        <label htmlFor="drop3" className="d-flex justify-content-between">
                            <span className={styles.spanstyle}>Lab</span>
                            <FaGreaterThan className={styles.icon} />
                        </label>
                        <ul>

                           

                            <li className={styles.ullist}>
                                <Link href="/Lab/AddLabPanel" >
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}>Lab Panel Add</span>
                                    </a>
                                </Link>
                             </li>

                            <li className={styles.ullist}>
                                <Link href="/Lab/LabPanel" >
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}>Lab Panel Display</span>
                                    </a>
                                </Link>
                            </li>

                            <li className={styles.ullist}>
                                <Link href="/Lab/LabTest" >
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}>Lab Test</span>
                                    </a>
                                </Link>
                            </li>
                            <li className={styles.ullist}>
                                <Link href="/Lab/LabPanelTest" >
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}>Lab Panel Test</span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className={styles.dropdown}>
                        <input id="drop4" type="checkbox"/>
                        <label htmlFor="drop4" className="d-flex justify-content-between">
                            <span className={styles.spanstyle}>Manufacturer</span>
                            <FaGreaterThan className={styles.icon} />
                        </label>
                        <ul className={styles.ullist}>
                            <li className={styles.dropdownlist}>
                                <Link href="/Manufacture/AddManufacture" >
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}>Add Manufacturer</span>
                                    </a>
                                </Link>
                            </li>

                            <li className={styles.dropdownlist}>
                                <Link href="/Manufacture/Displaymanufacturer" >
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}>Display Manufacturer</span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className={styles.dropdown}>
                        <input id="drop5" type="checkbox"/>
                        <label htmlFor="drop5" className="d-flex justify-content-between">
                            <span className={styles.spanstyle}>Measurement</span>
                            <FaGreaterThan className={styles.icon} />
                        </label>
                        <ul className={styles.ullist}>
                            <li className={styles.dropdownlist}>
                                <Link href="/measurement/Addmeasurement" >
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}>Add Measurement</span>
                                    </a>
                                </Link>
                            </li>

                            <li className={styles.dropdownlist}>
                                <Link href="/measurement/Displaymeasurement" >
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}>Display Measurement</span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className={styles.dropdown}>
                        <input id="drop70" type="checkbox"/>
                        <label htmlFor="drop70" className="d-flex justify-content-between">
                            <span className={styles.spanstyle}>Department</span>
                            <FaGreaterThan className={styles.icon} />
                        </label>
                        <ul className={styles.ullist}>
                            <li className={styles.dropdownlist}>
                                <Link href="/Department/AddDepartment" >
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}>Add Department</span>
                                    </a>
                                </Link>
                            </li>

                            <li className={styles.dropdownlist}>
                                <Link href="/Department/DisplayDepartment" >
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}>Display Department</span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
