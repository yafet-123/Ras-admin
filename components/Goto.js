import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Link from 'next/link'
import styles from '../styles/Goto.module.css'

export default function Goto({Report}) {
    return (
        <Container>
            <Row className="p-3">
				<Link href="/Patient/allPatient" >
                    <Col md={3} className={styles.Doctor} >
                        <a className="p-3 text-white text-decoration-none d-flex justify-content-center fs-1 fw-bold">
                            <span>Doctor</span>
                        </a>
                    </Col>
				</Link>

				<Link href="/" >
					<Col md={4} className={styles.Reception}>
                        <a className="p-3 text-white text-decoration-none d-flex justify-content-center fs-1 fw-bold">
                            <span>Reception</span>
                        </a>
                    </Col>
				</Link>

				<Link href="/" >
					<Col md={3} className={styles.Pharmacy}>
                        <a className="p-3 text-white text-decoration-none d-flex justify-content-center fs-1 fw-bold">
                            <span>Pharmacy</span>
                        </a>
                    </Col>
				</Link>
			</Row>

			<Row className="p-3">
				<Link href="/" >
					<Col md={3} className={styles.Laboratory}> 
                        <a className="p-3 text-white text-decoration-none d-flex justify-content-center fs-1 fw-bold">
                            <span>Laboratory</span>
                        </a>
                    </Col>    
				</Link>
				<Link href="/" >
					<Col md={4} className={styles.Radiology}>
                        <a className="p-3 text-white text-decoration-none d-flex justify-content-center fs-1 fw-bold">
                            <span>Radiology</span>
                        </a>
                    </Col>    
				</Link>
				<Link href="/" >
					<Col md={3} className={styles.Cashier}>
                        <a className="p-3 text-white text-decoration-none d-flex justify-content-center fs-1 fw-bold">
                            <span>Cashier</span>
                        </a>
                    </Col>    
				</Link>
			</Row>
        </Container>
    )
}